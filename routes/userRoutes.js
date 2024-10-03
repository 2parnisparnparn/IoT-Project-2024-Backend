const express = require('express');
const UserController= require('../controllers/UserController');

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.get('/users/:phone_number', UserController.getUserByPhoneNumber);

module.exports = router;
