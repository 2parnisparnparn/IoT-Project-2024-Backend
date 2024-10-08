const Bill = require('../models/BillModel');

exports.addBill = async (req, res) => {
    try {
        const billData = req.body;

        const billId = await Bill.createBill(billData);

        res.status(200).json({ message: 'Bill created successfully and user credit updated', bill_id: billId });
    } catch (err) {
        console.error('Error in addBill:', err);
        res.status(500).json({ error: err.message });
    }
};


exports.getBillsByPhoneNumber = async (req, res) => {
    try {
        const { phone_number } = req.params; 
        const bills = await Bill.getBillsByPhoneNumber(phone_number);
        res.status(200).json({ bills });
    } catch (err) {
        console.error('Error fetching bills by phone number:', err);
        res.status(500).json({ error: err.message });
    }
};

