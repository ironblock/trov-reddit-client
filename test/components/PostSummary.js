// POST SUMMARY (PRESENTATIONAL) - TEST
// =============================================================================

import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

// TEST DATA
import sampleSubredditResponse from "../../test_data/sampleSubredditResponse.json";

// VIEW
import PostSummary from "../../src/scripts/components/PostSummary";

const testPost = sampleSubredditResponse.data.children[0].data;
const baseProps =
  { selectedSubreddit: null
  };

function setup ( inputProps = {} ) {
  const props = { ...baseProps, ...inputProps };
  const enzymeWrapper = shallow( <PostSummary { ...props } /> );

  return { props, enzymeWrapper };
}

describe( "Post Summary (Presentational)", () => {

  it( "should render itself and its static subcomponents"
    , () => {
      const { enzymeWrapper } = setup({ ...testPost });

      expect( enzymeWrapper.find( PostSummary ) ).to.exist;
      expect( enzymeWrapper.find( ".score" ) ).to.exist;
      expect( enzymeWrapper.find( ".post-data" ) ).to.exist;
  });

  it( "should render the post's score"
    , () => {
      const { enzymeWrapper } = setup({ ...testPost });

      // isNaN returns true when the input is NOT a number. If isNaN returns
      // false, the input is a number.
      expect( isNaN( enzymeWrapper.find( ".score" ).text() ) ).to.be.false;
  });

  it( "should show an image thumbnail if one is provided"
    , () => {
      const thumbnailURL = "http://vixie.enterprises/hello.jpg"
      const { enzymeWrapper } = setup({ ...testPost, thumbnail: thumbnailURL });

      expect( enzymeWrapper.find( ".thumbnail" ).childAt(0).type() ).to.equal( "img" );
      expect( enzymeWrapper.find( ".thumbnail" ).childAt(0).html() ).to.include( thumbnailURL );
  });

  it( "should show 'nsfw' or 'self' in the thumbnail if one is provided"
    , () => {
      const thumbnailURL = "http://vixie.enterprises/hello.jpg"
      const { enzymeWrapper } = setup({ ...testPost, thumbnail: "self" });

      expect( enzymeWrapper.find( ".thumbnail" ).childAt(0).matchesElement( <span>self</span> ) ).to.be.true;
  });

  it( "should omit origin subreddit link if it's the same as the selected"
    , () => {
      const { enzymeWrapper } = setup({ ...testPost, selectedSubreddit: "veryfastdoggos", subreddit: "veryfastdoggos" });

      expect( enzymeWrapper.some( ".origin" ) ).to.be.false;
  });
});
