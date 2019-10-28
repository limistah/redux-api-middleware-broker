export default broker;

var broker = function(
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
      payload: function(action, state, res) {
        onRequestComplete(action, state, res);
        return res.json().then(function(json) {
          return preprocessResult(json);
        });
      }
    },
    {
      type: types[2],
      meta: function(action, state, res) {
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
  return {
    [RSAA]: {
      endpoint: options.endpoint || "",
      method: options.method || "GET",
      types: options.types ? _types : [],
      headers: {
        ...(typeof optoins.headers === "object" ? options.headers : {})
      },
      body
    }
  };
};
