// Module dependincies
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var methods = require('./methods.js');
// set app as global
app = express();
//user for parser json in body.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//use error handle in express to ensure that Express catches all errors that occur while running route handlers and middleware.
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send({ "Error": err.stack });
});
//Node server default is localhost:3000. If deployed in another host, will change to process env address.
app.set('port', process.env.PORT || 3000);
//set default index provide a introduction for user
app.get('/', (req, res) => {
    res.send('POST /records - accepts a record, or json array of records.<br>' +
        'GET /records/gender - returns all records in json format, sorted by gender<br>' +
        'GET /records/birthdate - returns all records in json format, sorted by birth date<br>' +
        'GET /records/name - returns all records in json format, sorted by name');
    res.end();
});
//store accept records as obj. 
var recordArray=[];
//handler the post for '/records'. Accept array of records from step 1 (user chose the format type).
app.post('/records', function(request, response){
    //store all records in recordArray
    //TODO: remove duplicate records.
    recordArray = request.body.concat(recordArray);
    console.log(recordArray);
    console.log('Totally '+printLenthOfJSON(recordArray)+' records have been accepted');
	response.send(JSON.stringify({ status:"accepts records successfully!" }));
	response.end();
});

app.get('/records/gender', (req, res) => {
    var sortBysexyArray =methods.ladyFirst(recordArray);
    var jsonRecords = arrayToJson(sortBysexyArray);
    res.send(jsonRecords);
    console.log('return all records in JSON and sorted by gender');
    res.end();
});

app.get('/records/birthdate', (req, res) => {
    var sortBybirthDateArray = recordArray.sort(methods.birtDateAscending);
    var jsonRecords = arrayToJson(sortBybirthDateArray);
    res.send(jsonRecords);
    res.end();
});

app.get('/records/name', (req, res) => {
    var sortByLastNameArray = recordArray.sort(methods.lastNameAscending);
    var jsonRecords = arrayToJson(sortByLastNameArray);
    res.send(jsonRecords);
    res.end();
});


function printLenthOfJSON(obj){
    var count = Object.keys(obj).length;
    return count;
}

//Transfer array records to records in JSON. 
function arrayToJson(recordArray) {
    var recordJson = {};
    for (var i = 0; i < recordArray.length; i++) {
        var singlerecord = {};
        for (var j = 0; j < recordArray[i].length; j++) {
            if (j === 0) {
                singlerecord['LastName'] = recordArray[i][0];
            }
            else if (j === 1) {
                singlerecord['FirstName'] = recordArray[i][1];
            }
            else if (j === 2) {
                singlerecord['Gender'] = recordArray[i][2];
            }
            else if (j === 3) {
                singlerecord['FavoriteColor'] = recordArray[i][3];
            }
            else {
                singlerecord['BirthDate'] = recordArray[i][4];
            }
        }
        recordJson[i] = singlerecord;
    }
    return recordJson;
}
//////////////////////////////////
//Start Server.
//////////////////////////////////
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});