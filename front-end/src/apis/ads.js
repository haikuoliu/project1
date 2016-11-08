import hostname from 'SRC/utils/host'

const ads = {
  getSponsors: `${hostname()}/api/sponsors`,
  getAdsOfSponsor: (sid) => `${hostname()}/api/sponserposts/sponsor?sid=${sid}`,
  getUserSetsOfSponsor: (sid) => `${hostname()}/api/user_sets/sponsor?sid=${sid}`,
  getPushesOfSponsor: (sid) => `${hostname()}/api/pushes/sponsor?sid=${sid}`
}

export default ads
