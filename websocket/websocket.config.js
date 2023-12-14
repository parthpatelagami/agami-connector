import { Server } from "socket.io";

import { updateUserStatus } from "../controller/usercontroller.js";
import logger from "../config/logger/logger.config.js"

let connectedUserIds = {};

const serverWebSocket = (httpServer) => {

  const scoketIO = new Server(httpServer,{
    cors: {
     origin: "https://agamidemo.helpinbox.io:10443",
     methods: ["GET", "POST"]
    }   
 });

 scoketIO.on("connection", (socket) => {
 
    let userId = socket.handshake.query.token;
    //logger.info("userid=>"+userId)

    if (connectedUserIds[userId] === undefined) {
      logger.info("Add user id to connected users array.");
      connectedUserIds[userId] = socket.id;
      logger.info("Connected users =>"+JSON.stringify(connectedUserIds));
    }

    logger.info('connected.');
    logger.info('user id = '+userId); 

    socket.on("disconnect", () => {
      if (connectedUserIds[userId] !== undefined) {
        delete connectedUserIds[userId];
        logger.info('Removed user id ='+userId);
      }
      logger.info('Disconnected.');

      // Call the updateUserStatus function
      updateUserStatus(userId);
    });
  });

  return scoketIO
};

export {connectedUserIds};
export default serverWebSocket;
