webpackJsonp([1],{

/***/ 194:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.profileUserInfoUpdate = profileUserInfoUpdate;
	exports.loadUserInfo = loadUserInfo;
	exports.getTopicsOfUser = getTopicsOfUser;
	
	var _fetchPro = __webpack_require__(81);
	
	var _fetchPro2 = _interopRequireDefault(_fetchPro);
	
	var _action_const = __webpack_require__(37);
	
	var _apis = __webpack_require__(80);
	
	var _apis2 = _interopRequireDefault(_apis);
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import * as PersistentActions from 'SRC/action'
	
	function profileUserInfoUpdate(key, value) {
	  return {
	    type: _action_const.CLIENT_PROFILE_USER_INFO.UPDATE,
	    key: key,
	    value: value
	  };
	}
	
	/**
	
	  Async Actions
	
	*/
	
	function loadUserInfo(myId, otherId) {
	  return function (dispatch, getState) {
	    // eslint-disable-line no-unused-vars
	    otherId = otherId || myId; // eslint-disable-line no-param-reassign
	    return (0, _fetchPro2.default)((0, _apis2.default)('users:getUserInfo', myId, otherId)).then(function (response) {
	      return response.json();
	    }).catch(function () {
	      return { status: 'fail', result: { msg: 'Network Unavailable!' } };
	    }).then(function (json) {
	      if (json.status === 'fail') {
	        _logger2.default.error((0, _apis2.default)('users:getUserInfo', myId, otherId), json.result.msg);
	        return;
	      }
	      // dispatch(PersistentActions.persistentSet('username', json.result.name))
	      dispatch({
	        type: _action_const.CLIENT_PROFILE_USER_INFO.LOAD,
	        status: json.status,
	        result: _extends({}, json.result, { isSelf: myId === otherId })
	      });
	    });
	  };
	}
	
	function getTopicsOfUser(myId) {
	  return function (dispatch, getState) {
	    return (// eslint-disable-line no-unused-vars
	      (0, _fetchPro2.default)((0, _apis2.default)('topics:getTopicsOfUser', myId)).then(function (response) {
	        return response.json();
	      }).catch(function () {
	        return { status: 'fail', result: { msg: 'Network Unavailable!' } };
	      }).then(function (json) {
	        if (json.status === 'fail') {
	          _logger2.default.error((0, _apis2.default)('topics:getTopicsOfUser', myId), json.result.msg);
	          return;
	        }
	        // dispatch(PersistentActions.persistentSet('username', json.result.name))
	        dispatch({
	          type: _action_const.CLIENT_TOPICS.LOAD_USER_TOPICS,
	          status: json.status,
	          result: json.result
	        });
	      })
	    );
	  };
	}

/***/ },

/***/ 410:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _defineProperty2 = __webpack_require__(9);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _slicedToArray2 = __webpack_require__(47);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	exports["default"] = ButtonGroup;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(8);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _splitObject3 = __webpack_require__(57);
	
	var _splitObject4 = _interopRequireDefault(_splitObject3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function ButtonGroup(props) {
	    var _classNames;
	
	    var _splitObject = (0, _splitObject4["default"])(props, ['prefixCls', 'size', 'className']),
	        _splitObject2 = (0, _slicedToArray3["default"])(_splitObject, 2),
	        _splitObject2$ = _splitObject2[0],
	        _splitObject2$$prefix = _splitObject2$.prefixCls,
	        prefixCls = _splitObject2$$prefix === undefined ? 'ant-btn-group' : _splitObject2$$prefix,
	        size = _splitObject2$.size,
	        className = _splitObject2$.className,
	        others = _splitObject2[1];
	    // large => lg
	    // small => sm
	
	
	    var sizeCls = {
	        large: 'lg',
	        small: 'sm'
	    }[size] || '';
	    var classes = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls, true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-' + sizeCls, sizeCls), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
	    return _react2["default"].createElement('div', (0, _extends3["default"])({}, others, { className: classes }));
	}
	module.exports = exports['default'];

/***/ },

/***/ 411:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = undefined;
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _defineProperty2 = __webpack_require__(9);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _slicedToArray2 = __webpack_require__(47);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(16);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(18);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(17);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(8);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactDom = __webpack_require__(12);
	
	var _icon = __webpack_require__(77);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _splitObject3 = __webpack_require__(57);
	
	var _splitObject4 = _interopRequireDefault(_splitObject3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
	var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
	function isString(str) {
	    return typeof str === 'string';
	}
	// Insert one space between two chinese characters automatically.
	function insertSpace(child) {
	    if (isString(child.type) && isTwoCNChar(child.props.children)) {
	        return _react2["default"].cloneElement(child, {}, child.props.children.split('').join(' '));
	    }
	    if (isString(child)) {
	        if (isTwoCNChar(child)) {
	            child = child.split('').join(' ');
	        }
	        return _react2["default"].createElement(
	            'span',
	            null,
	            child
	        );
	    }
	    return child;
	}
	
	var Button = function (_React$Component) {
	    (0, _inherits3["default"])(Button, _React$Component);
	
	    function Button() {
	        (0, _classCallCheck3["default"])(this, Button);
	
	        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
	
	        _this.clearButton = function (button) {
	            button.className = button.className.replace(' ' + _this.props.prefixCls + '-clicked', '');
	        };
	        _this.handleClick = function (e) {
	            // Add click effect
	            var buttonNode = (0, _reactDom.findDOMNode)(_this);
	            _this.clearButton(buttonNode);
	            _this.clickedTimeout = setTimeout(function () {
	                return buttonNode.className += ' ' + _this.props.prefixCls + '-clicked';
	            }, 10);
	            clearTimeout(_this.timeout);
	            _this.timeout = setTimeout(function () {
	                return _this.clearButton(buttonNode);
	            }, 500);
	            var onClick = _this.props.onClick;
	            if (onClick) {
	                onClick(e);
	            }
	        };
	        // Handle auto focus when click button in Chrome
	        _this.handleMouseUp = function (e) {
	            (0, _reactDom.findDOMNode)(_this).blur();
	            if (_this.props.onMouseUp) {
	                _this.props.onMouseUp(e);
	            }
	        };
	        return _this;
	    }
	
	    Button.prototype.componentWillUnmount = function componentWillUnmount() {
	        if (this.clickedTimeout) {
	            clearTimeout(this.clickedTimeout);
	        }
	        if (this.timeout) {
	            clearTimeout(this.timeout);
	        }
	    };
	
	    Button.prototype.render = function render() {
	        var _classNames;
	
	        var props = this.props;
	
	        var _splitObject = (0, _splitObject4["default"])(props, ['type', 'shape', 'size', 'className', 'htmlType', 'children', 'icon', 'loading', 'prefixCls']),
	            _splitObject2 = (0, _slicedToArray3["default"])(_splitObject, 2),
	            _splitObject2$ = _splitObject2[0],
	            type = _splitObject2$.type,
	            shape = _splitObject2$.shape,
	            size = _splitObject2$.size,
	            className = _splitObject2$.className,
	            htmlType = _splitObject2$.htmlType,
	            children = _splitObject2$.children,
	            icon = _splitObject2$.icon,
	            loading = _splitObject2$.loading,
	            prefixCls = _splitObject2$.prefixCls,
	            others = _splitObject2[1];
	        // large => lg
	        // small => sm
	
	
	        var sizeCls = {
	            large: 'lg',
	            small: 'sm'
	        }[size] || '';
	        var classes = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls, true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-' + type, type), (0, _defineProperty3["default"])(_classNames, prefixCls + '-' + shape, shape), (0, _defineProperty3["default"])(_classNames, prefixCls + '-' + sizeCls, sizeCls), (0, _defineProperty3["default"])(_classNames, prefixCls + '-icon-only', !children && icon), (0, _defineProperty3["default"])(_classNames, prefixCls + '-loading', loading), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
	        var iconType = loading ? 'loading' : icon;
	        var kids = _react2["default"].Children.map(children, insertSpace);
	        return _react2["default"].createElement(
	            'button',
	            (0, _extends3["default"])({}, others, { type: htmlType || 'button', className: classes, onMouseUp: this.handleMouseUp, onClick: this.handleClick }),
	            iconType ? _react2["default"].createElement(_icon2["default"], { type: iconType }) : null,
	            kids
	        );
	    };
	
	    return Button;
	}(_react2["default"].Component);
	
	exports["default"] = Button;
	
	Button.defaultProps = {
	    prefixCls: 'ant-btn',
	    loading: false
	};
	Button.propTypes = {
	    type: _react2["default"].PropTypes.string,
	    shape: _react2["default"].PropTypes.oneOf(['circle', 'circle-outline']),
	    size: _react2["default"].PropTypes.oneOf(['large', 'default', 'small']),
	    htmlType: _react2["default"].PropTypes.oneOf(['submit', 'button', 'reset']),
	    onClick: _react2["default"].PropTypes.func,
	    loading: _react2["default"].PropTypes.bool,
	    className: _react2["default"].PropTypes.string,
	    icon: _react2["default"].PropTypes.string
	};
	module.exports = exports['default'];

/***/ },

/***/ 412:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _button = __webpack_require__(411);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _buttonGroup = __webpack_require__(410);
	
	var _buttonGroup2 = _interopRequireDefault(_buttonGroup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	_button2["default"].Group = _buttonGroup2["default"];
	exports["default"] = _button2["default"];
	module.exports = exports['default'];

/***/ },

/***/ 413:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(30);
	
	__webpack_require__(832);

/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _style = __webpack_require__(193);
	
	var _menu = __webpack_require__(192);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(21);
	
	var _reactRedux = __webpack_require__(34);
	
	var _redux = __webpack_require__(14);
	
	var _action = __webpack_require__(194);
	
	var ClientProfileGeneralAction = _interopRequireWildcard(_action);
	
	var _action2 = __webpack_require__(45);
	
	var PersistentActions = _interopRequireWildcard(_action2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// <div>
	//   <Link to="/client/profile/info">Info </Link>
	//   <Link to="/client/profile/posts">Posts </Link>
	//   <Link to="/client/profile/follow">Follow </Link>
	//   <Link to="/client/profile/subscribe">Subscribe </Link>
	// </div>
	
	var menus = [{ name: 'Info', path: '/client/profile/info' }, { name: 'Posts', path: '/client/profile/posts' }, { name: 'Follow', path: '/client/profile/follow' }, { name: 'Subscribe', path: '/client/profile/subscribe' }];
	
	var Profile = function (_Component) {
	  _inherits(Profile, _Component);
	
	  function Profile() {
	    _classCallCheck(this, Profile);
	
	    return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
	  }
	
	  _createClass(Profile, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var query = this.props.location.query;
	      var userId = this.props.persistentStore.userId;
	
	      this.props.actions.loadUserInfo(userId, query.uid || userId);
	      this.props.actions.getTopicsOfUser(query.uid || userId);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var query = this.props.location.query;
	      var nextQuery = nextProps.location.query;
	      if (query.uid !== nextQuery.uid) {
	        var userId = this.props.persistentStore.userId;
	
	        this.props.actions.loadUserInfo(userId, nextQuery.uid || userId);
	        this.props.actions.getTopicsOfUser(query.uid || userId);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var pathname = this.props.location.pathname;
	      var userInfo = this.props.userInfo;
	      return _react2.default.createElement(
	        'div',
	        { className: 'full-height' },
	        _react2.default.createElement(
	          'div',
	          { className: 'fix-top-row-wrapper', style: { paddingTop: '130px' } },
	          _react2.default.createElement(
	            'div',
	            { className: 'fix-top-row', style: { height: '130px' } },
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement(
	                'h1',
	                {
	                  className: 'fc-white fs30',
	                  style: { paddingLeft: '5%', lineHeight: '80px', background: '#0272A2' }
	                },
	                'User Profile - ' + userInfo.userName
	              ),
	              _react2.default.createElement(
	                _menu2.default,
	                { mode: 'horizontal', className: 'fs16', selectedKeys: [pathname] },
	                menus.map(function (item) {
	                  return _react2.default.createElement(
	                    _menu2.default.Item,
	                    { key: item.path },
	                    _react2.default.createElement(
	                      _reactRouter.Link,
	                      { to: { pathname: item.path, query: { uid: userInfo.uid } } },
	                      item.name
	                    )
	                  );
	                })
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'full-height' },
	            this.props.children
	          )
	        )
	      );
	    }
	  }]);
	
	  return Profile;
	}(_react.Component);
	
	Profile.propTypes = {
	  location: _react2.default.PropTypes.object,
	  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
	  userInfo: _react2.default.PropTypes.object,
	  persistentStore: _react2.default.PropTypes.object,
	  persistentActions: _react2.default.PropTypes.object,
	  actions: _react2.default.PropTypes.object
	};
	
	function mapState(state) {
	  return {
	    persistentStore: state.persistentStore.toJS(),
	    userInfo: state.clientProfile.userInfo.toJS()
	  };
	}
	
	function mapDispatch(dispatch) {
	  return {
	    persistentActions: (0, _redux.bindActionCreators)(PersistentActions, dispatch),
	    actions: (0, _redux.bindActionCreators)(ClientProfileGeneralAction, dispatch)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)(Profile);

/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(14);
	
	var _reducer = __webpack_require__(460);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	var _reducer3 = __webpack_require__(466);
	
	var _reducer4 = _interopRequireDefault(_reducer3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//
	// const initialState = Immutable.fromJS({
	//   userName: 'Unkown UserName',
	//   sex: 'Male',
	//   birth: 1478236926748,
	//   email: 'example@gmail.com',
	//   followerNum: 12
	// })
	//
	// /* eslint-disable arrow-body-style, no-unused-vars*/
	// const reducerMap = {
	//   [CLIENT_USER.LOAD]: (state, action) => {
	//     return state.merge(Immutable.Map({
	//       userName: action.result.name,
	//       sex: action.result.sex ? 'Male' : 'Female',
	//       birth: action.result.birth,
	//       email: action.result.email,
	//       followerNum: action.result.follows
	//     }))
	//   },
	//   [CLIENT_USER.UPDATE]: (state, action) => {
	//     return state
	//   }
	// }
	//
	// function userInfo(state = initialState, action) {
	//   if (reducerMap[action.type]) {
	//     return reducerMap[action.type](state, action)
	//   }
	//   return state
	// }
	
	// import Immutable from 'immutable'
	
	// import { CLIENT_USER } from 'SRC/constants/action_const'
	exports.default = (0, _redux.combineReducers)({
	  userInfo: _reducer2.default,
	  userTopics: _reducer4.default
	});

/***/ },

/***/ 456:
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
	
	var ProfileFollow = function (_Component) {
	  _inherits(ProfileFollow, _Component);
	
	  function ProfileFollow() {
	    _classCallCheck(this, ProfileFollow);
	
	    return _possibleConstructorReturn(this, (ProfileFollow.__proto__ || Object.getPrototypeOf(ProfileFollow)).apply(this, arguments));
	  }
	
	  _createClass(ProfileFollow, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          null,
	          ' Follow '
	        )
	      );
	    }
	  }]);
	
	  return ProfileFollow;
	}(_react.Component);
	
	exports.default = ProfileFollow;

