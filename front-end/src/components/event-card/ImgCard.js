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
        <div>
          <Link className="fc-dark" style={{ display: 'block' }} to={{ pathname: '/client/blog/view', query: { eid: event.eid } }}>
            <img alt="example" width="100%" src={event.url} />
          </Link>
        </div>
        <div className="fs12 margB15">
          <Link className="fc-dark" to={{ pathname: '/client/profile/info', query: { uid: event.uid } }}>
            {`@ ${event.user_name}`}
          </Link>
        </div>
        <p>{event.description}</p>
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
