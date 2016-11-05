webpackJsonp([8],{

/***/ 481:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactCssModules = __webpack_require__(89);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	var _style = __webpack_require__(840);
	
	var _style2 = _interopRequireDefault(_style);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Blog = function (_Component) {
	  _inherits(Blog, _Component);
	
	  function Blog() {
	    _classCallCheck(this, Blog);
	
	    return _possibleConstructorReturn(this, (Blog.__proto__ || Object.getPrototypeOf(Blog)).apply(this, arguments));
	  }
	
	  _createClass(Blog, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          null,
	          'Blog Header'
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          this.props.children
	        )
	      );
	    }
	  }]);
	
	  return Blog;
	}(_react.Component);
	
	Blog.propTypes = {
	  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element])
	};
	
	exports.default = (0, _reactCssModules2.default)(Blog, _style2.default);

/***/ },

/***/ 482:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(14);
	
	var _BlogListReducer = __webpack_require__(485);
	
	var _BlogListReducer2 = _interopRequireDefault(_BlogListReducer);
	
	var _reducer = __webpack_require__(484);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _redux.combineReducers)({
	  blogList: _BlogListReducer2.default,
	  blogContent: _reducer2.default
	});

/***/ },

/***/ 484:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (reducerMap[action.type]) {
	    return reducerMap[action.type](state, action);
	  }
	  return state;
	};
	
	var _immutable = __webpack_require__(41);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = _immutable2.default.fromJS({
	  blogList: []
	});
	
	/* eslint-disable arrow-body-style, no-unused-vars*/
	// Reducer Path: blog.blogList
	
	var reducerMap = {
	  'BLOG@BLOG_CONTENT@DELETE_ITEM': function BLOGBLOG_CONTENTDELETE_ITEM(state, action) {
	    return state;
	  },
	  'BLOG@BLOG_CONTENT@LOAD': function BLOGBLOG_CONTENTLOAD(state, action) {
	    return state;
	  }
	};

/***/ },

/***/ 485:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (reducerMap[action.type]) {
	    return reducerMap[action.type](state, action);
	  }
	  return state;
	};
	
	var _immutable = __webpack_require__(41);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = _immutable2.default.fromJS({
	  blogList: []
	});
	
	/* eslint-disable arrow-body-style, no-unused-vars*/
	// Reducer Path: blog.blogList
	
	var reducerMap = {
	  'BLOG@BLOG_LIST@DELETE_ITEM': function BLOGBLOG_LISTDELETE_ITEM(state, action) {
	    return state;
	  },
	  'BLOG@BLOG_LIST@LOAD': function BLOGBLOG_LISTLOAD(state, action) {
	    return state;
	  }
	};

/***/ },

/***/ 552:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ },

/***/ 840:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(552);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./style.hcss", function() {
				var newContent = require("!!./../../../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./style.hcss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }

});
//# sourceMappingURL=8.Blog.chunk.f2a0c95b0ca6f24f3092.js.map