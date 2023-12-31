import dotenv from "dotenv";
import Sequelize from "sequelize";
import userModel from "../../model/usermodel.js";
import logger from "../logger/logger.config.js";
import loginHistoryModel from "../../model/loginhistorymodel.js";
import userLiveStatusModel from "../../model/userstatusmodel.js";

dotenv.config(); // Load environment variables from .env file

// Create a new Sequelize with your MySQL connection details
const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_DBPORT,
  dialect: process.env.MYSQL_DIALECT,
  timezone:process.env.SERVER_TIMEZONE,
  logging: (msg) => logger.info("Query : " + msg),
  logQueryParameters: true,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models-tables
//db.user_mst = userModel(sequelize, Sequelize);
db.agent_status_record = userModel(sequelize, Sequelize);
db.user_live_connection_history = loginHistoryModel(sequelize, Sequelize);
db.user_live_status = userLiveStatusModel(sequelize, Sequelize);

export default db;
