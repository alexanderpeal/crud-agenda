const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { engine } = require('express-handlebars');

const taskRoutes = require('./routes/taskRoutes'); // import task routes
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // serve static files
app.set('view engine', 'handlebars');
app.engine('handlebars', engine({
    defaultLayout: false,
    layoutsDir: 'views/layouts'
}));

// connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database successfully connected");
});

// Use routes
app.use('/tasks', taskRoutes);

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
});

// run server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});