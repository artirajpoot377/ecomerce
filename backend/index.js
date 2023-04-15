const connectToMongo = require('./db');
connectToMongo()
const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');

const app = express();

app.use(express.json());



app.use("/", route);

app.listen( process.env.PORT || 5000, () => {
    console.log('Server running on port', (process.env.PORT || 5000));
})


