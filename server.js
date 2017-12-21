//Import requiered packages
const express = require('express');
const pg = require('pg');
const qs = require('querystring');

//Create the conection to the postgres server
const client = new pg({
    connectionString: process.env.DATABASE_URL
});

//Connect to the server
client.connect();

//Create the express app
const app = express();

//Configure parsing of request body
app.use(bodyParser.urlencoded({
    extended: true
}));

//Parse the JSON body
app.use(bodyParser.json());

//Handle a post request at /query
app.post('/query', (req, res) => {

    let query = req.body.query;

    //Send the query and return the result as  JSON
    client.query(query, (err, res) => {
        if (err) console.log("error");

        res.end(JSON.stringify(res.rows));
    });

});

const port = process.env.PORT || 8080;

//Start listening
const server = app.listen(port, function () {
   console.log("App listening at ${host}")
});