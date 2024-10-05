// models/UserModel.js
const { collection, setDoc, doc, query, where, getDocs } = require('firebase/firestore');
const firestore = require('../config/firebase');

class UserModel {
    
    static async createUser(userData) {
        const { phone_number } = userData;
        try {
            await setDoc(doc(collection(firestore, "Users"), phone_number), userData);
            return { success: true, message: `User added with phone number: ${phone_number}` };
        } catch (e) {
            throw new Error('Error adding user: ' + e.message);
        }
    }

    static async getUserByPhoneNumber(phone_number) {
        try {
            const userQuery = query(collection(firestore, "Users"), where("phone_number", "==", phone_number));
            const querySnapshot = await getDocs(userQuery);
            
            if (querySnapshot.empty) {
                return { success: false, message: 'User not found' };
            }

            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });

            return { success: true, data: users };
        } catch (e) {
            throw new Error('Error fetching user: ' + e.message);
        }
    }

    static async login(phone_number, password) {
        try {
            const userQuery = query(collection(firestore, "Users"), where("phone_number", "==", phone_number));
            const querySnapshot = await getDocs(userQuery);
            
            if (querySnapshot.empty) {
                return { success: false, message: 'User not found' };
            }

            const user = querySnapshot.docs[0].data();

            // ตรวจสอบรหัสผ่าน
            if (user.password !== password) {
                return { success: false, message: 'Incorrect password' };
            }

            return { success: true, data: { id: querySnapshot.docs[0].id, ...user } };
        } catch (e) {
            throw new Error('Error during login: ' + e.message);
        }
    }
}

module.exports = UserModel;
