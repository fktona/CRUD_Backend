const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); // Require the cors middleware

app.use(cors())
app.use(bodyParser.json());

// Store the data sent by the client in an array
const personData = [];

// Handle POST request to create a person
app.post('/api', (req, res) => {
    const { name, age, email } = req.body;
    
    // Store the data in an array
    personData.push({ name, age, email });

    res.json({ message: 'Person data received and stored successfully' });
});

// Handle GET request to display all person data
app.get('/api', (req, res) => {
    if (personData.length > 0) {
        res.json(personData);
    } else {
        res.json({ message: 'No person data available' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
