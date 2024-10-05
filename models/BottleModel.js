const { collection, setDoc, doc } = require('firebase/firestore');
const firestore = require('../config/firebase');

class Bottle {

    // Create a new bottle document in Firestore
    static async addBottle(bottleData) {
        try {
            // Create a new document reference in the "bottles" collection
            const bottleRef = doc(collection(firestore, 'bottles'));
            console.log('Creating new bottle in collection bottles');

            // Add the bottle data to Firestore
            await setDoc(bottleRef, {
                bottle_id: bottleRef.id,  // Auto-generated ID for the bottle
                bottle_type: bottleData.bottle_type,
                carbon_credit: bottleData.carbon_credit
            });

            // Return a success message and the ID of the created bottle
            return { message: 'Bottle added successfully', bottle_id: bottleRef.id };
        } catch (e) {
            console.error('Error adding bottle:', e);
            throw new Error(e.message);
        }
    }
}

module.exports = Bottle;
