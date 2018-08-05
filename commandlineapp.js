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
prompts.question("Please enter the output type number. Type 1 or 2 or 3:" + "   ", function (inputNumber) {
    var messgaeForInputFileName = "";
    if (inputNumber === '1') {
        messgaeForInputFileName = "The output-" + inputNumber + " is as following:";
        // get_files(function (result) { console.log(result); 
        // });
    }
    else if (inputNumber === '2') {
        messgaeForInputFileName = "The output-" + inputNumber + " is as following:";
    }
    else if (inputNumber === '3') {
        messgaeForInputFileName = "The output-" + inputNumber + " is as following:";
    }
    else {
        messgaeForInputFileName = "Sorry, You can only enter 1 or 2 or 3";
    }
    console.log(messgaeForInputFileName);
    process.exit();
});

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