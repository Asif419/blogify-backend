import { Server } from 'http';
import config from './app/config';
import mongoose from 'mongoose';

const express = require('express');
const app = express();
const port = 3000;

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    /* empty */
  }
}

main();
