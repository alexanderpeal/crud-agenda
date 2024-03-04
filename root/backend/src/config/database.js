const mongoose = require('mongoose');
const Task = require('../models/task');
require('dotenv').config();

const connectDB = async () => {
    const DB_URIs = {
        production: process.env.PROD_DB_URI,
        test: process.env.TEST_DB_URI,
        development: process.env.DEV_DB_URI,
    };

    const DB_URI = DB_URIs[process.env.NODE_ENV] || DB_URIs.development;

    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB Connected: ${DB_URI}`);
    } catch (err) {
        console.error(`Database connection error: ${err}`);
        process.exit(1);
    }
};

const clearDB = async() => {
    await Task.deleteMany({});
}

module.exports = { connectDB, clearDB };