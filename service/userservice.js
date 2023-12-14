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
    return userDAO.updateUserStatus(userId)
};

export default {
  findAllUsers,
  findUserById,
  updateUserStatus
};
