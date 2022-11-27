import { FC, useCallback, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { UseNavigation } from 'routes/types';

import TouchableBounce from 'components/common/TouchableBounce';

import formatDate from 'helpers/formatDate';

import { Sanity_AgPost } from 'generated/sanity_graphql';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient as any);

const ArticleListItem: FC<{
  post: Sanity_AgPost;
}> = ({ post }) => {
  const { navigate } = useNavigation<UseNavigation<'LibraryRouter'>>();

  const onPress = useCallback(() => navigate('Article', { post }), [navigate, post]);

  const { title, publishedAt, mainImage } = post;

  const publishedDate = useMemo(() => formatDate(publishedAt), [publishedAt]);

  const blockImage = useMemo(
    () => <Image style={styles.image} source={{ uri: mainImage?.asset?.url || '' }} />,
    [mainImage],
  );

  return (
    <TouchableBounce styleContainer={styles.container} onPress={onPress}>
      {blockImage}

      <AnimatedLinearGradient
        style={styles.description}
        colors={['rgba(27,27,27,0)', 'rgba(27,27,27,.5)']}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.publishDate}>{publishedDate}</Text>
      </AnimatedLinearGradient>
    </TouchableBounce>
  );
};

export default ArticleListItem;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    width: 270,
    height: 195,
    marginLeft: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#aaa',
  },
  description: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    padding: 12,
    borderRadius: 20,
  },
  title: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#fff',
  },
  publishDate: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    color: '#fff',
  },
});
