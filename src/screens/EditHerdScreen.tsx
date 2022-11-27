import { FC, useCallback, useState } from 'react';

import { ScrollView, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { HomeScreenProps, UseRoute } from 'routes/types';

import ScreenLayout from 'components/layout/ScreenLayout';

import ImagePicker from 'components/common/ImagePicker';
import Button from 'components/common/Button';

import { ImageInfo } from 'hooks/image/useImagePicker';
import useUploadImage from 'hooks/image/useUploadImage';

const EditHerdScreen: FC<HomeScreenProps<'EditHerd'>> = () => {
  const { goBack } = useNavigation();
  const { params: { herdId } = {} } = useRoute<UseRoute<'EditHerd'>>();
  const [image, setImage] = useState<ImageInfo | null>(null);

  const { uploadImage, loading } = useUploadImage();

  const onUpload = useCallback(async () => {
    if (!loading && image) {
      try {
        await uploadImage({ entity: { herdId }, image });

        goBack();
      } catch (error) {
        console.error(error);
      }
    }
  }, [goBack, herdId, image, loading, uploadImage]);

  return (
    <ScreenLayout>
      <ScrollView
        contentContainerStyle={styles.wrap}
        scrollEnabled={false}
        contentInsetAdjustmentBehavior='always'
      >
        <ImagePicker loading={loading} onChangeImage={setImage} />

        {image && <Button block label='Upload' loading={loading} onPress={onUpload} />}
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default EditHerdScreen;
