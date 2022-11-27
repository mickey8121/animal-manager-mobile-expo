import { gql } from '@apollo/client';

import IMAGE_MAIN_FRAGMENT from 'graphql/fragments/images/imageMain';

const ANIMAL_MAIN_FRAGMENT = gql`
  fragment animalMainFragment on Animal {
    id
    animalId
    name
    sex
    birthday
    deathDate
    coloration
    status

    images {
      ...imageMainFragment
    }
  }

  ${IMAGE_MAIN_FRAGMENT}
`;

export default ANIMAL_MAIN_FRAGMENT;
