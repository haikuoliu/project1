import hostname from 'SRC/utils/host'

const users = {
  getUserInfo: (id1, id2) => `${hostname()}/api/users/view_profile?myid=${id1}&otherid=${id2}`
}

export default users
