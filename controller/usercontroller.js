import userService from '../service/userservice.js';

// Get all Users
const findAllUser = (req, res) => {
  userService.findAllUsers()
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
};

// Get User by ID
const findUserById = (req, res) => {
  userService.findUserById(req, res)
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
};

//update User
const updateUserStatus = (userId) => {
  userService.updateUserStatus(userId);
};

//Add Login History
const addUserLoginHstory = async (userId) => {
  try {
    const insertedRecordId = await userService.addUserLoginHstory(userId);
    return insertedRecordId;
  } catch (error) {
    console.error("Error:", error.message);
    return error.message;
  }
};

//Add Logout History
const updateUserLoginHstory = (recordId) => {
  userService.updateUserLoginHstory(recordId);
};

export {
  findAllUser,
  findUserById,
  updateUserStatus,
  addUserLoginHstory,
  updateUserLoginHstory,
};
