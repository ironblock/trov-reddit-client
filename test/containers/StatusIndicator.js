// STATUS INDICATOR (CONTAINER) - TEST
// =============================================================================

import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

// CONTAINER
import { StatusIndicatorContainer } from "../../src/scripts/containers/StatusIndicator";

// COMPONENT
import StatusIndicator from "../../src/scripts/components/StatusIndicator";

function setup ( inputProps = {} ) {
  const props = { ...inputProps };
  const enzymeWrapper = shallow( <StatusIndicatorContainer { ...props } /> );

  return { props, enzymeWrapper };
}

describe( "Status Indicator (Container)", () => {

  it( "should render a `<StatusIndicator>`"
    , () => {
      const { enzymeWrapper } = setup();

      expect( enzymeWrapper.find( StatusIndicator ) ).to.exist;
  });
});
