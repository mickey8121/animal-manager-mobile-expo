import { useMemo } from 'react';

import { useWindowDimensions, Platform } from 'react-native';
import {
  isIphoneX as getIsIphoneX,
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';

const isAndroid = Platform.OS === 'android';
const isIphoneX = getIsIphoneX();

const useDeviceInfo = (): any => {
  const windowDimensions = useWindowDimensions();
  const statusBarHeight = useMemo(() => getStatusBarHeight(), []);
  const keyboardVerticalOffset = useMemo(() => (isAndroid ? 40 : isIphoneX ? 10 : 0), []);

  return {
    ...windowDimensions,
    isAndroid,
    isIphoneX,
    ifIphoneX,
    getBottomSpace,
    statusBarHeight,
    keyboardVerticalOffset,
  };
};

export default useDeviceInfo;
