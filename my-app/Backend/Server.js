// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/candidatesDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Define a schema and model for candidates
const candidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    socialLinks: {
        linkedIn: String,
        facebook: String,
        twitter: String,
        github: String,
    },
    city: String,
    companyName: String,
    jobTitle: String,
    status: String,
    owner: String,
});

const Candidate = mongoose.model('Candidate', candidateSchema);

app.use(cors());
app.use(express.json());

// Endpoint to get all candidates
app.get('/candidates', async (req, res) => {
    const candidates = await Candidate.find();
    res.json(candidates);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
