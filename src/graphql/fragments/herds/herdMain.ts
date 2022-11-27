import { gql } from '@apollo/client';

import IMAGE_MAIN_FRAGMENT from 'graphql/fragments/images/imageMain';

const HERD_MAIN_FRAGMENT = gql`
  fragment herdMainFragment on Herd {
    id
    name
    createdAt

    images {
      ...imageMainFragment
    }
  }

  ${IMAGE_MAIN_FRAGMENT}
`;

export default HERD_MAIN_FRAGMENT;
