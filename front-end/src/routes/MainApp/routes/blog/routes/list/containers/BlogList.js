import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as BlogListAction from './BlogListAction'
import * as PersistentActions from 'SRC/action'

import CSSModules from 'react-css-modules'
import styles from './style.css'

class BlogList extends Component {
  render() {
    return (
      <div>Blog List</div>
    )
  }
}

BlogList.propTypes = {
  state: React.PropTypes.object,
  actions: React.PropTypes.object,
  persistentActions: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.blog.blogList
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch),
    actions: bindActionCreators(BlogListAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(BlogList, styles))
