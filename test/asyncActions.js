// ASYNC ACTIONS - TEST
// =============================================================================

// FETCH POLYFILL AND MOCK
require( "isomorphic-fetch" );

import fetchMock from "fetch-mock";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";

import sampleSubredditResponse from "../test_data/sampleSubredditResponse.json";

import * as SubredditAPI         from "../src/scripts/api/subreddit";
import * as SubredditActionTypes from "../src/scripts/actions/types/subreddit";

const middlewares = [ thunk ];
const mockStore = configureMockStore( middlewares );

describe( "Redux Async Actions", () => {

  afterEach( fetchMock.restore );

  // // SUBREDDIT QUERY (SUCCESS)
  it( "creates a SUBREDDIT_QUERY_SUCCESS action when the JSON is fetched successfully"
    , () => {
      fetchMock.mock( "//www.reddit.com/r/veryfastdoggos.json"
                    , { body: sampleSubredditResponse }
                    );

      const expectedActions =
        [ { type: SubredditActionTypes.SUBREDDIT_QUERY_REQUEST }
        , { type    : SubredditActionTypes.SUBREDDIT_QUERY_SUCCESS
          , payload : sampleSubredditResponse
          }
        ];

      const store = mockStore(
        { subreddit:
          { selected   : "veryfastdoggos"
          , target     : ""
          , posts      : []
          , isFetching : false
          , loadError  : null
          , lastUpdate : null
          , staleAfter : 60000
          }
        }
      );

      return store.dispatch( SubredditAPI.subredditQuery() )
        .then( () => {
          expect( store.getActions() ).toEqual( expectedActions );
        });
    }
  );

  // SUBREDDIT QUERY (FAILURE)
  it( "creates a SUBREDDIT_QUERY_FAILURE action when the JSON cannot be fetched"
    , () => {
      fetchMock.mock( "//www.reddit.com/r/veryfastdoggos.json"
                    , { status: 404 }
                    );

      const jkdsfhgksdjgh =
        [ { type: SubredditActionTypes.SUBREDDIT_QUERY_REQUEST }
        , { type    : SubredditActionTypes.SUBREDDIT_QUERY_FAILURE
          , error   : true
          , payload : new Error( 404 )
          }
        ];

      const store = mockStore(
        { subreddit:
          { selected   : "veryfastdoggos"
          , target     : ""
          , posts      : []
          , isFetching : false
          , loadError  : null
          , lastUpdate : null
          , staleAfter : 60000
          }
        }
      );

      return store.dispatch( SubredditAPI.subredditQuery() )
        .then( () => {
          expect( store.getActions() ).toEqual( jkdsfhgksdjgh );
        });
    }
  );

});
