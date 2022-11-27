import { gql } from '@apollo/client';

import USER_FRAGMENT from 'graphql/fragments/userFragment';

const ME_QUERY = gql`
  query me {
    me {
      ...userFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default ME_QUERY;
