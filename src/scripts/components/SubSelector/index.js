// SUB SELECTOR - COMPONENT
// =============================================================================

import React, { PropTypes } from "react";
import classNames from "classnames";
import { Link, browserHistory } from "react-router";

// COMPONENT
const SubSelector = ( props ) => {
  // STYLESHEET
  if ( process.env.BROWSER ) {
    require( "./style.scss" );
  }

  const CLASSES = classNames( "sub-selector", props.className );
  const subredditLink = `/r/${ props.targetSubreddit }`;

  return (
    <div className={ CLASSES }>
      <Link to="/">
        Front Page
      </Link>
      {" or "}
      <span className="input-wrapper">
        {"/r/"}
        <input
          type     = "text"
          onKeyDown = { event => event.which === 13
              ? browserHistory.push( subredditLink )
              : null
          }
          onChange = { event => props.onTargetSubredditChange( event.target.value ) }
          value    = { props.targetSubreddit }
        />
        <span className="input-underline" />
      </span>
      <Link to={ subredditLink }>
        Go
      </Link>
    </div>
  );
};

SubSelector.propTypes =
  { onTargetSubredditChange : PropTypes.func.isRequired

  , targetSubreddit : PropTypes.string.isRequired
  };


export default SubSelector;
