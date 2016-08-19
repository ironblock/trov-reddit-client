// SUB SELECTOR (CONTAINER) - TEST
// =============================================================================

import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { Link } from "react-router";

// VIEW
import SubSelector from "../../src/scripts/components/SubSelector";

const baseProps =
  { targetSubreddit         : ""
  , onTargetSubredditChange : () => {}
  };

function setup ( inputProps = {} ) {
  const props = { ...baseProps, ...inputProps };
  const enzymeWrapper = shallow( <SubSelector { ...props } /> );

  return { props, enzymeWrapper };
}

describe( "Subreddit Selector (Container)", () => {

  it( "should render a `<SubSelector>`"
    , () => {
      const { enzymeWrapper } = setup();

      expect( enzymeWrapper.find( SubSelector ) ).to.exist;
  });
});