/***/ },

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.switchFollow = switchFollow;
	
	var _fetchPro = __webpack_require__(81);
	
	var _fetchPro2 = _interopRequireDefault(_fetchPro);
	
	var _apis = __webpack_require__(80);
	
	var _apis2 = _interopRequireDefault(_apis);
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _action = __webpack_require__(194);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import * as PersistentActions from 'SRC/action'
	
	/**
	
	  Async Actions
	
	*/
	
	function switchFollow(myId, otherId) {
	  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'follow';
	
	  return function (dispatch, getState) {
	    return (// eslint-disable-line no-unused-vars
	      (0, _fetchPro2.default)((0, _apis2.default)('users:switchFollow', myId, otherId, type === 'follow' ? 1 : 0)).then(function (response) {
	        return response.json();
	      }).catch(function () {
	        return { status: 'fail', result: { msg: 'Network Unavailable!' } };
	      }).then(function (json) {
	        if (json.status === 'fail') {
	          _logger2.default.error((0, _apis2.default)('users:switchFollow', myId, otherId, type === 'follow' ? 1 : 0), json.result.msg);
	          return;
	        }
	        // dispatch(PersistentActions.persistentSet('username', json.result.name))
	        dispatch((0, _action.profileUserInfoUpdate)('isFollow', type === 'follow'));
	        dispatch((0, _action.loadUserInfo)(myId, otherId));
	      })
	    );
	  };
	}

