const express = require('express');
const UserController = require('../controllers/UserController');
const BillController = require('../controllers/Bill-ecoController'); // Import BillController
const bottleController = require('../controllers/BottleController');

const router = express.Router();

// User routes
router.post('/create-user', UserController.createUser);
router.get('/users/:phone_number', UserController.getUserByPhoneNumber);

// Bill routes
router.post('/create-bill', BillController.createBill); // Route to create a bill
router.get('/bills/:bill_eco_id', BillController.getBillByBillId); // Route to get bill by ID


// Route to handle adding a new bottle
router.post('/add-bottle', bottleController.addBottle);


module.exports = router;
