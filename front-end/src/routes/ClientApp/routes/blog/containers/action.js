import fetchPro from 'SRC/utils/fetchPro'
import { CLIENT_EVENTS } from 'SRC/constants/action_const'
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

export function loadSingleEvent(eid, myid) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('events:getSingleEvent', eid, myid))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('events:getSingleEvent', eid, myid), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_EVENTS.LOAD_SINGLE_EVENT,
          status: json.status,
          result: json.result
        })
      })
  )
}

export function loadComments(eid) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('events:getComments', eid))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('events:getComments', eid), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_EVENTS.LOAD_COMENTS,
          status: json.status,
          result: json.result.sort((a, b) => (a.timestamp - b.timestamp))
        })
      })
  )
}
