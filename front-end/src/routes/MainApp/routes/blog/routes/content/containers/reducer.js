// Reducer Path: blog.blogList

import Immutable from 'immutable'
const initialState = Immutable.fromJS({
  blogList: []
})

/* eslint-disable arrow-body-style, no-unused-vars*/
const reducerMap = {
  'BLOG@BLOG_CONTENT@DELETE_ITEM': (state, action) => {
    return state
  },
  'BLOG@BLOG_CONTENT@LOAD': (state, action) => {
    return state
  }
}

export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
