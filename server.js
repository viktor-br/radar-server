import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { schema } from './src/schema';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_HOST = process.env.RADAR_CLIENT_HOST;
const CLIENT_PORT = process.env.RADAR_CLIENT_PORT;
const SERVER_HOST = process.env.RADAR_SERVER_HOST;
const SERVER_PORT = process.env.RADAR_SERVER_PORT;
const RUNNING_PORT = process.env.RADAR_SERVER_RUNNING_PORT;

const server = express();

server.use('*', cors({ origin: 'http://' + CLIENT_HOST + ':' + CLIENT_PORT }));

server.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
}));

server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'ws://' + SERVER_HOST + ':' + SERVER_PORT + '/subscriptions'
}));

// We wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(server);

ws.listen(RUNNING_PORT, () => {
    console.log(`GraphQL Server is now running on ${RUNNING_PORT} port`);

    // Set up the WebSocket for handling GraphQL subscriptions
    new SubscriptionServer({
        execute,
        subscribe,
        schema
    }, {
        server: ws,
        path: '/subscriptions',
    });
});