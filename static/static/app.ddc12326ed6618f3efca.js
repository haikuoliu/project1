webpackJsonp([12],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(12);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRouter = __webpack_require__(28);
	
	var _reactRouterRedux = __webpack_require__(63);
	
	var _app = __webpack_require__(475);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _configureStore = __webpack_require__(525);
	
	var _configureStore2 = _interopRequireDefault(_configureStore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var store = (0, _configureStore2.default)(_reactRouter.hashHistory);
	var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.hashHistory, store);
	
	_reactDom2.default.render(_react2.default.createElement(_app2.default, { store: store, history: history }), document.getElementById('container'));

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.injectReducer = exports.makeRootReducer = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _reducerMap;
	
	var _redux = __webpack_require__(57);
	
	var _reactRouterRedux = __webpack_require__(63);
	
	var _immutable = __webpack_require__(75);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var initialState = _immutable2.default.Map();
	
	/* eslint-disable no-param-reassign, arrow-body-style, no-unused-vars*/
	var reducerMap = (_reducerMap = {}, _defineProperty(_reducerMap, _reactRouterRedux.LOCATION_CHANGE, function (state, action) {
	  Object.keys(sessionStorage).forEach(function (key) {
	    return state = state.set(key, _immutable2.default.fromJS(sessionStorage.getItem(key)));
	  });
	  return state;
	}), _defineProperty(_reducerMap, 'PERSISTENT@SET', function PERSISTENTSET(state, action) {
	  sessionStorage.setItem(action.key, action.value);
	  return state.set(action.key, _immutable2.default.fromJS(action.value));
	}), _reducerMap);
	
	function persistentStore() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (reducerMap[action.type]) {
	    return reducerMap[action.type](state, action);
	  }
	  return state;
	}
	
	var makeRootReducer = exports.makeRootReducer = function makeRootReducer(asyncReducers) {
	  return (0, _redux.combineReducers)(_extends({
	    // Add sync reducers here
	    routing: _reactRouterRedux.routerReducer,
	    persistentStore: persistentStore
	  }, asyncReducers));
	};
	
	var injectReducer = exports.injectReducer = function injectReducer(store, _ref) {
	  var key = _ref.key,
	      reducer = _ref.reducer;
	
	  store.asyncReducers[key] = reducer; // eslint-disable-line no-param-reassign
	  store.replaceReducer(makeRootReducer(store.asyncReducers));
	};
	
	exports.default = makeRootReducer;

/***/ },

/***/ 475:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(323);
	
	var _reactRouter = __webpack_require__(28);
	
	__webpack_require__(534);
	
	__webpack_require__(535);
	
	var _routes = __webpack_require__(476);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var App = function (_Component) {
	  _inherits(App, _Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	  }
	
	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          store = _props.store,
	          history = _props.history;
	
	      return _react2.default.createElement(
	        _reactRedux.Provider,
	        { store: store },
	        _react2.default.createElement(_reactRouter.Router, {
	          routes: (0, _routes2.default)(store), history: history,
	          onUpdate: function onUpdate() {
	            window.scrollTo(0, 0);
	          }
	        })
	      );
	    }
	  }]);
	
	  return App;
	}(_react.Component);
	
	exports.default = App;
	
	
	App.propTypes = {
	  store: _react2.default.PropTypes.object,
	  history: _react2.default.PropTypes.object
	};

/***/ },

/***/ 476:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var createRootRoutes = function createRootRoutes(store) {
	  return {
	    component: 'div',
	    childRoutes: [__webpack_require__(516).default(store), __webpack_require__(478).default(store), __webpack_require__(486).default(store), __webpack_require__(512).default, __webpack_require__(514).default]
	  };
	};
	
	exports.default = createRootRoutes;

/***/ },

/***/ 478:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: '/ads',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(477).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(2, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	    // require('./routes/home/routes.js').default,
	    __webpack_require__(480).default(store), __webpack_require__(482).default(store), __webpack_require__(484).default(store)]
	  };
	};

/***/ },

/***/ 480:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'ads_list',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(479).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(2, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 482:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'push',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(481).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(2, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 484:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'user_sets',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(483).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(2, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 486:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return {
	    path: 'client',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(485).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(5, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	    // require('./routes/home/routes.js').default,
	    __webpack_require__(488).default(store), __webpack_require__(494).default(store), __webpack_require__(496).default(store), __webpack_require__(506).default(store)]
	  };
	};

/***/ },

/***/ 488:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reducer = __webpack_require__(74);
	
	// eslint-disable-line no-unused-vars
	
	exports.default = function (store) {
	  return (// eslint-disable-line no-unused-vars
	    {
	      path: 'blog',
	      getComponent: function getComponent(location, cb) {
	        (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	          // Asyn Injection Of Reducers
	          // const reducer = require('./containers/reducer').default
	          // injectReducer(store, { key: 'blog', reducer })
	          cb(null, __webpack_require__(487).default);
	        }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(4, __WEBPACK_CALLBACK__);}());
	      },
	
	      childRoutes: [__webpack_require__(490).default(store), __webpack_require__(492).default(store)]
	    }
	  );
	};

