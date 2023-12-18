import { Server } from "socket.io";

import {
  updateUserStatus,
  addUserLoginHstory,
  updateUserLoginHstory,
} from "../controller/usercontroller.js";
import logger from "../config/logger/logger.config.js";

let connectedUserIds = {};

const serverWebSocket = (httpServer) => {
  
  const scoketIO = new Server(httpServer,{
    cors: {
      origin: "https://agamidemo.helpinbox.io:10443",
      methods: ["GET", "POST"]
    }
  });

  scoketIO.on("connection", async (socket) => {
    let userId = socket.handshake.query.token;
    let recordId = await addUserLoginHstory(userId);
    logger.info("RECORDID = " + recordId);

    //logger.info("userid=>"+userId)
    logger.info("connecting to user id =" + userId);
    if (connectedUserIds[userId] === undefined) {
      logger.info("-------------------------------------");
      logger.info("Add user id to connected users array.");
      connectedUserIds[userId] = socket.id;
      logger.info("Connected users =>" + JSON.stringify(connectedUserIds));
      logger.info("-------------------------------------");
    }

    socket.on("disconnect", () => {
      if (connectedUserIds[userId] !== undefined) {
        delete connectedUserIds[userId];
        logger.info("-------------------------------------");
        logger.info("Removed user id =" + userId);
        logger.info("-------------------------------------");
      }
      logger.info("disconnecting user id=" + userId);
      logger.info("Record id =" + recordId);
      updateUserLoginHstory(recordId);
      updateUserStatus(userId);
    });
  });

  return scoketIO;
};

export { connectedUserIds };
export default serverWebSocket;
