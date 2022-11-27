import { FC, memo } from 'react';

import { Text, StyleSheet } from 'react-native';

import TouchableBounce from 'components/common/TouchableBounce';
import Avatar from 'components/common/Avatar';

import { AnimalMainFragmentFragment } from 'generated/graphql';

const AnimalListItem: FC<{ animal: AnimalMainFragmentFragment }> = ({
  animal: { name, images },
}) => (
  <TouchableBounce style={styles.wrap}>
    <Avatar name={name} url={images[images.length - 1]?.url} />

    <Text style={styles.text} numberOfLines={1}>
      {name}
    </Text>
  </TouchableBounce>
);

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
  text: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 20,
    fontSize: 20,
  },
});

export default memo(AnimalListItem);
