import { DrawerScreenProps } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { AnimalForSaleMainFragmentFragment } from 'generated/graphql';
import { Sanity_AgPost } from 'generated/sanity_graphql';

// ParamLists
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AppDrawerParamList = {
  HomeRouter: undefined;
  LibraryRouter: undefined;
  AlpacasForSaleRouter: undefined;
};

export type HomeStackParamList = {
  Herds: undefined;
  Herd: { herdId: string; herdName: string };
  EditHerd: { herdId: string };
  EditAnimal: { animalId: string };
};

export type LibraryStackParamList = {
  Library: undefined;
  Article: { post: Pick<Sanity_AgPost, 'title' | 'bodyRaw' | 'mainImage'>; name?: string };
};

export type AlpacasForSaleStackParamList = {
  AlpacasForSale: undefined;
  AlpacaForSale: { alpacaForSale: AnimalForSaleMainFragmentFragment };
};
// --------------------

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type AppDrawerScreenProps<T extends keyof AppDrawerParamList> = DrawerScreenProps<
  AppDrawerParamList,
  T
>;

export type HomeScreenProps<T extends keyof HomeStackParamList> = NativeStackScreenProps<
  HomeStackParamList,
  T
>;

export type LibraryScreenProps<T extends keyof LibraryStackParamList> = NativeStackScreenProps<
  LibraryStackParamList,
  T
>;

export type AlpacasForSaleScreenProps<T extends keyof AlpacasForSaleStackParamList> =
  NativeStackScreenProps<AlpacasForSaleStackParamList, T>;

// --------------------

type AllScreens = AuthStackParamList &
  AppDrawerParamList &
  HomeStackParamList &
  LibraryStackParamList &
  AlpacasForSaleStackParamList;

type AllRouters = {
  AuthRouter: AuthStackParamList;
  AppRouter: AppDrawerParamList;
  HomeRouter: HomeStackParamList;
  LibraryRouter: LibraryStackParamList;
  AlpacasForSaleRouter: AlpacasForSaleStackParamList;
};

export type UseNavigation<T extends keyof AllRouters> = NativeStackNavigationProp<AllRouters[T]>;

export type UseRoute<T extends keyof AllScreens> = RouteProp<AllScreens, T>;
