// HTML ROOT COMPONENT / SERVER ENTRY POINT
// =============================================================================
// Rather than use a static HTML file and populate it with dynamic content, we
// use a full React <html> element in conjunction with Helmet to maintain
// control over the entire webapp.

// This component contains the HTML metadata and other boilerplate. It is ONLY
// used server side (for initial render), and lacks only "<!DOCTYPE html>",
// which is provided as a string literal by the Node webserver.

import React, { Component, PropTypes } from "react";
import Helmet from "react-helmet";

export default class Html extends Component {
  static propTypes =
    { preloadedState : PropTypes.string
    , content        : PropTypes.string
    };

  render() {
    const helmet = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
          { helmet.base.toComponent() }
          { helmet.title.toComponent() }
          { helmet.meta.toComponent() }
          { helmet.link.toComponent() }
          { helmet.script.toComponent() }

          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>

        <body>
          {/* REACT CONTENT */}
          <div
            id                      = "REACT_ROOT"
            dangerouslySetInnerHTML = {{ __html: this.props.content }}
          />

          {/* APP STATE */}
          <script dangerouslySetInnerHTML={
            { __html: `window.__PRELOADED_STATE__=${ this.props.preloadedState }` }
          } />

          {/* BUNDLED JAVASCRIPT PAYLOAD */}
          <script src="./static/bundle.js" defer />
        </body>
      </html>
    );
  }
}
