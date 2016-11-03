import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as BlogContentAction from './action'
import * as PersistentActions from 'SRC/action'

import CSSModules from 'react-css-modules'
import styles from './style.css'

class BlogContent extends Component {
  render() {
    return (
      <div>Blog Content</div>
    )
  }
}

BlogContent.propTypes = {
  state: React.PropTypes.object,
  actions: React.PropTypes.object,
  persistentActions: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.blog.BlogContent
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch),
    actions: bindActionCreators(BlogContentAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(BlogContent, styles))
