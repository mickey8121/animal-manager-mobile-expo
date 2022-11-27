import { FC } from 'react';

import { ActivityIndicator, StyleProp, ViewStyle, StyleSheet, Text, TextStyle } from 'react-native';

import TouchableBounce from 'components/common/TouchableBounce';

import colors from 'styles/colors';

interface Props {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
}

const Button: FC<Props> = ({
  label,
  loading,
  disabled,
  block,
  style,
  styleContainer,
  textStyle,
  onPress,
  children,
}) => {
  return (
    <TouchableBounce
      disabled={disabled}
      styleContainer={styleContainer}
      style={[styles.button, style, block && styles.buttonBlock, disabled && styles.disabled]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={colors.common.activityIndicator} size={30} />
      ) : (
        children || (
          <Text style={[styles.text, textStyle]} numberOfLines={1}>
            {label}
          </Text>
        )
      )}
    </TouchableBounce>
  );
};

const styles = StyleSheet.create({
  buttonBlock: {
    height: 50,
    backgroundColor: colors.primary.primary500,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 14,
    color: colors.common.textColor,
    textAlign: 'center',
  },
});

export default Button;
