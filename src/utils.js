'use strict';

(function () {

  function getDefault (value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
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

  function setIn (obj, path, value) {
    obj = getDefault(obj, {});
    path = getDefault(path, []);

    var pathCopy = [].concat(path);

    if (pathCopy.length > 1) {
      var key = pathCopy.shift();

      if (!obj[key]) {
        obj[key] = {};
      }

      setIn(obj[key], pathCopy, value);
    } else {
      obj[pathCopy.shift()] = value;
    }
  }

  function getIn (obj, path, defaultValue) {
    obj = getDefault(obj, {});
    path = getDefault(path, []);

    var pathCopy = [].concat(path);

    if (pathCopy.length > 1) {
      var key = pathCopy.shift();

      if (!obj[key]) {
        obj[key] = {};
      }

      return getIn(obj[key], pathCopy, defaultValue);
    }

    var value = obj[pathCopy.shift()];
    return typeof value === 'undefined' ? defaultValue : value;
  }

  module.exports = {
    getDefault: getDefault,
    pickRandom: pickRandom,
    stripWhitespace: stripWhitespace,
    stripDiceman: stripDiceman,
    setIn: setIn,
    getIn: getIn
  };

})();
