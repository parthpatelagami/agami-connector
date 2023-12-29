import { Server } from "socket.io";

import {
  updateUserStatus,
  addUserLoginHstory,
  updateUserLoginHstory,
  updateUserLiveStatus,
} from "../controller/usercontroller.js";
import logger from "../config/logger/logger.config.js";

let connectedUserIds = {};

const serverWebSocket = (httpServer) => {
  const scoketIO = new Server(httpServer, {
    cors: {
      origin: "https://agamidemo.helpinbox.io:10443",
      methods: ["GET", "POST"],
    },
  });

  scoketIO.on("connection", async (socket) => {
    let userId = socket.handshake.query.token;
    let userStatus=socket.handshake.query.user_status;
    let recordId =null;
    if(userStatus != "Offline") {
      let recordId = await addUserLoginHstory(userId);
      logger.info("Record Id = " + recordId);
    }

    updateUserLiveStatus(userId, false);

    logger.info("connecting to user id =" + userId+",status =" + userStatus);
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
      updateUserLiveStatus(userId, true);
    });
  });

  return scoketIO;
};

export { connectedUserIds };
export default serverWebSocket;
