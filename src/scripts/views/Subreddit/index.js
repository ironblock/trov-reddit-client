// ROOT APP COMPONENT
// =============================================================================
// Small fragment controlling the root element for the entire webapp heirarchy.
// Deliberately small and location-agnostic, this component is to be used on
// both client and server (most likely by the "/" route).

import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

// API
import { subredditQuery } from "../../api/subreddit";

// COMPONENTS
import PostSummary from "../../components/PostSummary";

class Subreddit extends Component {
  constructor ( props ) {
    super( props );

    this.postsAreStale = this.postsAreStale.bind( this );
  }

  componentDidMount () {
    if ( this.postsAreStale() ) {
      this.props.queryPosts();
    }
  }

  postsAreStale () {
    // If the last update is not recorded, we should assume that the data is
    // nonexistent or stale.
    if ( !moment.isMoment( this.props.lastUpdate ) ) {
      return true;
    }

    // If the last update was longer ago than the specified "staleness"
    // interval, we need to update.
    if ( moment( this.props.lastUpdate ).diff( moment() ) >= this.props.staleAfter ) {
      return true;
    }

    // If none of the above conditions was true, do not update data.
    return true;
  }

  render () {
    return (
      <div className="subreddit container">
        { this.props.posts.map( ( post, index ) =>
          <PostSummary key={ index } { ...post.data } />
        ) }
      </div>
    );
  }
}

// REDUX
const mapStateToProps = state => (
  { selected   : state.subreddit.selected
  , posts      : state.subreddit.posts
  , isFetching : state.subreddit.isFetching
  , loadError  : state.subreddit.loadError
  , lastUpdate : state.subreddit.lastUpdate
  , staleAfter : state.subreddit.staleAfter
  }
);

const mapDispatchToProps = dispatch => (
  { queryPosts: () => dispatch( subredditQuery() )
  }
);

export default connect( mapStateToProps, mapDispatchToProps )( Subreddit );
