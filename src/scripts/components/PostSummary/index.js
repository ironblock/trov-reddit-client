// POST SUMMARY - COMPONENT
// =============================================================================
// Presentational component used to display links to Reddit posts. Acts as a
// kind of general overview for a post, showing its title, author, thumbnail,
// and other summary information.

import React, { PropTypes } from "react";
import classNames from "classnames";
import moment from "moment";


// STYLESHEET
if ( process.env.BROWSER ) {
  // require( "./style.scss" );
}

// HELPERS
const getThumbnailSource = source => {
  switch( source ) {
    case "self":
      return;

    case "nsfw":
      return;

    default:
      return source;
  }
};

// COMPONENT
const PostSummary = ( props ) => {
  const CLASSES = classNames( props.className
                            , {
                              }
                            );

  return (
    <div className={ CLASSES }>
      <div className="score">
        <span className="total">{ props.score }</span>
        <span className="ups">{ props.ups }</span>
        <span className="down">{ props.down }</span>
      </div>

      <img className="thumbnail" src={ getThumbnailSource( props.thumbnail ) } />

      <div className="post-data">
        <a target="_blank" href={ props.url }>{ props.title }</a>
        <a target="_blank" href={ `//:reddit.com${ props.permalink }` }>Permalink</a>
        <a>{ props.author }</a>
        <span>{ moment.unix( props.created_utc ).local().fromNow() }</span>
        <a>{ props.subreddit }</a>
      </div>
    </div>
  );
};

PostSummary.propTypes =
  { author        : PropTypes.string.isRequired
  , created_utc   : PropTypes.number.isRequired
  , domain        : PropTypes.string
  , downs         : PropTypes.number.isRequired
  , edited        : PropTypes.oneOfType(
                    [ PropTypes.bool
                    , PropTypes.number
                    ]
                  ).isRequired
  , gilded        : PropTypes.number.isRequired
  , hidden        : PropTypes.bool.isRequired
  , id            : PropTypes.string.isRequired
  , locked        : PropTypes.bool.isRequired
  , media         : PropTypes.object
  , name          : PropTypes.string.isRequired
  , num_comments  : PropTypes.number.isRequired
  , over_18       : PropTypes.bool.isRequired
  , permalink     : PropTypes.string.isRequired
  , post_hint     : PropTypes.string
  , score         : PropTypes.number.isRequired
  , selftext      : PropTypes.string
  , selftext_html : PropTypes.string
  , stickied      : PropTypes.bool.isRequired
  , subreddit     : PropTypes.string.isRequired
  , subreddit_id  : PropTypes.string.isRequired
  , thumbnail     : PropTypes.string
  , title         : PropTypes.string.isRequired
  , ups           : PropTypes.number.isRequired
  , url           : PropTypes.string
  , visited       : PropTypes.bool.isRequired
  };

export default PostSummary;
