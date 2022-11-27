import React, { FC, memo } from 'react';

import { View } from 'react-native';

// eslint-disable-next-line react-native/no-inline-styles
const AnimalSeparatorComponent: FC = () => <View style={{ height: 15 }} />;

export default memo(AnimalSeparatorComponent);
