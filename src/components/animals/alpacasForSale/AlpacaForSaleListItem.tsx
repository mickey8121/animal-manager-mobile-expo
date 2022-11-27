import { FC, useCallback, useMemo } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { UseNavigation } from 'routes/types';

import Avatar from 'components/common/Avatar';
import TouchableBounce from 'components/common/TouchableBounce';

import { COUNTRIES } from 'helpers/constants';

import { AnimalForSaleMainFragmentFragment } from 'generated/graphql';

const AlpacaForSaleListItem: FC<{ animalForSale: AnimalForSaleMainFragmentFragment }> = ({
  animalForSale: {
    name,
    images,
    owner: { country },
  },
  animalForSale,
}) => {
  const { navigate } = useNavigation<UseNavigation<'AlpacasForSaleRouter'>>();

  const onPress = useCallback(
    () => navigate('AlpacaForSale', { alpacaForSale: animalForSale }),
    [animalForSale, navigate],
  );

  const countryName = useMemo(
    () => country && (COUNTRIES.find(({ value }) => value === country)?.label || country),
    [country],
  );

  return (
    <TouchableBounce style={styles.wrap} onPress={onPress}>
      <Avatar name={name} url={images[images.length - 1]?.url} />

      <View style={styles.textWrap}>
        <Text style={styles.textName} numberOfLines={1}>
          {name}
        </Text>

        {!!countryName && (
          <Text style={styles.textCountry} numberOfLines={1}>
            {countryName}
          </Text>
        )}
      </View>
    </TouchableBounce>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingLeft: 5,
    borderRadius: 12,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },
  textWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  textName: {
    fontSize: 20,
    lineHeight: 24,
  },
  textCountry: {
    marginTop: 6,
  },
});

export default AlpacaForSaleListItem;
