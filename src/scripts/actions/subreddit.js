// SUBREDDIT - ACTIONS
// =============================================================================

import { createAction } from "redux-actions";

// ACTION CONSTANTS
import * as subredditActionTypes from "./types/subreddit";


// SUBREDDIT QUERY
export const subredditQueryRequest =
  createAction( subredditActionTypes.SUBREDDIT_QUERY_REQUEST );

export const subredditQuerySuccess =
  createAction( subredditActionTypes.SUBREDDIT_QUERY_SUCCESS );

export const subredditQueryFailure =
  createAction( subredditActionTypes.SUBREDDIT_QUERY_FAILURE );