/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _style = __webpack_require__(413);
	
	var _button = __webpack_require__(412);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _style2 = __webpack_require__(79);
	
	var _row = __webpack_require__(78);
	
	var _row2 = _interopRequireDefault(_row);
	
	var _style3 = __webpack_require__(76);
	
	var _col = __webpack_require__(75);
	
	var _col2 = _interopRequireDefault(_col);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(34);
	
	var _redux = __webpack_require__(14);
	
	var _action = __webpack_require__(458);
	
	var ClientProfileInfoAction = _interopRequireWildcard(_action);
	
	var _action2 = __webpack_require__(45);
	
	var PersistentActions = _interopRequireWildcard(_action2);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _utils = __webpack_require__(491);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var infoList = [['User Name', 'userName'], ['Sex', 'sex'], ['Birth Day', 'birth', function (timestamp) {
	  return (0, _moment2.default)(timestamp).format('YYYY-MM-DD');
	}], ['Email', 'email'], ['Number of Followers', 'followerNum']];
	
	var ProfileInfo = function (_Component) {
	  _inherits(ProfileInfo, _Component);
	
	  function ProfileInfo(props) {
	    _classCallCheck(this, ProfileInfo);
	
	    var _this = _possibleConstructorReturn(this, (ProfileInfo.__proto__ || Object.getPrototypeOf(ProfileInfo)).call(this, props));
	
	    _this.switchFollowStatus = (0, _utils.throttle)(_this.switchFollowStatus, 5000).bind(_this);
	    return _this;
	  }
	
	  _createClass(ProfileInfo, [{
	    key: 'switchFollowStatus',
	    value: function switchFollowStatus() {
	      var _props$userInfo = this.props.userInfo,
	          uid = _props$userInfo.uid,
	          isFollow = _props$userInfo.isFollow; // otherId
	
	      var userId = this.props.persistentStore.userId; // myId
	
	      this.props.actions.switchFollow(userId, uid, isFollow ? 'cancel' : 'follow');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var userInfo = this.props.userInfo;
	
	      return _react2.default.createElement(
	        'div',
	        { style: { paddingTop: '30px' } },
	        infoList.map(function (args) {
	          return _react2.default.createElement(
	            _row2.default,
	            { key: args[0], className: 'fs16', style: { marginBottom: '24px' } },
	            _react2.default.createElement(
	              _col2.default,
	              { span: 8 },
	              _react2.default.createElement(
	                'h4',
	                { className: 'text-right fc-dark' },
	                args[0] + ':'
	              )
	            ),
	            args[2] ? _react2.default.createElement(
	              _col2.default,
	              { span: 8, offset: 2 },
	              args[2](userInfo[args[1]])
	            ) : _react2.default.createElement(
	              _col2.default,
	              { span: 8, offset: 2 },
	              userInfo[args[1]]
	            )
	          );
	        }),
	        userInfo.isSelf ? null : _react2.default.createElement(
	          _row2.default,
	          { className: 'fs16', style: { marginBottom: '24px' } },
	          _react2.default.createElement(
	            _col2.default,
	            { span: 8, offset: 10 },
	            _react2.default.createElement(
	              _button2.default,
	              {
	                type: userInfo.isFollow ? 'default' : 'primary',
	                size: 'large',
	                className: 'fs16',
	                onClick: this.switchFollowStatus
	              },
	              userInfo.isFollow ? 'Cancel Follow' : 'Follow'
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return ProfileInfo;
	}(_react.Component);
	
	ProfileInfo.propTypes = {
	  location: _react2.default.PropTypes.object,
	  userInfo: _react2.default.PropTypes.object,
	  persistentStore: _react2.default.PropTypes.object,
	  persistentActions: _react2.default.PropTypes.object,
	  actions: _react2.default.PropTypes.object
	};
	
	function mapState(state) {
	  return {
	    persistentStore: state.persistentStore.toJS(),
	    userInfo: state.clientProfile.userInfo.toJS()
	  };
	}
	
	function mapDispatch(dispatch) {
	  return {
	    persistentActions: (0, _redux.bindActionCreators)(PersistentActions, dispatch),
	    actions: (0, _redux.bindActionCreators)(ClientProfileInfoAction, dispatch)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)(ProfileInfo);

/***/ },

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reducerMap;
	
	exports.default = userInfo;
	
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
	  email: 'example@gmail.com',
	  isFollow: true,
	  followerNum: 12
	});
	
	/* eslint-disable arrow-body-style, no-unused-vars*/
	var reducerMap = (_reducerMap = {}, _defineProperty(_reducerMap, _action_const.CLIENT_PROFILE_USER_INFO.LOAD, function (state, action) {
	  return state.merge(_immutable2.default.Map({
	    userName: action.result.name,
	    sex: action.result.sex ? 'Male' : 'Female',
	    birth: action.result.birth,
	    email: action.result.email,
	    followerNum: action.result.follows,
	    isFollow: action.result.isFollow,
	    isSelf: action.result.isSelf,
	    uid: action.result.uid
	  }));
	}), _defineProperty(_reducerMap, _action_const.CLIENT_PROFILE_USER_INFO.UPDATE, function (state, action) {
	  return state.set(action.key, action.value);
	}), _reducerMap);
	
	function userInfo() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (reducerMap[action.type]) {
	    return reducerMap[action.type](state, action);
	  }
	  return state;
	}

/***/ },

/***/ 462:
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
	
	var ProfilePosts = function (_Component) {
	  _inherits(ProfilePosts, _Component);
	
	  function ProfilePosts() {
	    _classCallCheck(this, ProfilePosts);
	
	    return _possibleConstructorReturn(this, (ProfilePosts.__proto__ || Object.getPrototypeOf(ProfilePosts)).apply(this, arguments));
	  }
	
	  _createClass(ProfilePosts, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          null,
	          ' Posts '
	        )
	      );
	    }
	  }]);
	
	  return ProfilePosts;
	}(_react.Component);
	
	exports.default = ProfilePosts;

