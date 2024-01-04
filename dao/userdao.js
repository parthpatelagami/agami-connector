import db from "../config/dbconfig/dbconfigmain.js";
import logger from "../config/logger/logger.config.js";
import Sequelize from "sequelize";
import moment from "moment";
const { Op } = Sequelize;
const {
  user_mst: user,
  agent_status_record: agentUser,
  user_live_connection_history: loginHistory,
  user_live_status: userLiveStatus,
} = db;

const findAllUsers = () => {
  return user
    .findAll()
    .then((users) => {
      return users;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const findUserById = (req, res) => {
  return user
    .findByPk(req.params.id)
    .then((users) => {
      console.log("user data = " + users);
      return users;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/*
  Method For Update Agent Status
*/

const updateUserStatus = async (userId) => {
  //  console.log("AGENT_ID = " + userId);
  try {
    const logoutTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const updateData = {
      AGENT_STATUS_ID: 5,
      DISCONNECT_TIME: logoutTime,
      ACTION_FROM: "1",
    };
    //    console.log("updateData: ", updateData);
    logger.info("userId => " + userId);
    const queryResponse = await agentUser.update(updateData, {
      where: {
        AGENT_ID: userId,
        [Sequelize.Op.not]: {
          AGENT_ID: 4,
        },
      },
    });
    //    console.log("console.log: queryResponse: ", queryResponse);
    logger.info("queryResponse: " + queryResponse);
    //    logger.info("queryResponse: " +agentUser.query);
    return true;
  } catch (error) {
    logger.error("errorMessage: " + error.message);
    throw new Error(error.message);
  }
};

const addUserConnectHistory = async (userId) => {
  try {
    logger.info("addUserConnectHistory => Called");
    const connectTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const createData = {
      AGENT_ID: userId,
      CONNECT_TIME: connectTime,
    };
    logger.info("userId => " + userId);
    const queryResponse = await loginHistory.create(createData);

    logger.info("queryResponse: " + queryResponse.ID);
    return queryResponse.ID;
  } catch (error) {
    logger.error("errorMessage: " + error.message);
    throw new Error(error.message);
  }
};

const updateUserConnectHistory = async (recordId) => {
  try {
    logger.info("updateUserConnectHistory => Called");
    const disConnectTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const updateData = {
      DISCONNECT_TIME: disConnectTime,
    };
    const queryResponse = await loginHistory.update(updateData, {
      where: {
        ID: recordId,
      },
    });
    logger.info("queryResponse: " + queryResponse);
    return true;
  } catch (error) {
    logger.error("errorMessage: " + error.message);
    throw new Error(error.message);
  }
};

const clearUserLoginHstory = async () => {
  try {
    logger.info("clearUserLoginHstory: Called");

    const oneWeekAgo = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);

    const queryResponse = await loginHistory.destroy({
      where: {
        CONNECT_TIME: {
          [Op.lt]: oneWeekAgo,
        },
      },
    });
    logger.info("queryResponse: " + queryResponse);
    return true;
  } catch (error) {
    logger.error("errorMessage: " + error.message);
    throw new Error(error.message);
  }
};

const updateUserLiveStatus = async (userId, isActive) => {
  try {
    logger.info("updateUserLiveStatus: Called");

    const timeStamp = moment().format('YYYY-MM-DD HH:mm:ss');

    const updateData = isActive
      ? { AGENT_ID: userId, STATUS_ID: 5, DISCONNECT_TIME: timeStamp }
      : {
          AGENT_ID: userId,
          STATUS_ID: 1,
          CONNECT_TIME: timeStamp,
          DISCONNECT_TIME: null,
        };

    const [numRowsUpdated, created] = await userLiveStatus.upsert(updateData, {
      where: { AGENT_ID: userId },
      returning: true, // This ensures that the updated or inserted record is returned
    });

    if (created) {
      logger.info("Record inserted for userId: " + userId);
    } else {
      logger.info("Record updated for userId: " + userId);
    }
    logger.info("Executed Query: " + numRowsUpdated);

    return true;
  } catch (error) {
    logger.error("errorMessage: " + error.message);
    throw new Error(error.message);
  }
};

export default {
  findAllUsers,
  findUserById,
  updateUserStatus,
  addUserConnectHistory,
  updateUserConnectHistory,
  clearUserLoginHstory,
  updateUserLiveStatus,
};
