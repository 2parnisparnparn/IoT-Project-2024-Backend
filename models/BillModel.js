const { collection, setDoc, doc, updateDoc, increment, query, where, getDocs } = require('firebase/firestore');
const firestore = require('../config/firebase');

class Bill {
    // Create a new bill 
    static async createBill(billData) {
        try {
            const billRef = doc(collection(firestore, 'bills'));

            console.log('Creating new bill in collection bills');

            await setDoc(billRef, {
                bill_id: billRef.id,
                bottles: billData.bottles, 
                all_count: billData.all_count,
                credit: billData.credit,
                phone_number: billData.phone_number
            });

            //update the user credit based on phone number
            if (billData.phone_number) {
                const userId = await Bill.updateUserCreditByPhone(billData.phone_number, billData.credit);
                await Bill.linkBillToUser(billData.phone_number, billRef.id);
            }

            return billRef.id; 
        } catch (e) {
            console.error('Error adding bill:', e);
            throw new Error(e.message);
        }
    }

    // Link the bill to a user in the user_bills collection
    static async linkBillToUser(phone_number, billId) {
        try {
            const userBillsRef = collection(firestore, 'user_bills');
            const userBillRef = doc(userBillsRef); 

            await setDoc(userBillRef, {
                phone_number: phone_number,
                bill_eco_id: billId,
                assigned_at: new Date() 
            });

            console.log('Bill linked to user successfully');
        } catch (e) {
            console.error('Error linking bill to user:', e);
            throw new Error(e.message);
        }
    }

    // Update the user credit based on phone number
    static async updateUserCreditByPhone(phoneNumber, billCredit) {
        try {
            const usersRef = collection(firestore, 'Users');
            const q = query(usersRef, where('phone_number', '==', phoneNumber));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error(`No user found with phone number ${phoneNumber}`);
            }

            let userId = null;
            querySnapshot.forEach(async (docSnapshot) => {
                const userRef = doc(collection(firestore, 'Users'), docSnapshot.id);

                
                await updateDoc(userRef, {
                    credit: increment(billCredit)
                });

                console.log(`User with phone number ${phoneNumber} credit updated by ${billCredit} points`);

                userId = docSnapshot.id; 
            });

            return userId; 
        } catch (e) {
            console.error('Error updating user credit by phone number:', e);
            throw new Error(e.message);
        }
    }

    // Fetch all bills associated with a specific phone number
    static async getBillsByPhoneNumber(phoneNumber) {
        try {
            const billsRef = collection(firestore, 'bills');
            const q = query(billsRef, where('phone_number', '==', phoneNumber));
            const querySnapshot = await getDocs(q);

            const bills = [];
            querySnapshot.forEach((docSnapshot) => {
                const billData = docSnapshot.data();
                billData.bill_id = docSnapshot.id; 
                bills.push(billData);
            });

            if (bills.length === 0) {
                throw new Error(`No bills found for phone number ${phoneNumber}`);
            }

            return bills;
        } catch (e) {
            console.error('Error fetching bills by phone number:', e);
            throw new Error(e.message);
        }
    }
}

module.exports = Bill;
