'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MortgageCalculator = require('./MortgageCalculator');

var _MortgageCalculator2 = _interopRequireDefault(_MortgageCalculator);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = _react2.default.createElement(
    'div',
    { className: 'mortgageCalculator' },
    _react2.default.createElement(_MortgageCalculator2.default, null)
);

_reactDom2.default.render(root, document.getElementById('app'));