/***/ },

/***/ 464:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTopicsOfUser = getTopicsOfUser;
	
	var _fetchPro = __webpack_require__(81);
	
	var _fetchPro2 = _interopRequireDefault(_fetchPro);
	
	var _apis = __webpack_require__(80);
	
	var _apis2 = _interopRequireDefault(_apis);
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _action_const = __webpack_require__(37);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import * as PersistentActions from 'SRC/action'
	
	/**
	
	  Async Actions
	
	*/
	
	function getTopicsOfUser(myId) {
	  return function (dispatch, getState) {
	    return (// eslint-disable-line no-unused-vars
	      (0, _fetchPro2.default)((0, _apis2.default)('topics:getTopicsOfUser', myId)).then(function (response) {
	        return response.json();
	      }).catch(function () {
	        return { status: 'fail', result: { msg: 'Network Unavailable!' } };
	      }).then(function (json) {
	        if (json.status === 'fail') {
	          _logger2.default.error((0, _apis2.default)('topics:getTopicsOfUser', myId), json.result.msg);
	          return;
	        }
	        // dispatch(PersistentActions.persistentSet('username', json.result.name))
	        dispatch({
	          type: _action_const.CLIENT_TOPICS.LOAD_USER_TOPICS,
	          status: json.status,
	          result: json.result
	        });
	      })
	    );
	  };
	}

/***/ },

