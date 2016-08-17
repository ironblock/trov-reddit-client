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

    this.refreshLoop = null;

    this.forceRefresh       = this.forceRefresh.bind( this );
    this.checkRefreshNeeded = this.checkRefreshNeeded.bind( this );
    this.cleanUpRefreshLoop = this.cleanUpRefreshLoop.bind( this );
    this.postsAreStale      = this.postsAreStale.bind( this );
  }

  componentDidMount () {
    // When a Subreddit is mounted into the DOM for the first time, we want to
    // fetch its data no matter what - no check is needed first.
    this.forceRefresh();
  }

  componentWillReceiveProps ( nextProps ) {
    // If the selected subreddit changes, we need to refresh. All of our cached
    // posts will be for the previous subreddit and will get tossed by Redux.
    if ( nextProps.selected !== this.props.selected ) {
      this.forceRefresh();
    }
  }

  componentWillUnmount () {
    // Destroy timer loop before component unmounts
    this.cleanUpRefreshLoop();
  }

  forceRefresh () {
    // Forces a re-query of posts for the current subreddit, and may be called
    // by the user to manually issue a refresh.
    this.cleanUpRefreshLoop();
    this.checkRefreshNeeded();
  }

  checkRefreshNeeded () {
    // If our posts require an update, refresh them
    if ( this.postsAreStale ) {
      this.props.queryPosts();
    }

    // Reset the loop
    this.refreshLoop = setTimeout( this.checkRefreshNeeded, this.props.staleAfter );
  }

  cleanUpRefreshLoop () {
    // Clears the timeout and reinitializes the property to its initial value
    clearTimeout( this.refreshLoop );
    this.refreshLoop = null;
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
        <h1>
          { this.props.selected || "Front Page" }
        </h1>
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
