import React, { Component } from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientTopicsAction from '../../../containers/action'
import * as PersistentActions from 'SRC/action'

import { BlogCard, ImgCard } from 'SRC/components/event-card'

class TopicEventsList extends Component {
  componentWillMount() {
    const query = this.props.location.query
    if (!this.props.topicsStore.eventsList[query.topic]) {
      this.props.actions.loadAllEventsOfTopics(query.topic)
    }
  }
  render() {
    const topicsStore = this.props.topicsStore
    const topic = this.props.location.query.topic || ''
    return (
      <div className="full-height" style={{ background: '#ECECEC', overflow: 'auto' }}>
        {
          (topicsStore.eventsList[topic] || []).map(event => (
            event.event_type === 'blog' ?
              <BlogCard key={`${topic}-${event.eid}`} event={event} /> :
              <ImgCard key={`${topic}-${event.eid}`} event={event} />
          ))
        }
      </div>
    )
  }
}
TopicEventsList.propTypes = {
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

export default connect(mapState, mapDispatch)(TopicEventsList)
