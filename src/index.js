const { RSAA } = require("redux-api-middleware");

const broker = (
  options = {
    endpoint: "/",
    types: [],
    method: "GET",
    body: {},
    headers: {},
    options: {},
    credentials: {},
    fetch: {}
  },
  isFileUpload = false,
  onRequestComplete = () => {},
  preprocessResult = json => json
) => {
  const { types } = options;
  const _types = [
    types[0],
    {
      // Success action
      type: types[1],
      payload(action, state, res) {
        onRequestComplete(action, state, res);
        return res.json().then(json => preprocessResult(json));
      }
    },
    {
      // Failure mistake
      type: types[2],
      meta(action, state, res) {
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
  const body = isFileUpload ? options.body : JSON.stringify(options.body);

  // Constructs Redux API middleware compatible action
  return {
    [RSAA]: {
      endpoint: options.endpoint || "",
      method: options.method || "GET",
      types: options.types ? _types : [],
      headers: {
        ...(typeof options.headers === "object" ? options.headers : {})
      },
      body
    }
  };
};

module.exports = broker;
