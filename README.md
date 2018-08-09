# REST_API_OTR

## Command line app and the server RESTful API built based on node.js

## Unit test use mocha and supertest.

#### samples records files in input_files folder:  
```
Pipe-delimited.txt, Space-delimited.txt, Comma-delimited.txt.
```

### Environment requirements: 
```
Node. Details can be find in package.json. You may need to install these modulers if you never use they before.
```
### steps to run App and API

**1**.Download REST_API_OTR folder and Open terminal, cd to REST_API_OTR folder.

**2**.Run RESTful server API first by type: "node server.js".

**3**.Run commandline app by type: "node commandlineapp.js".

**4**.In the command line terminal, type in number 1 or 2 or 3 to choose what kind of outputs you want.

**5**.comandline app will do the post automatically to the REST API server.

**6**.you can exit commandline app by enter ctrl+c.

**7**.You can try open another new terminal to run commandline app and post records at the same time.

**8**.You can use 'postman' to test the get request for REST API. (google search: "postman google appstore"). 
```
● GET /records/gender - returns all records in json format, sorted by gender

● GET /records/birthdate - returns all records in json format, sorted by birth date

● GET /records/name - returns all records in json format, sorted by name
```

## Unit test: npm Install mocha and supertest.

**1**.open terminal , cd to REST_API_OTR folder.

**2**.type 'mocha test'.

**3**.ctrl+c exit test.
