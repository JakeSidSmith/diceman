'use strict';

/*
Testing the server
--------

curl --data '{"item": {"message": {"message": "this,is,a,message"}}}' http://localhost:5000
*/

(function () {

  var http = require('http');
  var responses = require('./responses');
  var utils = require('./utils');
  var question = require('./question');

  var port = process.env.PORT || 5000;

  var server = http.createServer(function (request, response) {
    if (request.method === 'POST') {
      console.log('POST');
      request.on('data', function (data) {
        var json = JSON.parse(data.toString());
        console.log('JSON:', json);

        var message = utils.getIn(json, ['item', 'message', 'message'], '');

        var reply = question.getResponse(message);

        if (reply.error) {
          responses.errorResponse(response, reply.error);
        } else {
          responses.successResponse(response, reply.message);
        }
      });

      request.on('end', function () {
        console.log('End');
      });
    } else {
      responses.nonPostResponse(response);
    }
  });

  server.listen(port);

  console.log('Server running');

})();
