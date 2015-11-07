var expect = require("chai").expect;
var request = require("request");

var baseUrl = 'http://localhost:8080';

describe("The Server", function () {
  request(baseUrl, function (error, response, body) {
    it('should be able to connect', function () {
      expect(response.statusCode).to.equal(200);
    });

    it('should response with hello world', function () {

    });
  });
});