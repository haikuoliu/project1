export default (store) => ( // eslint-disable-line no-unused-vars
  {
    path: 'list',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/BlogList').default)
      }, 'blog')
    }
  }
)
