const cors = require('cors')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

app.use(express.json());
app.use(cors());

const dishesRoute = require('./routes/dishes');

app.use('/api/dishes', dishesRoute);

app.get('/', (req, res) => {
    res.send('Welcome To Foodie!');
});

// Connecting db
mongoose.connect(
    process.env.DB_CONNECTION,
    () => console.log('connected to the database')
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});
