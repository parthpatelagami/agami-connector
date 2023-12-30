import userDAO from "../dao/userdao.js";

const findAllUsers = () => {
  return userDAO
    .findAllUsers()
    .then((users) => {
      return users;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const findUserById = (req, res) => {
  return userDAO
    .findUserById(req, res)
    .then((users) => {
      return users;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const updateUserStatus = (userId) => {
  return userDAO.updateUserStatus(userId);
};

const addUserConnectHistory = async (userId) => {
  try {
    const insertedRecordId = await userDAO.addUserConnectHistory(userId);
    return insertedRecordId;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Add Logout History
const updateUserConnectHistory = (recordId) => {
  userDAO.updateUserConnectHistory(recordId);
};

const updateUserLiveStatus = (recordId, isActive) => {
  userDAO.updateUserLiveStatus(recordId, isActive);
};

const clearUserLoginHstory = () => {
  userDAO.clearUserLoginHstory();
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
