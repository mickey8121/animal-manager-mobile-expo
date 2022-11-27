import * as FileSystem from 'expo-file-system';

type ImageFileSize = (fileUri: string) => Promise<number | undefined>;

const imageFileSize: ImageFileSize = async fileUri => {
  const imageSizeInBytes = (await FileSystem.getInfoAsync(fileUri)).size;

  if (!imageSizeInBytes) return imageSizeInBytes;

  // in MB
  return imageSizeInBytes / 1000000;
};

export default imageFileSize;
