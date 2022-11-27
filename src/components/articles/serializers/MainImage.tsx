import React from 'react';

import imageUrlBuilder from '@sanity/image-url';
import { Image } from 'react-native';

const builder = imageUrlBuilder({
  projectId: process.env.ARTICLES_PROJECT_ID!,
  dataset: process.env.ARTICLES_DATASET!,
});

const urlFor: (source: string) => string = source => builder.image(source)?.url();

const MainImage: React.FC<{ node: { asset: { _ref: string } } }> = ({ node: { asset } }) => (
  <Image
    // eslint-disable-next-line react-native/no-inline-styles
    style={{ borderRadius: 5, aspectRatio: 16 / 9 }}
    source={{ uri: urlFor(asset._ref) }}
  />
);

export default MainImage;
