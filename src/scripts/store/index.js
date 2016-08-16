// REDUX STORE
// =============================================================================
// Configures and de-boilerplates the creation of the Redux store. The
// application uses a single store. It should be required by a `<Provider>`
// clientside or serverside.

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

export default (() => {
  // The redux store is in "development" mode when we're in the browser
  // environment and NODE_ENV is set to "development".
  const devMode = process.env.BROWSER && process.env.NODE_ENV === "development";
  // Load dehydrated state (if present).
  const preloadedState = process.env.BROWSER
                       ? window.__PRELOADED_STATE__
                       : {};
  let middleware = applyMiddleware( thunk );

  if ( devMode ) {
    // Enable Chrome Redux devtools, if found.
    const devTools = devMode && window.devToolsExtension
                   ? window.devToolsExtension()
                   : f => f;

    middleware = compose( middleware, devTools );
  }

  // Create final store
  const store = createStore( reducers, preloadedState, middleware );

  if ( devMode && module.hot ) {
    // Configure Webpack HMR to accept changing reducers without a reload
    module.hot.accept( "./reducers", () => {
      const nextReducer = require( "./reducers" ).default;

      store.replaceReducer( nextReducer );
    });
  }

  return store;
})();
