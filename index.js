const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database successfully connected");
});



// run server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});