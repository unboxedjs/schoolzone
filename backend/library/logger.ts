import bunyan from 'bunyan';
import { config } from 'backend/config';
import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { LoggingBunyan } = require('@google-cloud/logging-bunyan');

const buffer = Buffer.from(config.gcpKey, 'base64');
const keyFilename = `key.json`;

fs.writeFileSync(keyFilename, buffer);

const loggingBunyan = new LoggingBunyan({
  logName: config.env,
  projectId: config.gcpProject,
  keyFilename,
});

const streams = [
  { level: 'info', stream: process.stdout },
  loggingBunyan.stream('info'),
];

config.env == 'local' ? streams.pop() : streams.shift();

export const log = bunyan.createLogger({
  name: config.appName,
  streams,
});

export const trace = log.trace.bind(log);
export const debug = log.debug.bind(log);
export const info = log.info.bind(log);
export const warn = log.warn.bind(log);
export const error = log.error.bind(log);
export const fatal = log.fatal.bind(log);
