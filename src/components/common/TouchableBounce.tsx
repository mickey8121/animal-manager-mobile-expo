import { useState, useCallback } from 'react';

import {
  Animated,
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleProp,
  Insets,
  Vibration,
} from 'react-native';

import useDeviceInfo from 'hooks/useDeviceInfo';

type PressHandler = ((args: any) => void) | undefined;
type AnimatedGesture = ((event: GestureResponderEvent) => void) | undefined;
type AnimatedGestureReturnBool = ((event: GestureResponderEvent) => boolean) | undefined;

interface Props {
  onPressIn?: PressHandler;
  onPressOut?: PressHandler;
  onPressWithCompletion?: PressHandler;
  onPressAnimationComplete?: PressHandler;
  onPress?: PressHandler;
  onLongPress?: PressHandler;
  delayLongPress?: number;
  // pressRetentionOffset?: { top?: number; left?: number; right?: number; bottom?: number };
  hitSlop?: Insets;
  disabled?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
  accessibilityLabel?: string;
  accessibilityComponentType?: string;
  accessibilityTraits?: string;
  testID?: string;
  touchableHandleStartShouldSetResponder?: AnimatedGestureReturnBool;
  touchableHandleResponderTerminationRequest?: AnimatedGestureReturnBool;
  touchableHandleResponderGrant?: AnimatedGesture;
  touchableHandleResponderMove?: AnimatedGesture;
  touchableHandleResponderRelease?: AnimatedGesture;
  touchableHandleResponderTerminate?: AnimatedGesture;
  children?: React.ReactNode;
}

// const PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

const TouchableBounce: React.FC<Props> = ({
  onPressIn,
  onPressOut,
  onPressWithCompletion,
  onPressAnimationComplete,
  onPress,
  onLongPress,
  delayLongPress = 370,
  hitSlop,
  disabled,
  styleContainer,
  style,
  onLayout,
  accessibilityLabel,
  testID,
  touchableHandleStartShouldSetResponder,
  touchableHandleResponderTerminationRequest,
  touchableHandleResponderGrant,
  touchableHandleResponderMove,
  touchableHandleResponderRelease,
  touchableHandleResponderTerminate,
  children,
}) => {
  const { isAndroid } = useDeviceInfo();
  const [scale] = useState(new Animated.Value(1));

  const bounceTo = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (value, velocity, bounciness, callback = (): void => {}) => {
      Animated.spring(scale, {
        toValue: value,
        velocity,
        bounciness,
        useNativeDriver: true,
      }).start(callback);
    },
    [scale],
  );

  const touchableHandleActivePressIn = useCallback(
    e => {
      bounceTo(0.9, 0.1, 0);
      onPressIn?.(e);
    },
    [bounceTo, onPressIn],
  );

  const touchableHandleActivePressOut = useCallback(
    e => {
      bounceTo(1, 0.4, 1);
      onPressOut?.(e);
    },
    [bounceTo, onPressOut],
  );

  const touchableHandlePress = useCallback(
    e => {
      if (onPressWithCompletion) {
        onPressWithCompletion(() => {
          scale.setValue(0.93);
          bounceTo(1, 10, 10, onPressAnimationComplete);
        });
      } else {
        bounceTo(1, 10, 10, onPressAnimationComplete);
        onPress?.(e);
      }
    },
    [scale, bounceTo, onPress, onPressAnimationComplete, onPressWithCompletion],
  );

  const touchableHandleLongPress = useCallback(
    e => {
      if (onLongPress) {
        if (isAndroid) Vibration.vibrate(50);
        onLongPress(e);
      }
    },
    [onLongPress, isAndroid],
  );

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={touchableHandleActivePressIn}
      onPressOut={touchableHandleActivePressOut}
      onPress={touchableHandlePress}
      onLongPress={touchableHandleLongPress}
      delayLongPress={delayLongPress}
      disabled={disabled}
      style={styleContainer}
      onLayout={onLayout}
    >
      <Animated.View
        style={[{ transform: [{ scale }] }, style]}
        accessible
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        hitSlop={hitSlop}
        onStartShouldSetResponder={touchableHandleStartShouldSetResponder}
        onResponderTerminationRequest={touchableHandleResponderTerminationRequest}
        onResponderGrant={touchableHandleResponderGrant}
        onResponderMove={touchableHandleResponderMove}
        onResponderRelease={touchableHandleResponderRelease}
        onResponderTerminate={touchableHandleResponderTerminate}
      >
        {children as any}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TouchableBounce;
