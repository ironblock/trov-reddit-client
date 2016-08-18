// VIRTUAL DOM SHIM - TEST HELPER
// =============================================================================
// This is needed in order to create a virtual DOM for testing. Many React
// components require a mounted DOM instance in order to properly test their
// lifecycle behavior, and cannot rely purely on a shallow test.

import { jsdom } from "jsdom";

var exposedProperties = [ "window", "navigator", "document" ];

global.document = jsdom("");
global.window = document.defaultView;

Object.keys( document.defaultView ).forEach( property => {
  if ( typeof global[ property ] === "undefined" ) {
    exposedProperties.push( property );
    global[ property ] = document.defaultView[ property ];
  }
});

global.navigator = {
  userAgent: "node.js"
};
