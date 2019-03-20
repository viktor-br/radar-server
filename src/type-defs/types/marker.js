import { gql } from 'apollo-server';

const marker = gql`
  type Marker {
    key: ID!
    position: [Float]
    content: String!
  }
`;

export default marker;