/***/ 465:
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
	
	var _style3 = __webpack_require__(74);
	
	var _card = __webpack_require__(73);
	
	var _card2 = _interopRequireDefault(_card);
	
	var _style4 = __webpack_require__(188);
	
	var _badge = __webpack_require__(187);
	
	var _badge2 = _interopRequireDefault(_badge);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(21);
	
	var _reactRedux = __webpack_require__(34);
	
	var _redux = __webpack_require__(14);
	
	var _action = __webpack_require__(464);
	
	var ClientProfileSubscribeAction = _interopRequireWildcard(_action);
	
	var _action2 = __webpack_require__(45);
	
	var PersistentActions = _interopRequireWildcard(_action2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ProfileSubscribe = function (_Component) {
	  _inherits(ProfileSubscribe, _Component);
	
	  function ProfileSubscribe() {
	    _classCallCheck(this, ProfileSubscribe);
	
	    return _possibleConstructorReturn(this, (ProfileSubscribe.__proto__ || Object.getPrototypeOf(ProfileSubscribe)).apply(this, arguments));
	  }
	
	  _createClass(ProfileSubscribe, [{
	    key: 'render',
	    value: function render() {
	      var userTopics = this.props.userTopics;
	      return _react2.default.createElement(
	        'div',
	        { className: 'full-height', style: { background: '#ECECEC', padding: '5%', overflow: 'auto' } },
	        _react2.default.createElement(
	          _row2.default,
	          null,
	          userTopics.topicsList.map(function (topic) {
	            return _react2.default.createElement(
	              _col2.default,
	              { key: topic.topic_name, span: 12, style: { height: '200px' } },
	              _react2.default.createElement(
	                _card2.default,
	                {
	                  title: _react2.default.createElement(
	                    'h3',
	                    { className: 'captialize' },
	                    _react2.default.createElement(
	                      _reactRouter.Link,
	                      { to: { pathname: '/client/topics/topic', query: { topic: topic.topic_name } } },
	                      topic.topic_name
	                    )
	                  ),
	                  bordered: true,
	                  extra: _react2.default.createElement(_badge2.default, { count: topic.count, style: { backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' } }),
	                  style: { width: '90%' }
	                },
	                _react2.default.createElement(
	                  'p',
	                  null,
	                  topic.description
	                )
	              )
	            );
	          })
	        )
	      );
	    }
	  }]);
	
	  return ProfileSubscribe;
	}(_react.Component);
	
	ProfileSubscribe.propTypes = {
	  location: _react2.default.PropTypes.object,
	  userInfo: _react2.default.PropTypes.object,
	  userTopics: _react2.default.PropTypes.object,
	  persistentStore: _react2.default.PropTypes.object,
	  persistentActions: _react2.default.PropTypes.object,
	  actions: _react2.default.PropTypes.object
	};
	
	function mapState(state) {
	  return {
	    persistentStore: state.persistentStore.toJS(),
	    userInfo: state.clientProfile.userInfo.toJS(),
	    userTopics: state.clientProfile.userTopics.toJS()
	  };
	}
	
	function mapDispatch(dispatch) {
	  return {
	    persistentActions: (0, _redux.bindActionCreators)(PersistentActions, dispatch),
	    actions: (0, _redux.bindActionCreators)(ClientProfileSubscribeAction, dispatch)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)(ProfileSubscribe);

/***/ },

/***/ 466:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = userInfo;
	
	var _immutable = __webpack_require__(41);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _action_const = __webpack_require__(37);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	// import blogList from '../routes/list/containers/BlogListReducer'
	// import blogContent from '../routes/content/containers/reducer'
	
	var initialState = _immutable2.default.fromJS({
	  topicsList: []
	});
	
	/* eslint-disable arrow-body-style, no-unused-vars*/
	var reducerMap = _defineProperty({}, _action_const.CLIENT_TOPICS.LOAD_USER_TOPICS, function (state, action) {
	  return state.set('topicsList', _immutable2.default.fromJS(action.result));
	});
	
	function userInfo() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (reducerMap[action.type]) {
	    return reducerMap[action.type](state, action);
	  }
	  return state;
	}

/***/ },

/***/ 491:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getReadableNumber = getReadableNumber;
	exports.getReadablePercent = getReadablePercent;
	exports.svg2img = svg2img;
	exports.svg2canvas = svg2canvas;
	exports.getChineseUnitNumber = getChineseUnitNumber;
	exports.debounce = debounce;
	exports.throttle = throttle;
	function getReadableNumber(number) {
	  var n = '' + number;
	  if (n.indexOf('.') < 0) {
	    return n.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
	  }
	  return n.replace(/(\d{1,3})(?=(\d{3})+\.)/g, '$1,');
	}
	
	function getReadablePercent(percent) {
	  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { decimal: 2 };
	
	  if (!percent && percent !== 0) return '';
	  return (percent * 100).toFixed(option.decimal) + '%';
	}
	
	function svg2img(svg) {
	  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var svg64 = btoa(unescape(encodeURIComponent(svg)));
	  var b64Start = 'data:image/svg+xml;base64,';
	  var image64 = b64Start + svg64;
	
	  // set it as the source of the img element
	  var img = new Image();
	  img.src = image64;
	  img.width = option.width || '100';
	  img.height = option.height || '100';
	  return img;
	}
	
	function svg2canvas(svg) {
	  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  // eslint-disable-line no-unused-vars
	  var img = svg2img(svg, option);
	  var myCanvas = document.createElement('canvas');
	  myCanvas.width = img.width;
	  myCanvas.height = img.height;
	  var myCanvasContext = myCanvas.getContext('2d');
	  myCanvasContext.drawImage(img, 0, 0);
	  return myCanvas;
	}
	
	/**
	   * 为数字加上单位：万或亿
	   *
	   * 例如：
	   *      1000.01 => 1000.01
	   *      10000 => 1万
	   *      99000 => 9.9万
	   *      566000 => 56.6万
	   *      5660000 => 566万
	   *      44440000 => 4444万
	   *      11111000 => 1111.1万
	   *      444400000 => 4.44亿
	   *      40000000,00000000,00000000 => 4000万亿亿
	   *      4,00000000,00000000,00000000 => 4亿亿亿
	   *
	   * @param {number} number 输入数字.
	   * @param {number} decimalDigit 小数点后最多位数，默认为2
	   * @return {string} 加上单位后的数字
	   */
	
	function getDigit(integer) {
	  var digit = -1;
	  while (integer >= 1) {
	    digit++;
	    integer = integer / 10; // eslint-disable-line no-param-reassign
	  }
	  return digit;
	}
	
	function addWan(integer, number, mutiple, decimalDigit) {
	  var digit = getDigit(integer);
	  if (digit > 3) {
	    var remainder = digit % 8;
	    if (remainder >= 5) {
	      // ‘十万’、‘百万’、‘千万’显示为‘万’
	      remainder = 4;
	    }
	    return Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit) + '\u4E07';
	  }
	  return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
	}
	
	function getChineseUnitNumber(number, decimalDigit) {
	  decimalDigit = decimalDigit == null ? 2 : decimalDigit; // eslint-disable-line no-param-reassign
	  var integer = Math.floor(number);
	  var digit = getDigit(integer);
	  // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
	  var unit = [];
	  if (digit > 3) {
	    var multiple = Math.floor(digit / 8);
	    if (multiple >= 1) {
	      var tmp = Math.round(integer / Math.pow(10, 8 * multiple));
	      unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
	      for (var i = 0; i < multiple; i++) {
	        unit.push('亿');
	      }
	      return unit.join('');
	    } else {
	      return addWan(integer, number, 0, decimalDigit);
	    }
	  } else {
	    return number;
	  }
	}
	
	/* eslint-disable */
	
	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	function debounce(func, wait, immediate) {
	  var timeout = void 0;
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var context = this;
	    var later = function later() {
	      timeout = null;
	      if (!immediate) func.apply(context, args);
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) func.apply(context, args);
	  };
	}
	
	// Returns a function, that, when invoked, will only be triggered at most once
	// during a given window of time. Normally, the throttled function will run
	// as much as it can, without ever going more than once per `wait` duration;
	// but if you'd like to disable the execution on the leading edge, pass
	// `{leading: false}`. To disable execution on the trailing edge, ditto.
	function throttle(func, wait, options) {
	  var context, args, result;
	  var timeout = null;
	  var previous = 0;
	  if (!options) options = {};
	  var later = function later() {
	    previous = options.leading === false ? 0 : Date.now();
	    timeout = null;
	    result = func.apply(context, args);
	    if (!timeout) context = args = null;
	  };
	  return function () {
	    var now = Date.now();
	    if (!previous && options.leading === false) previous = now;
	    var remaining = wait - (now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0 || remaining > wait) {
	      if (timeout) {
	        clearTimeout(timeout);
	        timeout = null;
	      }
	      previous = now;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    } else if (!timeout && options.trailing !== false) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };
	};

