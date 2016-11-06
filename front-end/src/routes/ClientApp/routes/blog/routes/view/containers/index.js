import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientBlogAction from '../../../containers/action'
import * as PersistentActions from 'SRC/action'

import moment from 'moment'

import { Card, Icon, Row, Col } from 'antd'

class BlogView extends Component {
  componentWillMount() {
    const eid = this.props.location.query.eid
    if (eid > 0) {
      this.props.actions.loadSingleEvent(eid)
      this.props.actions.loadComments(eid)
    }
  }
  componentWillReceiveProps(nextProps) { // eslint-disable-line no-unused-vars
    const eid = this.props.location.query.eid
    const nextEid = nextProps.location.query.eid
    if (eid != nextEid) { // eslint-disable-line eqeqeq
      this.props.actions.loadSingleEvent(nextEid)
      this.props.actions.loadComments(nextEid)
    }
  }
  render() {
    const event = this.props.event
    const comments = this.props.comments
    const myid = parseInt(this.props.persistentStore.userId)
    return (
      <div className="full-height" style={{ background: '#ECECEC', padding: '0 5%', overflow: 'auto' }}>
        <Card bordered style={{ margin: '30px 0' }}>
          <div className="fs14 margB15">
            <Row type="flex" align="bottom">
              <Col span={22}>
                <h2 className="captialize fc-dark">
                  {event.title}
                </h2>
              </Col>
              <Col span={2}>
                <div className="fs16"><Icon type="like" /> {event.likes || 0}</div>
              </Col>
            </Row>
            <div className="fs12 margB15">
              <Link className="fc-dark" to={{ pathname: '/client/profile/info', query: { uid: event.uid } }}>
                {`@ ${event.user_name}`}
              </Link>
            </div>
            <p>{event.description}</p>
          </div>
        </Card>
        <Card bordered style={{ margin: '30px 0' }}>
          <p className="fs20">{event.content}</p>
        </Card>
        <Card bordered style={{ margin: '30px 0' }}>
          {
            comments.map(comment => (
              <div key={comment.timestamp} className="margB30">
                <Row type="flex" align="middle">
                  <Col span={2} style={{ fontSize: '25px' }}><Icon type="aliwangwang" /></Col>
                  <Col span={22}>
                    <p className="fs16">{comment.content}</p>
                    <div>
                      <b className="inline-mid fs14" style={{ minWidth: '400px' }}>
                        <Link className="fc-dark" to={{ pathname: '/client/profile/info', query: { uid: comment.uid } }}>
                          {`@ ${comment.user_name}`}
                        </Link>
                      </b>
                      <p className="inline-mid">{moment(comment.timestamp).fromNow()}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            ))
          }
        </Card>
      </div>
    )
  }
}

BlogView.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  location: React.PropTypes.object,
  event: React.PropTypes.object,
  comments: React.PropTypes.array,
  persistentStore: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) { // eslint-disable-line no-unused-vars
  return {
    persistentStore: state.persistentStore.toJS(),
    comments: state.clientEvent.get('comments').toJS(),
    event: state.clientEvent.get('event').toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch),
    actions: bindActionCreators(ClientBlogAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(BlogView)
