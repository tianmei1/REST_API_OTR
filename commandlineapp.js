#!/usr/bin/env node
//command line app read data from three types of input files. Do data parse and sort.
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
    var recordsArray=[];
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
        for(var j=0; j<txtContent.length;j++){
            var singleFilerecordArray = readRecordByLine(txtContent[j]);
            for(var i = 0 ; i <singleFilerecordArray.length ; i++){
                recordsArray.push(singleFilerecordArray[i]);
            }
        }
        sortToOutput1(recordsArray);
        console.log(recordsArray);
    }
    else if (inputNumber === '2') {
        messgaeForInputFileName = "The output-" + inputNumber + " is as following:";
        console.log(messgaeForInputFileName);
    }
    else if (inputNumber === '3') {
        messgaeForInputFileName = "The output-" + inputNumber + " is as following:";
        console.log(messgaeForInputFileName);
    }
    else {
        messgaeForInputFileName = "Sorry, You can only enter 1 or 2 or 3";
        console.log(messgaeForInputFileName);
    }
    process.exit();
});
});

function sortToOutput1(records){
    for(var i=0; i< records.length; i++){
        
    }
}
function sortToOutput2(txtstring){

}
function sortToOutput2(txtstring){

}
//get every single record from signle file into one string array. 
function readRecordByLine(txtstring){
    var singleFileArray = txtstring.split('\r\n');
    var singleRecordArray =[];
    if(singleFileArray[0].includes(',')){     
        for(var i=0; i< singleFileArray.length; i++){
            singleRecordArray.push(singleFileArray[i].split(','));
        }
    }
    else if(singleFileArray[0].includes('|')){
        for(var i=0; i< singleFileArray.length; i++){
            singleRecordArray.push(singleFileArray[i].split('|'));
        }
    }
    else if(singleFileArray[0].includes(' ')){
        for(var i=0; i< singleFileArray.length; i++){
            singleRecordArray.push(singleFileArray[i].split(' '));
        }
    }
    return singleRecordArray;
}
// console.log(fileNameArray);
// console.log(fileNumber);
// console.log(fileContents["Comma-delimited.txt"]);
// prompts.question("How many glass of water do you drink each day?", function (fileName) {
//     var messgaeForInputFileName = "";
//     if (fileName !== undefined) {
//         fileName = "Great! Water is the key of a healthy life.";
//     } else {
//         fileName = "Are you drinking just " + glasses + " glass of water? You should drink at least " + (6 - glasses) + " more.";
//     }
//     console.log(fileName);
//     process.exit();
// });
// var fileUrl = "input_files/" + fileName;
// var fileContent;
// try {
//     fileContent = fs.readFileSync(fileUrl, "utf-8");
// } catch (err) {
//     if (err.code === 'ENOENT') {
//         console.log('File not found!');
//     } else {
//         throw err;
//     }
// }
// if (fileContent === undefined || fileContent === null) {
//     console.log("No records found!");
// }
// else {
//     console.log(fileContent);
// }