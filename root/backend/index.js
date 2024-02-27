/**
 * index.js
 * Entry point for the application.
 * 2024-02-27
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {engine} = require('express-handlebars');

// API versioning
require('dotenv').config({path: `./src/config/.env`});

const apiVersion = process.env.API_VERSION || 'v1';
const taskRouter = require(`./src/${apiVersion}/routes/task-router`);

// Configure express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(`/api/${apiVersion}/tasks`, taskRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error: "));
db.once('open', () => {
    console.log("MongoDB database successfully connected");
});

// Start the server
app.listen(3001, () => {
    console.log(`Server running on port 3001, API ${apiVersion}`);
});

// Handlebars view engine setup
// app.set('view engine', 'handlebars');
// const layoutsDirPath = path.join(__dirname, `/${apiVersion}/views/layouts`)
// app.engine('handlebars', engine({
//     defaultLayout: 'tasks',
//     layoutsDir: path.join(__dirname, `/${apiVersion}/views/layouts`)
// }));
// app.set('views', layoutsDirPath);

// API routes
// Serve index.html for the root route
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, `./${apiVersion}/views/index.html`));
// });