//Import requiered packages
const express = require('express');
const {Client} = require('pg');

//Create the conection to the postgres server
const client = new Client({
    connectionString: process.env.DATABASE_URL
});

//Connect to the server
client.connect();

//Create the express app
const app = express();

//Handle a post request at /query
app.post('/query', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    console.log("Receiving request");
    console.log(req);
    res.send(JSON.stringify({
        result: "Hola"
    }));
});

const port = process.env.PORT || 8080;

//Start listening
const server = app.listen(port, function () {
   console.log("App listening at ${host}")
});