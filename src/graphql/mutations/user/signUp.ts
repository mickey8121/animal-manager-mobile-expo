import { gql } from '@apollo/client';

import USER_FRAGMENT from 'graphql/fragments/userFragment';

const SIGN_UP_MUTATION = gql`
  ${USER_FRAGMENT}

  mutation signUp($data: SignUpInput!) {
    signUp(data: $data) {
      ... on AuthPayload {
        accessToken
        refreshToken
        user {
          ...userFragment
        }
      }
    }
  }
`;

export default SIGN_UP_MUTATION;
