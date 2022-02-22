The routes of our restful API are the endpoints, which
use the [controller](../controllers) callbacks to handle what data
should be in a response. The routes used in this directory
have prefixes defined in the [server.ts](../server.ts) file and
can be seen below. They are also mentioned per file in the
header comment.

```javascript
/* Routes */
router.use("/", DefaultRoute);
router.use("/search", SearchRoute);
router.use("/movie", ShowMoreRoute);
router.use("/watch_list", WatchListRoute);
router.use("/browse", BrowseRoute);
```

This application typically only uses GET and POST request methods,
since every controller callback is essentially only middleware. If
I was directly calling some of the API's from the frontend, calling
other request methods on the router instances would make more sense.

---

To check if the routes are working there are two methods, go to
[Tests/](../../Tests/) and pick which method you will be testing.

---

The method I mostly used to test can be described below. Either:

- host the server locally.
- use the heroku api link.

---

If you are hosting the server locally, follow the steps below:

1. run the [script](../../backend_server_starter) in the root backend/server directory
1. open up [Postman](https://www.postman.com/downloads/) and test the api.
1. Postman examples:

---

If you are testing the application through heroku, follow the steps below:

1. open up [Postman](https://www.postman.com/downloads/)
1. head over to the Postman [examples]
