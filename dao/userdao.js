import db from "../config/dbconfig/dbconfigmain.js";
import logger from "../config/logger/logger.config.js";

const { user_mst: user, agent_status_record: agentUser } = db;

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
    const logoutTime = new Date()
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d+Z$/, ""); // Get current logout time
    const updateData = {
      AGENT_STATUS_ID: 5,
      LOGOUT_TIME: logoutTime,
      ACTION_FROM:'1',
    };
    //    console.log("updateData: ", updateData);
    logger.info("userId => " +userId);
    const queryResponse = await agentUser.update(updateData, { where: { AGENT_ID: userId } });
    //    console.log("console.log: queryResponse: ", queryResponse);
    logger.info("queryResponse: " +queryResponse);
    //    logger.info("queryResponse: " +agentUser.query);
    return true;
  } catch (error) {
    logger.error("errorMessage: " + error.message);
    throw new Error(error.message);
  }
};

const addUserLoginHstory = async (userId) => {
  try {
    const loginTime = new Date()
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d+Z$/, "");
    const createData = {
      AGENT_ID: userId,
      LOGIN_TIME: loginTime,
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

const updateUserLoginHstory = async (recordId) => {
  try {
    const logoutTime = new Date()
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d+Z$/, "");
    const updateData = {
      LOGOUT_TIME: logoutTime,
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

export default {
  findAllUsers,
  findUserById,
  updateUserStatus,
  addUserLoginHstory,
  updateUserLoginHstory,
};
