'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var mortgageJs = require("mortgage-js");

var DefaultPrice = 500000;
var DefaultDownPayment = 100000;
var DefaultInterestRate = 0.045;
var DefaultTermMonths = 360;

var moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

var penniesFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

var MortgageCalculator = function (_React$Component) {
    _inherits(MortgageCalculator, _React$Component);

    function MortgageCalculator(props) {
        _classCallCheck(this, MortgageCalculator);

        var _this = _possibleConstructorReturn(this, (MortgageCalculator.__proto__ || Object.getPrototypeOf(MortgageCalculator)).call(this, props));

        _this.mortgageCalculator = mortgageJs.createMortgageCalculator();


        _this.mortgageCalculator.totalPrice = props.price || DefaultPrice;
        _this.mortgageCalculator.downPayment = props.downPayment || DefaultDownPayment;
        _this.mortgageCalculator.interestRate = props.interestRate || DefaultInterestRate;
        _this.mortgageCalculator.months = props.months || DefaultTermMonths;

        _this.state = {
            mortgage: _this.mortgageCalculator.calculatePayment()
        };

        _this.onPriceChange = _this.onPriceChange.bind(_this);
        _this.onDownPaymentChange = _this.onDownPaymentChange.bind(_this);
        _this.onInterestRateChange = _this.onInterestRateChange.bind(_this);
        _this.onTermMonthsChange = _this.onTermMonthsChange.bind(_this);
        return _this;
    }

    _createClass(MortgageCalculator, [{
        key: 'onPriceChange',
        value: function onPriceChange(e) {
            var value = e.target.value;
            if (isNaN(value)) return;
            this.mortgageCalculator.totalPrice = value;
            this.setState({
                mortgage: this.mortgageCalculator.calculatePayment()
            });
        }
    }, {
        key: 'onDownPaymentChange',
        value: function onDownPaymentChange(e) {
            var value = e.target.value;
            if (isNaN(value)) return;
            this.mortgageCalculator.downPayment = value;
            this.setState({
                mortgage: this.mortgageCalculator.calculatePayment()
            });
        }
    }, {
        key: 'onInterestRateChange',
        value: function onInterestRateChange(e) {
            var value = MortgageCalculator.percentToValue(e.target.value);
            if (isNaN(value)) return;
            this.mortgageCalculator.interestRate = value;
            this.setState({
                mortgage: this.mortgageCalculator.calculatePayment()
            });
        }
    }, {
        key: 'onTermMonthsChange',
        value: function onTermMonthsChange(e) {
            var value = e.target.value;
            if (isNaN(value)) return;
            this.mortgageCalculator.months = value;
            this.setState({
                mortgage: this.mortgageCalculator.calculatePayment()
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state$mortgage = this.state.mortgage,
                loanAmount = _state$mortgage.loanAmount,
                principalAndInterest = _state$mortgage.principalAndInterest,
                tax = _state$mortgage.tax,
                insurance = _state$mortgage.insurance,
                total = _state$mortgage.total;


            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    null,
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            null,
                            'Home Price'
                        ),
                        React.createElement('input', { type: 'text', name: 'price', defaultValue: '500000', onInput: this.onPriceChange })
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            null,
                            'Down Payment'
                        ),
                        React.createElement('input', { type: 'text', name: 'downPayment', defaultValue: '100000', onInput: this.onDownPaymentChange })
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            null,
                            'Interest Rate'
                        ),
                        React.createElement('input', { type: 'text', name: 'interestRate', defaultValue: '4.5', onInput: this.onInterestRateChange })
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            null,
                            'Loan Term'
                        ),
                        React.createElement(
                            'select',
                            { name: 'termMonths', onInput: this.onTermMonthsChange, defaultValue: '360' },
                            React.createElement(
                                'option',
                                { value: '360' },
                                '30 years'
                            ),
                            React.createElement(
                                'option',
                                { value: '240' },
                                '20 years'
                            ),
                            React.createElement(
                                'option',
                                { value: '180' },
                                '15 years'
                            ),
                            React.createElement(
                                'option',
                                { value: '120' },
                                '10 years'
                            ),
                            React.createElement(
                                'option',
                                { value: '60' },
                                '5 years'
                            )
                        )
                    )
                ),
                React.createElement('hr', null),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            null,
                            'Loan Amount:'
                        ),
                        ' ',
                        MortgageCalculator.moneyValue(loanAmount)
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            null,
                            'Principal & Interest:'
                        ),
                        ' ',
                        MortgageCalculator.moneyValue(principalAndInterest)
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            null,
                            'Monthly Tax:'
                        ),
                        ' ',
                        MortgageCalculator.moneyValue(tax)
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            null,
                            'Monthly Insurance:'
                        ),
                        ' ',
                        MortgageCalculator.moneyValue(insurance)
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            null,
                            'Total Payment:'
                        ),
                        ' ',
                        MortgageCalculator.moneyValue(total)
                    )
                )
            );
        }
    }], [{
        key: 'percentToValue',
        value: function percentToValue(percent) {
            var value = parseFloat(percent);
            if (isNaN(value)) {
                return NaN;
            }
            if (value < 0) {
                return 0;
            }
            return value / 100;
        }
    }, {
        key: 'moneyValue',
        value: function moneyValue(amount) {
            var showPennies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var withSymbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            if (amount === null || amount === '') return '';
            var value = showPennies ? penniesFormatter.format(amount) : moneyFormatter.format(amount);
            if (withSymbol === false) {
                return value.substring(1);
            }
            return value;
        }
    }]);

    return MortgageCalculator;
}(React.Component);

exports.default = MortgageCalculator;