// SUBREDDIT VIEW (PRESENTATIONAL) - TEST
// =============================================================================

import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

// TEST DATA
import sampleSubredditResponse from "../test_data/sampleSubredditResponse.json";

// VIEW
import Subreddit from "../src/scripts/views/Subreddit";
import PostSummary from "../src/scripts/components/PostSummary";

const baseProps =
  { selected : null
  , posts    : sampleSubredditResponse.data.children
  };

function setup ( inputProps = {} ) {
  const props = { ...baseProps, ...inputProps };
  const enzymeWrapper = shallow( <Subreddit { ...props } /> );

  return { props, enzymeWrapper };
}

describe( "Subreddit View (Presentational)", () => {

  it( "should render itself and its static subcomponents"
    , () => {
      const { enzymeWrapper } = setup();

      expect( enzymeWrapper.find( "h1" ) ).to.exist;
  });

  it( "should display 'Front Page' when no subreddit is selected"
    , () => {
      const { enzymeWrapper } = setup();

      expect( enzymeWrapper.find( "h1" ).text() ).to.equal( "Front Page" );
  });

  it( "should display the name of the selected subreddit"
    , () => {
      const { enzymeWrapper } = setup({ selected: "veryfastdoggos" });

      expect( enzymeWrapper.find( "h1" ).text() ).to.equal( "veryfastdoggos" );
  });

  it( "should render an instance of `<PostSummary>` for each post"
    , () => {
      const { enzymeWrapper } = setup();

      expect( enzymeWrapper.find( PostSummary ) )
        .to.have.length( sampleSubredditResponse.data.children.length );
  });
});
