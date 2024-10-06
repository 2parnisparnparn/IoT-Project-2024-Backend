const { collection, setDoc, doc, query, where, getDocs, updateDoc } = require('firebase/firestore');
const firestore = require('../config/firebase');

class CreditModel {
    static async updateCreditByPhoneNumber(phone_number, newCredit) {
        try {
            const usersRef = collection(firestore, 'Users');
            const updateQuery = query(usersRef, where('phone_number', '==', phone_number));
            const querySnapshot = await getDocs(updateQuery);
    
            if (querySnapshot.empty) {
                return null;
            }
    
            let updatedUser = null;
    
            for (const docSnapshot of querySnapshot.docs) {
                const userRef = doc(firestore, 'Users', docSnapshot.id);
                await updateDoc(userRef, { credit: newCredit });
    
                updatedUser = { id: docSnapshot.id, ...docSnapshot.data(), credit: newCredit };
            }
    
            return updatedUser;
    
        } catch (error) {
            throw new Error('Failed to update credit: ' + error.message);
        }
    }
}

module.exports = CreditModel;