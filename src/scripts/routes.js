import React from "react";
import { Route, IndexRoute } from "react-router";

// APP WRAPPER
import App from "./views/App";

// VIEWS
import Subreddit from "./views/Subreddit";

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Subreddit } />
    <Route component={ Subreddit } />
  </Route>
);
