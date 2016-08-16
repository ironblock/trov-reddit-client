// ROOT - REDUCER
// =============================================================================
// Root collection point for all reducers. This used to use "export *", but that
// didn't work out too well.

import { combineReducers } from "redux";

// VENDOR
import { routerReducer as routing } from "react-router-redux";

// WEBAPP
import subreddit from "./subreddit";

export default combineReducers(
  // Vendor reducers
  { routing

  // Webapp reducers
  , subreddit
  }
);
