import * as dotenv from 'dotenv';

const result = dotenv.config();

if (result?.error) {
  throw new Error('Add .env file');
}

export const config = {
  env: process.env.SZ_ENV,
  appName: process.env.SZ_APP,
  port: process.env.SZ_PORT,
  version: process.env.SZ_VERSION,
  secret: process.env.SZ_SECRET,
  mongoUri: `mongodb+srv://${process.env.SZ_MONGO_USER}:${process.env.SZ_MONGO_PASS}@${process.env.SZ_MONGO_HOST}/${process.env.SZ_MONGO_DB}?authSource=admin&replicaSet=${process.env.SZ_MONGO_REPLICA}&readPreference=primary&ssl=true`,
};
