import { gql } from 'apollo-server';

const subscription = gql`
  type Mutation {
    update(key: String, position: [Float]): Marker
  }
`;

export default subscription;