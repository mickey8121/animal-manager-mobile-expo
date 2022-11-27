import 'dotenv/config';
import snakeCase from 'lodash.snakecase';

const appIcon = `./src/assets/images/app-icons/${process.env.ENV_NAME}.png`;
const splashIcon = process.env.ENV_NAME?.includes('guild') ? `./src/assets/images/splash/${process.env.ENV_NAME}.png` : undefined;

export default {
  name: process.env.APP_DISPLAY_NAME,
  slug: snakeCase(process.env.APP_DISPLAY_NAME),
  version: '1.0.0',
  owner: 'milkandcartoons',
  entryPoint: './src/App.tsx',
  icon: appIcon,
  scheme: process.env.APP_NAME,
  plugins: [
    [
      'expo-image-picker',
      {
        photosPermission: 'The app accesses your photos so you can upload images of animals and herds.',
      },
    ],
  ],
  splash: {
    image: splashIcon,
    resizeMode: 'contain',
    backgroundColor: '#FFDEA3',
  },
  ios: {
    bundleIdentifier: process.env.APP_ID,
    buildNumber: '1.0.0',
    supportsTablet: true,
  },
  android: {
    package: process.env.APP_ID,
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: appIcon,
      backgroundColor: '#fff',
    },
  },
};
