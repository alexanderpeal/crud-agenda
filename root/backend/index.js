/**
 * Entry point for the application.
 * 
 * @requires express
 * @since 2024-03-01
 * @author Alexander Peal
 */

// API versioning
require('dotenv').config({path: `./.env`});
const apiVersion = process.env.API_VERSION || 'v1';
const PORT = process.env.PORT || 3001;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRouter = require(`./src/api/${apiVersion}/routes/task-router`);
const { connectDB } = require('./src/config/database');

// Configure express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(`/api/${apiVersion}/tasks`, taskRouter);

// Connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

// Start the server 
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port 3001, API ${apiVersion}`);
    });
}

// Have to do this for testing purposes
module.exports = app;