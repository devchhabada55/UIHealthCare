const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nutritionRoutes = require('./routes/nutrition');
const physicalHealthRoutes = require('./routes/physicalHealth');
const mentalHealthRoutes = require('./routes/mentalHealth');
const sleepRoutes = require('./routes/sleep');
const pdfRoutes = require('./routes/upload-pdf'); // Ensure this is correctly imported
const chatbotRoutes = require('./routes/chatbot');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://chhabadadev:ayaJvPK5nxlJfMXF@clusterone.gim2bek.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne'; // Replace with your actual MongoDB URI

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/physical-health', physicalHealthRoutes);
app.use('/api/mental-health', mentalHealthRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/pdfs', pdfRoutes); // Ensure this route is mounted
app.use('/api/chatbot', chatbotRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});