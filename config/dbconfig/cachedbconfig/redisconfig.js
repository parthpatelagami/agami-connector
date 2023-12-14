import logger from "../../logger/logger.config.js";
import { socketIO } from "../../../app.js";
import { connectedUserIds } from "../../../websocket/websocket.config.js";

const redisClientConfig = async (redisClient) => {
  try {
    logger.info("Starting Redis..");

    redisClient.on("error", (err) => logger.info("Redis Client Error"));

    await redisClient.connect();

    logger.info("Connected.");

    logger.info("Subscribe HELPINBOX_NOTIFICATION Channnel");

    const subscriber = redisClient.duplicate();

    await subscriber.connect();

    await subscriber.PSUBSCRIBE("*", (message) => {
      logger.info("subscribe ..........start......");
      logger.info("subscribe message = " + message);
      //logger.info("subscribe message = " + message);
      try{
      let receivedjsonobject;
      let receiveduserids;
      let sendjsonobject = {};

      if (message != null && message != "") {
        receivedjsonobject = JSON.parse(message);
        //console.log("message = " + message);
        if (receivedjsonobject["userid"] != undefined) {
          receiveduserids = receivedjsonobject["userid"];
          console.log("receiveduserids = " + receiveduserids);
          if (receiveduserids != null && receiveduserids != "") {
            //make send json object
            if (receivedjsonobject["title"] != undefined) {
              sendjsonobject["title"] = receivedjsonobject["title"];
            }
            if (receivedjsonobject["discription"] != undefined) {
              sendjsonobject["discription"] = receivedjsonobject["discription"];
            }
            if (receivedjsonobject["type"] != undefined) {
              sendjsonobject["type"] = receivedjsonobject["type"];
            }
            if (connectedUserIds[receiveduserids] != undefined) {
              
              logger.info("subscribe message = " + message+" to user ="+receiveduserids);
             
              socketIO.to(connectedUserIds[receiveduserids]).emit(
                "message",
                sendjsonobject
              );
            }
          }
        }
      }
      }
      catch (error) {
        logger.error(error);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

export default redisClientConfig;
