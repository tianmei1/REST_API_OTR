#!/usr/bin/env node
//command line app read data from three types of input files. Do data parse and sort.
const express = require('express');
const app = express();
const fs = require('fs');
var https = require('https');
const readline = require('readline');
const request = require('request');
var $ = require('jQuery');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//create question for user. Based on user input to show defffrient Outputs.
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//file folder url
const inputfile_dir = './input_files';
//push the name of all files into array.
var fileNameArray = [];
var fileName;
var fileContents = {};
var allRecordsArray;
//get_files function defined to return all records in all files.
var get_files = function (result) {
    //read './input_files' folder and get all files in this folder.
    fs.readdir(inputfile_dir, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        for (var i = 0; i < files.length; i++) {
            fileName = files[i];
            fileUrl = "input_files/" + fileName;
            if (fileName !== undefined && fileName !== null) {
                fileNameArray.push(fileName);
                try {
                    //push records into fileContents array.
                    fileContents[fileName] = fs.readFileSync(fileUrl, "utf-8");
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        console.log('File not found!');
                    } else {
                        throw err;
                    }
                }
            }
            else {
                console.log('found file with wrong filename');
            }
        }
        console.log('You have put totally '+fileNameArray.length +' files in the input_files folder');
        return result(fileContents);
    });
}
console.log('=======================================================================================');
console.log("*Output-1: sorted by gender (females before males) then by last name ascending.");
console.log("*Output-2: sorted by birth date, ascending.");
console.log("*Output-3: sorted by last name, descending.");
console.log('---------------------------------------------------------------------------------------');
//callback get_files function to get records store in return result.
function getRecordsArray(callback){
get_files(function (result) {
    rl.question("Please choose one Output type. Enter 1 or 2 or 3:" + "   ", function (inputNumber) {
        var recordArray = {};
        var messgaeForInputFileName = "";
        var recordsArray = [];
        if (inputNumber === '1') {
            messgaeForInputFileName = "The output-" + inputNumber + " is as following:";
            console.log(messgaeForInputFileName);
            var txtContent = [];
            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    txtContent.push(result[key]);
                }
            }
            //put all records from all files into recordsArray.
            for (var j = 0; j < txtContent.length; j++) {
                var singleFilerecordArray = readRecordByLine(txtContent[j]);
                for (var i = 0; i < singleFilerecordArray.length; i++) {
                    recordsArray.push(singleFilerecordArray[i]);
                }
            }
            var output1Array = sortToOutput1(recordsArray);
            for (var i = 0; i < output1Array.length; i++) {
                if (i === 0) {
                    console.log('LastName,FirstName,Gender,FavoriteColor,BirthDate');
                }
                console.log(i + ' ' + output1Array[i]);
            }
            recordArray = output1Array;
        }
        else if (inputNumber === '2') {
            messgaeForInputFileName = "The output-" + inputNumber + " is as following:";
            console.log(messgaeForInputFileName);
            var txtContent = [];
            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    txtContent.push(result[key]);
                }
            }
            //put all records from all files into recordsArray.
            for (var j = 0; j < txtContent.length; j++) {
                var singleFilerecordArray = readRecordByLine(txtContent[j]);
                for (var i = 0; i < singleFilerecordArray.length; i++) {
                    recordsArray.push(singleFilerecordArray[i]);
                }
            }
            var output2Array = sortToOutput2(recordsArray);
            for (var i = 0; i < output2Array.length; i++) {
                if (i === 0) {
                    console.log('LastName,FirstName,Gender,FavoriteColor,BirthDate');
                }
                console.log(i + ' ' + output2Array[i]);
            }
            recordArray = output2Array;
        }
        else if (inputNumber === '3') {
            messgaeForInputFileName = "The output-" + inputNumber + " is as following:";
            console.log(messgaeForInputFileName);
            var txtContent = [];
            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    txtContent.push(result[key]);
                }
            }
            //put all records from all files into recordsArray.
            for (var j = 0; j < txtContent.length; j++) {
                var singleFilerecordArray = readRecordByLine(txtContent[j]);
                for (var i = 0; i < singleFilerecordArray.length; i++) {
                    recordsArray.push(singleFilerecordArray[i]);
                }
            }
            var output3Array = sortToOutput3(recordsArray);
            for (var i = 0; i < output3Array.length; i++) {
                if (i === 0) {
                    console.log('LastName,FirstName,Gender,FavoriteColor,BirthDate');
                }
                console.log(i + ' ' + output3Array[i]);
            }
            recordArray = output3Array;
        }
        else {
            messgaeForInputFileName = "Sorry, You can only enter 1 or 2 or 3";
            console.log(messgaeForInputFileName);
        }
        // xmlhttp = new XMLHttpRequest();
        // xmlhttp.open("GET","http://localhost:3000/records", true);
        // xmlhttp.onreadystatechange=function(){
        //       if (xmlhttp.readyState==4 && xmlhttp.status==200){
        //         string=xmlhttp.responseText;
        //       }
        // }
        // xmlhttp.send(arrayToJson(recordArray));

        var data = arrayToJson(recordArray);
        request.post(
            'http://localhost:3000/records',
            data,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
        // const server = http.createServer((req, res) =>{
        // app.get('/', (req, res) => {
        //     res.send('POST /records - accepts a record, or json array of records.<br>' +
        //         'GET /records/gender - returns all records in json format, sorted by gender<br>' +
        //         'GET /records/birthdate - returns all records in json format, sorted by birth date<br>' +
        //         'GET /records/name - returns all records in json format, sorted by name');
        //     res.end();
        // });
        // app.post('http://localhost:3000/records', (req, res) => {
        //     res.send(arrayToJson(recordArray));
        //     res.end();
        // });

        // $.ajax({
        //     url: "/records",
        //     type: "POST",
        //     dataType: "json",
        //     data: arrayToJson(recordArray),
        //     contentType: "application/json",
        //     cache: false,
        //     timeout: 5000,
        //     complete: function() {
        //       //called when complete
        //       console.log('process complete');
        //     },

        //     success: function(data) {
        //       console.log(data);
        //       console.log('process sucess');
        //    },

        //     error: function() {
        //       console.log('process error');
        //     },
        //   });

        // function xhrPost() {
        //     var data = {'sas':'ass'};
        //     var xhr = new XMLHttpRequest();
            // xhr.withCredentials = true;
            // xhr.addEventListener("readystatechange", function () {
            //   if (this.readyState === 4) {
            //     console.log(this.responseText);
            //   }
            // });
    
            // xhr.open("POST", "http://[serverIP]:3000/records");
            // xhr.setRequestHeader("cache-control", "no-cache");
            // xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
            // xhr.send(JSON.stringify(data));
        //   }
        // var options = {
        //     host: 'http://localhost:3000',
        //     port: 3000,
        //     path: '/rescords',
        //     method: 'POST'
        //   };
        // var req = https.request(options, function(res){
        //     var res ='';
        //     console.log('response from sever start');
        //     res.setEncoding('utf8');
        // }





        //   request(options, function(res) {
        //     console.log('STATUS: ' + res.statusCode);
        //     console.log('HEADERS: ' + JSON.stringify(res.headers));
        //     res.setEncoding('utf8');
        //     res.on(arrayToJson(recordArray), function (chunk) {
        //       console.log('BODY: ' + chunk);
        //     });
        //   }).end();
        // request.post('http://localhost:3000/records', arrayToJson(recordArray));
        callback(recordArray);
        //Node server default is localhost:3000. If deployed in another host, will change to process address.
        // const port = process.env.PORT || 3000;
        // app.listen(port, () => console.log('listening on port'+ port+'...'));
        // process.exit();
    });
});
}
function returnRecordArray(array){
    allRecordsArray = array;
    return allRecordsArray;
}
getRecordsArray(returnRecordArray);
console.log(allRecordsArray);
//sort array by last name ascending
function lastNameAscending(a, b) {
    var A = a[0];
    var B = b[0];
    A = A.toLowerCase();
    B = B.toLowerCase();
    if (A < B) return -1;
    if (A > B) return 1;
    return 0;
}
//sort array by last name descending
function lastNameDescending(a, b) {
    var A = a[0];
    var B = b[0];
    A = A.toLowerCase();
    B = B.toLowerCase();
    if (A < B) return 1;
    if (A > B) return -1;
    return 0;
}
//sort array by birthDate.
function birtDateAscending(a, b) {
    var A = a[4];
    var B = b[4];
    A = Date.parse(A);
    B = Date.parse(B);
    if (A > B) return 1;
    if (A < B) return -1;
    return 0;
}
//return sorted array for Output-1
function sortToOutput1(records) {
    //sort by last name.
    var maleSortArray = [];
    //sort by male and female first.
    for (var i = 0; i < records.length; i++) {
        if (records[i][2][0] === "F") {
            maleSortArray.push(records[i]);
        }
    }
    for (var i = 0; i < records.length; i++) {
        if (records[i][2][0] === "M") {
            maleSortArray.push(records[i]);
        }
    }
    return (maleSortArray.sort(lastNameAscending));
}
//return sorted array for Output-2
function sortToOutput2(records) {
    return (records.sort(birtDateAscending));
}
//return sorted array for Output-3
function sortToOutput3(records) {
    return (records.sort(lastNameDescending));
}
//get every single record from signle file into one string array. 
function readRecordByLine(txtstring) {
    var singleFileArray = txtstring.split('\r\n');
    var singleRecordArray = [];
    if (singleFileArray[0].includes(',')) {
        for (var i = 0; i < singleFileArray.length; i++) {
            singleRecordArray.push(singleFileArray[i].split(','));
        }
    }
    else if (singleFileArray[0].includes('|')) {
        for (var i = 0; i < singleFileArray.length; i++) {
            singleRecordArray.push(singleFileArray[i].split('|'));
        }
    }
    else if (singleFileArray[0].includes(' ')) {
        for (var i = 0; i < singleFileArray.length; i++) {
            singleRecordArray.push(singleFileArray[i].split(' '));
        }
    }
    return singleRecordArray;
}
//Transfer array records to records in JSON. 
function arrayToJson(recordArray){
    var recordJson={};
    for(var i=0; i< recordArray.length; i++){
        var singlerecord = {};
        for(var j=0; j< recordArray[i].length; j++){
            if(j===0){
                singlerecord['LastName']=recordArray[i][0];
            }
            else if(j===1){
                singlerecord['FirstName']=recordArray[i][1];
            }
            else if(j===2){
                singlerecord['Gender']=recordArray[i][2];
            }
            else if(j===3){
                singlerecord['FavoriteColor']=recordArray[i][3];
            }
            else{
                singlerecord['BirthDate']=recordArray[i][4];
            }
        }
        recordJson[i]=singlerecord;
    }
    return recordJson;
}