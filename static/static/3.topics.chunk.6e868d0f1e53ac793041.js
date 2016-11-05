webpackJsonp([3],{

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(30);

/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loadAllTopics = loadAllTopics;
	exports.loadAllEventsOfTopics = loadAllEventsOfTopics;
	
	var _fetchPro = __webpack_require__(81);
	
	var _fetchPro2 = _interopRequireDefault(_fetchPro);
	
	var _action_const = __webpack_require__(37);
	
	var _apis = __webpack_require__(80);
	
	var _apis2 = _interopRequireDefault(_apis);
	
	var _logger = __webpack_require__(58);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	
	  Async Actions
	
	*/
	
	function loadAllTopics() {
	  return function (dispatch, getState) {
	    return (// eslint-disable-line no-unused-vars
	      (0, _fetchPro2.default)((0, _apis2.default)('topics:getAllTopics')).then(function (response) {
	        return response.json();
	      }).catch(function () {
	        return { status: 'fail', result: { msg: 'Network Unavailable!' } };
	      }).then(function (json) {
	        if (json.status === 'fail') {
	          _logger2.default.error((0, _apis2.default)('topics:getAllTopics'), json.result.msg);
	          return;
	        }
	        // dispatch(PersistentActions.persistentSet('username', json.result.name))
	        dispatch({
	          type: _action_const.CLIENT_TOPICS.LOAD_TOPIC_LIST,
	          status: json.status,
	          result: json.result.sort(function (a, b) {
	            return b.count - a.count;
	          })
	        });
	      })
	    );
	  };
	}
	
	function loadAllEventsOfTopics(topic) {
	  return function (dispatch, getState) {
	    return (// eslint-disable-line no-unused-vars
	      (0, _fetchPro2.default)((0, _apis2.default)('topics:getAllEventsOfTopic', topic)).then(function (response) {
	        return response.json();
	      }).catch(function () {
	        return { status: 'fail', result: { msg: 'Network Unavailable!' } };
	      }).then(function (json) {
	        if (json.status === 'fail') {
	          _logger2.default.error((0, _apis2.default)('topics:getAllEventsOfTopic', topic), json.result.msg);
	          return;
	        }
	        // dispatch(PersistentActions.persistentSet('username', json.result.name))
	        dispatch({
	          type: _action_const.CLIENT_TOPICS.LOAD_EVENT_LIST,
	          status: json.status,
	          result: {
	            topic: topic,
	            eventsList: json.result.sort(function (a, b) {
	              return b.likes - a.likes;
	            })
	          }
	        });
	      })
	    );
	  };
	}

/***/ },

/***/ 429:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _style = __webpack_require__(74);
	
	var _card = __webpack_require__(73);
	
	var _card2 = _interopRequireDefault(_card);
	
	var _style2 = __webpack_require__(189);
	
	var _icon = __webpack_require__(77);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(21);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BlogCard = function (_Component) {
	  _inherits(BlogCard, _Component);
	
	  function BlogCard() {
	    _classCallCheck(this, BlogCard);
	
	    return _possibleConstructorReturn(this, (BlogCard.__proto__ || Object.getPrototypeOf(BlogCard)).apply(this, arguments));
	  }
	
	  _createClass(BlogCard, [{
	    key: 'render',
	    value: function render() {
	      var event = this.props.event;
	
	      return _react2.default.createElement(
	        _card2.default,
	        {
	          bordered: true,
	          style: { margin: '30px 10%' }
	        },
	        _react2.default.createElement(
	          'div',
	          { className: 'fs14 margB15' },
	          _react2.default.createElement(
	            'h2',
	            { className: 'captialize fc-dark' },
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { className: 'fc-dark', to: { pathname: '/client/profile/info', query: { uid: event.uid } } },
	              event.title
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'fs12 margB15' },
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { className: 'fc-dark', to: { pathname: '/client/profile/info', query: { uid: event.uid } } },
	              '@ ' + event.user_name
	            )
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            event.description
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'fs16' },
	          _react2.default.createElement(_icon2.default, { type: 'like' }),
	          ' ',
	          event.likes
	        )
	      );
	    }
	  }]);
	
	  return BlogCard;
	}(_react.Component);
	
	BlogCard.propTypes = {
	  event: _react2.default.PropTypes.object
	};
	
	BlogCard.defaultProps = {
	  event: {}
	};
	
	exports.default = BlogCard;

