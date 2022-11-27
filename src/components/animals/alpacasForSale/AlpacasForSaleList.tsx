import { FC, useCallback } from 'react';

import { FlatList, StyleSheet, View } from 'react-native';

import Loading from 'components/common/Loading';

import useAnimalsForSale from 'hooks/animals/useAnimalsForSale';

import AnimalSeparatorComponent from '../AnimalSeparatorComponent';
import AlpacaForSaleListItem from './AlpacaForSaleListItem';

const AlpacasForSaleList: FC = () => {
  const { animalsForSale, loading, loadMore } = useAnimalsForSale({
    take: 10,
  });

  const renderListFooterComponent = useCallback(
    () => <View style={styles.footerWrap}>{loading && <Loading size='small' />}</View>,
    [loading],
  );

  const renderItem = useCallback(({ item }) => <AlpacaForSaleListItem animalForSale={item} />, []);

  if (!animalsForSale) {
    if (loading) return <Loading />;

    return null;
  }

  return (
    <FlatList
      data={animalsForSale}
      renderItem={renderItem}
      ListFooterComponent={renderListFooterComponent}
      ItemSeparatorComponent={AnimalSeparatorComponent}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior='automatic'
      onEndReachedThreshold={0.3}
      onEndReached={loadMore}
    />
  );
};

export default AlpacasForSaleList;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    paddingBottom: 40,
  },
  footerWrap: {
    paddingTop: 30,
  },
});
