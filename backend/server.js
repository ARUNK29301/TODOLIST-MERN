const express = require('express');
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');

const crudRoutes = require('./routes/crud');

const app = express();
const MONGODBURL = "mongodb+srv://arunkandhasamy29:123asd@cluster0.xlnibjs.mongodb.net/todotest?retryWrites=true&w=majority&appName=Cluster0";
app.use(express.json());
// mongodb+srv://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Define routes
app.get('/', (req, res) => {
    res.send("Server is Running");
});
app.use(crudRoutes);

app.use((error, req, res, next) => {

    console.log(error);
    res.status(error.statusCode || 500).json({
        message: error.message,
        data: error.data
    });

});

mongoose.connect(MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to MongoDB')
        app.listen(5001);
    })
    .catch(error => {
        console.log(error);
    });
