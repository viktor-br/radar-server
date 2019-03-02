import { PubSub } from 'graphql-subscriptions';
import { ConsoleLogger } from "@cdm-logger/server";
import { AmqpPubSub } from 'graphql-rabbitmq-subscriptions';

// const pubsub = new PubSub();

const RABBITMQ_HOST = process.env.RADAR_RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RADAR_RABBITMQ_PORT;

const settings = {
    level: "info", // Optional: default 'info' ('trace'|'info'|'debug'|'warn'|'error'|'fatal')
    mode: "short" // Optional: default 'short' ('short'|'long'|'dev'|'raw')
};

const logger = ConsoleLogger.create("radar", settings);

const pubsub = new AmqpPubSub({
    logger: logger,
    config: {host: RABBITMQ_HOST, port: RABBITMQ_PORT}
});

const data = [
    {key: "me1", position: [52.500419, 13.3822353], content: "Me 1"},
    {key: "me2", position: [52.507419, 13.3792353], content: "Me 2"},
    {key: "me3", position: [52.518000, 13.3849000], content: "Me 3"},
    {key: "me4", position: [52.521000, 13.3819000], content: "Me 4"},
];

export const resolvers = {
    Query: {
        markers: () => {
            return data;
        }
    },
    Mutation: {
        update: (root, {key, position}) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    data[i].position[0] = position[0];
                    data[i].position[1] = position[1];

                    pubsub.publish('updated', { updated: data[i] });

                    return data[i];
                }
            }

            return null;
        }
    },
    Subscription: {
        updated: {
            subscribe: () => pubsub.asyncIterator('updated')
        }
    },
};
