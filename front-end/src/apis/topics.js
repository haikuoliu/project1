import hostname from 'SRC/utils/host'

const topics = {
  // Get a users' profile
  getAllTopics: `${hostname()}/api/topics/all`,
  getAllEventsOfTopic: (topic, myid) => `${hostname()}/api/posts/topic?topicName=${topic}&myid=${myid}`,
  getTopicsOfUser: (uid) => `${hostname()}/api/users/subscribes?id=${uid}`
}

export default topics
