import { useCallback, useState } from 'react';

import {
  ImageInfo as PickerImageInfo,
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  useCameraPermissions,
} from 'expo-image-picker';

export type ImageInfo = PickerImageInfo & { aspectRatio: number };

type UseImagePicker = (options?: ImagePickerOptions) => {
  takePhoto: () => Promise<void>;
  pickImageFromLibrary: () => Promise<void>;
  resetImage: () => void;
  image: ImageInfo | null;
};

const defaultOptions = <ImagePickerOptions>{
  mediaTypes: MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [7, 3],
  quality: 1,
};

const useImagePicker: UseImagePicker = (options = defaultOptions) => {
  const [cameraStatus, requestCameraPermission] = useCameraPermissions();
  const [image, setImage] = useState<ImageInfo | null>(null);

  const resetImage = useCallback(() => setImage(null), []);

  const takePhoto = async (): Promise<void> => {
    if (!cameraStatus?.granted) await requestCameraPermission();

    const result = await launchCameraAsync(options);

    if (!result.cancelled) setImage({ ...result, aspectRatio: result.width / result.height });
  };

  const pickImageFromLibrary = async (): Promise<void> => {
    const result = await launchImageLibraryAsync(options);

    if (!result.cancelled) setImage({ ...result, aspectRatio: result.width / result.height });
  };

  return {
    takePhoto,
    pickImageFromLibrary,
    resetImage,
    image,
  };
};

export default useImagePicker;
