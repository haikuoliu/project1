import React, { Component } from 'react'
// import { DatePicker } from 'antd'

class Topics extends Component {
  render() {
    return (
      <div>
        <div> Topics </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Topics.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
}

export default Topics
