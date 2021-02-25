const getEnv = () => {
  // if (!process.env.NODE_ENV) {
  //   throw new Error('NODE_ENV must me defined');
  // }
  // if (!process.env.ORIGIN) {
  //   throw new Error('ORIGIN must me defined');
  // }

  // if (!process.env.PORT) {
  //   throw new Error('PORT must me defined');
  // }

  // if (!process.env.MONGO_HOST) {
  //   throw new Error('MONGO_HOST must me defined');
  // }
  // if (!process.env.MONGO_PORT) {
  //   throw new Error('MONGO_PORT must me defined');
  // }
  // if (!process.env.MONGO_DATABASE) {
  //   throw new Error('MONGO_DATABASE must me defined');
  // }
  // if (!process.env.MONGO_USERNAME) {
  //   throw new Error('MONGO_USERNAME must me defined');
  // }
  // if (!process.env.MONGO_PASSWORD) {
  //   throw new Error('MONGO_PASSWORD must me defined');
  // }

  // if (!process.env.JWT_SECRET) {
  //   throw new Error('JWT_SECRET must be defined');
  // }

  const mongoURI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`;
  // const mongoURI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;

  return {
    nodeEnv: process.env.NODE_ENV,
    origin: process.env.ORIGIN,
    port: process.env.PORT,
    mongo: {
      uri: mongoURI,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
};

export default () => ({
  nodeEnv: process.env.NODE_ENV,
  origin: process.env.ORIGIN,
  port: process.env.PORT,
  mongo: {
    uri: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`,
  },
  jwtSecret: process.env.JWT_SECRET,
});

export const { nodeEnv, origin, port, mongo, jwtSecret } = getEnv();
