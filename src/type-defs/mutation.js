import { gql } from 'apollo-server';

const mutation = gql`
  type Mutation {
    update(key: String!, position: [Float!]!, content: String!): Marker!
    remove(key: String!): Marker
  }
`;

export default mutation;