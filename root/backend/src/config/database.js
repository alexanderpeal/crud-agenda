// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    let DB_URI;

    switch (process.env.NODE_ENV) {
        case 'production':
            DB_URI = process.env.PROD_DB_URI;
            break;
        case 'test':
            DB_URI = process.env.TEST_DB_URI;
            break;
        default:
            DB_URI = process.env.DEV_DB_URI;
    }

    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // other options
        });
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;