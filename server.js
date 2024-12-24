// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize project folder
app.use(express.static('website'));

// Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Callback function to GET 
app.get('/all', (req, res) => {
    res.send(projectData);
});

// Post
app.post('/add', (req, res) => {
    const { temperature, date, userResponse } = req.body;
    projectData = { temperature, date, userResponse };
    res.send(projectData);
});
