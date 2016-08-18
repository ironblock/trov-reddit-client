// WEBAPP ENTRY POINT
// =============================================================================
// Client entry point for the webapp. Contains divergent code which should only
// ever be executed in the browser. Analagous to server.js.

// Babel polyfill must be the first line of code in the entry point.
import "babel-polyfill";

// POLYFILL FETCH
import "isomorphic-fetch";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import { Router, browserHistory } from "react-router";

// REDUX STORE
import Store from "./store";

// ROUTES
import routes from "./routes";

// RENDER WEBAPP TO ROOT NODE
render(
  <Provider store={ Store }>
    <Router
      routes  = { routes }
      history = { syncHistoryWithStore( browserHistory, Store ) }
    />
  </Provider>
, document.getElementById( "REACT_ROOT" )
);
