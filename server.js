import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { resolvers } from './src/resolvers';
import { typeDefs } from './src/type-defs';
import config from './src/config';

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

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    logger.info(`🚀 Server ready at ${url}`);
});