/***/ },

/***/ 490:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'edit',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(489).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(4, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 492:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'view',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(491).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(4, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 494:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'feed',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(493).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(5, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 496:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'profile',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(495).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(1, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	    // require('./routes/home/routes.js').default,
	    __webpack_require__(500).default(store), __webpack_require__(498).default(store), __webpack_require__(502).default(store), __webpack_require__(504).default(store)]
	  };
	};

/***/ },

/***/ 498:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'follow',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(497).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(1, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 500:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'info',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(499).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(1, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 502:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'posts',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(501).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(1, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 504:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'subscribe',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(503).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(1, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 506:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'topics',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(505).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(3, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	    // require('./routes/home/routes.js').default,
	    __webpack_require__(508).default(store), __webpack_require__(510).default(store)]
	  };
	};

/***/ },

/***/ 508:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'list',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(507).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(3, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 510:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return { // eslint-disable-line no-unused-vars
	    path: 'topic',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(509).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(3, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [
	      // require('./routes/home/routes.js').default,
	      // require('./routes/blog/routes.js').default(store)
	    ]
	  };
	};

/***/ },

/***/ 512:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  path: '/demo',
	  getComponent: function getComponent(location, cb) {
	    (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	      cb(null, __webpack_require__(511).default);
	    }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(7, __WEBPACK_CALLBACK__);}());
	  }
	};

/***/ },

/***/ 514:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  path: '/login',
	  getComponent: function getComponent(location, cb) {
	    (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	      cb(null, __webpack_require__(513).default);
	    }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(11, __WEBPACK_CALLBACK__);}());
	  }
	};

/***/ },

/***/ 516:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (store) {
	  return {
	    path: '/',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // require('SRC/components/sub-nav/SubNav')
	        cb(null, __webpack_require__(515).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(10, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: [__webpack_require__(523).default, __webpack_require__(519).default(store)]
	  };
	};

/***/ },

/***/ 519:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reducer = __webpack_require__(74);
	
	exports.default = function (store) {
	  return {
	    path: 'blog',
	    getComponent: function getComponent(location, cb) {
	      (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	        // Asyn Injection Of Reducers
	        var reducer = __webpack_require__(518).default;
	        (0, _reducer.injectReducer)(store, { key: 'blog', reducer: reducer });
	        cb(null, __webpack_require__(517).default);
	      }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(8, __WEBPACK_CALLBACK__);}());
	    },
	
	    childRoutes: []
	  };
	};

/***/ },

/***/ 523:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  path: 'home',
	  getComponent: function getComponent(location, cb) {
	    (function(/* nsure */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function (require) {
	      cb(null, __webpack_require__(522).default);
	    }(__webpack_require__));};__webpack_require__.e(0, __WEBPACK_CALLBACK__);__webpack_require__.e(9, __WEBPACK_CALLBACK__);}());
	  }
	};

/***/ },

/***/ 524:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;
	
	var _redux = __webpack_require__(57);
	
	var _reduxThunk = __webpack_require__(161);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reactRouterRedux = __webpack_require__(63);
	
	var _reducer = __webpack_require__(74);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function configureStore(history, initialState) {
	  var store = (0, _redux.createStore)((0, _reducer2.default)(), initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reactRouterRedux.routerMiddleware)(history)), window.devToolsExtension ? window.devToolsExtension() : function (f) {
	    return f;
	  }));
	  store.asyncReducers = {};
	  if (false) {
	    module.hot.accept('../reducer.js', function () {
	      return store.replaceReducer(require('../reducer.js').default);
	    });
	  }
	
	  return store;
	}

/***/ },

/***/ 525:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _configureStore = __webpack_require__(526);
	
	var _configureStore2 = _interopRequireDefault(_configureStore);
	
	var _configureStore3 = __webpack_require__(524);
	
	var _configureStore4 = _interopRequireDefault(_configureStore3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var configureStore = void 0;
	
	if (true) {
	  configureStore = _configureStore2.default;
	} else {
	  configureStore = _configureStore4.default;
	}
	
	exports.default = configureStore;

/***/ },

/***/ 526:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;
	
	var _redux = __webpack_require__(57);
	
	var _reduxThunk = __webpack_require__(161);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reducer = __webpack_require__(74);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	var _reactRouterRedux = __webpack_require__(63);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function configureStore(history, initialState) {
	  var store = (0, _redux.createStore)((0, _reducer2.default)(), initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reactRouterRedux.routerMiddleware)(history))));
	  store.asyncReducers = {};
	  return store;
	}

/***/ },

/***/ 534:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 535:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=app.ddc12326ed6618f3efca.js.map