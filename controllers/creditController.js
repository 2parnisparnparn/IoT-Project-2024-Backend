const creditModel = require('../models/creditModel');

exports.updatePoints = async (req, res) => {
    const { phone_number } = req.params;
    const { credit } = req.body;

    try {
        // ตรวจสอบว่ามีการส่งค่าจำนวน credit มาใน body หรือไม่
        if (typeof credit !== 'number') {
            return res.status(400).send('Invalid credit value');
        }

        // อัปเดตข้อมูล
        const updatedUser = await creditModel.updateCreditByPhoneNumber(phone_number, credit);
        
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        // ส่งข้อมูลผู้ใช้ที่ถูกอัปเดตกลับไป
        res.status(200).json(updatedUser);
    } catch (error) {
        // ส่งข้อความข้อผิดพลาดถ้ามีปัญหา
        res.status(500).send(error.message);
    }
};