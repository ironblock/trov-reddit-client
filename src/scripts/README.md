# Isomorphic Architecture
The goal of any "isomorphic" or "universal" JavaScript application architecture is to maximize code reuse. Rather than having equal amounts "frontend" and "backend" code, the browser and server share 99% of the code with some divergent shims on either end to take up the slack.

In this case, there are four files in this directory which have relevance to that goal:

## server.js
Contains an Express server and all necessary logic to dry run Redux, dehydrate state, run react-router, and serve an initial payload containing the same HTML which React would have output (on that route) had it been run from the browser instead. All the browser needs to do is rehydrate state and perform an update render - much less expensive than building the application on load.

## client.js
Clientside shims and polyfills are loaded, and then React is instructed to render the Redux `<Provider>` and content from `routes.js`

## routes.js
Contains all the route definitions and routing logic for the webapp. Same code client and server.

## Html.js
Contains the "static" HTML boilerplate into which the app will render. Same code client and server.
