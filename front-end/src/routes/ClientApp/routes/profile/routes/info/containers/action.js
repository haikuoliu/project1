import fetchPro from 'SRC/utils/fetchPro'
import { CLIENT_PROFILE } from 'SRC/constants/action_const'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'

// import * as PersistentActions from 'SRC/action'

export function profileInfoUpdate(key, value) {
  return {
    type: CLIENT_PROFILE.UPDATE,
    key,
    value
  }
}

/**

  Async Actions

*/

export function loadUserInfo(myId, otherId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('users:getUserInfo', myId, otherId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('users:getUserInfo', myId, otherId), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_PROFILE.LOAD,
          status: json.status,
          result: { ...json.result, isSelf: myId === otherId }
        })
      })
  )
}

export function switchFollow(myId, otherId, type = 'follow') {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('users:switchFollow', myId, otherId, type === 'follow' ? 1 : 0))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('users:switchFollow', myId, otherId, type === 'follow' ? 1 : 0), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch(profileInfoUpdate('isFollow', type === 'follow'))
        dispatch(loadUserInfo(myId, otherId))
      })
  )
}
