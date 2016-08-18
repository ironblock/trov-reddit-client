// SUBREDDIT REDUCER - TEST
// =============================================================================

import expect from "expect";
import moment from "moment";

import * as SubredditActions from "../src/scripts/actions/subreddit";
import subredditReducer      from "../src/scripts/store/reducers/subreddit";

import sampleSubredditResponse from "../test_data/sampleSubredditResponse.json";

const initialState =
  { selected   : null
  , target     : ""
  , posts      : []
  , isFetching : false
  , loadError  : null
  , lastUpdate : null
  , staleAfter : 60000
  };

describe( "Subreddit Reducer", () => {
  it( "should return initial state", () => {
    expect( subredditReducer( undefined, {} ) )
      .toEqual( initialState );
  });

  it( "should handle SUBREDDIT_QUERY_REQUEST", () => {
    expect( subredditReducer( {}, SubredditActions.subredditQueryRequest() ) )
      .toEqual({ isFetching: true });
  });

  it( "should handle SUBREDDIT_QUERY_SUCCESS", () => {
    const reducer = subredditReducer( {}, SubredditActions.subredditQuerySuccess( sampleSubredditResponse ) );
    expect( reducer )
      .toMatch(
        { isFetching : false
        , loadError  : null
        , posts      : sampleSubredditResponse.data.children
        }
      );
    expect( reducer.lastUpdate ).toBeLessThanOrEqualTo( moment().valueOf() );
  });

  it( "should handle SUBREDDIT_QUERY_FAILURE", () => {
    const reducer = subredditReducer( {}, SubredditActions.subredditQueryFailure( new Error( 404 ) ) );
    expect( reducer )
      .toMatch(
        { isFetching : false
        , loadError  : new Error( 404 )
        }
      );
    expect( reducer.lastUpdate ).toBeLessThanOrEqualTo( moment().valueOf() );
  });
});
