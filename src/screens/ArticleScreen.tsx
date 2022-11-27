import React, { FC } from 'react';

import { Image, ScrollView, StyleSheet } from 'react-native';
import BlockContent from '@sanity/block-content-to-react';

import { LibraryScreenProps } from 'routes/types';

import ScreenLayout from 'components/layout/ScreenLayout';

import ListItem from 'components/articles/serializers/ListItem';
import MainImage from 'components/articles/serializers/MainImage';
import TextBlock from 'components/articles/serializers/TextBlock';

const serializers = {
  types: {
    mainImage: MainImage,
    block: TextBlock,
  },
  listItem: ListItem,
};

const ArticleScreen: FC<LibraryScreenProps<'Article'>> = ({
  route: {
    params: {
      post: { bodyRaw, mainImage },
    },
  },
}) => (
  <ScreenLayout>
    <ScrollView contentContainerStyle={styles.container}>
      {!!mainImage?.asset?.url && (
        <Image style={styles.image} source={{ uri: mainImage.asset.url }} />
      )}

      {!!bodyRaw && <BlockContent blocks={bodyRaw} serializers={serializers} />}
    </ScrollView>
  </ScreenLayout>
);

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    borderRadius: 5,
    aspectRatio: 16 / 9,
  },
});
