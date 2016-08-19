// SUB SELECTOR (PRESENTATIONAL) - TEST
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

describe( "Subreddit Selector (Presentational)", () => {

  it( "should render itself and its static subcomponents"
    , () => {
      const { enzymeWrapper } = setup();

      expect( enzymeWrapper.find( ".sub-selector" ) ).to.exist;
  });

  it( "should handle changing input for the target subreddit"
    , () => {
      const { enzymeWrapper } = setup();

      expect( enzymeWrapper.find( "input" ).prop( "value" ) ).to.equal( "" );

      enzymeWrapper.setProps({ targetSubreddit: "veryfastdoggos" });

      expect( enzymeWrapper.find( "input" ).prop( "value" ) ).to.equal( "veryfastdoggos" );
  });

  it( "should render links to the Front Page and to Go"
    , () => {
      const { enzymeWrapper } = setup({ targetSubreddit: "veryfastdoggos" });

      expect( enzymeWrapper.find( Link ).first().prop( "to" ) ).to.equal( "/" );
      expect( enzymeWrapper.find( Link ).last().prop( "to" ) ).to.equal( "/r/veryfastdoggos" );
  });
});
