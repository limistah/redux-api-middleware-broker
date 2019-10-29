const fetch = () => {};
global.fetch = fetch;
const reduxApiMiddlewareBroker = require("./dist");

const action = reduxApiMiddlewareBroker({
  types: ["MAIN_ACTION_TYPE", "SUCCESS_ACTION_TYPE", "ERROR_ACTION_TYPE"],
  method: "GET",
  endpoint: `/users`
});

console.log(JSON.stringify(action));
