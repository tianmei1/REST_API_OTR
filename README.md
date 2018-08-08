# REST_API_OTR

command line app and one server RESTful API build based on node.js

js files: commandlineapp.js, server.js, methods.js.

test records files:  Pipe-delimited.txt, Space-delimited.txt, Comma-delimited.txt.

1.cd to REST_API_OTR folder.

2.Run RESTful API by type: "node server.js".

3.Run commandlineapp by type: "node commandlineapp.js".

4.In the command line terminal, type in number 1 or 2 or 3 to choose what kind of outputs you want.

5.comandline app will do the post automatically to the REST API server.

6.you can exit commandline app by enter ctrl+c.

7.You can try open another new terminal to run commandline app and post records at the same time.

8.You can use 'postman' to test the get request for REST API. (google search: "postman google appstore"). 

● GET /records/gender - returns all records in json format, sorted by gender
● GET /records/birthdate - returns all records in json format, sorted by birth date
● GET /records/name - returns all records in json format, sorted by name
