// import { combineReducers } from 'redux'
import Immutable from 'immutable'

import { ADS } from 'SRC/constants/action_const'

// import blogList from '../routes/list/containers/BlogListReducer'
// import blogContent from '../routes/content/containers/reducer'

const initialState = Immutable.fromJS({
  sponsor: {
    sid: 0,
    name: ''
  },
  adsList: [],
  userSetsList: [],
  pushesList: []
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [ADS.LOAD_SPONSOR_INFO]: (state, action) => {
    return state.set('sponsor', Immutable.fromJS(action.result))
  },
  [ADS.LOAD_ADS]: (state, action) => {
    return state.set('adsList', Immutable.fromJS(action.result))
  },
  [ADS.LOAD_USER_SETS]: (state, action) => {
    return state.set('userSetsList', Immutable.fromJS(action.result))
  },
  [ADS.LOAD_PUSHES]: (state, action) => {
    return state.set('pushesList', Immutable.fromJS(action.result))
  }
}

function ads(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}

export default ads
