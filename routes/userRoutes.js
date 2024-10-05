const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/create-user', UserController.createUser);

// Get user by phone number
router.get('/users/:phone_number', UserController.getUserByPhoneNumber);

// Login user
router.post('/login', UserController.login); // เพิ่มเส้นทางเข้าสู่ระบบ

module.exports = router;
