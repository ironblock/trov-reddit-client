// POST SUMMARY - COMPONENT
// =============================================================================
// Presentational component used to display links to Reddit posts. Acts as a
// kind of general overview for a post, showing its title, author, thumbnail,
// and other summary information.

import React, { PropTypes } from "react";
import classNames from "classnames";
import moment from "moment";

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
  // STYLESHEET
  if ( process.env.BROWSER ) {
    require( "./style.scss" );
  }

  const CLASSES = classNames( "post-summary"
                            , props.className
                            , { "nsfw": props.over_18
                              }
                            );

  // We consider a post to share the origin with the active subreddit if they
  // have the same string value. This allows us to display the post location
  // only on multireddits or the front page, and hide them when they're all
  // children of the active subreddit.
  const sameOriginSubreddit = ( props.selectedSubreddit && props.subreddit )
    && props.selectedSubreddit.toLowerCase() === props.subreddit.toLowerCase();

  return (
    <div className={ CLASSES }>
      <div className="score">
        { props.score }
      </div>

      <div className="thumbnail">
        <img src={ getThumbnailSource( props.thumbnail ) } />
      </div>

      <div className="post-data">
        <span className="attribution">
          <span className="author">
            { "Submitted "
            + moment.unix( props.created_utc ).local().fromNow()
            + " by "
            }
            <a href={`//reddit.com/user/${ props.author }`}>
              { props.author }
            </a>
          </span>
          { sameOriginSubreddit
          ? null
          : (
            <a
              className = "origin"
              href      = {`//reddit.com/r/${ props.subreddit }`}
              target    = "_blank"
            >
              { `r/${ props.subreddit }` }
            </a>
          ) }
        </span>

        <span className="post-link">
          <a
            target    = "_blank"
            href      = { props.url }
          >
            { props.title }
          </a>
        </span>
        <a
          className = "comments"
          target    = "_blank"
          href      = { `//reddit.com${ props.permalink }` }
        >
          { `${ props.num_comments } comments` }
        </a>
      </div>
    </div>
  );
};

PostSummary.propTypes =
  // POST DATA
  { author        : PropTypes.string.isRequired
  , created_utc   : PropTypes.number.isRequired
  , domain        : PropTypes.string
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
  , url           : PropTypes.string
  , visited       : PropTypes.bool.isRequired

  // METADATA
  , selectedSubreddit : PropTypes.string
  };

export default PostSummary;
