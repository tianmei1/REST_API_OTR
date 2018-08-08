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

//file folder url
const inputfile_dir = './input_files';
//push the name of all files into array.
var fileNameArray = [];
var fileName;
var fileContents = {};
var allRecordsArray;
//get_files function defined to return all records in the folder.
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
        console.log('You have put totally ' + fileNameArray.length + ' files in the input_files folder');
        return result(fileContents);
    });
}
console.log('=======================================================================================');
console.log("*Output-1: sorted by gender (females before males) then by last name ascending.");
console.log("*Output-2: sorted by birth date, ascending.");
console.log("*Output-3: sorted by last name, descending.");
console.log('---------------------------------------------------------------------------------------');
//callback get_files function to get records in result.
get_files(function (result) {
    rl.question("Please choose one Output type. Enter 1 or 2 or 3:" + "   ", function (inputNumber) {
        var recordArray;
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
        //all records store in json data.
        // var data = arrayToJson(recordArray);
        var data = recordArray;
        postByRequest(data);
        //TODO:We can also use post by http.
        // postByHttp(data);
    });
});

//share functions in method
// var methods = {};
// methods = {
//     //sort array by last name ascending
//     lastNameAscending: function (a, b) {
//         var A = a[0];
//         var B = b[0];
//         A = A.toLowerCase();
//         B = B.toLowerCase();
//         if (A < B) return -1;
//         if (A > B) return 1;
//         return 0;
//     },
//     //sort array by last name descending
//     lastNameDescending: function (a, b) {
//         var A = a[0];
//         var B = b[0];
//         A = A.toLowerCase();
//         B = B.toLowerCase();
//         if (A < B) return 1;
//         if (A > B) return -1;
//         return 0;
//     },
//     //sort array by birthDate.
//     birtDateAscending: function (a, b) {
//         var A = a[4];
//         var B = b[4];
//         A = Date.parse(A);
//         B = Date.parse(B);
//         if (A > B) return 1;
//         if (A < B) return -1;
//         return 0;
//     },
//     //return by female first.
//     ladyFirst: function (records) {
//         var sexySortArray = [];
//         for (var i = 0; i < records.length; i++) {
//             if (records[i][2][0] === "F") {
//                 sexySortArray.push(records[i]);
//             }
//         }
//         for (var i = 0; i < records.length; i++) {
//             if (records[i][2][0] === "M") {
//                 sexySortArray.push(records[i]);
//             }
//         }
//         return sexySortArray;
//     },
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
// };
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

function postByRequest(data) {
    //*****************request method post data from client end to server*********************//
    var options = {
        headers: { "Connection": "close" },
        url: 'http://localhost:3000/records',
        method: 'POST',
        json: true,
        body: data
    };
    request(options, callback);
}
//get status from server.
function callback(error, response, data) {
    console.log('statuscode:' + response.statusCode);
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
