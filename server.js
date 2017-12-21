//Import requiered packages
const express = require('express');
const {Client} = require('pg');
const bodyParser = require("body-parser");

//Create the conection to the postgres server
const client = new Client({
    connectionString: process.env.DATABASE_URL
});

//Connect to the server
client.connect();

//Create the express app
const app = express();

//Use body-parser as middleware. Parse the body as JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Handle a post request at /query
app.post('/query', (req, res) => {
    console.log("Receiving request")
    console.log(req);
    let query = req.body.query;

    //Send the query and return the result as  JSON
    client.query(query, (err, r) => {
        if (err) console.log("error");

        res.end(JSON.stringify(r.rows));
    });

});

const port = process.env.PORT || 8080;

//Start listening
const server = app.listen(port, function () {
   console.log("App listening at ${host}")
});