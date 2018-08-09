var server = require("../server.js");
var http = require("http");
const request = require('supertest')(server)
var assert = require("assert");

describe('test Post records and Get records from server in server.js', function () {
    //test post /records
    describe('/records Post()', function () {
        it('should accept json array return 200 and without error or exceptions', function () {
            request
                .post('/records')
                .send([['xs', 'xsxsx', 'Male', 'Green', '05/24/1988'],
                ['Aam', 'amama', 'Female', 'Green', '05/24/1789'], [ 'Bas', 'asasa', 'Male', 'Green', '05/31/1789' ],
                [ 'Dedrd', 'xsxs', 'Female', 'Blxck', '08/25/1887' ]])
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                })
        })
    });
    //test returns in get /records/gender
    describe('/records/gender Get()', function () {
        it('should return 200 and json data without error or exceptions', function () {
            request
                .get('/records/gender')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) throw err;
                })
        })
    });
    //test returns in  get /records/birthdate
    describe('/records/birthdate Get()', function () {
        it('should return 200 and json data without error or exceptions', function () {
            request
                .get('/records/birthdate')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) throw err;
                })
        })
    });
    //test returns in get /records/name
    describe('/records/name Get()', function () {
        it('should return 200 and json data without error or exceptions', function () {
            request
                .get('/records/name')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) throw err;
                })
        })
    });
    //test sort records.
    describe('/records/gender Get()', function () {
        it('should return records sorted by gender', function () {
            request
                .get('/records/gender')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => { 
                    if (err) throw err;
                    if (res.body['0']['Gender'] !== 'Female'&&res.body['3']['Gender'] !== 'Female'){
                        console.log('record did not sorted by gender!');
                    }
                })
        })
    });
    describe('/records/name Get()', function () {
        it('should return records sorted by last name ascending', function () {
            request
                .get('/records/name')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => { 
                    if (err) throw err;
                    if (res.body['0']['LastName'] !== 'Aam'&& res.body['3']['LastName'] !== 'xs'){
                        console.err('record did not sorted by last name ascending!');
                    }
                })
        })
    });
    describe('/records/birthdate Get()', function () {
        it('should return records sorted by birthdate ascending', function () {
            request
                .get('/records/birthdate')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => { 
                    if (err) throw err;
                    if (res.body['0']['BirthDate'] !== '05/24/1789' && res.body['3']['BirthDate'] !== '05/24/1988'){
                        console.err('record did not sorted by birthdate ascending!');
                    }
                })
        })
    });
});

//TODO: write unit test for multiple POSTs and JSON records.