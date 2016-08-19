// SUB SELECTOR - CONTAINER
// =============================================================================

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

// REDUX ACTIONS
import { updateTargetSubreddit } from "../actions/subreddit";

// TARGET COMPONENT
import SubSelector from "../components/SubSelector";

// CONTAINER
export class SubSelectorContainer extends Component {
  static propTypes =
    { targetSubreddit         : PropTypes.string.isRequired
    , onTargetSubredditChange : PropTypes.func.isRequired
    };

  constructor ( props ) {
    super( props );
  }

  render () {
    return <SubSelector { ...this.props } />;
  }
}

// REDUX
const mapStateToProps = state => (
  { targetSubreddit: state.subreddit.target
  }
);

const mapDispatchToProps = dispatch => (
  { onTargetSubredditChange: target => dispatch( updateTargetSubreddit( target ) )
  }
);

export default connect( mapStateToProps, mapDispatchToProps )( SubSelectorContainer );
