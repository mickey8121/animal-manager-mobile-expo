import { gql } from '@apollo/client';

import ANIMAL_FOR_SALE_MAIN_FRAGMENT from 'graphql/fragments/animals/animalForSaleMain';

const ANIMALS_FOR_SALE_QUERY = gql`
  query AnimalsForSale(
    $skip: Int
    $take: Int
    $where: WhereAnimalForSaleInput
    $orderBy: OrderByAnimalForSaleInput
  ) {
    animalsForSale(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
      nodes {
        ...animalForSaleMainFragment
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }

  ${ANIMAL_FOR_SALE_MAIN_FRAGMENT}
`;

export default ANIMALS_FOR_SALE_QUERY;
