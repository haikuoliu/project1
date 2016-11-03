export default (store) => ({
  path: '/',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      // require('SRC/components/sub-nav/SubNav')
      cb(null, require('./containers/base').default)
    }, 'main')
  },
  childRoutes: [
    require('./routes/home/routes.js').default,
    require('./routes/blog/routes.js').default(store)
  ]
})
