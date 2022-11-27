import { FC } from 'react';

import { Text, StyleSheet } from 'react-native';

const ListItem: FC<{ index: number; node: { children: [any] } }> = ({
  index,
  node: {
    children: [item],
  },
}) => (
  <Text key={item.key} style={styles.normalText}>
    <Text>{index + 1}.</Text> {item.text}
  </Text>
);

const styles = StyleSheet.create({
  normalText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ListItem;
