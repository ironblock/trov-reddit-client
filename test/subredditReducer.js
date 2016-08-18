// SUBREDDIT REDUCER - TEST
// =============================================================================

import { expect } from "chai";
import moment from "moment";

import * as SubredditActions from "../src/scripts/actions/subreddit";
import subredditReducer      from "../src/scripts/store/reducers/subreddit";

import sampleSubredditResponse from "../test_data/sampleSubredditResponse.json";

const startTime = moment().valueOf();
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
      .to.deep.equal( initialState );
  });

  it( "should handle SUBREDDIT_QUERY_REQUEST", () => {
    expect( subredditReducer( {}, SubredditActions.subredditQueryRequest() ) )
      .to.deep.equal({ isFetching: true });
  });

  it( "should handle SUBREDDIT_QUERY_SUCCESS", () => {
    const reducer = subredditReducer( {}, SubredditActions.subredditQuerySuccess( sampleSubredditResponse ) );
    const currentTime = moment().valueOf();

    expect( reducer.isFetching ).to.equal( false );
    expect( reducer.loadError ).to.equal( null );
    expect( reducer.posts ).to.deep.equal( sampleSubredditResponse.data.children );
    expect( reducer.lastUpdate ).to.be.within( startTime, currentTime );
  });

  it( "should handle SUBREDDIT_QUERY_FAILURE", () => {
    const reducer = subredditReducer( {}, SubredditActions.subredditQueryFailure( new Error( 404 ) ) );
    const currentTime = moment().valueOf();

    expect( reducer.isFetching ).to.equal( false );
    expect( reducer.loadError ).to.deep.equal( new Error( 404 ) );
    expect( reducer.lastUpdate ).to.be.within( startTime, currentTime );
  });
});
