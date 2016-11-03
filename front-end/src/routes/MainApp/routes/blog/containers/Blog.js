import React, { Component } from 'react'
import CSSModules from 'react-css-modules'

import styles from './style.hcss'

class Blog extends Component {
  render() {
    return (
      <div>
        <div>Blog Header</div>
        <div>{this.props.children}</div>
      </div>
    )
  }
}

Blog.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
}

export default CSSModules(Blog, styles)
