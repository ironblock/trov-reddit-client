import React from "react";
import { Route, IndexRoute } from "react-router";

// ACTIONS
import { updateSelectedSubreddit } from "./actions/subreddit";

// REDUX STORE
import Store from "./store";

// APP WRAPPER
import App from "./views/App";

// VIEWS
import Subreddit from "./containers/Subreddit";

const handleFrontPageSelect = () => {
  // If the IndexRoute is loaded, the user is on the front page, and we need to
  // clear the previous subreddit selection data.
  Store.dispatch( updateSelectedSubreddit( null ) );
};

const handleSubredditChange = ( nextState, replace ) => {
  const { splat } = nextState.params;

  if ( splat ) {
    // The * parameter in the /r/ route is the name of a subreddit to which the
    // user would like to switch. If it has been provided, we should dispatch
    // an action to change the selected subreddit.
    Store.dispatch( updateSelectedSubreddit( splat ) );
  } else {
    // If no subreddit splat was provided (which should rarely happen), we
    // should redirect to /, as the /r/ route is meaningless with no sub.
    replace( "/" );
  }
};

export default (
  <Route path="/" component={ App }>
    <IndexRoute
      onEnter  ={ handleFrontPageSelect }
      component={ Subreddit }
    />
    <Route
      name      = "subreddit"
      path      = "/r/*"
      onEnter   = { handleSubredditChange }
      component = { Subreddit }
    />
  </Route>
);
