/**
 * index.js
 * 
 * Entry point for the application.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {engine} = require('express-handlebars');

// API versioning
const apiVersion = process.env.API_VERSION || 'v1';

// Configure dotenv with proper API version
require('dotenv').config({path: `./src/${apiVersion}/config/.env`});

// Routes
const taskRoutes = require(`./src/${apiVersion}/routes/task-routes`);

// Initialize Express app
const app = express();

// Configure Express middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Handlebars view engine setup
app.set('view engine', 'handlebars');
const layoutsDirPath = path.join(__dirname, `/${apiVersion}/views/layouts`)
app.engine('handlebars', engine({
    defaultLayout: 'tasks',
    layoutsDir: path.join(__dirname, `/${apiVersion}/views/layouts`)
}));
app.set('views', layoutsDirPath);

// API routes
app.use(`/api/${apiVersion}/tasks`, taskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error: "));
db.once('open', () => {
    console.log("MongoDB database successfully connected");
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `./${apiVersion}/views/index.html`));
});

// Start the server
app.listen(3001, () => {
    console.log(`Server running on port 3001, API ${apiVersion}`);
});