// STATUS INDICATOR - COMPONENT
// =============================================================================
// Used to display helpful dynamic overlays, showing whether posts are loading
// or there was some kind of error.

import React, { PropTypes } from "react";
import classNames from "classnames";


// COMPONENT
const StatusIndicator = ( props ) => {
  // STYLESHEET
  if ( process.env.BROWSER ) {
    require( "./style.scss" );
  }

  let status;
  let message;

  if ( props.loading ) {
    status  = "loading";

    if ( props.hasPosts ) {
      message = "Updating...";
    } else {
      message = "Loading...";
    }
  } else if ( props.error ) {
    status = "error";
    message = "Could not fetch posts";
  }

  const WRAPPER_CLASSES =
    classNames( "status-indicator-wrapper"
              , props.className
              , { "active": Boolean( message ) }
              );

  const INDICATOR_CLASSES =
    classNames( "status-indicator"
              , status
              , { "minimized" : props.hasPosts }
              );


  return (
    <div className={ WRAPPER_CLASSES }>
      <div className={ INDICATOR_CLASSES }>
        { message }
      </div>
    </div>
  );
};

StatusIndicator.propTypes =
  { error    : PropTypes.instanceOf( Error )
  , loading  : PropTypes.bool
  , hasPosts : PropTypes.bool
  };


export default StatusIndicator;
