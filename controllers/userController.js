// controllers/userController.js
const UserModel = require('../models/UserModel');

// Create a new user
exports.createUser = async (req, res) => {
    const { phone_number, password, full_name, credit } = req.body;

    const userData = {
        phone_number,
        password,
        full_name,
        credit,
    };

    try {
        const result = await UserModel.createUser(userData);
        res.status(200).send(result.message);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

// Get user by phone number
exports.getUserByPhoneNumber = async (req, res) => {
    const { phone_number } = req.params;

    try {
        const result = await UserModel.getUserByPhoneNumber(phone_number);
        
        if (!result.success) {
            return res.status(404).send(result.message);
        }

        res.status(200).json(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

// Login user
exports.login = async (req, res) => {
    const { phone_number, password } = req.body; // ใช้หมายเลขโทรศัพท์และรหัสผ่านในการเข้าสู่ระบบ

    try {
        const result = await UserModel.login(phone_number, password);

        if (!result.success) {
            return res.status(404).send(result.message);
        }

        // ส่งข้อมูลผู้ใช้เมื่อเข้าสู่ระบบสำเร็จ
        res.status(200).json(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
};
