import Immutable from 'immutable'

import { CLIENT_FEEDS } from 'SRC/constants/action_const'

const initialState = Immutable.fromJS({
  timestamp: Date.now(),
  feedsList: [],
  adsList: []
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CLIENT_FEEDS.LOAD_FEEDS]: (state, action) => {
    return state.update('feedsList', old => (
      old.concat(Immutable.fromJS(action.result))
    ))
  },
  [CLIENT_FEEDS.LOAD_ADS]: (state, action) => {
    return state.update('adsList', old => (
      old.concat(Immutable.fromJS(action.result))
    ))
  },
  [CLIENT_FEEDS.RESET_FEEDS]: (state, action) => {
    return state.merge(initialState)
  }
}

function feeds(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export default feeds
