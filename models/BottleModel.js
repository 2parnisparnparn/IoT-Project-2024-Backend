const { collection, query, where, getDocs, setDoc, doc } = require('firebase/firestore');
const firestore = require('../config/firebase');

class Bottle {
    // Add a bottle to Firestore
    static async addBottle(bottleData) {
        try {
            const bottleRef = doc(collection(firestore, 'bottles'));
            console.log('Creating new bottle in collection bottles');
            await setDoc(bottleRef, {
                bottle_id: bottleRef.id,
                bottle_type: bottleData.bottle_type,
                carbon_credit: bottleData.carbon_credit
            });
            return { message: 'Bottle added successfully', bottle_id: bottleRef.id };
        } catch (e) {
            console.error('Error adding bottle:', e);
            throw new Error(e.message);
        }
    }

    // Fetch a bottle by its type
    static async getBottleByType(bottle_type) {
        try {
            const bottlesRef = collection(firestore, 'bottles');
            const q = query(bottlesRef, where('bottle_type', '==', bottle_type));  // Correct query setup
            const querySnapshot = await getDocs(q);

            const bottles = [];
            querySnapshot.forEach((docSnapshot) => {
                const bottleData = docSnapshot.data();
                bottleData.bottle_id = docSnapshot.id;  // Include the bottle ID in the response
                bottles.push(bottleData);
            });

            if (bottles.length === 0) {
                throw new Error(`No bottles found for bottle type ${bottle_type}`);
            }

            return bottles;
        } catch (e) {
            console.error('Error fetching bottles by type:', e);
            throw new Error(e.message);
        }
    }
    
}

module.exports = Bottle;
