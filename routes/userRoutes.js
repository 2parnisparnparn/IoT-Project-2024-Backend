const express = require('express');
const UserController = require('../controllers/UserController');
const billController = require('../controllers/BillController');
const bottleController = require('../controllers/BottleController');

const router = express.Router();

// User routes
router.post('/create-user', UserController.createUser);
router.get('/users/:phone_number', UserController.getUserByPhoneNumber);

// Bill routes
router.post('/add-bill', billController.addBill);
router.get('/bills/:phone_number', billController.getBillsByPhoneNumber);


// Route to handle adding a new bottle
router.post('/add-bottle', bottleController.addBottle);
router.get('/bottle/:bottle_type', bottleController.getBottleByType);



module.exports = router;
