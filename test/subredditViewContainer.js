// SUBREDDIT VIEW (CONTAINER) - TEST
// =============================================================================

import React from "react";
import moment from "moment";
import { expect } from "chai";
import { spy, useFakeTimers } from "sinon";
import { mount, shallow } from "enzyme";

// TEST DATA
import sampleSubredditResponse from "../test_data/sampleSubredditResponse.json";

// VIEW
import { SubredditContainer } from "../src/scripts/containers/Subreddit";
import Subreddit from "../src/scripts/views/Subreddit";

var clock;
const timeout = 6000;
const baseProps =
  { selected : null
  , posts    : sampleSubredditResponse.data.children
  , isFetching :false
  , loadError  : null
  , lastUpdate : null
  , staleAfter : timeout

  , queryPosts : () => {}
  };

function setup ( inputProps = {}, useDOM ) {
  const props = { ...baseProps, ...inputProps };
  let enzymeWrapper;

  if ( useDOM ) {
    enzymeWrapper = mount( <SubredditContainer { ...props } /> );
  } else {
    enzymeWrapper = shallow( <SubredditContainer { ...props } /> );
  }

  return { props, enzymeWrapper };
}

describe( "Subreddit View (Container)", () => {

  it( "should render a `<Subreddit>`"
    , () => {
      const { enzymeWrapper } = setup();

      expect( enzymeWrapper.find( Subreddit ) ).to.exist;
  });

  it( "should query for posts on mount"
    , () => {
      const { props } = setup({ queryPosts: spy() }, "useDOM" );

      expect( props.queryPosts.called ).to.be.true;
  });

  before( () => clock = useFakeTimers() );
  after( () => clock.restore() );

  it( `should re-query for posts on a ${ timeout }ms interval`
    , () => {
      const { props } = setup({ queryPosts: spy() }, "useDOM" );

      expect( props.queryPosts.calledOnce ).to.be.true;

      clock.tick( timeout + 10 );

      expect( props.queryPosts.calledTwice ).to.be.true;

      clock.tick( timeout + 10 );

      expect( props.queryPosts.calledThrice ).to.be.true;
  });

  it( "should query for posts when the selected subreddit changes"
    , () => {
      const { enzymeWrapper, props } = setup({ queryPosts: spy() }, "useDOM" );

      // queryPosts is called in componentDidMount, so we need to check the
      // second call.
      expect( props.queryPosts.calledTwice ).to.be.false;

      enzymeWrapper.setProps({ selected: "veryfastdoggos" });

      expect( props.queryPosts.calledTwice ).to.be.true;
  });
});
