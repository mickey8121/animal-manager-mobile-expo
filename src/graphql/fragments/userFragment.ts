import { gql } from '@apollo/client';

const USER_FRAGMENT = gql`
  fragment userFragment on User {
    id
    email
  }
`;

export default USER_FRAGMENT;
