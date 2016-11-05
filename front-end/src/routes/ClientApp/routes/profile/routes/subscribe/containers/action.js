import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'

import { CLIENT_TOPICS } from 'SRC/constants/action_const'

// import * as PersistentActions from 'SRC/action'

/**

  Async Actions

*/

export function getTopicsOfUser(myId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('topics:getTopicsOfUser', myId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('topics:getTopicsOfUser', myId), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_TOPICS.LOAD_USER_TOPICS,
          status: json.status,
          result: json.result
        })
      })
  )
}
