import { gql } from '@apollo/client';

import HERD_MAIN_FRAGMENT from 'graphql/fragments/herds/herdMain';

const HERDS_QUERY = gql`
  query herds {
    herds {
      ...herdMainFragment
    }
  }

  ${HERD_MAIN_FRAGMENT}
`;

export default HERDS_QUERY;
