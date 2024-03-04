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
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRouter = require(`./src/api/${apiVersion}/routes/task-router`);
const { connectDB, clearDB } = require('./src/config/database');

// Configure express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(`/api/${apiVersion}/tasks`, taskRouter);

// Connect to MongoDB
connectDB();


// mongoose.connect(process.env.DEV_DB_URI);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, "MongoDB connection error: "));
// db.once('open', () => {
//     console.log("MongoDB database successfully connected");
// });

let server;

// Start the server 
if (require.main === module) {
    server = app.listen(PORT, () => {
        console.log(`Server running on port 3001, API ${apiVersion}`);
    });
}

module.exports = app;