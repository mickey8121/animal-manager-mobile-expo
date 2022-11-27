# animal-manager-mobile

## First run

You need to install the `npm` packages

```bash
yarn
```

and most likely manually run the `ios/android emulator`


## Running the app locally

#### Alpaca Guild

```
yarn android:alpaca-guild
```
```
yarn ios:alpaca-guild
```

#### Alpaca

```
yarn android:alpaca
```
```
yarn ios:alpaca
```

#### Llama

```
yarn android:llama
```
```
yarn ios:llama
```

#### Sheep

```
yarn android:sheep
```
```
yarn ios:sheep
```


## Building an application for production

The following commands will start building the corresponding application in the [milkandcartoons Expo account](https://expo.dev/accounts/milkandcartoons/projects)

#### Alpaca Guild

```
yarn android:alpaca-guild-production
```
```
yarn ios:alpaca-guild-production
```

#### Alpaca

```
yarn android:alpaca-production
```
```
yarn ios:alpaca-production
```

#### Llama

```
yarn android:llama-production
```
```
yarn ios:llama-production
```

#### Sheep

```
yarn android:sheep-production
```
```
yarn ios:sheep-production
```


## Set environment variables

All variables are stored in the `environments/.env.{animalName}.{environment}`

For example `.env.alpaca.dev`

```
APP_NAME=alpaca
ENV_NAME=alpaca.dev
APP_ID=com.animalmanager.alpaca
APP_DISPLAY_NAME=Alpaca Manager DEV

...
```

`npm` scripts for this ENV

```
"ios:alpaca": "DOTENV_CONFIG_PATH=./environments/.env.alpaca.dev yarn ios",

"ios:alpaca-production": "DOTENV_CONFIG_PATH=./environments/.env.alpaca.production expo build:ios"
```

```
"android:alpaca": "DOTENV_CONFIG_PATH=./environments/.env.alpaca.dev expo yarn android",

"android:alpaca-production": "DOTENV_CONFIG_PATH=./environments/.env.alpaca.production expo build:android"
```

`APP_ID`, `APP_NAME` and `APP_DISPLAY_NAME` is **required**
