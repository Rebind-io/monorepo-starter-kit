import config from '@config';
import { logger } from '@utils/logger';
import { Server, createServer } from 'http';
import mongoose from 'mongoose';

import app from './app';

let server: Server = createServer(app);

async function main() {
  try {
    await mongoose.connect(config.LOCAL_MONGO_URI as string);

    server = server.listen(config.PORT, () => {
      logger.info(`Server is listening on port ${config.PORT}`);
    });
  } catch (err) {
    logger.error(`😈 Failed to connect database, shutting down...`);
    process.exit(1);
  }
}

main();

process.on('unhandledRejection', (err) => {
  logger.error(`😈 unhandledRejection is detected, shutting down...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  logger.error(`😈 uncaughtException is detected, shutting down...`);
  process.exit(1);
});
