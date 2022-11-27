import { gql } from '@apollo/client';

const ALL_AG_POSTS_QUERY = gql`
  query allAgPosts @api(name: "sanity") {
    allAgPosts {
      _id
      title
      bodyRaw
      publishedAt

      slug {
        current
      }

      mainImage {
        asset {
          url
        }
      }
    }
  }
`;

export default ALL_AG_POSTS_QUERY;
