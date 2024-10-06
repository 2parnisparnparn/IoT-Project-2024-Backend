const express = require('express');
const UserController = require('../controllers/UserController');
const billController = require('../controllers/BillController');
const bottleController = require('../controllers/BottleController');
const creditController = require('../controllers/creditController');

const router = express.Router();

// User routes
router.post('/create-user', UserController.createUser);

// Get user by phone number
router.get('/users/:phone_number', UserController.getUserByPhoneNumber);

// Login user
router.post('/login', UserController.login); // เพิ่มเส้นทางเข้าสู่ระบบ
// Bill routes
router.post('/add-bill', billController.addBill);
router.get('/bills/:phone_number', billController.getBillsByPhoneNumber);


// Bottle routes
router.post('/add-bottle', bottleController.addBottle);
router.get('/bottle/:bottle_type', bottleController.getBottleByType);

// Exchange Points
router.put('/update/:phone_number/credit', creditController.updatePoints);

module.exports = router;
