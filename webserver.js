// WEBSERVER ENTRY POINT
// =============================================================================
// Use babel-register to JIT transpile the ES6/ES7 code in the webapp. It's
// essentially a convenience shim, otherwise all webapp code would have to be
// written Node compatible (annoying), not rendered serverside (bad for SEO), or
// transpiled and then served (slow for development).

var config;

try {
  // Worth noting that the .babelrc specified in this file is slightly different
  // from what the webpack config specifies. This is due to the webpack-hmr
  // transform needing to be present in the babel loader, but not in the server.

  const babelrc = require( "fs" ).readFileSync(".babelrc");

  config = JSON.parse( babelrc );
} catch ( error ) {
  console.error( "Error parsing .babelrc: ", error );
}

require( "babel-register" )( config );
require( "babel-polyfill" );
require( "./src/scripts/server" );
