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
  userService.updateUserStatus(userId)
};

export {
  findAllUser,
  findUserById,
  updateUserStatus
};
