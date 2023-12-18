import { schedule } from "node-cron";
import { clearUserLoginHstory } from "../controller/usercontroller.js";
import logger from "../config/logger/logger.config.js";

schedule("0 20 * * *", async () => {
  try {
    logger.info("clearUserLoginHstory: Called");
    clearUserLoginHstory();
  } catch (error) {
    console.error("Error in cron job:", error.message);
  }
});
