webpackJsonp([5],{

/***/ 441:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loadMyInfo = loadMyInfo;
	
	var _fetchPro = __webpack_require__(81);
	
	var _fetchPro2 = _interopRequireDefault(_fetchPro);
	
	var _action_const = __webpack_require__(37);
	
	var _apis = __webpack_require__(80);
	
	var _apis2 = _interopRequireDefault(_apis);
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import * as PersistentActions from 'SRC/action'
	
	// export function deleteBlogListItem(id) {
	//   return {
	//     type: 'BLOG@BLOG_CONTENT@DELETE_ITEM',
	//     id
	//   }
	// }
	
	/**
	
	  Async Actions
	
	*/
	
	function loadMyInfo(userId) {
	  return function (dispatch, getState) {
	    return (// eslint-disable-line no-unused-vars
	      (0, _fetchPro2.default)((0, _apis2.default)('users:getUserInfo', userId, userId)).then(function (response) {
	        return response.json();
	      }).catch(function () {
	        return { status: 'fail', result: { msg: 'Network Unavailable!' } };
	      }).then(function (json) {
	        if (json.status === 'fail') {
	          _logger2.default.error((0, _apis2.default)('users:getUserInfo', userId, userId), json.result.msg);
	          return;
	        }
	        // dispatch(PersistentActions.persistentSet('username', json.result.name))
	        dispatch({
	          type: _action_const.CLIENT_USER.LOAD,
	          status: json.status,
	          result: json.result
	        });
	      })
	    );
	  };
	}

/***/ },

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _style = __webpack_require__(79);
	
	var _row = __webpack_require__(78);
	
	var _row2 = _interopRequireDefault(_row);
	
	var _style2 = __webpack_require__(76);
	
	var _col = __webpack_require__(75);
	
	var _col2 = _interopRequireDefault(_col);
	
	var _style3 = __webpack_require__(193);
	
	var _menu = __webpack_require__(192);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(21);
	
	var _reactRedux = __webpack_require__(34);
	
	var _redux = __webpack_require__(14);
	
	var _action = __webpack_require__(441);
	
	var ClientGeneralAction = _interopRequireWildcard(_action);
	
	var _action2 = __webpack_require__(45);
	
	var PersistentActions = _interopRequireWildcard(_action2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SubMenu = _menu2.default.SubMenu;
	
	// import CSSModules from 'react-css-modules'
	// import styles from './style.hcss'
	
	var ClientApp = function (_Component) {
	  _inherits(ClientApp, _Component);
	
	  function ClientApp() {
	    _classCallCheck(this, ClientApp);
	
	    return _possibleConstructorReturn(this, (ClientApp.__proto__ || Object.getPrototypeOf(ClientApp)).apply(this, arguments));
	  }
	
	  _createClass(ClientApp, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var userId = this.props.persistentStore.userId;
	
	      this.props.actions.loadMyInfo(userId);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // eslint-disable-line no-unused-vars
	      var userId = this.props.persistentStore.userId;
	
	      var userInfo = this.props.userInfo;
	      if (userId != userInfo.userId) {
	        // eslint-disable-line eqeqeq
	        this.props.actions.loadMyInfo(userId);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var pathname = this.props.location.pathname.replace('/client/', '');
	      if (pathname === 'topics/topic') pathname = 'topics/list';
	      var userId = this.props.persistentStore.userId;
	
	      return _react2.default.createElement(
	        _row2.default,
	        { style: { height: window.innerHeight } },
	        _react2.default.createElement(
	          _col2.default,
	          { span: 4, className: 'full-height' },
	          _react2.default.createElement(
	            _menu2.default,
	            {
	              theme: 'dark',
	              className: 'full-height',
	              style: { width: '100%' },
	              defaultOpenKeys: ['topics', 'blog', 'profile'],
	              selectedKeys: [pathname],
	              mode: 'inline'
	            },
	            _react2.default.createElement(
	              _menu2.default.Item,
	              { key: 'feed' },
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/client/feed' },
	                'News Feed'
	              )
	            ),
	            _react2.default.createElement(
	              SubMenu,
	              { key: 'topics', title: 'Topics' },
	              _react2.default.createElement(
	                _menu2.default.Item,
	                { key: 'profile/subscribe' },
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { to: { pathname: '/client/profile/subscribe', query: { uid: userId } } },
	                  'My Topics'
	                )
	              ),
	              _react2.default.createElement(
	                _menu2.default.Item,
	                { key: 'topics/list' },
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { to: '/client/topics/list' },
	                  'More Topics'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              SubMenu,
	              { key: 'blog', title: 'Blog' },
	              _react2.default.createElement(
	                _menu2.default.Item,
	                { key: 'profile/posts' },
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { to: { pathname: '/client/profile/posts', query: { uid: userId } } },
	                  'My Posts'
	                )
	              ),
	              _react2.default.createElement(
	                _menu2.default.Item,
	                { key: 'blog/edit' },
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { to: '/client/blog/edit' },
	                  'Create Blog'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              SubMenu,
	              { key: 'profile', title: 'Profile' },
	              _react2.default.createElement(
	                _menu2.default.Item,
	                { key: 'profile/info' },
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { to: { pathname: '/client/profile/info', query: { uid: userId } } },
	                  'My Profile'
	                )
	              ),
	              _react2.default.createElement(
	                _menu2.default.Item,
	                { key: 'profile/follow' },
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { to: { pathname: '/client/profile/follow', query: { uid: userId } } },
	                  'My Follows'
	                )
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _col2.default,
	          { span: 20, className: 'full-height' },
	          this.props.children
	        )
	      );
	    }
	  }]);
	
	  return ClientApp;
	}(_react.Component);
	
	ClientApp.propTypes = {
	  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	  location: _react2.default.PropTypes.object,
	  userInfo: _react2.default.PropTypes.object,
	  persistentStore: _react2.default.PropTypes.object,
	  persistentActions: _react2.default.PropTypes.object,
	  actions: _react2.default.PropTypes.object
	};
	
	function mapState(state) {
	  return {
	    persistentStore: state.persistentStore.toJS(),
	    userInfo: state.clientGeneral.userInfo.toJS()
	  };
	}
	
	function mapDispatch(dispatch) {
	  return {
	    persistentActions: (0, _redux.bindActionCreators)(PersistentActions, dispatch),
	    actions: (0, _redux.bindActionCreators)(ClientGeneralAction, dispatch)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)(ClientApp);

/***/ },

