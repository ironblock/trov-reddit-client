// ACTIONS - TEST
// =============================================================================

import { expect } from "chai";

import * as SubredditActions     from "../../src/scripts/actions/subreddit";
import * as SubredditActionTypes from "../../src/scripts/actions/types/subreddit";

describe( "Redux Actions", () => {

  // SUBREDDIT TARGET UPDATE
  it( "should create an action with an updated target subreddit"
    , () => {
      const text = "veryfastdoggos";
      const expectedAction =
        { type    : SubredditActionTypes.SUBREDDIT_TARGET_UPDATE
        , payload : text
        };

      expect( SubredditActions.updateTargetSubreddit( text ) )
        .to.deep.equal( expectedAction );
    }
  );

  // SUBREDDIT TARGET UPDATE
  it( "should create an action with a new selected subreddit"
    , () => {
      const text = "news";
      const expectedAction =
        { type    : SubredditActionTypes.SUBREDDIT_SELECTED_UPDATE
        , payload : text
        };

      expect( SubredditActions.updateSelectedSubreddit( text ) )
        .to.deep.equal( expectedAction );
    }
  );

});