/***/ },

/***/ 542:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports
	
	
	// module
	exports.push([module.id, ".ant-btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: 500;\n  text-align: center;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  line-height: 1.5;\n  padding: 4px 15px;\n  font-size: 12px;\n  border-radius: 6px;\n  user-select: none;\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  position: relative;\n  color: #666;\n  background-color: #f7f7f7;\n  border-color: #d9d9d9;\n}\n.ant-btn > .anticon {\n  line-height: 1;\n}\n.ant-btn,\n.ant-btn:active,\n.ant-btn:focus {\n  outline: 0;\n}\n.ant-btn:not([disabled]):hover {\n  text-decoration: none;\n}\n.ant-btn:not([disabled]):active {\n  outline: 0;\n  transition: none;\n}\n.ant-btn.disabled,\n.ant-btn[disabled] {\n  cursor: not-allowed;\n}\n.ant-btn.disabled > *,\n.ant-btn[disabled] > * {\n  pointer-events: none;\n}\n.ant-btn-lg {\n  padding: 4px 15px 5px 15px;\n  font-size: 14px;\n  border-radius: 6px;\n}\n.ant-btn-sm {\n  padding: 1px 7px;\n  font-size: 12px;\n  border-radius: 4px;\n}\n.ant-btn > a:only-child {\n  color: currentColor;\n}\n.ant-btn > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn:hover,\n.ant-btn:focus {\n  color: #57c5f7;\n  background-color: #f7f7f7;\n  border-color: #57c5f7;\n}\n.ant-btn:hover > a:only-child,\n.ant-btn:focus > a:only-child {\n  color: currentColor;\n}\n.ant-btn:hover > a:only-child:after,\n.ant-btn:focus > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn:active,\n.ant-btn.active {\n  color: #2baee9;\n  background-color: #f7f7f7;\n  border-color: #2baee9;\n}\n.ant-btn:active > a:only-child,\n.ant-btn.active > a:only-child {\n  color: currentColor;\n}\n.ant-btn:active > a:only-child:after,\n.ant-btn.active > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn.disabled,\n.ant-btn[disabled],\n.ant-btn.disabled:hover,\n.ant-btn[disabled]:hover,\n.ant-btn.disabled:focus,\n.ant-btn[disabled]:focus,\n.ant-btn.disabled:active,\n.ant-btn[disabled]:active,\n.ant-btn.disabled.active,\n.ant-btn[disabled].active {\n  color: #ccc;\n  background-color: #f7f7f7;\n  border-color: #d9d9d9;\n}\n.ant-btn.disabled > a:only-child,\n.ant-btn[disabled] > a:only-child,\n.ant-btn.disabled:hover > a:only-child,\n.ant-btn[disabled]:hover > a:only-child,\n.ant-btn.disabled:focus > a:only-child,\n.ant-btn[disabled]:focus > a:only-child,\n.ant-btn.disabled:active > a:only-child,\n.ant-btn[disabled]:active > a:only-child,\n.ant-btn.disabled.active > a:only-child,\n.ant-btn[disabled].active > a:only-child {\n  color: currentColor;\n}\n.ant-btn.disabled > a:only-child:after,\n.ant-btn[disabled] > a:only-child:after,\n.ant-btn.disabled:hover > a:only-child:after,\n.ant-btn[disabled]:hover > a:only-child:after,\n.ant-btn.disabled:focus > a:only-child:after,\n.ant-btn[disabled]:focus > a:only-child:after,\n.ant-btn.disabled:active > a:only-child:after,\n.ant-btn[disabled]:active > a:only-child:after,\n.ant-btn.disabled.active > a:only-child:after,\n.ant-btn[disabled].active > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn:hover,\n.ant-btn:focus,\n.ant-btn:active,\n.ant-btn.active {\n  background: #fff;\n}\n.ant-btn-primary {\n  color: #fff;\n  background-color: #2db7f5;\n  border-color: #2db7f5;\n}\n.ant-btn-primary > a:only-child {\n  color: currentColor;\n}\n.ant-btn-primary > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-primary:hover,\n.ant-btn-primary:focus {\n  color: #fff;\n  background-color: #57c5f7;\n  border-color: #57c5f7;\n}\n.ant-btn-primary:hover > a:only-child,\n.ant-btn-primary:focus > a:only-child {\n  color: currentColor;\n}\n.ant-btn-primary:hover > a:only-child:after,\n.ant-btn-primary:focus > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-primary:active,\n.ant-btn-primary.active {\n  color: #fff;\n  background-color: #2baee9;\n  border-color: #2baee9;\n}\n.ant-btn-primary:active > a:only-child,\n.ant-btn-primary.active > a:only-child {\n  color: currentColor;\n}\n.ant-btn-primary:active > a:only-child:after,\n.ant-btn-primary.active > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-primary.disabled,\n.ant-btn-primary[disabled],\n.ant-btn-primary.disabled:hover,\n.ant-btn-primary[disabled]:hover,\n.ant-btn-primary.disabled:focus,\n.ant-btn-primary[disabled]:focus,\n.ant-btn-primary.disabled:active,\n.ant-btn-primary[disabled]:active,\n.ant-btn-primary.disabled.active,\n.ant-btn-primary[disabled].active {\n  color: #ccc;\n  background-color: #f7f7f7;\n  border-color: #d9d9d9;\n}\n.ant-btn-primary.disabled > a:only-child,\n.ant-btn-primary[disabled] > a:only-child,\n.ant-btn-primary.disabled:hover > a:only-child,\n.ant-btn-primary[disabled]:hover > a:only-child,\n.ant-btn-primary.disabled:focus > a:only-child,\n.ant-btn-primary[disabled]:focus > a:only-child,\n.ant-btn-primary.disabled:active > a:only-child,\n.ant-btn-primary[disabled]:active > a:only-child,\n.ant-btn-primary.disabled.active > a:only-child,\n.ant-btn-primary[disabled].active > a:only-child {\n  color: currentColor;\n}\n.ant-btn-primary.disabled > a:only-child:after,\n.ant-btn-primary[disabled] > a:only-child:after,\n.ant-btn-primary.disabled:hover > a:only-child:after,\n.ant-btn-primary[disabled]:hover > a:only-child:after,\n.ant-btn-primary.disabled:focus > a:only-child:after,\n.ant-btn-primary[disabled]:focus > a:only-child:after,\n.ant-btn-primary.disabled:active > a:only-child:after,\n.ant-btn-primary[disabled]:active > a:only-child:after,\n.ant-btn-primary.disabled.active > a:only-child:after,\n.ant-btn-primary[disabled].active > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-group .ant-btn-primary:not(:first-child):not(:last-child) {\n  border-right-color: #2baee9;\n  border-left-color: #2baee9;\n}\n.ant-btn-group .ant-btn-primary:first-child:not(:last-child) {\n  border-right-color: #2baee9;\n}\n.ant-btn-group .ant-btn-primary:first-child:not(:last-child)[disabled] {\n  border-right-color: #d9d9d9;\n}\n.ant-btn-group .ant-btn-primary:last-child:not(:first-child),\n.ant-btn-group .ant-btn-primary + .ant-btn {\n  border-left-color: #2baee9;\n}\n.ant-btn-group .ant-btn-primary:last-child:not(:first-child)[disabled],\n.ant-btn-group .ant-btn-primary + .ant-btn[disabled] {\n  border-left-color: #d9d9d9;\n}\n.ant-btn-ghost {\n  color: #666;\n  background-color: transparent;\n  border-color: #d9d9d9;\n}\n.ant-btn-ghost > a:only-child {\n  color: currentColor;\n}\n.ant-btn-ghost > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-ghost:hover,\n.ant-btn-ghost:focus {\n  color: #57c5f7;\n  background-color: transparent;\n  border-color: #57c5f7;\n}\n.ant-btn-ghost:hover > a:only-child,\n.ant-btn-ghost:focus > a:only-child {\n  color: currentColor;\n}\n.ant-btn-ghost:hover > a:only-child:after,\n.ant-btn-ghost:focus > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-ghost:active,\n.ant-btn-ghost.active {\n  color: #2baee9;\n  background-color: transparent;\n  border-color: #2baee9;\n}\n.ant-btn-ghost:active > a:only-child,\n.ant-btn-ghost.active > a:only-child {\n  color: currentColor;\n}\n.ant-btn-ghost:active > a:only-child:after,\n.ant-btn-ghost.active > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-ghost.disabled,\n.ant-btn-ghost[disabled],\n.ant-btn-ghost.disabled:hover,\n.ant-btn-ghost[disabled]:hover,\n.ant-btn-ghost.disabled:focus,\n.ant-btn-ghost[disabled]:focus,\n.ant-btn-ghost.disabled:active,\n.ant-btn-ghost[disabled]:active,\n.ant-btn-ghost.disabled.active,\n.ant-btn-ghost[disabled].active {\n  color: #ccc;\n  background-color: #f7f7f7;\n  border-color: #d9d9d9;\n}\n.ant-btn-ghost.disabled > a:only-child,\n.ant-btn-ghost[disabled] > a:only-child,\n.ant-btn-ghost.disabled:hover > a:only-child,\n.ant-btn-ghost[disabled]:hover > a:only-child,\n.ant-btn-ghost.disabled:focus > a:only-child,\n.ant-btn-ghost[disabled]:focus > a:only-child,\n.ant-btn-ghost.disabled:active > a:only-child,\n.ant-btn-ghost[disabled]:active > a:only-child,\n.ant-btn-ghost.disabled.active > a:only-child,\n.ant-btn-ghost[disabled].active > a:only-child {\n  color: currentColor;\n}\n.ant-btn-ghost.disabled > a:only-child:after,\n.ant-btn-ghost[disabled] > a:only-child:after,\n.ant-btn-ghost.disabled:hover > a:only-child:after,\n.ant-btn-ghost[disabled]:hover > a:only-child:after,\n.ant-btn-ghost.disabled:focus > a:only-child:after,\n.ant-btn-ghost[disabled]:focus > a:only-child:after,\n.ant-btn-ghost.disabled:active > a:only-child:after,\n.ant-btn-ghost[disabled]:active > a:only-child:after,\n.ant-btn-ghost.disabled.active > a:only-child:after,\n.ant-btn-ghost[disabled].active > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-dashed {\n  color: #666;\n  background-color: transparent;\n  border-color: #d9d9d9;\n  border-style: dashed;\n}\n.ant-btn-dashed > a:only-child {\n  color: currentColor;\n}\n.ant-btn-dashed > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-dashed:hover,\n.ant-btn-dashed:focus {\n  color: #57c5f7;\n  background-color: transparent;\n  border-color: #57c5f7;\n}\n.ant-btn-dashed:hover > a:only-child,\n.ant-btn-dashed:focus > a:only-child {\n  color: currentColor;\n}\n.ant-btn-dashed:hover > a:only-child:after,\n.ant-btn-dashed:focus > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-dashed:active,\n.ant-btn-dashed.active {\n  color: #2baee9;\n  background-color: transparent;\n  border-color: #2baee9;\n}\n.ant-btn-dashed:active > a:only-child,\n.ant-btn-dashed.active > a:only-child {\n  color: currentColor;\n}\n.ant-btn-dashed:active > a:only-child:after,\n.ant-btn-dashed.active > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-dashed.disabled,\n.ant-btn-dashed[disabled],\n.ant-btn-dashed.disabled:hover,\n.ant-btn-dashed[disabled]:hover,\n.ant-btn-dashed.disabled:focus,\n.ant-btn-dashed[disabled]:focus,\n.ant-btn-dashed.disabled:active,\n.ant-btn-dashed[disabled]:active,\n.ant-btn-dashed.disabled.active,\n.ant-btn-dashed[disabled].active {\n  color: #ccc;\n  background-color: #f7f7f7;\n  border-color: #d9d9d9;\n}\n.ant-btn-dashed.disabled > a:only-child,\n.ant-btn-dashed[disabled] > a:only-child,\n.ant-btn-dashed.disabled:hover > a:only-child,\n.ant-btn-dashed[disabled]:hover > a:only-child,\n.ant-btn-dashed.disabled:focus > a:only-child,\n.ant-btn-dashed[disabled]:focus > a:only-child,\n.ant-btn-dashed.disabled:active > a:only-child,\n.ant-btn-dashed[disabled]:active > a:only-child,\n.ant-btn-dashed.disabled.active > a:only-child,\n.ant-btn-dashed[disabled].active > a:only-child {\n  color: currentColor;\n}\n.ant-btn-dashed.disabled > a:only-child:after,\n.ant-btn-dashed[disabled] > a:only-child:after,\n.ant-btn-dashed.disabled:hover > a:only-child:after,\n.ant-btn-dashed[disabled]:hover > a:only-child:after,\n.ant-btn-dashed.disabled:focus > a:only-child:after,\n.ant-btn-dashed[disabled]:focus > a:only-child:after,\n.ant-btn-dashed.disabled:active > a:only-child:after,\n.ant-btn-dashed[disabled]:active > a:only-child:after,\n.ant-btn-dashed.disabled.active > a:only-child:after,\n.ant-btn-dashed[disabled].active > a:only-child:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: transparent;\n}\n.ant-btn-circle,\n.ant-btn-circle-outline {\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  font-size: 14px;\n  border-radius: 50%;\n}\n.ant-btn-circle.ant-btn-lg,\n.ant-btn-circle-outline.ant-btn-lg {\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  font-size: 16px;\n  border-radius: 50%;\n}\n.ant-btn-circle.ant-btn-sm,\n.ant-btn-circle-outline.ant-btn-sm {\n  width: 22px;\n  height: 22px;\n  padding: 0;\n  font-size: 12px;\n  border-radius: 50%;\n}\n.ant-btn:before {\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  bottom: -1px;\n  right: -1px;\n  background: #fff;\n  opacity: 0.35;\n  content: '';\n  border-radius: inherit;\n  z-index: 1;\n  transition: opacity .2s;\n  pointer-events: none;\n  display: none;\n}\n.ant-btn.ant-btn-loading {\n  padding-left: 29px;\n  pointer-events: none;\n  position: relative;\n}\n.ant-btn.ant-btn-loading .anticon {\n  margin-left: -14px;\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.ant-btn.ant-btn-loading:before {\n  display: block;\n}\n.ant-btn-sm.ant-btn-loading {\n  padding-left: 24px;\n}\n.ant-btn-sm.ant-btn-loading .anticon {\n  margin-left: -17px;\n}\n.ant-btn-group {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n.ant-btn-group > .ant-btn {\n  position: relative;\n}\n.ant-btn-group > .ant-btn:hover,\n.ant-btn-group > .ant-btn:focus,\n.ant-btn-group > .ant-btn:active,\n.ant-btn-group > .ant-btn.active {\n  z-index: 2;\n}\n.ant-btn-group-lg > .ant-btn {\n  padding: 4px 15px 5px 15px;\n  font-size: 14px;\n  border-radius: 6px;\n}\n.ant-btn-group-sm > .ant-btn {\n  padding: 1px 7px;\n  font-size: 12px;\n  border-radius: 4px;\n}\n.ant-btn-group-sm > .ant-btn > .anticon {\n  font-size: 12px;\n}\n.ant-btn-group .ant-btn + .ant-btn,\n.ant-btn + .ant-btn-group,\n.ant-btn-group + .ant-btn,\n.ant-btn-group + .ant-btn-group {\n  margin-left: -1px;\n}\n.ant-btn-group .ant-btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.ant-btn-group > .ant-btn:first-child {\n  margin-left: 0;\n}\n.ant-btn-group > .ant-btn:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n  padding-right: 8px;\n}\n.ant-btn-group > .ant-btn:last-child:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n  padding-left: 8px;\n}\n.ant-btn-group > .ant-btn-group {\n  float: left;\n}\n.ant-btn-group > .ant-btn-group:not(:first-child):not(:last-child) > .ant-btn {\n  border-radius: 0;\n}\n.ant-btn-group > .ant-btn-group:first-child:not(:last-child) > .ant-btn:last-child {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n  padding-right: 8px;\n}\n.ant-btn-group > .ant-btn-group:last-child:not(:first-child) > .ant-btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n  padding-left: 8px;\n}\n.ant-btn:not(.ant-btn-circle):not(.ant-btn-circle-outline).ant-btn-icon-only {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.ant-btn > .anticon + span,\n.ant-btn > span + .anticon {\n  margin-left: 0.5em;\n}\n.ant-btn-clicked:after {\n  content: '';\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  bottom: -1px;\n  right: -1px;\n  border-radius: inherit;\n  border: 0 solid #2db7f5;\n  opacity: 0.4;\n  animation: buttonEffect 0.36s ease-out forwards;\n  display: block;\n}\n@keyframes buttonEffect {\n  to {\n    opacity: 0;\n    top: -6px;\n    left: -6px;\n    bottom: -6px;\n    right: -6px;\n    border-width: 6px;\n  }\n}\n", ""]);
	
	// exports


/***/ },

/***/ 832:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(542);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../css-loader/index.js!./../../../../less-loader/index.js!./index.less", function() {
				var newContent = require("!!./../../../../css-loader/index.js!./../../../../less-loader/index.js!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }

});
//# sourceMappingURL=1.profile.chunk.6fbbdddf84a89012a605.js.map