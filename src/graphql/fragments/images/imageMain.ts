import { gql } from '@apollo/client';

const IMAGE_MAIN_FRAGMENT = gql`
  fragment imageMainFragment on Image {
    id
    thumbUrl
    url
  }
`;

export default IMAGE_MAIN_FRAGMENT;
