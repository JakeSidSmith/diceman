'use strict';

/*
Testing the server
--------

Change port to 8085 (or other free port) and run the following command (replacing port number if necessary)

curl --data 'stuff=hello' http://localhost:8085
*/


(function () {

  var http = require('http');

  var port = 8085;

  var server = http.createServer(function (request, response) {
    if (request.method === 'POST') {
      console.log('POST');
      var json;

      request.on('data', function (data) {
        json = JSON.parse(data.toString());

        console.log('JSON:', json);

        response.writeHead(200, {'Content-Type': 'text/json'});
        response.write('{"color": "green", "message": "' + json.item.message + '", "notify": false, "message_format": "text"}');
        response.end('post received');
      });

      request.on('end', function () {
        console.log('End');
      });

      /*
      response.writeHead(200, {'Content-Type': 'text/json'});
      response.write('{"color": "green","message": "' + message + '","notify": false,"message_format": "text"}');
      response.end();
      */
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
