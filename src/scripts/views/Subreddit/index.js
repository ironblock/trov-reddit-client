// SUBREDDIT - VIEW
// =============================================================================

import React, { PropTypes } from "react";

// COMPONENTS
import PostSummary from "../../components/PostSummary";

const Subreddit = ( props ) => {
  return (
    <div className="subreddit container">
      <h1>
        { props.selected || "Front Page" }
      </h1>
      { props.posts.map( ( post, index ) =>
        <PostSummary
          { ...post.data }
          key               = { index }
          selectedSubreddit = { props.selected }
        />
      ) }
    </div>
  );
};

Subreddit.propTypes =
  { selected : PropTypes.string
  , posts    : PropTypes.array
  };

export default Subreddit;
