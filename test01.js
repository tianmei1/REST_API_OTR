var methods = require("methods");
var http = require("http");
var assert  = require("assert");

describe('function check', function() {
  describe('#lastNameAscending()', function() {
    it('should return last name in ascending array ', function() {
      assert.equal(([['c','a'],['d','a']])[0][0] , ([['d','a'],['c','a']]).sort(methods.lastNameAscending)[0][0]);
    });
  });
});
