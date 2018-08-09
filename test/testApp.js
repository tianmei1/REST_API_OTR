var methods = require("../methods.js");
var assert = require("assert");

//test sort method used both in command line app and server.
describe('test sort by last name ascending functions in methods.js', function () {
	describe('#lastNameAscending()', function () {
		it('should return a two-dimensional array with lastname in [i][0]', function () {
			assert.equal('mei', ([['mei', 'tian']]).sort(methods.lastNameAscending)[0][0]);
		});
		it('should sort array no matter upper/lowercase LastName ', function () {
			assert.equal('Alice', [['bob', 'a'], ['Alice', 'a']].sort(methods.lastNameAscending)[0][0]);
		});
		it('should return array by last Name Ascending', function () {
			assert.equal('X', [['Y', 'a'], ['Z', 'a'], ['X','Y']].sort(methods.lastNameAscending)[0][0]);
			assert.equal('Y', [['Y', 'a'], ['Z', 'a'], ['X','Y']].sort(methods.lastNameAscending)[1][0]);
			assert.equal('Z', [['Y', 'a'], ['Z', 'a'], ['X','Y']].sort(methods.lastNameAscending)[2][0]);
		});
	});
	describe('#lastNameDescending()', function () {
		it('should return a two-dimensional array with lastname in [i][0]', function () {
			assert.equal('mei', ([['mei', 'tian']]).sort(methods.lastNameDescending)[0][0]);
		});
		it('should sort array no matter upper/lowercase LastName ', function () {
			assert.equal('bob', ([['bob', 'a'], ['Alice', 'a']]).sort(methods.lastNameDescending)[0][0]);
		});
		it('should return array by last Name Descending', function () {
			assert.equal('Z', ([['Y', 'a'], ['Z', 'a'], ['X','Y']]).sort(methods.lastNameDescending)[0][0]);
			assert.equal('Y', ([['Y', 'a'], ['Z', 'a'], ['X','Y']]).sort(methods.lastNameDescending)[1][0]);
			assert.equal('X', ([['Y', 'a'], ['Z', 'a'], ['X','Y']]).sort(methods.lastNameDescending)[2][0]);
		});
	});
	describe('#birtDateAscending()', function () {
		it('should return a two-dimensional array with birthdate in [i][4]', function () {
			assert.equal('05/24/1788', ([[ 'xs', 'xsxsx', 'Male', 'Green', '05/24/1788' ]]).sort(methods.birtDateAscending)[0][4]);
		});
		it('should sort two-dimensional array by birtDateAscending ', function () {
			assert.equal('05/28/1789', ([[ 'xs', 'xsxsx', 'Male', 'Green', '05/24/1992' ],
				[ 'Aam', 'amama', 'Male', 'Green', '05/24/1999' ],
			[ 'Aas', 'asasa', 'Male', 'Green', '05/28/1789' ]]).sort(methods.birtDateAscending)[0][4]);
			assert.equal('05/24/1999', ([[ 'xs', 'xsxsx', 'Male', 'Green', '05/24/1992' ],
				[ 'Aam', 'amama', 'Male', 'Green', '05/24/1999' ],
			[ 'Aas', 'asasa', 'Male', 'Green', '05/28/1789' ]]).sort(methods.birtDateAscending)[2][4]);
		});
	});
	describe('#ladyFirst()', function () {
		it('should return a two-dimensional array with gender in [i][2]', function () {
			assert.equal('Female', methods.ladyFirst([[ 'Ksxss', 'Fssd', 'Female', 'Pink', '01/01/1884' ],[ 'xs', 'xsxsx', 'Male', 'Green', '05/24/1788' ]])[0][2]);
		});
		it('should sort two-dimensional array by lady first ', function () {
			assert.equal('Female', methods.ladyFirst([[ 'xs', 'xsxsx', 'Male', 'Green', '05/24/1992' ],
				[ 'Aam', 'amama', 'Male', 'Green', '05/24/1999' ],
				[ 'Ksxss', 'Fssd', 'Female', 'Pink', '01/01/1884' ],
				[ 'Mssx', 'xsxs', 'Female', 'Dxrk', '04/25/1884' ],
			[ 'Aas', 'asasa', 'Male', 'Green', '05/28/1789' ]])[0][2]);
		});
	});
});
