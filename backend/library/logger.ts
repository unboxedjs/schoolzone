import bunyan from 'bunyan';
import { config } from 'backend/config';
import fs from 'fs';
import { Controls } from '@sz/enum';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { LoggingBunyan } = require('@google-cloud/logging-bunyan');

const { version, env, gcpKey, gcpProject, appName: name } = config;
const buffer = Buffer.from(gcpKey, 'base64');
const keyFilename = `key.json`;

fs.writeFileSync(keyFilename, buffer);

export const gcpLogOptions = {
  logName: env,
  projectId: gcpProject,
  keyFilename,
};

export const loggingBunyan = new LoggingBunyan(gcpLogOptions);

const streams = [
  { level: 'info', stream: process.stdout },
  loggingBunyan.stream('info'),
];

env == 'local' ? streams.pop() : streams.shift();

export const log = bunyan.createLogger({ name, streams });

export const trace = log.trace.bind(log);
export const debug = log.debug.bind(log);
export const info = log.info.bind(log);
export const warn = log.warn.bind(log);
export const error = log.error.bind(log);
export const fatal = log.fatal.bind(log);

export const excludePaths: string[] = [
  '',
  Controls.Logs,
  `${Controls.Logs}/fetch`,
].map(url => `/${version}/${url}`);

export const AllowLog = (url: string): boolean => !excludePaths.includes(url);
