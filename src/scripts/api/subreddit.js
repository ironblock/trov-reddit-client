// SUBREDDIT - API
// =============================================================================

import fetch from "isomorphic-fetch";

// ACTION CONSTANTS
import * as SubredditActions from "../actions/subreddit";

export function subredditQuery () {
  return ( dispatch, getState ) => {
    const { selected } = getState().subreddit;

    // The Reddit API allows the front page to be fetched with no path
    // specified. If the user hasn't selected a specific subreddit, we should
    // fetch the front page.
    const targetPath = selected
                     ? "r/" + selected
                     : "";

    dispatch( SubredditActions.subredditQueryRequest() );

    fetch( `http://www.reddit.com/${ targetPath }.json` )
      .then( response => response.json() )
      .then( json => {
        if ( json.error ) {
          // Query errors (such as 404) will have an 'error' parameter.
          dispatch( SubredditActions.subredditQueryFailure( new Error( json ) ) );
        } else {
          dispatch( SubredditActions.subredditQuerySuccess( json ) );
        }
      })
      .catch( error => SubredditActions.subredditQuerySuccess( new Error( error ) ) );
  };
}
