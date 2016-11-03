const createRootRoutes = (store) => ({
  component: 'div',
  childRoutes: [
    (require('SRC/routes/MainApp/routes.js').default)(store),
    require('SRC/routes/DemoApp/routes.js').default
  ]
})

export default createRootRoutes
