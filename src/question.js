'use strict';

(function () {

  var utils = require('./utils');

  var MATCHES_DICEMAN = /^\/diceman/;
  var MATCHES_LEADING_AND_TRAILING_WHITESPACE = /(^\s+)|(\s+$)/g;

  var MATCHES_QUESTION_WITH_OPTIONS = /(.+?\?)(.+)/;
  var MATCHES_QUESTION = /.*?\?$/;

  var MATCHES_QUESTION_MARK = /\?/g;
  var MATCHES_OPTIONS_SEPARATOR = /\s*(?:,?\s*?(?:\bor\b|\band\b)|,)\s*/gi;

  function getResponse (message) {
    message = (message || '')
      .replace(MATCHES_DICEMAN, '')
      .replace(MATCHES_LEADING_AND_TRAILING_WHITESPACE, '');

    if (!message) {
      return {
        error: 'No message supplied.'
      };
    }

    var options;

    if (MATCHES_QUESTION_WITH_OPTIONS.exec(message)) {
      options = message
        .replace(MATCHES_QUESTION_WITH_OPTIONS, '$2')
        .replace(MATCHES_QUESTION_MARK, '')
        .replace(MATCHES_LEADING_AND_TRAILING_WHITESPACE, '')
        .split(MATCHES_OPTIONS_SEPARATOR);
    } else if (MATCHES_QUESTION.exec(message)) {
      options = ['Yes', 'No'];
    } else {
      options = message.split(MATCHES_OPTIONS_SEPARATOR);
    }

    return {
      message: utils.capitalize(utils.pickRandom(options))
    };
  }

  module.exports = {
    getResponse: getResponse
  };

})();
