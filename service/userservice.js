import userDAO from '../dao/userdao.js';

const findAllUsers = () => {
  return userDAO.findAllUsers()
    .then(users => {
      return users;
    })
    .catch(error => {
      throw new Error(error.message);
    });
};

const findUserById = (req, res) => {
  return userDAO.findUserById(req, res)
    .then(users => {
      return users;
    })
    .catch(error => {
      throw new Error(error.message);
    });
};

const updateUserStatus = (userId) => {
  return userDAO.updateUserStatus(userId);
};

const addUserLoginHstory = async (userId) => {
  try {
    const insertedRecordId = await userDAO.addUserLoginHstory(userId);
    return insertedRecordId;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Add Logout History
const updateUserLoginHstory = (recordId) => {
  userDAO.updateUserLoginHstory(recordId);
};
export default {
  findAllUsers,
  findUserById,
  updateUserStatus,
  addUserLoginHstory,
  updateUserLoginHstory,
};
