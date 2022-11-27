import { FC } from 'react';

import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import colors from 'styles/colors';

const Input: FC<TextInputProps> = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={colors.common.placeholderTextColor}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: colors.common.inputBorderColor,
    fontSize: 16,
    color: colors.common.inputColor,
  },
});

export default Input;
