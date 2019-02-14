require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes');
const path = require('path');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
const useJWT = require('./config/passport');
useJWT(passport);

// Routes
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.use('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server running on port ${port}`))