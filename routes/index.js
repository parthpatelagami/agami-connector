import express from 'express';
//import userController from '../controller/usercontroller.js';
import { findAllUser, findUserById } from '../controller/usercontroller.js';

const router = express.Router();

// GET all users
router.get('/users', findAllUser);

// GET user by ID
router.get('/user/:id', findUserById);

router.get('/', (req, res) => {
  res.send('Hello!');
});

router.get('/khushi', (req, res) => {
  res.send('Hello, Khushi!');
});

router.get('/log', (req, res) => {
    res.sendFile('/opt/nodejs/agami-connector/log/helpinbox_notification.log');
  }); 

export default router;
