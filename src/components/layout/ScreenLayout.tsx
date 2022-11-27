import { FC } from 'react';

import { ViewProps, SafeAreaView, StyleSheet } from 'react-native';

import colors from 'styles/colors';

const ScreenLayout: FC<ViewProps> = ({ children }) => {
  return <SafeAreaView style={styles.layoutView}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  layoutView: {
    flex: 1,
    backgroundColor: colors.common.backgroundColor,
  },
});

export default ScreenLayout;