/***/ },

/***/ 430:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _style = __webpack_require__(74);
	
	var _card = __webpack_require__(73);
	
	var _card2 = _interopRequireDefault(_card);
	
	var _style2 = __webpack_require__(189);
	
	var _icon = __webpack_require__(77);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(21);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BlogCard = function (_Component) {
	  _inherits(BlogCard, _Component);
	
	  function BlogCard() {
	    _classCallCheck(this, BlogCard);
	
	    return _possibleConstructorReturn(this, (BlogCard.__proto__ || Object.getPrototypeOf(BlogCard)).apply(this, arguments));
	  }
	
	  _createClass(BlogCard, [{
	    key: 'render',
	    value: function render() {
	      var event = this.props.event;
	
	      return _react2.default.createElement(
	        _card2.default,
	        {
	          bordered: true,
	          style: { margin: '30px 10%' }
	        },
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement('img', { alt: 'example', width: '100%', src: event.url })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'fs12 margB15' },
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { className: 'fc-dark', to: { pathname: '/client/profile/info', query: { uid: event.uid } } },
	            '@ ' + event.user_name
	          )
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          event.description
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'fs16' },
	          _react2.default.createElement(_icon2.default, { type: 'like' }),
	          ' ',
	          event.likes
	        )
	      );
	    }
	  }]);
	
	  return BlogCard;
	}(_react.Component);
	
	BlogCard.propTypes = {
	  event: _react2.default.PropTypes.object
	};
	
	BlogCard.defaultProps = {
	  event: {}
	};
	
	exports.default = BlogCard;

/***/ },

/***/ 431:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BlogCard = exports.BlogCard = __webpack_require__(429).default;
	var ImgCard = exports.ImgCard = __webpack_require__(430).default;

/***/ },

/***/ 468:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
	
	var Topics = function (_Component) {
	  _inherits(Topics, _Component);
	
	  function Topics() {
	    _classCallCheck(this, Topics);
	
	    return _possibleConstructorReturn(this, (Topics.__proto__ || Object.getPrototypeOf(Topics)).apply(this, arguments));
	  }
	
	  _createClass(Topics, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "full-height" },
	        _react2.default.createElement(
	          "div",
	          { className: "fix-top-row-wrapper", style: { paddingTop: '80px' } },
	          _react2.default.createElement(
	            "div",
	            { className: "fix-top-row", style: { height: '80px', background: '#0272A2' } },
	            _react2.default.createElement(
	              "h1",
	              { className: "fc-white", style: { fontSize: '30px', lineHeight: '80px', marginLeft: '5%' } },
	              "Topics"
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "full-height" },
	            this.props.children
	          )
	        )
	      );
	    }
	  }]);
	
	  return Topics;
	}(_react.Component);
	
	Topics.propTypes = {
	  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element])
	};
	
	exports.default = Topics;

/***/ },

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reducerMap;
	
	var _immutable = __webpack_require__(41);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _action_const = __webpack_require__(37);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // import { combineReducers } from 'redux'
	
	
	// import userInfo from '../routes/info/containers/reducer'
	
	var initialState = _immutable2.default.fromJS({
	  topicsList: [],
	  eventsList: {}
	});
	
	/* eslint-disable arrow-body-style, no-unused-vars*/
	var reducerMap = (_reducerMap = {}, _defineProperty(_reducerMap, _action_const.CLIENT_TOPICS.LOAD_TOPIC_LIST, function (state, action) {
	  return state.set('topicsList', _immutable2.default.fromJS(action.result));
	}), _defineProperty(_reducerMap, _action_const.CLIENT_TOPICS.LOAD_EVENT_LIST, function (state, action) {
	  return state.update('eventsList', function (oldDict) {
	    return oldDict.set(action.result.topic, _immutable2.default.fromJS(action.result.eventsList));
	  });
	}), _reducerMap);
	
	function clientTopics() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (reducerMap[action.type]) {
	    return reducerMap[action.type](state, action);
	  }
	  return state;
	}
	
	exports.default = clientTopics;

/***/ },

