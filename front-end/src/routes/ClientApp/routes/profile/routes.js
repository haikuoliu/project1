export default (store) => ({ // eslint-disable-line no-unused-vars
  path: 'profile',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      // require('SRC/components/sub-nav/SubNav')
      cb(null, require('./containers/').default)
    }, 'profile')
  },
  childRoutes: [
    // require('./routes/home/routes.js').default,
    require('./routes/info/routes.js').default(store),
    require('./routes/follow/routes.js').default(store),
    require('./routes/posts/routes.js').default(store),
    require('./routes/subscribe/routes.js').default(store)
  ]
})
