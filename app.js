const express = require('express');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', UserRoutes);

// Sample route for testing
app.get('/', (req, res) => {
  res.send('Hello, Firebase and Express!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
