import { Fragment } from 'react';

import { StyleSheet, Text } from 'react-native';

const TextBlock: React.FC<{ node: { style: string; children: [any] } }> = ({
  node: { style, children },
}) => (
  <Fragment>
    {children.map(({ _key, _type, text }) =>
      _type === 'span' ? (
        <Text
          key={_key}
          style={
            style === 'h1' ? styles.title : style === 'h2' ? styles.subTitle : styles.normalText
          }
        >
          {text}
        </Text>
      ) : null,
    )}
  </Fragment>
);

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    fontSize: 28,
  },
  subTitle: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 18,
  },
  normalText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default TextBlock;
