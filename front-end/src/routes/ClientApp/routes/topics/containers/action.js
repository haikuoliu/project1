import fetchPro from 'SRC/utils/fetchPro'
import { CLIENT_TOPICS } from 'SRC/constants/action_const'
import api from 'SRC/apis'
import logger from 'SRC/utils/logger'

/**

  Async Actions

*/

export function loadAllTopics() {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('topics:getAllTopics'))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('topics:getAllTopics'), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_TOPICS.LOAD_TOPIC_LIST,
          status: json.status,
          result: json.result.sort((a, b) => b.count - a.count)
        })
      })
  )
}

export function loadAllEventsOfTopics(topic, myid) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('topics:getAllEventsOfTopic', topic, myid))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('topics:getAllEventsOfTopic', topic, myid), json.result.msg)
          return
        }
        // dispatch(PersistentActions.persistentSet('username', json.result.name))
        dispatch({
          type: CLIENT_TOPICS.LOAD_EVENT_LIST,
          status: json.status,
          result: {
            topic,
            eventsList: json.result.sort((a, b) => b.likes - a.likes)
          }
        })
      })
  )
}
