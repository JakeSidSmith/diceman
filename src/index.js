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

  var port = process.env.PORT || 5000;

  var server = http.createServer(function (request, response) {
    if (request.method === 'POST') {
      console.log('POST');
      request.on('data', function (data) {
        var json = JSON.parse(data.toString());
        console.log('JSON:', json);

        var message = utils.getIn(json, ['item', 'message', 'message'], '');

        if (message) {
          message = utils.stripWhitespace(utils.stripDiceman(message));
        }

        if (message) {
          var question;
          var items = message.split(',');

          var questionIndex = message.indexOf('?');

          if (questionIndex >= 0) {
            question = utils.stripWhitespace(message.substring(0, questionIndex + 1));
          }

          if (items.length) {
            var finalItems = [];

            for (var i = 0; i < items.length; i += 1) {
              var strippedItem = utils.stripWhitespace(items[i]);
              if (strippedItem && strippedItem.length) {
                finalItems.push(strippedItem);
              }
            }
            if (!finalItems.length) {
              responses.errorResponse(response, 'No items supplied.');
            } else if (finalItems.length === 1 && question && question === finalItems[0]) {
              responses.successResponse(response, utils.pickRandom(['Yes', 'No']));
            } else {
              if (question && finalItems[0].indexOf(question) === 0) {
                finalItems[0] = utils.stripWhitespace(finalItems[0].replace(question, ''));
              }

              responses.successResponse(response, utils.pickRandom(finalItems));
            }
          } else {
            responses.errorResponse(response, 'No items supplied.');
          }
        } else {
          responses.errorResponse(response, 'No message supplied.');
        }
      });

      request.on('end', function () {
        console.log('End');
      });
    } else {
      responses.getResponse(response);
    }
  });

  server.listen(port);

  console.log('Server running');

})();
