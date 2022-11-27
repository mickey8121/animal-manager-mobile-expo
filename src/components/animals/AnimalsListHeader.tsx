import { FC } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import EditButton from 'components/common/btns/EditButton';

import colors from 'styles/colors';

import upperFirst from 'lodash/upperFirst';

const AnimalsListHeader: FC<{ count?: number }> = ({ count = 0 }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.descriptionWrap}>
        <Text style={styles.animalType}>{upperFirst(process.env.APP_NAME)}</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{count}</Text>
        </View>
      </View>

      <View style={styles.controlsWrap}>
        <EditButton type='herd' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  controlsWrap: {},
  descriptionWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  animalType: {
    fontWeight: '600',
    fontSize: 18,
  },
  countBadge: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.primary.primary500,
  },
  countBadgeText: {
    fontWeight: '600',
    fontSize: 14,
  },
});

export default AnimalsListHeader;
