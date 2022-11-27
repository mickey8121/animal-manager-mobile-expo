import { FC, useCallback } from 'react';

import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import Loading from 'components/common/Loading';
import Button from 'components/common/Button';

import HerdListItem from 'components/herds/HerdListItem';
import HerdSeparatorComponent from 'components/herds/HerdSeparatorComponent';

import useLogout from 'hooks/useLogout';
import useHerds from 'hooks/herds/useHerds';

const HerdsList: FC = () => {
  const logout = useLogout();
  const { herds, loading, refreshing, refetch } = useHerds();

  const renderItem = useCallback(({ item }) => <HerdListItem herd={item} />, []);

  if (!herds) {
    if (loading) return <Loading />;

    return null;
  }

  return (
    <View style={styles.wrap}>
      <FlatList
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={styles.flatListContentContainer}
        ItemSeparatorComponent={HerdSeparatorComponent}
        data={herds}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
        renderItem={renderItem}
        ListFooterComponentStyle={styles.footer}
        ListFooterComponent={
          <Button label='Logout' onPress={logout} textStyle={styles.logoutBtnText} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  flatListContentContainer: {
    padding: 10,
  },
  footer: {
    alignSelf: 'center',
    marginVertical: 40,
  },
  logoutBtnText: {
    fontSize: 20,
  },
});

export default HerdsList;
