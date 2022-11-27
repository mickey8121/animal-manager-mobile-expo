import React, { FC, memo } from 'react';

import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';

import colors from 'styles/colors';

const Loading: FC<ActivityIndicatorProps> = props => (
  <View
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ActivityIndicator color={colors.common.activityIndicator} size='large' {...props} />
  </View>
);

export default memo(Loading);
