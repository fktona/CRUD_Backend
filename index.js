const express = require('express');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');// Replace with the path to your service account key file

// Initialize Firebase Admin SDK
const serviceAccount = require('./secret.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const app = express();
app.use(express.json());

// API routes for CRUD operations
// CREATE: Adding a new person
app.post('/api', async (req, res) => {
  try {
    const { name, age, email } = req.body; // Assuming your person object has these fields
    //const personRef = db.collection('people');
   // const docRef = await personRef.doc('54').set({ name, age, email });
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a person' });
  }
});

// READ: Fetching details of a person
app.get('/api/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const personRef = admin.firestore().collection('people').doc(userId);
    const snapshot = await personRef.get();
    if (!snapshot.exists) {
      res.status(404).json({ error: 'Person not found' });
      return;
    }
    const personData = snapshot.data();
    res.json(personData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch person' });
  }
});

// UPDATE: Modifying details of an existing person
app.put('/api/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, age, email } = req.body;
    const personRef = admin.firestore().collection('people').doc(userId);
    await personRef.update({ name, age, email });
    res.json({ message: 'Person updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update person' });
  }
});

// DELETE: Removing a person
app.delete('/api/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const personRef = admin.firestore().collection('people').doc(userId);
    await personRef.delete();
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete person' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
