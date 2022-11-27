import React, { FC, memo } from 'react';

import { View } from 'react-native';

// eslint-disable-next-line react-native/no-inline-styles
const HerdSeparatorComponent: FC = () => <View style={{ height: 30 }} />;

export default memo(HerdSeparatorComponent);
