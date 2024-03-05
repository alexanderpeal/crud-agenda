/**
 * Entry point for the application.
 * 
 * @requires express
 * @since 2024-03-01
 * @author Alexander Peal
 */

require('dotenv').config({path: `./.env`});
const apiVersion = process.env.API_VERSION || 'v1';
const PORT = process.env.PORT || 3001;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRouter = require(`./src/api/${apiVersion}/routes/task-router`);
const { connectDB } = require('./src/config/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(`/api/${apiVersion}/tasks`, taskRouter);

if (process.env.NODE_ENV !== 'test') {
    console.log('NODE_ENV !== test: connecting to DB');
    connectDB();
} else {
    console.log('NODE_ENV === test: not connecting to DB');
}

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port 3001, API ${apiVersion}`);
    });
}

module.exports = app;