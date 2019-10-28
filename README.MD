# redux-api-middleware-broker

Have you seen the docs of
[Redux API Middleware](https://www.npmjs.com/package/redux-api-middleware)?

I am very sure you love the concept of the library creator, right?

Did you see how to construct a basic actions? Have you tried uploading a file
with an action but can't find it to work?

You wanted more from the middleware but dan't have to look through the docs
every now and then?

Well, you can ride on this broker, that interacts between you and a few of JS
lines to produce an action that redux-api-middleware understands.

You can go way basic like this to ask for an action to be created for
`GET /users`:

```js
import reduxApiMiddlewareBroker from "redux-api-middleware-broker";

const action = reduxApiMiddlewareBroker({
  types: [MAIN_ACTION_TYPE, SUCCESS_ACTION_TYPE, ERROR_ACTION_TYPE],
  method: "GET",
  endpoint: `/users`
});

dispatch(action);
```

## Docs

This module exports a function that can be called as the only and default
export.

And should be called fully as follows

```js
import reduxApiMiddlewareBroker from "redux-api-middleware-broker";

// Build the action using the broker shorthand 💪💪💪💪
const action = reduxApiMiddlewareBroker(
  options,
  isFileUpload,
  onRequestComplete,
  preprocessResult
);

// Dispatch the built Redux API Middleware compatible action.
// Hurray!!! 💃💃💃💃
dispatch(action);
```

### Parameters

#### options: object

The basic required options to pass for the actions to get created.

Below can be set on the options:

- **endpoint (string)**: The request endpoint to call
- **types (Array)**: As explained by redux-api-middleware, same format is
  requested here.
- **method (string)**: HTTP method to issue the request with
- **body (object)**: HTTP request body to send to the request url
- **headers (object)**: HTTP request headers be sent with the request

```js
import reduxApiMiddlewareBroker from "redux-api-middleware-broker";

const action = reduxApiMiddlewareBroker({
  types: [MAIN_ACTION_TYPE, SUCCESS_ACTION_TYPE, ERROR_ACTION_TYPE],
  method: "POST",
  endpoint: `/users`,
  body: { name: "Aleem Isiaka" }
});

dispatch(action);
```

#### isFileUpload: boolean

Default: `false`

To determine if the request is a file upload. This is required for proper file
upload handling.

**A call to a file upload endpoint without this would fail.**

```js
const action = reduxApiMiddlewareBroker(
  {
    types: [MAIN_ACTION_TYPE, SUCCESS_ACTION_TYPE, ERROR_ACTION_TYPE],
    method: "POST",
    endpoint: `/files`,
    body: file // file to be uplaoded here
  },
  true
);
```

#### onRequestComplete: function

Default: `() => {}`

A notifier or similar. You can set cache, clear cache etc using this function.

It receives the following params:

- _action_ => The action that triggered the request
- _state_ => The previous state of the reducer
- _response_ => XHR response object

```js
const action = reduxApiMiddlewareBroker(
  {
    types: [MAIN_ACTION_TYPE, SUCCESS_ACTION_TYPE, ERROR_ACTION_TYPE],
    method: "GET",
    endpoint: `/users`
  },
  false,
  (action, state, response) => console.log({ action, state, response })
);
```

#### preprocessResult: function

Default: `() => {}`

A function to preprocess the received result after a successful requests.

The function receives a JSON, and expects JSON to be returned as well

```js
const action = reduxApiMiddlewareBroker(
  {
    types: [MAIN_ACTION_TYPE, SUCCESS_ACTION_TYPE, ERROR_ACTION_TYPE],
    method: "GET",
    endpoint: `/users`
  },
  false,
  () => {},
  json => {
    json.date = Date.now();
    return json;
  }
);
```

## License

MIT
