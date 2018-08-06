#!/usr/bin/env node
//command line app read data from three types of input files. Do data parse and sort.
const express = require('express');
const app = express();
const fs = require('fs');
const readline = require('readline');

var prompts = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//file floder url
const inputfile_dir = './input_files';
//push the name of all files into array.
var fileNameArray = [];
var fileName;
//get the number of files in the input_files floder.
var fileContents = {};
var get_files = function (result) {
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
        return result(fileContents);
    });
}
console.log('=======================================================================================');
console.log("*Output-1: sorted by gender (females before males) then by last name ascending.");
console.log("*Output-2: sorted by birth date, ascending.");
console.log("*Output-3: sorted by last name, descending.");
console.log('---------------------------------------------------------------------------------------');
get_files(function (result) {
    prompts.question("Please enter the output type number. Type 1 or 2 or 3:" + "   ", function (inputNumber) {
        var messgaeForInputFileName = "";
        var recordsArray = [];
        var recordJson = {};
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
            recordJson = output1Array;
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
            recordJson = output2Array;
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
            recordJson = output3Array;
        }
        else {
            messgaeForInputFileName = "Sorry, You can only enter 1 or 2 or 3";
            console.log(messgaeForInputFileName);
        }
        // const server = http.createServer((req, res) =>{
        app.get('/', (req, res) => {
            res.send('POST /records - accepts a record, or json array of records.<br>' +
                'GET /records/gender - returns all records in json format, sorted by gender<br>' +
                'GET /records/birthdate - returns all records in json format, sorted by birth date<br>' +
                'GET /records/name - returns all records in json format, sorted by name');
            res.end();
        });
        app.get('/records', (req, res) => {
            res.send(arrayToJson(recordJson));
            res.end();
        });
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log('listening on port'+ port+'...'));
        // process.exit();
    });
});
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