const { collection, getDocs } = require('firebase/firestore');
const firestore = require('../config/firebase');

class Collection {
    static async getPastCollection() {
        try {
            const allRef = collection(firestore, 'PastCollection'); 
            const querySnapshot = await getDocs(allRef);
            let allData = [];

            querySnapshot.forEach(doc => {
                let data = doc.data();

                if (data.StartDate && data.StartDate.seconds) {
                    data.StartDate = new Date(data.StartDate.seconds * 1000); 
                if (data.EndDate && data.EndDate.seconds) {
                    data.EndDate = new Date(data.EndDate.seconds * 1000); 
                }

                allData.push(data);
                
                }
            });


            return { success: true, data: allData };

        } catch (e) {
            console.error('Error getting all data:', e);
            throw new Error(e.message);
        }
    }
}

module.exports = Collection;
