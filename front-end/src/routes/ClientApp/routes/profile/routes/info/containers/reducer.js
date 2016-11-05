import Immutable from 'immutable'

import { CLIENT_PROFILE } from 'SRC/constants/action_const'

// import blogList from '../routes/list/containers/BlogListReducer'
// import blogContent from '../routes/content/containers/reducer'

const initialState = Immutable.fromJS({
  userName: 'Unkown UserName',
  sex: 'Male',
  birth: 1478236926748,
  email: 'example@gmail.com',
  isFollow: true,
  followerNum: 12
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  [CLIENT_PROFILE.LOAD]: (state, action) => {
    return state.merge(Immutable.Map({
      userName: action.result.name,
      sex: action.result.sex ? 'Male' : 'Female',
      birth: action.result.birth,
      email: action.result.email,
      followerNum: action.result.follows,
      isFollow: action.result.isFollow === 'true',
      isSelf: action.result.isSelf,
      uid: action.result.uid
    }))
  },
  [CLIENT_PROFILE.UPDATE]: (state, action) => {
    return state.set(action.key, action.value)
  }
}

export default function userInfo(state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
