import { gql } from 'apollo-server';

const subscription = gql`
  type Subscription {
    updated: Marker!
    removed: Marker!
  }
`;

export default subscription;