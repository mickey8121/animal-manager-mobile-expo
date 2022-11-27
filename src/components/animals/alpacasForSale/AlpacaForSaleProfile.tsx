import { FC, useCallback, useMemo } from 'react';

import * as Linking from 'expo-linking';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Avatar from 'components/common/Avatar';
import Loading from 'components/common/Loading';

import useAnimalAge from 'hooks/animals/useAnimalAge';

import { COLORS, COUNTRIES, SEX } from 'helpers/constants';
import capitalize from 'lodash/capitalize';
import formatPhone from 'helpers/formatPhone';

import {
  AnimalForSaleMainFragmentFragment,
  AnimalForSaleQuery,
  useAnimalForSaleQuery,
} from 'generated/graphql';

import colors from 'styles/colors';

import camelCase from 'lodash/camelCase';

const AlpacaForSaleProfile: FC<{ alpacaForSale: AnimalForSaleMainFragmentFragment }> = ({
  alpacaForSale: passedAlpacaForSale,
}) => {
  const { data: { animalForSale } = {}, loading } = useAnimalForSaleQuery({
    variables: { where: { id: passedAlpacaForSale.id } },
  });

  const alpacaForSale = useMemo(
    () => (animalForSale || passedAlpacaForSale) as AnimalForSaleQuery['animalForSale'],
    [animalForSale, passedAlpacaForSale],
  );

  const animalAge = useAnimalAge(alpacaForSale?.birthday);

  const animalDetails = useMemo(() => {
    if (!alpacaForSale?.details?.animalDetails) return null;

    try {
      return JSON.parse(alpacaForSale.details.animalDetails)?.blocks?.reduce(
        (acc: Array<any>, block: any) => {
          if (block?.text) {
            acc.push(
              <Text key={block.key} style={styles.descriptionBlockValue}>
                {block.text}
              </Text>,
            );
          }

          return acc;
        },
        [],
      );
    } catch (error) {
      return null;
    }
  }, [alpacaForSale]);

  const breederBio = useMemo(() => {
    if (!alpacaForSale?.owner?.breederProfile?.bio) return null;

    try {
      return JSON.parse(alpacaForSale.owner.breederProfile.bio)?.blocks?.reduce(
        (acc: Array<any>, block: any) => {
          if (block?.text) {
            acc.push(
              <Text key={block.key} style={styles.descriptionBlockValue}>
                {block.text}
              </Text>,
            );
          }

          return acc;
        },
        [],
      );
    } catch (error) {
      return null;
    }
  }, [alpacaForSale]);

  const countryName = useMemo(
    () =>
      alpacaForSale?.owner.country &&
      (COUNTRIES.find(({ value }) => value === alpacaForSale.owner.country)?.label ||
        alpacaForSale.owner.country),
    [alpacaForSale],
  );

  const showTopDescriptionBlock = useMemo(
    () =>
      !!(
        alpacaForSale &&
        (alpacaForSale.profile?.phenotype || alpacaForSale.sex || alpacaForSale.coloration?.length)
      ),
    [alpacaForSale],
  );

  const animalColors = useMemo(
    () =>
      animalForSale?.coloration
        ?.reduce((acc: Array<string>, color) => {
          if (COLORS[color]) acc.push(COLORS[color]);

          return acc;
        }, [])
        .join(', '),
    [animalForSale?.coloration],
  );

  const breederFullName = useMemo(() => {
    const names = [];

    if (alpacaForSale?.owner?.firstName) names.push(alpacaForSale.owner.firstName);
    if (alpacaForSale?.owner?.lastName) names.push(alpacaForSale.owner.lastName);

    return names.join(' ');
  }, [alpacaForSale]);

  const formatedPhone = useMemo(
    () =>
      !!alpacaForSale?.owner?.breederProfile?.phone &&
      formatPhone(alpacaForSale.owner.breederProfile.phone, true),
    [alpacaForSale],
  );

  const onPressPhone = useCallback(
    async () => formatedPhone && (await Linking.openURL(`tel:${formatedPhone}`)),
    [formatedPhone],
  );

  if (!alpacaForSale) return null;

  const {
    name,
    images,
    sex,
    profile,
    owner: { breederProfile },
  } = alpacaForSale;

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Avatar name={name} url={images[images.length - 1]?.url} />

        <Text style={styles.nameText}>{name}</Text>
      </View>

      <View>
        {showTopDescriptionBlock && (
          <View style={styles.animalDescriptionRow}>
            {!!profile?.phenotype && (
              <View style={[styles.descriptionBlock, styles.descriptionBlockMarginRight]}>
                <Text style={styles.descriptionBlockTitle}>Type</Text>
                <Text style={styles.descriptionBlockValue}>{capitalize(profile.phenotype)}</Text>
              </View>
            )}

            {!!sex && (
              <View style={[styles.descriptionBlock, styles.descriptionBlockMarginRight]}>
                <Text style={styles.descriptionBlockTitle}>Sex</Text>
                <Text style={styles.descriptionBlockValue}>{SEX[camelCase(sex ?? 'unknown')]}</Text>
              </View>
            )}

            {!!animalColors?.length && (
              <View style={[styles.descriptionBlock, styles.descriptionBlockMaxWidth]}>
                <Text style={styles.descriptionBlockTitle}>Color</Text>
                <Text style={styles.descriptionBlockValue}>{animalColors}</Text>
              </View>
            )}
          </View>
        )}

        {!!animalAge && (
          <View style={styles.descriptionBlock}>
            <Text style={styles.descriptionBlockTitle}>Age</Text>
            <Text style={styles.descriptionBlockValue}>{animalAge}</Text>
          </View>
        )}

        {!!animalDetails?.length && (
          <View style={styles.descriptionBlock}>
            <Text style={styles.descriptionBlockTitle}>Alpaca Details</Text>
            {animalDetails}
          </View>
        )}
      </View>

      <View style={styles.breederInformation}>
        <Text style={styles.breederInformationHeader}>Breeder Information</Text>

        <View style={styles.animalDescriptionRow}>
          {!!breederFullName && (
            <View
              style={[
                styles.descriptionBlock,
                styles.descriptionBlockMarginRight,
                styles.descriptionBlockMaxWidth,
              ]}
            >
              <Text style={styles.descriptionBlockTitle}>Name</Text>
              <Text style={styles.descriptionBlockValue}>{breederFullName}</Text>
            </View>
          )}

          <View style={styles.descriptionBlock}>
            <Text style={styles.descriptionBlockTitle}>Country</Text>
            <Text style={styles.descriptionBlockValue}>{countryName}</Text>
          </View>
        </View>

        {!!formatedPhone && (
          <View style={styles.descriptionBlock}>
            <Text style={styles.descriptionBlockTitle}>Contact phone</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={onPressPhone}>
              <Text style={styles.descriptionBlockValue}>{formatedPhone}</Text>
            </TouchableOpacity>
          </View>
        )}

        {!!breederProfile?.email && (
          <View style={styles.descriptionBlock}>
            <Text style={styles.descriptionBlockTitle}>Contact email</Text>
            <Text style={styles.descriptionBlockValue}>{breederProfile.email}</Text>
          </View>
        )}

        {!!breederBio?.length && (
          <View style={styles.descriptionBlock}>
            <Text style={styles.descriptionBlockTitle}>Breeder Bio</Text>
            <Text style={styles.descriptionBlockValue}>{breederBio}</Text>
          </View>
        )}
      </View>

      {loading && <Loading style={styles.loading} size='small' />}
    </ScrollView>
  );
};

export default AlpacaForSaleProfile;

const styles = StyleSheet.create({
  loading: {
    paddingVertical: 20,
  },
  contentContainer: {
    padding: 10,
    paddingBottom: 40,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '600',
  },
  animalDescriptionRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  descriptionBlock: {
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  descriptionBlockMaxWidth: {
    maxWidth: '50%',
  },
  descriptionBlockMarginRight: {
    marginRight: 15,
  },
  descriptionBlockTitle: {
    marginBottom: 4,
    fontSize: 14,
    color: colors.neutral.neutral500,
  },
  descriptionBlockValue: {
    fontSize: 16,
  },
  breederInformation: {
    marginTop: 40,
  },
  breederInformationHeader: {
    fontSize: 20,
    fontWeight: '600',
  },
});
