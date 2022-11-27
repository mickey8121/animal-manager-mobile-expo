import { useCallback, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataProxy, OperationVariables, useApolloClient } from '@apollo/client';

import { ImageInfo } from 'hooks/image/useImagePicker';

import imageFileSize from 'helpers/image/imageFileSize';

import {
  AnimalMainFragmentFragment,
  HerdMainFragmentFragment,
  Image,
  Maybe,
  useDeleteImageMutation,
} from 'generated/graphql';
import ANIMAL_MAIN_FRAGMENT from 'graphql/fragments/animals/animalMain';
import HERD_MAIN_FRAGMENT from 'graphql/fragments/herds/herdMain';

import pick from 'lodash/pick';

type Entity = { animalId?: string; herdId?: string };

interface FetchSuccessfulResult extends Omit<Image, 'herd' | 'animal' | 'owner' | 'originalUrl'> {
  animalId: Maybe<string>;
  herdId: Maybe<string>;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

type UploadImage = (props: {
  entity: Entity;
  image: ImageInfo;
}) => Promise<FetchSuccessfulResult & Error>;
type UseUploadImage = () => { uploadImage: UploadImage; loading: boolean };

const useUploadImage: UseUploadImage = () => {
  const client = useApolloClient();
  const [deleteImage] = useDeleteImageMutation();

  const [loading, setLoading] = useState(false);

  const uploadImage: UploadImage = useCallback(
    async ({ entity, image }) => {
      // get the `imageName` and `imageType` from the end of string
      const imageName = image.uri.substring(image.uri.lastIndexOf('/') + 1);
      const imageType = imageName.substring(imageName.lastIndexOf('.') + 1) || 'png';
      const imageSize = await imageFileSize(image.uri);

      if (!imageSize) throw Error('File Size Unknown');
      if (imageSize > 5) throw Error('File Too Large. Max size 5MB'); // if > 10 MB

      setLoading(true);

      const formData = new FormData();

      if (entity.animalId) formData.append('animalId', entity.animalId);
      else if (entity.herdId) formData.append('herdId', entity.herdId);

      formData.append('file', { uri: image.uri, name: imageName, type: `image/${imageType}` });

      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          Authorization: (await AsyncStorage.getItem('authToken')) ?? '',
        }),
        body: formData,
      } as RequestInit;

      const result = await fetch(`${process.env.API_ROOT_URL}/images/upload`, requestOptions)
        .then(res => res.text())
        .then(res => JSON.parse(res))
        .catch(err => err);

      if (result instanceof Error) {
        setLoading(false);
        throw result;
      }

      if (result?.statusCode >= 400) {
        setLoading(false);
        throw Error(result.message);
      }

      const uploadedImage = pick(result, ['id', 'thumbUrl', 'url', '__typename']);

      const fragmentProps: DataProxy.Fragment<
        OperationVariables,
        AnimalMainFragmentFragment | HerdMainFragmentFragment
      > = {
        fragment: null as any,
      };

      if (entity.animalId) {
        fragmentProps.id = `Animal:${entity.animalId}`;
        fragmentProps.fragment = ANIMAL_MAIN_FRAGMENT;
        fragmentProps.fragmentName = 'animalMainFragment';
      } else if (entity.herdId) {
        fragmentProps.id = `Herd:${entity.herdId}`;
        fragmentProps.fragment = HERD_MAIN_FRAGMENT;
        fragmentProps.fragmentName = 'herdMainFragment';
      }

      const entityFromCache = fragmentProps.id && client.readFragment(fragmentProps);

      if (entityFromCache) {
        const images = [...(entityFromCache.images || [])];

        if (images.length) {
          const filteredImageId = images.pop()?.id;

          if (filteredImageId) {
            await deleteImage({ variables: { where: { id: filteredImageId } } });
          }
        }

        client.writeFragment({
          ...fragmentProps,
          data: {
            ...entityFromCache,
            images: [
              ...images,
              { ...uploadedImage, __typename: 'Image', thumbUrl: image.uri, url: image.uri },
            ],
          },
        });
      }

      setLoading(false);

      return result;
    },
    [client, deleteImage],
  );

  return { uploadImage, loading };
};

export default useUploadImage;
