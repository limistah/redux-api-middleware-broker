const reduxApiMiddlewareBroker = require("../dist");

const action = reduxApiMiddlewareBroker({
  types: ["MAIN_ACTION_TYPE", "SUCCESS_ACTION_TYPE", "ERROR_ACTION_TYPE"],
  method: "GET",
  endpoint: `/users`
});

const obj = {
  "@@redux-api-middleware/RSAA": {
    endpoint: "/users",
    method: "GET",
    types: [
      "MAIN_ACTION_TYPE",
      { type: "SUCCESS_ACTION_TYPE" },
      { type: "ERROR_ACTION_TYPE" }
    ],
    headers: {}
  }
};

console.log(JSON.stringify(action));
