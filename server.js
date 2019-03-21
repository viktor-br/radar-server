import { ApolloServer } from 'apollo-server';
import { resolvers } from './src/resolvers';
import { typeDefs } from './src/type-defs';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
