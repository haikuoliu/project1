import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientTopicsAction from '../../../containers/action'
import * as PersistentActions from 'SRC/action'

import { Row, Col, Card, Badge } from 'antd'

class TopicsList extends Component {
  componentWillMount() {
    this.props.actions.loadAllTopics()
  }
  render() {
    const topicsStore = this.props.topicsStore
    return (
      <div className="full-height" style={{ background: '#ECECEC', padding: '5%', overflow: 'auto' }}>
        <Row>
          {
            topicsStore.topicsList.map(topic => (
              <Col key={topic.topic_name} span={12} style={{ height: '200px' }}>
                <Card
                  title={
                    <h3 className="captialize">
                      <Link to={{ pathname: '/client/topics/topic', query: { topic: topic.topic_name } }}>
                        {topic.topic_name}
                      </Link>
                    </h3>
                  }
                  bordered
                  extra={<Badge count={topic.count} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />}
                  style={{ width: '90%' }}
                  >
                  <p>{topic.description}</p>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
    )
  }
}
TopicsList.propTypes = {
  location: React.PropTypes.object,
  topicsStore: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  persistentActions: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    topicsStore: state.clientTopics.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch),
    actions: bindActionCreators(ClientTopicsAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(TopicsList)
