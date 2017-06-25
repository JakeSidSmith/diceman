'use strict';

(function () {

  function getDefault (value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
  }

  function pickRandom (list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function capitalize (string) {
    string = string || '';
    return string.charAt(0).toUpperCase() + string.substring(1);
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
    return getDefault(value, defaultValue);
  }

  module.exports = {
    getDefault: getDefault,
    pickRandom: pickRandom,
    capitalize: capitalize,
    setIn: setIn,
    getIn: getIn
  };

})();
