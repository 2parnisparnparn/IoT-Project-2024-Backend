const { collection, setDoc, doc, query, where, getDocs } = require('firebase/firestore');
const firestore = require('../config/firebase');

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
    await setDoc(doc(collection(firestore, "Users"), phone_number), userData);
    res.status(200).send(`User added with phone number: ${phone_number}`);
  } catch (e) {
    res.status(500).send('Error adding user: ' + e.message);
  }
};

// Get user by phone number
exports.getUserByPhoneNumber = async (req, res) => {
  const { phone_number } = req.query;

  try {
    const userQuery = query(collection(firestore, "Users"), where("phone_number", "==", phone_number));
    const querySnapshot = await getDocs(userQuery);
    
    if (querySnapshot.empty) {
      return res.status(404).send('User not found');
    }

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(users);
  } catch (e) {
    res.status(500).send('Error fetching user: ' + e.message);
  }
};
