import React, { Component } from 'react'
import { Link } from 'react-router'
import { Card, Icon } from 'antd'

class BlogCard extends Component {
  render() {
    const { event } = this.props
    return (
      <Card
        bordered
        style={{ margin: '30px 10%' }}
        >
        <div className="fs14 margB15">
          <h2 className="captialize fc-dark">
            <Link className="fc-dark" to={{ pathname: '/client/profile/info', query: { uid: event.uid } }}>
              {event.title}
            </Link>
          </h2>
          <div className="fs12 margB15">
            <Link className="fc-dark" to={{ pathname: '/client/profile/info', query: { uid: event.uid } }}>
              {`@ ${event.user_name}`}
            </Link>
          </div>
          <p>{event.description}</p>
        </div>
        <div className="fs16"><Icon type="like" /> {event.likes}</div>
      </Card>
    )
  }
}

BlogCard.propTypes = {
  event: React.PropTypes.object
}

BlogCard.defaultProps = {
  event: {}
}

export default BlogCard
