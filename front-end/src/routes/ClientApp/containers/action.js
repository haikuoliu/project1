import fetchPro from 'SRC/utils/fetchPro'
import { CLIENT_USER } from 'SRC/constants/action_const'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'

// import * as PersistentActions from 'SRC/action'

// export function deleteBlogListItem(id) {
//   return {
//     type: 'BLOG@BLOG_CONTENT@DELETE_ITEM',
//     id
//   }
// }

/**

  Async Actions

*/

export function loadUserInfo(userId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('users:getUserInfo', userId, userId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('users:getUserInfo', userId, userId), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_USER.LOAD,
          status: json.status,
          result: json.result
        })
      })
  )
}
