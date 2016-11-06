// import { combineReducers } from 'redux'
import Immutable from 'immutable'

import { CLIENT_TOPICS } from 'SRC/constants/action_const'
// import userInfo from '../routes/info/containers/reducer'

const initialState = Immutable.fromJS({
  topicsList: [],
  eventsList: {}
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CLIENT_TOPICS.LOAD_TOPIC_LIST]: (state, action) => {
    return state.set('topicsList', Immutable.fromJS(action.result))
  },
  [CLIENT_TOPICS.LOAD_EVENT_LIST]: (state, action) => {
    return state.update('eventsList', oldDict => (
      oldDict.set(action.result.topic, Immutable.fromJS(action.result.eventsList))
    ))
  }
}

export default function clientTopics(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
