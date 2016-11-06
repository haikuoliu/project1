import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as PersistentActions from 'SRC/action'

import { BlogCard, ImgCard } from 'SRC/components/event-card'
// import { DatePicker } from 'antd'

class ProfilePosts extends Component {
  render() {
    return (
      <div className="full-height" style={{ background: '#ECECEC', overflow: 'auto' }}>
        {
          (this.props.userPostsList || []).map(event => (
            event.event_type === 'blog' ?
              <BlogCard key={`${event.eid}`} event={event} /> :
              <ImgCard key={`${event.eid}`} event={event} />
          ))
        }
      </div>
    )
  }
}

ProfilePosts.propTypes = {
  location: React.PropTypes.object,
  // persistentActions: React.PropTypes.object,
  // persistentStore: React.PropTypes.object,
  userPostsList: React.PropTypes.array
}

function mapState(state) {
  return {
    // persistentStore: state.persistentStore.toJS(),
    userPostsList: state.clientProfile.userPosts.get('eventsList').toJS()
  }
}

function mapDispatch(dispatch) { // eslint-disable-line
  return {
    // persistentActions: bindActionCreators(PersistentActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(ProfilePosts)
