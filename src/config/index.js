import convict from 'convict';

const config = convict({
  env: {
    format: ['prod', 'dev', 'test'],
    default: 'dev',
    env: 'NODE_ENV',
  },
  logLevel: {
    format: String,
    default: 'info',
  },
});

const env = config.get('env');
config.loadFile(`${__dirname}/${env}.json`);
config.validate({ allowed: 'strict' });

export default config;
