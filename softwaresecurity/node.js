// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Initialize Express app
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;

async function connectToDB() {
  try {
    await client.connect();
    const database = client.db('mydatabase');
    collection = database.collection('inputs');
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDB();

// Route to handle POST requests to submit input
app.post('/submit', async (req, res) => {
  const { input } = req.body;

  try {
    const result = await collection.insertOne({ input });
    res.status(201).json({ message: 'Input submitted successfully', data: result.ops[0] });
  } catch (error) {
    console.error('Error saving input to the database:', error);
    res.status(500).json({ error: 'Error saving input to the database' });
  }
});

// Route to get all submitted inputs
app.get('/inputs', async (req, res) => {
  try {
    const inputs = await collection.find().toArray();
    res.json(inputs);
  } catch (error) {
    console.error('Error retrieving inputs from the database:', error);
    res.status(500).json({ error: 'Error retrieving inputs from the database' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
