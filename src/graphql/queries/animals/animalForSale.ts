import { gql } from '@apollo/client';

import ANIMAL_FOR_SALE_MAIN_FRAGMENT from 'graphql/fragments/animals/animalForSaleMain';

const ANIMAL_FOR_SALE_QUERY = gql`
  query AnimalForSale($where: WhereUniqueAnimalForSaleInput!) {
    animalForSale(where: $where) {
      ...animalForSaleMainFragment

      birthday
      coloration
      details {
        animalDetails
      }
      owner {
        breederProfile {
          phone
          email
          bio
        }
        country
        firstName
        lastName
      }
      profile {
        ... on AlpacaForSaleProfile {
          phenotype
        }
      }
      sex
    }
  }

  ${ANIMAL_FOR_SALE_MAIN_FRAGMENT}
`;

export default ANIMAL_FOR_SALE_QUERY;
