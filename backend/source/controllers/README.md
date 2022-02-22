---

These are the callback functions, for when a route is called on the
API. They retrieve the data used to render the application. I was not able to
implement all of these, but they have all been tested with [Postman](https://www.postman.com/downloads/).

Every callback function used by a route is guaranteed to be working.

Formatting API's with controllers is a common practice, and this is because
decomposing the code for a route, greatly improves code clarity.

These functions practice implementing a term called _middleware_. Middleware
is code that runs after a request is recieved, and before the response is sent.
The middleware used in most of this directory, typically follows the following steps:

1. parse the request body
1. If there is json data, then format it correctly.
1. Once correctly formatted, send new Request to either: external api or mongodb
1. Once the response is retrieved from step 3, format middleware response for frontend.
1. Send formatted response to frontend.

---
