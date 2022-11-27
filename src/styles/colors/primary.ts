const currentAnimalType = process.env.APP_NAME || 'alpaca';

type AnimalTypes = 'alpaca' | 'llama' | 'sheep';
type PrimaryColors = {
  [key in AnimalTypes]: {
    primary200: string;
    primary300: string;
    primary400: string;
    primary500: string;
    primary600: string;
    primary700: string;
  };
};

const primaryColors: PrimaryColors = {
  alpaca: {
    primary200: '#FFFBF4',
    primary300: '#FFEDCC',
    primary400: '#FFDEA3',
    primary500: '#FFD07A',
    primary600: '#FFC04C',
    primary700: '#FFB01E',
  },
  llama: {
    primary200: '#F6FDF4',
    primary300: '#DCF5D2',
    primary500: '#A7E78F',
    primary400: '#C1EEB1',
    primary600: '#89DF69',
    primary700: '#6CD743',
  },
  sheep: {
    primary200: '#FEF8FF',
    primary300: '#F6EEFA',
    primary400: '#E4CFF1',
    primary500: '#D3AFE8',
    primary600: '#BF8BDE',
    primary700: '#AC68D4',
  },
};

export default primaryColors[currentAnimalType as AnimalTypes];
