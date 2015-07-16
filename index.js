'use strict';

/*
Testing the server
--------

curl --data '{"item": {"message": {"message": "this,is,a,message"}}}}' http://localhost:5000
*/


(function () {

  var http = require('http');

  var port = process.env.PORT || 5000;

  var pickRandom = function (list) {
    return list[Math.floor(Math.random() * list.length)];
  };

  var stripWhitespace = function (text) {
    return text.replace(/(^\s+)|(\s+$)/g, '');
  };

  var stripDiceman = function (text) {
    return text.replace(/^\/diceman/, '');
  };

  var server = http.createServer(function (request, response) {
    if (request.method === 'POST') {
      console.log('POST');
      var json;

      request.on('data', function (data) {
        json = JSON.parse(data.toString());
        console.log('JSON:', json);

        var message = json.item ? (json.item.message ? json.item.message.message : undefined) : undefined;

        if (message) {
          message = stripWhitespace(stripDiceman(message));
        }

        response.writeHead(200, {'Content-Type': 'text/json'});
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
              var strippedItem = stripWhitespace(items[0]);
              if (strippedItem && strippedItem.length) {
                finalItems.push(strippedItem);
              }
            }
            if (!finalItems.length) {
              response.write('{"color": "red", "message": "Error: No items supplied.", "notify": false, "message_format": "text"}');
            } else if (finalItems.length === 1 && question && question === finalItems[0]) {
              response.write('{"color": "green", "message": "' + pickRandom(['Yes', 'No']) + '", "notify": false, "message_format": "text"}');
            } else {
              if (question && finalItems[0].indexOf(question) === 0) {
                finalItems[0] = stripWhitespace(finalItems[0].replace(question, ''));
              }
              response.write('{"color": "green", "message": "' + pickRandom(finalItems) + '", "notify": false, "message_format": "text"}');
            }
          } else {
            response.write('{"color": "red", "message": "Error: No items supplied.", "notify": false, "message_format": "text"}');
          }
        } else {
          response.write('{"color": "red", "message": "Error: No message supplied.", "notify": false, "message_format": "text"}');
        }
        response.end();
      });

      request.on('end', function () {
        console.log('End');
      });
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('<!DOCTYPE html>');
      response.write('<html>');
      response.write('<head>');
      response.write('<title>Hello World Page</title>');
      response.write('</head>');
      response.write('<body>');
      response.write('Hello World!');
      response.write('</body>');
      response.write('</html>');
      response.end();
    }
  });

  server.listen(port);

  console.log('Server running');

})();
