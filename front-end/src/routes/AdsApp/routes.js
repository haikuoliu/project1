export default (store) => ({ // eslint-disable-line no-unused-vars
  path: '/ads',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      // require('SRC/components/sub-nav/SubNav')
      cb(null, require('./containers/').default)
    }, 'ads')
  },
  childRoutes: [
    // require('./routes/home/routes.js').default,
    require('./routes/ads_list/routes.js').default(store),
    require('./routes/push/routes.js').default(store),
    require('./routes/user_sets/routes.js').default(store)
  ]
})
