'use strict';

(function () {

  function successResponse (response, message) {
    response.writeHead(200, {'Content-Type': 'text/json'});
    response.write(JSON.stringify({
      'color': 'green',
      'message': message,
      'notify': false,
      'message_format': 'text'
    }));
    response.end();
  }

  function errorResponse (response, message) {
    response.writeHead(200, {'Content-Type': 'text/json'});
    response.write(JSON.stringify({
      'color': 'red',
      'message': 'Error: ' + (typeof message === 'string' && message ? message : ''),
      'notify': false,
      'message_format': 'text'
    }));
    response.end();
  }

  function getResponse (response) {
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

  module.exports = {
    successResponse: successResponse,
    errorResponse: errorResponse,
    getResponse: getResponse
  };

})();
