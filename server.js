const express = require('express');
const app = express();
//user for parser json in body.
// const bodyParser = require('body-parser');
// app.use(bodyParser());
app.get('/', (req, res) => {
    res.send('POST /records - accepts a record, or json array of records.<br>' +
        'GET /records/gender - returns all records in json format, sorted by gender<br>' +
        'GET /records/birthdate - returns all records in json format, sorted by birth date<br>' +
        'GET /records/name - returns all records in json format, sorted by name');
    res.end();
});
var recordsJSON;
app.post('/records', (req, res) => {
    // res.send(req.body);
    res.send('records recieved!');
    recordsJSON = JSON.stringify(req.body);
    res.end(JSON.stringify(req.body));
    console.log(recordsJSON);
});
console.log(recordsJSON);
//Node server default is localhost:3000. If deployed in another host, will change to process address.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port'+ port+'...'));