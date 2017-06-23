'use strict';

/*
Testing the server
--------

curl --data '{"item": {"message": {"message": "this,is,a,message"}}}' http://localhost:5000
*/

(function () {

  var http = require('http');
  var responses = require('./responses');

  var port = process.env.PORT || 5000;

  function getIn (obj, path, defaultValue) {
    if (path.length) {
      if (typeof obj === 'undefined') {
        obj = {};
      }

      getIn(obj[path.pop()], path, defaultValue);
    }

    return typeof obj === 'undefined' ? defaultValue : obj;
  }

  function pickRandom (list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function stripWhitespace (text) {
    return text.replace(/(^\s+)|(\s+$)/g, '');
  }

  function stripDiceman (text) {
    return text.replace(/^\/diceman/, '');
  }

  var server = http.createServer(function (request, response) {
    if (request.method === 'POST') {
      console.log('POST');
      request.on('data', function (data) {
        var json = JSON.parse(data.toString());
        console.log('JSON:', json);

        var message = getIn(json, ['item', 'message', 'message']);

        if (message) {
          message = stripWhitespace(stripDiceman(message));
        }

        if (message) {
          var question;
          var items = message.split(',');

          var questionIndex = message.indexOf('?');

          if (questionIndex >= 0) {
            question = stripWhitespace(message.substring(0, questionIndex + 1));
          }

          if (items.length) {
            var finalItems = [];

            for (var i = 0; i < items.length; i += 1) {
              var strippedItem = stripWhitespace(items[i]);
              if (strippedItem && strippedItem.length) {
                finalItems.push(strippedItem);
              }
            }
            if (!finalItems.length) {
              responses.errorResponse(response, 'No items supplied.');
            } else if (finalItems.length === 1 && question && question === finalItems[0]) {
              responses.successResponse(response, pickRandom(['Yes', 'No']));
            } else {
              if (question && finalItems[0].indexOf(question) === 0) {
                finalItems[0] = stripWhitespace(finalItems[0].replace(question, ''));
              }

              responses.successResponse(response, pickRandom(finalItems));
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