/***/ 471:
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
	
	var _action = __webpack_require__(195);
	
	var ClientTopicsAction = _interopRequireWildcard(_action);
	
	var _action2 = __webpack_require__(45);
	
	var PersistentActions = _interopRequireWildcard(_action2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TopicsList = function (_Component) {
	  _inherits(TopicsList, _Component);
	
	  function TopicsList() {
	    _classCallCheck(this, TopicsList);
	
	    return _possibleConstructorReturn(this, (TopicsList.__proto__ || Object.getPrototypeOf(TopicsList)).apply(this, arguments));
	  }
	
	  _createClass(TopicsList, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.props.actions.loadAllTopics();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var topicsStore = this.props.topicsStore;
	      return _react2.default.createElement(
	        'div',
	        { className: 'full-height', style: { background: '#ECECEC', padding: '5%', overflow: 'auto' } },
	        _react2.default.createElement(
	          _row2.default,
	          null,
	          topicsStore.topicsList.map(function (topic) {
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
	
	  return TopicsList;
	}(_react.Component);
	
	TopicsList.propTypes = {
	  location: _react2.default.PropTypes.object,
	  topicsStore: _react2.default.PropTypes.object,
	  persistentStore: _react2.default.PropTypes.object,
	  persistentActions: _react2.default.PropTypes.object,
	  actions: _react2.default.PropTypes.object
	};
	
	function mapState(state) {
	  return {
	    persistentStore: state.persistentStore.toJS(),
	    topicsStore: state.clientTopics.toJS()
	  };
	}
	
	function mapDispatch(dispatch) {
	  return {
	    persistentActions: (0, _redux.bindActionCreators)(PersistentActions, dispatch),
	    actions: (0, _redux.bindActionCreators)(ClientTopicsAction, dispatch)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)(TopicsList);

/***/ },

/***/ 473:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(34);
	
	var _redux = __webpack_require__(14);
	
	var _action = __webpack_require__(195);
	
	var ClientTopicsAction = _interopRequireWildcard(_action);
	
	var _action2 = __webpack_require__(45);
	
	var PersistentActions = _interopRequireWildcard(_action2);
	
	var _eventCard = __webpack_require__(431);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import { Link } from 'react-router'
	
	
	var TopicEventsList = function (_Component) {
	  _inherits(TopicEventsList, _Component);
	
	  function TopicEventsList() {
	    _classCallCheck(this, TopicEventsList);
	
	    return _possibleConstructorReturn(this, (TopicEventsList.__proto__ || Object.getPrototypeOf(TopicEventsList)).apply(this, arguments));
	  }
	
	  _createClass(TopicEventsList, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var query = this.props.location.query;
	      if (!this.props.topicsStore.eventsList[query.topic]) {
	        this.props.actions.loadAllEventsOfTopics(query.topic);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var topicsStore = this.props.topicsStore;
	      var topic = this.props.location.query.topic || '';
	      return _react2.default.createElement(
	        'div',
	        { className: 'full-height', style: { background: '#ECECEC', overflow: 'auto' } },
	        (topicsStore.eventsList[topic] || []).map(function (event) {
	          return event.event_type === 'blog' ? _react2.default.createElement(_eventCard.BlogCard, { key: topic + '-' + event.eid, event: event }) : _react2.default.createElement(_eventCard.ImgCard, { key: topic + '-' + event.eid, event: event });
	        })
	      );
	    }
	  }]);
	
	  return TopicEventsList;
	}(_react.Component);
	
	TopicEventsList.propTypes = {
	  location: _react2.default.PropTypes.object,
	  topicsStore: _react2.default.PropTypes.object,
	  persistentStore: _react2.default.PropTypes.object,
	  persistentActions: _react2.default.PropTypes.object,
	  actions: _react2.default.PropTypes.object
	};
	
	function mapState(state) {
	  return {
	    persistentStore: state.persistentStore.toJS(),
	    topicsStore: state.clientTopics.toJS()
	  };
	}
	
	function mapDispatch(dispatch) {
	  return {
	    persistentActions: (0, _redux.bindActionCreators)(PersistentActions, dispatch),
	    actions: (0, _redux.bindActionCreators)(ClientTopicsAction, dispatch)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)(TopicEventsList);

/***/ }

});
//# sourceMappingURL=3.topics.chunk.6e868d0f1e53ac793041.js.map