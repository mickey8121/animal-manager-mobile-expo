import { gql } from '@apollo/client';

const ANIMAL_FOR_SALE_MAIN_FRAGMENT = gql`
  fragment animalForSaleMainFragment on AnimalForSale {
    id
    name
    images {
      id
      thumbUrl
      url
    }
    owner {
      country
    }
  }
`;

export default ANIMAL_FOR_SALE_MAIN_FRAGMENT;
