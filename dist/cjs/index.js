"use strict";

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }

  return target;
}

var broker = function broker(
  options,
  isFileUpload,
  onRequestComplete,
  preprocessResult
) {
  options = options || {
    endpoint: "/",
    types: [],
    method: "GET",
    body: {},
    headers: {}
  };
  isFileUpload = isFileUpload || false;
  onRequestComplete =
    typeof onRequestComplete === "function" ? onRequestComplete : function() {};
  preprocessResult =
    typeof preprocessResult === "function"
      ? preprocessResult
      : function(json) {
          return json;
        };
  var types = options.types;
  var _types = [
    types[0],
    {
      type: types[1],
      payload: function payload(action, state, res) {
        onRequestComplete(action, state, res);
        return res.json().then(function(json) {
          return preprocessResult(json);
        });
      }
    },
    {
      type: types[2],
      meta: function meta(action, state, res) {
        onRequestComplete(action, state, res);

        if (res) {
          return {
            status: res.status,
            statusText: res.statusText
          };
        } else {
          // TODO Find a way to tell the user about their internet connectivity
          return {
            status: "Network request failed"
          };
        }
      }
    }
  ];
  var body = isFileUpload ? options.body : JSON.stringify(options.body);
  return _defineProperty({}, RSAA, {
    endpoint: options.endpoint || "",
    method: options.method || "GET",
    types: options.types ? _types : [],
    headers: _objectSpread2(
      {},
      _typeof(optoins.headers) === "object" ? options.headers : {}
    ),
    body: body
  });
};

module.exports = broker;
