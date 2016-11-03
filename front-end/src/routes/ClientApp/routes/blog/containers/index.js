import React, { Component } from 'react'
// import { DatePicker } from 'antd'

class BlogBase extends Component {
  render() {
    return (
      <div>
        <div> Blogs </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

BlogBase.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
}

export default BlogBase
