//command line app read data from three types of input files. Do data parse and sort.
var fs = require('fs');
var readline = require('readline');
//use 'request' or 'http' method post data from client side to server side.
var request = require('request');
var http = require('http');
var methods = require('./methods.js');

//create question for user. Based on user input to show defffrient Outputs.
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//input_files folder url
var inputfile_dir = './input_files';
//push the name of all files into array.
var fileNameArray = [];
var fileName;
var fileContents = {};

//get_files function defined to return all records in the folder.
var get_files = function (callback) {
    //read './input_files' folder and get all files in this folder.
    fs.readdir(inputfile_dir, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        if (!files.length) {
            return console.log('No file in input_files foler, please add your file again.');
        }
        for (var i = 0; i < files.length; i++) {
            //get all file names in the input_files folder.
            fileName = files[i];
            var fileUrl = "input_files/" + fileName;
            if (fileName !== undefined && fileName !== null) {
                //get number of files by count the file name.
                fileNameArray.push(fileName);
                try {
                    //push string records in each file into fileContents Json array.
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
        console.log('You have put totally ' + fileNameArray.length + ' files in the input_files folder');
        return callback(fileContents);
    });
};
console.log('=======================================================================================');
console.log("*Output-1: sorted by gender (females before males) then by last name ascending.");
console.log("*Output-2: sorted by birth date, ascending.");
console.log("*Output-3: sorted by last name, descending.");
console.log('---------------------------------------------------------------------------------------');
// get records in callback.
get_files(function (callback) {
    rl.question("Please choose one Output type. Enter Number 1 or 2 or 3:" + "   ", function (inputNumber) {
        var recordArray;
        var messgaeForInputFileName = "";
        var recordsOfAllFilesArray = [];
        var txtContentInallFilesArray = [];
        //take out txt strings for each file from callback and put into txtContentInallFilesArray.
        for (var key in callback) {
            if (callback.hasOwnProperty(key)) {
                txtContentInallFilesArray.push(callback[key]);
            }
        }
        //get all records from all files txt contents and put in one array.
        for (var j = 0; j < txtContentInallFilesArray.length; j++) {
            //read records line by line from text contents in each file.
            var recordsOfOneFileArray = readRecordByLine(txtContentInallFilesArray[j]);
            for (var i = 0; i < recordsOfOneFileArray.length; i++) {
                recordsOfAllFilesArray.push(recordsOfOneFileArray[i]);
            }
        }
        if (inputNumber === '1') {
            messgaeForInputFileName = "The output-" + inputNumber + " is as following:";
            console.log(messgaeForInputFileName);
            var output1Array = sortToOutput1(recordsOfAllFilesArray);
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
            var output2Array = sortToOutput2(recordsOfAllFilesArray);
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
            var output3Array = sortToOutput3(recordsOfAllFilesArray);
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
        //all records store in json array data.
        var data = recordArray;
        //post data by request method (from command line app client end to RESTful API server end).
        postByRequest(data);
        //TODO:We can also use post by http method for post data from client-end to server-end, more coding but effective.
        // postByHttp(data);
    });
});

//return sorted array for Output-1
function sortToOutput1(records) {
    //sort by lady first.
    var sexySortArray = methods.ladyFirst(records);
    //sort by last name and return.
    return (sexySortArray.sort(methods.lastNameAscending));
}
//return sorted array for Output-2
function sortToOutput2(records) {
    return (records.sort(methods.birtDateAscending));
}
//return sorted array for Output-3
function sortToOutput3(records) {
    return (records.sort(methods.lastNameDescending));
}

//read records from txt line by line, return an array contains all records in one file. 
function readRecordByLine(txtFromOneFile) {
    //get records array line by line.
    //in windows and mac , linux, line break are different. May lead to empty array produced.
    var splitArray = txtFromOneFile.split(/\r\n|\n|\r/);
    var txtArrayWithDelimited = [];
    //get rid of empty array.
    for (var i = 0; i < splitArray.length; i++) {
        if (splitArray[i]) {
            txtArrayWithDelimited.push(splitArray[i]);
        }
    }
    var pureRecordsArray = [];
    //get pure record without delimited, put each record in one array.
    if (txtArrayWithDelimited[0].includes(',')) {
        for (var i = 0; i < txtArrayWithDelimited.length; i++) {
            pureRecordsArray.push(txtArrayWithDelimited[i].split(','));
        }
    }
    else if (txtArrayWithDelimited[0].includes('|')) {
        for (var i = 0; i < txtArrayWithDelimited.length; i++) {
            pureRecordsArray.push(txtArrayWithDelimited[i].split('|'));
        }
    }
    else if (txtArrayWithDelimited[0].includes(' ')) {
        for (var i = 0; i < txtArrayWithDelimited.length; i++) {
            pureRecordsArray.push(txtArrayWithDelimited[i].split(' '));
        }
    }
    return pureRecordsArray;
}

//*****************request method post data from client end to server*********************//
function postByRequest(data) {
    var options = {
        headers: { "Connection": "close" },
        url: 'http://localhost:3000/records',
        method: 'POST',
        json: true,
        body: data
    };
    request(options, callbackForRequest);
}
//get status from server.
function callbackForRequest(error, response, data) {
    if (!error && response.statusCode == 200) {
        console.log('----info------', data);
    }
}
//we can also use http method do post. It is also fast.
function postByHttp(data) {
    var headers = {
        'Content-Type': 'application/json'
    };

    var options = {
        host: 'localhost',
        port: 3000,
        path: '/records',
        method: 'POST',
        headers: headers
    };

    var req = http.request(options, function (res) {
        console.log('statuscode:' + res.statusCode);
        res.on('data', function (data) {
            console.log('----info------' + data);
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(JSON.stringify(data));
    req.end();
}