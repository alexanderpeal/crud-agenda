const express = require('express');
const path = require('path');

const app = express();

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});