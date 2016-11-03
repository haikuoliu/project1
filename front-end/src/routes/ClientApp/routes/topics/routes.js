export default (store) => ({ // eslint-disable-line no-unused-vars
  path: 'topics',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      // require('SRC/components/sub-nav/SubNav')
      cb(null, require('./containers/').default)
    }, 'topics')
  },
  childRoutes: [
    // require('./routes/home/routes.js').default,
    require('./routes/list/routes.js').default(store),
    require('./routes/topic/routes.js').default(store)
  ]
})
