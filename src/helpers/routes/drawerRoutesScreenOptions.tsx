import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { HomeStackParamList } from 'routes/types';

import TouchableBounce from 'components/common/TouchableBounce';

import colors from 'styles/colors';

import BurgerIcon from 'assets/images/icons/burger.svg';

type DrawerRoutesScreenOptions = (props: {
  route: RouteProp<HomeStackParamList, keyof HomeStackParamList>;
  navigation: any;
}) => NativeStackNavigationOptions;

const drawerRoutesScreenOptions: DrawerRoutesScreenOptions = ({ navigation }) => ({
  headerLeft: () => (
    // eslint-disable-next-line react-native/no-inline-styles
    <TouchableBounce onPress={navigation.toggleDrawer} style={{ marginRight: 10 }}>
      <BurgerIcon />
    </TouchableBounce>
  ),
  headerLargeTitle: true,
  headerLargeTitleShadowVisible: false,
  headerLargeStyle: { backgroundColor: colors.common.backgroundColor },
  headerStyle: {
    backgroundColor: colors.common.backgroundColor,
  },
});

export default drawerRoutesScreenOptions;
