import { gql } from '@apollo/client';

import ANIMAL_MAIN_FRAGMENT from 'graphql/fragments/animals/animalMain';

const ANIMALS_MAIN_SUBSCRIPTION = gql`
  subscription animalsMainSubscription {
    animals {
      mutationType
      animal {
        ...animalMainFragment
      }
    }
  }

  ${ANIMAL_MAIN_FRAGMENT}
`;

export default ANIMALS_MAIN_SUBSCRIPTION;
