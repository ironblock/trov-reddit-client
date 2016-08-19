// SUBREDDIT - API
// =============================================================================

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

    return fetch( `https://www.reddit.com/${ targetPath }.json` )
      .then( response => {
        if ( response.ok ) {
          return response.json();
        } else {
          throw new Error( response.status );
        }
      })
      .then( json => {
        if ( json.error ) {
          // Query errors (such as 404) will have an 'error' parameter.
          return dispatch( SubredditActions.subredditQueryFailure( new Error( json ) ) );
        } else if ( json ) {
          return dispatch( SubredditActions.subredditQuerySuccess( json ) );
        }
      })
      .catch( error => {
        return dispatch( SubredditActions.subredditQueryFailure( error ) );
      });
  };
}
