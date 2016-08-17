// SUBREDDIT - REDUCER
// =============================================================================

import { handleActions } from "redux-actions";
import moment from "moment";

// ACTION TYPES
import * as SubredditActionTypes from "../../actions/types/subreddit";

export default handleActions(
  // SUBREDDIT QUERIES
  { [ SubredditActionTypes.SUBREDDIT_QUERY_REQUEST ]: state => (
      { ...state, isFetching: true }
    )
  , [ SubredditActionTypes.SUBREDDIT_QUERY_SUCCESS ]: ( state, action ) => (
      { ...state
      , isFetching: false
      , posts     : action.payload.data.children || []
      , lastUpdate: moment().valueOf()
      }
    )
  , [ SubredditActionTypes.SUBREDDIT_QUERY_FAILURE ]: state => (
      { ...state
      , isFetching: false
      , lastUpdate: moment().valueOf()
      }
    )

  // SUBREDDIT TARGET
  , [ SubredditActionTypes.SUBREDDIT_TARGET_UPDATE ]: ( state, action ) => (
      { ...state, target: action.payload }
    )

  , [ SubredditActionTypes.SUBREDDIT_SELECTED_UPDATE ]: ( state, action ) => (
      { ...state
      , selected : action.payload
      , posts    : []
      // In the event that the user has selected the subreddit they entered as
      // a target, we should clear the target selection since it's impossible to
      // navigate to where we already are - anything the user wants to enter
      // next will be a new subreddit.
      , target: action.payload === state.target
              ? ""
              : state.target
      }
    )
  }

    // INITIAL STATE
  , { selected   : null
    , target     : ""
    , posts      : []
    , isFetching : false
    , loadError  : null
    , lastUpdate : null
    , staleAfter : 60000
    }
);
