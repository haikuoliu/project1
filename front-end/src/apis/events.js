import hostname from 'SRC/utils/host'

const events = {
  switchLikeStatus: (uid, eid, isLike) => `${hostname()}/api/likes?uid=${uid}&eid=${eid}&isLike=${isLike}`
}

export default events
