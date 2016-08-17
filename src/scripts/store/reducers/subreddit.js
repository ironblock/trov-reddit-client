// SUBREDDIT - REDUCER
// =============================================================================

import { handleActions } from "redux-actions";
import moment from "moment";

// ACTION TYPES
import * as SubredditActionTypes from "../../actions/types/subreddit";

export default handleActions(
  { [ SubredditActionTypes.SUBREDDIT_QUERY_REQUEST ]: state => (
      { ...state, isFetching: true }
    )
  , [ SubredditActionTypes.SUBREDDIT_QUERY_SUCCESS ]: (state, action ) => (
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
  }

    // INITIAL STATE
  , { selected   : null
    , posts      : []
    , isFetching : false
    , loadError  : null
    , lastUpdate : null
    , staleAfter : 60000
    }
);
