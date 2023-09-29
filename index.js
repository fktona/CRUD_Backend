const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./secret.json')
require('dotenv').config()





admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_LINK, 
});

const app = express();
app.use(express.json());
app.use(cors())




app.post('/api', async (req, res) => {
  try {
    const { name, age, email } = req.body; 
    
    const personRef = admin.firestore().collection('people');
    const docRef = await personRef.add({ name, age, email });
    res.json({ id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a person' });
  }
});
app.post('/api/video', async (req, res) => {
  try {
    const { url} = req.body; 
    
    const videoLinkRef = admin.firestore().collection('videoLink');
    const docRef = await videoLinkRef.add({ url });
    res.json({ id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a person' });
  }
});




// geting list of all the users present 
app.get('/api/videolink/links', async (req, res) => {
  try {
    // Reference the "videoLink" collection in Firestore
    const videoLinkRef = admin.firestore().collection('videoLink');

    // Use the get method to retrieve all documents in the collection
    const snapshot = await videoLinkRef.get();

    // Initialize an array to store the video link data
    const videoLinks = [];

    // Iterate over the documents in the snapshot
    snapshot.forEach((doc) => {
      // Extract the data from each document
      const videoLinkData = doc.data();

      // Push an object containing the document ID and video link data to the array
      videoLinks.push({ id: doc.id, ...videoLinkData });
    });

    // Send the array of video link data as a JSON response
    res.json(videoLinks);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch video links' });
  }
});



app.get('/api/allusers', async (req, res) => {
  try {
    const personRef = admin.firestore().collection('people');
    const snapshot = await personRef.get();
    const users = [];
    snapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({ id: doc.id, ...userData });
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch all users' });
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


// Searching through the users By their registered name
app.get('/api/byname/:userName', async (req, res) => {
  try {
    const userName = req.params.userName;
    const personRef = admin.firestore().collection('people');
    const querySnapshot = await personRef.where('name', '==', userName).get();
    if (querySnapshot.empty) {
      res.status(404).json({ error: 'Person not found' });
      return;
    }
    const users = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({ id: doc.id, ...userData });
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve person by name' });
  }
});



// Add User by Name
app.post('/api/byname', async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const personRef = admin.firestore().collection('people');
    const docRef = await personRef.add({ name, age, email });
    res.json({ id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add a person by name' });
  }
});



// Removing  user from database 
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
