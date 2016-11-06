import hostname from 'SRC/utils/host'

const events = {
  switchLikeStatus: (uid, eid, isLike) => `${hostname()}/api/likes?uid=${uid}&eid=${eid}&isLike=${isLike}`,
  getPostsOfUser: (uid) => `${hostname()}/api/posts/user?uid=${uid}`,
  getSingleEvent: (eid) => `${hostname()}/api/event?eid=${eid}`,
  getComments: (eid) => `${hostname()}/api/event/comments?eid=${eid}`
}

export default events
