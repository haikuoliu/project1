import React, { Component } from 'react'
import { Link } from 'react-router'

import CSSModules from 'react-css-modules'
import styles from './base.hcss'

class Base extends Component {
  render() {
    return (
      <div>
        <div>Base Header</div>
        <div>
          <Link to="/home">Home</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <hr />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Base.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
}

export default CSSModules(Base, styles)
