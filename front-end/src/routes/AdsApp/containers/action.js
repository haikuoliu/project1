import fetchPro from 'SRC/utils/fetchPro'
import { ADS } from 'SRC/constants/action_const'
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

export function loadMySponsorInfo(sponsorId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('ads:getSponsors', sponsorId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('ads:getSponsors', sponsorId), json.result.msg)
          return
        }
        dispatch({
          type: ADS.LOAD_SPONSOR_INFO,
          result: json.result.filter(r => parseInt(r.sid) === parseInt(sponsorId))[0]
        })
      })
  )
}

export function loadAdsOfSponsor(sponsorId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('ads:getAdsOfSponsor', sponsorId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('ads:getAdsOfSponsor', sponsorId), json.result.msg)
          return
        }
        dispatch({
          type: ADS.LOAD_ADS,
          result: json.result
        })
      })
  )
}

export function loadUserSetsOfSponsor(sponsorId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('ads:getUserSetsOfSponsor', sponsorId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('ads:getUserSetsOfSponsor', sponsorId), json.result.msg)
          return
        }
        dispatch({
          type: ADS.LOAD_USER_SETS,
          result: json.result
        })
      })
  )
}

export function loadPushesOfSponsor(sponsorId) {
  return (dispatch, getState) => ( // eslint-disable-line no-unused-vars
    fetchPro(api('ads:getPushesOfSponsor', sponsorId))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { msg: 'Network Unavailable!' } }))
      .then(json => {
        if (json.status === 'fail') {
          logger.error(api('ads:getPushesOfSponsor', sponsorId), json.result.msg)
          return
        }
        dispatch({
          type: ADS.LOAD_PUSHES,
          result: json.result
        })
      })
  )
}