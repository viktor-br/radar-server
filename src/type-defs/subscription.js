import { gql } from 'apollo-server';

const subscription = gql`
  type Subscription {
    updated: Marker
  }
`;

export default subscription;