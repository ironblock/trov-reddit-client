// STATUS INDICATOR (PRESENTATIONAL) - TEST
// =============================================================================

import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

// VIEW
import StatusIndicator from "../../src/scripts/components/StatusIndicator";

const baseProps =
  { error    : null
  , loading  : null
  , hasPosts : false
  };

function setup ( inputProps = {} ) {
  const props = { ...baseProps, ...inputProps };
  const enzymeWrapper = shallow( <StatusIndicator { ...props } /> );

  return { props, enzymeWrapper };
}

describe( "Status Indicator (Presentational)", () => {

  it( "should render itself and its static subcomponents"
    , () => {
      const { enzymeWrapper } = setup();

      expect( enzymeWrapper.find( StatusIndicator ) ).to.exist;
      expect( enzymeWrapper.find( ".status-indicator" ) ).to.exist;
  });

  it( "should use a loading style when posts are loading"
    , () => {
      const { enzymeWrapper } = setup({ loading: true });

      expect( enzymeWrapper.find( ".status-indicator" ).hasClass( "loading" ) ).to.be.true;
  });

  it( "should use an error style when an error is present"
    , () => {
      const { enzymeWrapper } = setup({ error: new Error() });

      expect( enzymeWrapper.find( ".status-indicator" ).hasClass( "error" ) ).to.be.true;
  });

  it( "should prefer loading styles while posts are loading, even if an error has also occurred"
    , () => {
      const { enzymeWrapper } = setup({ error: new Error(), loading: true });

      expect( enzymeWrapper.find( ".status-indicator" ).hasClass( "loading" ) ).to.be.true;
  });

  it( "should use a minimized style if the page has loaded posts"
    , () => {
      const { enzymeWrapper } = setup({ hasPosts: true });

      expect( enzymeWrapper.find( ".status-indicator" ).hasClass( "minimized" ) ).to.be.true;
  });

});
