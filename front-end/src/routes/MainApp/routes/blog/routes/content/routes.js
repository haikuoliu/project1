export default (store) => ( // eslint-disable-line no-unused-vars
  {
    path: 'content',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/index').default)
      }, 'blog')
    }
  }
)