/***/ 443:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reducerMap;
	
	var _redux = __webpack_require__(14);
	
	var _immutable = __webpack_require__(41);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _action_const = __webpack_require__(37);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	// import blogList from '../routes/list/containers/BlogListReducer'
	// import blogContent from '../routes/content/containers/reducer'
	
	var initialState = _immutable2.default.fromJS({
	  userName: '',
	  sex: 'Male',
	  birth: 1478236926748,
	  email: '',
	  followerNum: 12,
	  userId: -1
	});
	
	/* eslint-disable arrow-body-style, no-unused-vars*/
	var reducerMap = (_reducerMap = {}, _defineProperty(_reducerMap, _action_const.CLIENT_USER.LOAD, function (state, action) {
	  return state.merge(_immutable2.default.Map({
	    userName: action.result.name,
	    sex: action.result.sex ? 'Male' : 'Female',
	    birth: action.result.birth,
	    email: action.result.email,
	    followerNum: action.result.follows,
	    userId: action.result.uid
	  }));
	}), _defineProperty(_reducerMap, _action_const.CLIENT_USER.UPDATE, function (state, action) {
	  return state;
	}), _reducerMap);
	
	function userInfo() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (reducerMap[action.type]) {
	    return reducerMap[action.type](state, action);
	  }
	  return state;
	}
	
	exports.default = (0, _redux.combineReducers)({
	  userInfo: userInfo
	  // blogList,
	  // blogContent
	});

/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// import { DatePicker } from 'antd'
	
	var Feed = function (_Component) {
	  _inherits(Feed, _Component);
	
	  function Feed() {
	    _classCallCheck(this, Feed);
	
	    return _possibleConstructorReturn(this, (Feed.__proto__ || Object.getPrototypeOf(Feed)).apply(this, arguments));
	  }
	
	  _createClass(Feed, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          null,
	          ' News Feed '
	        )
	      );
	    }
	  }]);
	
	  return Feed;
	}(_react.Component);
	
	exports.default = Feed;

/***/ }

});
//# sourceMappingURL=5.client.chunk.72cd7300bd2f68e9b0a5.js.map