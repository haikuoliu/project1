// import fetchPro from './fetchPro'
// import logger from './logger'
// import api from 'SRC/apis'

export function userLogin() {
  const userId = sessionStorage.getItem('userId')
  if (!userId) return false
  return true
  // if (!sessionStorage.getItem('name')) {
  //   fetchPro(api('users:getUserInfo', userId, userId))
  //     .then(response => response.json())
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(error => {
  //       logger.error(error)
  //     })
  // } else {
  //   return {
  //     userId,
  //     username: sessionStorage.getItem('username'),
  //     sex: sessionStorage.getItem('sex'),
  //     birth: sessionStorage.getItem('birth'),
  //     email: sessionStorage.getItem('email'),
  //     follows: sessionStorage.getItem('email'),
  //   }
  // }
}

export function getUserId() {
  return sessionStorage.getItem('userId')
}
