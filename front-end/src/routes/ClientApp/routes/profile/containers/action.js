import fetchPro from 'SRC/utils/fetchPro'
import { CLIENT_PROFILE_USER_INFO } from 'SRC/constants/action_const'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'

// import * as PersistentActions from 'SRC/action'

export function profileUserInfoUpdate(key, value) {
  return {
    type: CLIENT_PROFILE_USER_INFO.UPDATE,
    key,
    value
  }
}

/**

  Async Actions

*/

export function loadUserInfo(myId, otherId) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    otherId = otherId || myId // eslint-disable-line no-param-reassign
    return fetchPro(api('users:getUserInfo', myId, otherId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('users:getUserInfo', myId, otherId), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_PROFILE_USER_INFO.LOAD,
          status: json.status,
          result: { ...json.result, isSelf: myId === otherId }
        })
      })
  }
}
