export default (store) => ({
  path: 'client',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      // require('SRC/components/sub-nav/SubNav')
      cb(null, require('./containers/').default)
    }, 'client')
  },
  childRoutes: [
    // require('./routes/home/routes.js').default,
    require('./routes/blog/routes.js').default(store),
    require('./routes/feed/routes.js').default(store),
    require('./routes/profile/routes.js').default(store),
    require('./routes/topics/routes.js').default(store)
  ]
})
