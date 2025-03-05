const { collection, addDoc, query, where, getDocs, Timestamp } = require('firebase/firestore');
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
                }
                if (data.EndDate && data.EndDate.seconds) {
                    data.EndDate = new Date(data.EndDate.seconds * 1000);
                }

                allData.push(data);
            });

            return { success: true, data: allData };

        } catch (e) {
            console.error('Error getting all data:', e);
            throw new Error(e.message);
        }
    }

    static async getCollectionByDate() {
        try {
            const pastCollections = await Collection.getPastCollection();
            if (!pastCollections.success) {
                throw new Error("Failed to fetch past collections");
            }

            let lastDate = null;
            pastCollections.data.forEach((item) => {
                if (!lastDate || item.EndDate > lastDate) {
                    lastDate = item.EndDate;
                }
            });

            console.log('Last Date:', lastDate);

            const billsRef = collection(firestore, 'bills');
            const q = query(billsRef, where('date', '>', lastDate));
            const querySnapshot = await getDocs(q);

            let bills = [];
            querySnapshot.forEach(doc => {
                let data = doc.data();
                data.bill_id = doc.id;
                bills.push(data);
            });

            const groupedData = {};

            bills.forEach((bill) => {
                const billDate = bill.date.toDate();
                const billDateString = billDate.toISOString(); 
    
                if (!groupedData[billDateString]) {
                    groupedData[billDateString] = {};
                }
    
                bill.bottles.forEach((bottle) => {
                    const bottleType = bottle.type;
                    if (!groupedData[billDateString][bottleType]) {
                        groupedData[billDateString][bottleType] = 0;
                    }
                    groupedData[billDateString][bottleType] += bottle.count;
                });
            });

            const result = Object.keys(groupedData).map(date => ({
                date: date,
                bottles: groupedData[date]
            }));

            return { success: true, data: result, lastStartDate: lastDate }; // return lastStartDate
        } catch (error) {
            console.error('Error fetching bills:', error);
            throw new Error(error.message);
        }
    }

    static async getLastCollectionDate() {
        try {
            const collectionRef = collection(firestore, 'PastCollection');
            const querySnapshot = await getDocs(collectionRef);
            let lastCollection = null;

            querySnapshot.forEach(doc => {
                const data = doc.data();
                if (!lastCollection || new Date(data.EndDate) > new Date(lastCollection.EndDate)) {
                    lastCollection = data;
                }
            });

            return lastCollection;

        } catch (e) {
            console.error('Error getting last collection date:', e);
            throw new Error(e.message);
        }
    }

    static async addPastCollection() {
        try {
            const collectionData = await Collection.getCollectionByDate();
            
            if (!collectionData.success || !collectionData.data || collectionData.data.length === 0) {
                throw new Error("No new data to add to PastCollection");
            }
            
            let startDate = null;
            const endDate = new Date(); 
            const bottleCounts = {};
            
            collectionData.data.forEach(dateEntry => {
                const currentDate = new Date(dateEntry.date);
                
                if (!startDate || currentDate < startDate) {
                    startDate = currentDate;
                }
                
                const bottles = dateEntry.bottles;
                Object.keys(bottles).forEach(bottleType => {
                    if (!bottleCounts[bottleType]) {
                        bottleCounts[bottleType] = 0;
                    }
                    bottleCounts[bottleType] += bottles[bottleType];
                });
            });
            
            const newCollection = {
                StartDate: Timestamp.fromDate(startDate),
                EndDate: Timestamp.fromDate(endDate),
                Count: bottleCounts
            };
            
            const pastCollectionRef = collection(firestore, 'PastCollection');
            const docRef = await addDoc(pastCollectionRef, newCollection);
            
            return { 
                success: true, 
                message: "Past collection added successfully", 
                id: docRef.id,
                data: {
                    StartDate: startDate,
                    EndDate: endDate,
                    Count: bottleCounts
                }
            };
            
        } catch (error) {
            console.error('Error adding past collection:', error);
            throw new Error(error.message);
        }
    }
}

module.exports = Collection;