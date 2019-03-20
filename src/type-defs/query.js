import { gql } from 'apollo-server';

const query = gql`
  type Query {
    markers: [Marker!]!
  }
`;

export default query;