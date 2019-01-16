require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

const port = process.env.PORT || 5000;

// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// Routes
app.use('/', routes);

app.listen(port, () => console.log(`Server running on port ${port}`))