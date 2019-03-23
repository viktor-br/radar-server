import { gql } from 'apollo-server';

export const marker = gql`
  type Marker {
    key: ID!
    position: [Float]
    content: String!
  }
`;
