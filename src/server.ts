import { Server } from 'http';
import config from './app/config';
import mongoose from 'mongoose';
import app from './app';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`A listening on port ${config.port}`);
    });
  } catch (error) {
    /* empty */
  }
}

main();
