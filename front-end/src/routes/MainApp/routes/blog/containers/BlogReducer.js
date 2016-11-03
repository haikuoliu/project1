import { combineReducers } from 'redux'

import blogList from '../routes/list/containers/BlogListReducer'
import blogContent from '../routes/content/containers/reducer'

export default combineReducers({
  blogList,
  blogContent
})
