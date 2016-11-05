import Immutable from 'immutable'

import { CLIENT_EVENTS } from 'SRC/constants/action_const'

const initialState = Immutable.fromJS({
  eventsList: []
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CLIENT_EVENTS.LOAD_USER_POSTS]: (state, action) => {
    return state.set('eventsList', Immutable.fromJS(action.result))
  }
}

export default function userInfo(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
