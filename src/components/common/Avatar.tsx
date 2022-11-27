import { FC, memo } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import colors from 'styles/colors';

const Avatar: FC<{ name?: string; url?: string }> = ({ name, url }) => {
  // the follow construction doesn't work with Cyrillic
  // const nameAbbr = name
  //   ?.toLocaleUpperCase()
  //   .match(/\b(\w)/g)
  //   ?.slice(0, 3);

  const nameAbbr = name
    ?.toLocaleUpperCase()
    .split(/\s/)
    .map(([character]) => character);

  return (
    <View style={styles.wrap}>
      {url ? (
        <Image source={{ uri: url }} style={styles.image} resizeMode='cover' />
      ) : (
        !!name && <Text style={styles.nameView}>{nameAbbr}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.primary.primary500,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  nameView: {
    fontSize: 24,
  },
});

export default memo(Avatar);
