import { FC, useCallback } from 'react';

import { FlatList, StyleSheet, View } from 'react-native';

import Loading from 'components/common/Loading';

import AnimalListItem from 'components/animals/AnimalListItem';
import AnimalsListHeader from 'components/animals/AnimalsListHeader';
import AnimalSeparatorComponent from 'components/animals/AnimalSeparatorComponent';

import useAnimals from 'hooks/animals/useAnimals';
import useHerdFromProvider from 'hooks/herds/useHerdFromProvider';

const AnimalsList: FC = () => {
  const herd = useHerdFromProvider();
  const { animals, loading, totalCount, loadMore } = useAnimals({ herdId: herd?.id, take: 10 });

  const renderListHeaderComponent = useCallback(
    () => <AnimalsListHeader count={totalCount} />,
    [totalCount],
  );

  const renderListFooterComponent = useCallback(
    () => <View style={styles.footerWrap}>{loading && <Loading size='small' />}</View>,
    [loading],
  );

  const renderItem = useCallback(({ item }) => <AnimalListItem animal={item} />, []);

  if (!animals) {
    if (loading) return <Loading />;

    return null;
  }

  return (
    <FlatList
      data={animals}
      renderItem={renderItem}
      ListHeaderComponent={renderListHeaderComponent}
      ListFooterComponent={renderListFooterComponent}
      ItemSeparatorComponent={AnimalSeparatorComponent}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior='automatic'
      onEndReachedThreshold={0.3}
      onEndReached={loadMore}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    paddingBottom: 40,
  },
  footerWrap: {
    paddingTop: 30,
  },
});

export default AnimalsList;
