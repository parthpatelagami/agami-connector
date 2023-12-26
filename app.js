/*
 * Author : Khusi Shaileshkumar Patel
 * Date : 1/06/2023
 */


import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import https from "https";
import { createClient } from "redis";
import "./cron/clearLoginHistory.js";

import routes from './routes/index.js';
import db from './config/dbconfig/dbconfigmain.js';
import serverWebSocket from './websocket/websocket.config.js';
import redisClientConfig from './config/dbconfig/cachedbconfig/redisconfig.js';
import compression from 'compression';
import bodyParser from 'body-parser';
import fs from 'fs';


dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 5601; // Use the port number from .env file or default to 3000

const app = express();
app.use(bodyParser.json());

let httpServer;
if (process.env.PROFILE === 'Prod') {
  const privateKey = fs.readFileSync('/opt/nodejs/agami-connector/helpnode.key', 'utf8');
  const certificate = fs.readFileSync('/opt/nodejs/agami-connector/helpnode.crt', 'utf8');
  const credentials = {
  key: privateKey,
  cert: certificate
  };
  app.use(cors());
  httpServer = https.createServer(credentials, app);
} else {
  httpServer = http.createServer(app);
}

let socketIO = null;

if(process.env.HELPDEST_NOTIFICATION === 'Y') {

  socketIO = serverWebSocket(httpServer);

}

export { socketIO }

if(process.env.HELPDEST_NOTIFICATION === 'Y') {
  const redisClient = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD
  });
  redisClientConfig(redisClient);
}

//create table if not exists
db.sequelize.sync();

app.use(express.json());

// Middleware
app.use(compression()); // Enable compression middleware

// Routes
app.use('/', routes);

httpServer.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
