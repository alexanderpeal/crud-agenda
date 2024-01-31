/**
 * index.js
 * Entry point for application.
 */

const apiVersion = process.env.API_VERSION || 'v1';

const cors = require('cors');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {engine} = require('express-handlebars');

const taskRoutes = require(`./${apiVersion}/routes/task-routes`);

require('dotenv').config({path: './src/v1/config/.env'});

// Set up express application
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'handlebars');

const viewsPath = path.join(__dirname, `/${apiVersion}/views/layouts`)
app.set('views', viewsPath);
app.engine('handlebars', engine({
    defaultLayout: 'tasks',
    layoutsDir: path.join(__dirname, `/${apiVersion}/views/layouts`)
}));

app.use(`/api/${apiVersion}/tasks`, taskRoutes);

// connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database successfully connected");
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `./${apiVersion}/views/index.html`));
});

// run server
app.listen(5000, () => {
    console.log(`Server running on port 5000, API ${apiVersion}`);
});