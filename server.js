import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { createResolvers } from './src/resolvers';
import { typeDefs } from './src/type-defs';
import config from './src/config';
// import { PubSub } from 'graphql-subscriptions';
import { ConsoleLogger } from "@cdm-logger/server";
import { AmqpPubSub } from 'graphql-rabbitmq-subscriptions';

// const pubsub = new PubSub();

const RABBITMQ_HOST = process.env.RADAR_RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RADAR_RABBITMQ_PORT;

const settings = {
  level: "info", // Optional: default 'info' ('trace'|'info'|'debug'|'warn'|'error'|'fatal')
  mode: "short" // Optional: default 'short' ('short'|'long'|'dev'|'raw')
};

const consoleLogger = ConsoleLogger.create("radar", settings);

const pubsub = new AmqpPubSub({
  logger: consoleLogger,
  config: {host: RABBITMQ_HOST, port: RABBITMQ_PORT}
});

dotenv.config();

const logger = createLogger({
    format: format.combine(
      format.splat(),
      format.colorize(),
      format.align(),
      format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.printf(info => `${info.timestamp} ${info.level}: ${info instanceof Error ? JSON.stringify(info.stack) : info.message}`),
    ),
    transports: [
        new transports.Console({
            level: config.get('logLevel'),
        }),
    ],
});

const resolvers = createResolvers(pubsub);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
    logger.info(`🚀 Server ready at ${url}`);
});
