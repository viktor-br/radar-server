import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  type Query {
    markers: [Marker!]!
  }
  
  type Marker {
    key: ID!
    position: [Float]
    content: String!
  }
  
  type Mutation {
    update(key: String, position: [Float]): Marker
  }
  
  type Subscription {
    updated: Marker
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };