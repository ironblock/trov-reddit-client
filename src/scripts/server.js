// WEBAPP SERVER
// =============================================================================

// Removing this flag causes certain conditional logic to be tripped, preparing
// the app for server-side rendering. In example, the Redux store will not try
// to collect dehydrated state from an object on `window`, and React components
// will not attempt to require() images.
delete process.env.BROWSER;

// POLYFILL FETCH
import "isomorphic-fetch";

// NODE BUILTINS
import http        from "http";
import compression from "compression";

// WEBSERVER REQUIREMENTS
import Express       from "express";
import webpack       from "webpack";
import hotMiddleware from "webpack-hot-middleware";
import devMiddleware from "webpack-dev-middleware";

// WEBAPP REQUIREMENTS
import React                                  from "react";
import ReactDOMServer                         from "react-dom/server";
import { match, RouterContext, createRoutes } from "react-router";
import { Provider }                           from "react-redux";

// CONSTANTS
import config from "../../webpack.config";
import Store  from "./store";

// CONTENT
import Html   from "./Html";
import routes from "./routes";

const app = new Express();
const host = "0.0.0.0";
const port = "3000";
const compiler = webpack( config );
const routeDefinitions = createRoutes( routes );


// HELPERS
// =======

// Callback function for server's `listen()` method. Mostly used to generate
// console feedback when server has started, or else display the error if the
// server didn't start.
function handleStartup ( error ) {
  if ( error ) {
    return console.error( error );
  }

  console.info( `Express webserver up: ${ host }:${ port }` );
  console.info( "Waiting for webpack build..." );
}

// Handles all incoming requests made to the webserver. Will attempt to match
// the request location against the react-router route definitions. If a match
// is found, its relevant content will be statically rendered and served to
// the client.
function handleRender ( req, res ) {
  const matchParams = { routes: routeDefinitions, location: req.url };

  match( matchParams, ( error, redirectLocation, renderProps ) => {
    if ( error ) {
      // There was an error in matching the route
      res.status( 500 ).send( error.message );
    } else if ( redirectLocation ) {
      // A redirect was specified in the match
      res.redirect( 302, redirectLocation.pathname + redirectLocation.search );
    } else if ( renderProps ) {
      // The location matched a known route
      const content = ReactDOMServer.renderToString(
        <Provider store={ Store }>
          <RouterContext { ...renderProps } />
        </Provider>
      );
      const preloadedState = JSON.stringify( Store.getState() );

      res.status( 200 ).send( renderFullPage( content, preloadedState ) );
    } else {
      // The location did not match any route
      res.status( 404 ).send( "Requested page not found" );
    }
  });
}

// Create a static representation of the react app and use it to wrap the route
// content and initial/dehydrated application state.
function renderFullPage ( content, preloadedState ) {
  return (
    "<!doctype html>"
    + ReactDOMServer.renderToString(
      <Html preloadedState={ preloadedState } content={ content } />
    )
  );
}


// EXPRESS CONFIGURATION
// =====================
app.use( compression() );

// WEBPACK
if ( process.env.NODE_ENV === "production" ) {
  // PRODUCTION BUILD
  console.info( "Express webserver started in PRODUCTION mode" );
} else {
  // LIVE DEVELOPMENT
  console.info( "Express webserver started in DEVELOPMENT mode" );

  app.use( devMiddleware( compiler
    , { noInfo     : true
      , publicPath : config.output.publicPath
      }
  ));

  app.use( hotMiddleware( compiler ) );
}

// REACT-ROUTER
app.use( handleRender );

// HTTPS
http.createServer( app )
    .listen( port, host, handleStartup );
