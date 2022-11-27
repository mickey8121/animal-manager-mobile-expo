import { FC, useCallback, useEffect } from 'react';

import { useActionSheet } from '@expo/react-native-action-sheet';
import { Image, StyleSheet, Text } from 'react-native';

import TouchableBounce from 'components/common/TouchableBounce';

import useImagePicker, { ImageInfo } from 'hooks/image/useImagePicker';

import colors from 'styles/colors';

type ImagePicker = FC<{ loading?: boolean; onChangeImage?: (image: ImageInfo | null) => void }>;

const ImagePicker: ImagePicker = ({ loading, onChangeImage }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { image, takePhoto, pickImageFromLibrary } = useImagePicker();

  useEffect(() => onChangeImage?.(image), [image, onChangeImage]);

  const onPress = useCallback(
    () =>
      !loading &&
      showActionSheetWithOptions(
        {
          options: ['Take a Photo', 'Choose from Library', 'Cancel'],
          cancelButtonIndex: 2,
        },
        async buttonIndex => {
          if (buttonIndex === 0) await takePhoto();
          else if (buttonIndex === 1) await pickImageFromLibrary();
        },
      ),
    [loading, pickImageFromLibrary, showActionSheetWithOptions, takePhoto],
  );

  return (
    <TouchableBounce style={styles.imagePicker} onPress={onPress}>
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={[styles.image, { aspectRatio: image.aspectRatio }]}
        />
      )}
      <Text style={styles.imagePickerText}>Upload new image</Text>
    </TouchableBounce>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    marginBottom: 40,
    borderRadius: 10,
  },
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
    padding: 20,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.primary.primary500,
  },
  imagePickerText: {
    color: colors.neutral.neutral900,
    fontSize: 18,
  },
});

export default ImagePicker;
