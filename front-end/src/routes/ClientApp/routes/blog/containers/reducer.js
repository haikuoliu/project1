// import { combineReducers } from 'redux'
import Immutable from 'immutable'

import { CLIENT_EVENTS } from 'SRC/constants/action_const'

// import blogList from '../routes/list/containers/BlogListReducer'
// import blogContent from '../routes/content/containers/reducer'

const initialState = Immutable.fromJS({
  event: {
    eid: 0,
    content: '',
    islike: false,
    likes: 0,
    url: null,
    title: '',
    uid: 0,
    description: '',
    user_name: '',
    event_type: ''
  },
  comments: []
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CLIENT_EVENTS.LOAD_SINGLE_EVENT]: (state, action) => {
    return state.set('event', Immutable.fromJS(action.result))
  },
  [CLIENT_EVENTS.LOAD_COMENTS]: (state, action) => {
    return state.set('comments', Immutable.fromJS(action.result))
  },
  [CLIENT_EVENTS.SWITCH_LIKE]: (state, action) => {
    if (parseInt(action.eid) !== parseInt(state.get('event').get('eid'))) return state
    return state.update('event', oldEvent => (
      oldEvent.merge(Immutable.fromJS({
        islike: action.isLike,
        likes: oldEvent.get('likes') + (action.isLike ? 1 : -1)
      }))
    ))
  }
}

function clientEvent(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export default clientEvent
