// STATUS INDICATOR - CONTAINER
// =============================================================================

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

// TARGET COMPONENT
import StatusIndicator from "../components/StatusIndicator";

// CONTAINER
export class StatusIndicatorContainer extends Component {
  static propTypes =
    { error    : PropTypes.instanceOf( Error )
    , loading  : PropTypes.bool
    , hasPosts : PropTypes.bool
    };

  constructor ( props ) {
    super( props );
  }

  render () {
    return <StatusIndicator { ...this.props } />;
  }
}

// REDUX
const mapStateToProps = state => (
  { error    : state.subreddit.loadError
  , loading  : state.subreddit.isFetching
  , hasPosts : state.subreddit.posts.length > 1
  }
);

export default connect( mapStateToProps, null )( StatusIndicatorContainer );
