import React, { FC } from 'react';

import { FlatList, StyleSheet } from 'react-native';

import Loading from 'components/common/Loading';

import ArticleListItem from 'components/articles/ArticleListItem';

import { useAllAgPostsQuery } from 'generated/sanity_graphql';

const ArticlesList: FC = () => {
  const { data: { allAgPosts } = {}, loading } = useAllAgPostsQuery();

  if (!allAgPosts) return loading ? <Loading /> : null;

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      data={allAgPosts}
      keyExtractor={item => item._id!}
      renderItem={({ item }) => <ArticleListItem key={item._id} post={item} />}
    />
  );
};

export default ArticlesList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 20,
    paddingRight: 20,
  },
});
