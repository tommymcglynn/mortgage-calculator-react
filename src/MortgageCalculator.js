var React = require('react');
var mortgageJs = require("mortgage-js");
import DefaultStyles from './DefaultStyle.css';

const DefaultPrice = 500000;
const DefaultDownPayment = 100000;
const DefaultInterestRate = 0.045;
const DefaultTermMonths = 360;

const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const penniesFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

export default class MortgageCalculator extends React.Component {

    mortgageCalculator = mortgageJs.createMortgageCalculator();

    constructor(props) {
        super(props);

        this.mortgageCalculator.totalPrice = props.price || DefaultPrice;
        this.mortgageCalculator.downPayment = props.downPayment || DefaultDownPayment;
        this.mortgageCalculator.interestRate = props.interestRate || DefaultInterestRate;
        this.mortgageCalculator.months = props.months || DefaultTermMonths;

        this.state = {
            totalPrice: this.mortgageCalculator.totalPrice,
            downPayment: this.mortgageCalculator.downPayment,
            mortgage: this.mortgageCalculator.calculatePayment()
        };

        this.onPriceChange = this.onPriceChange.bind(this);
        this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
        this.onDownPaymentPercentChange = this.onDownPaymentPercentChange.bind(this);
        this.onInterestRateChange = this.onInterestRateChange.bind(this);
        this.onTermMonthsChange = this.onTermMonthsChange.bind(this);
    }

    static percentToValue(percent) {
        let value = parseFloat(percent);
        if (isNaN(value)) {
            return NaN;
        }
        if (value < 0) {
            return 0;
        }
        return value / 100;
    }

    static moneyValue(amount, showPennies = false, withSymbol = true) {
        if (amount === null || amount === '') return '';
        let value = showPennies ? penniesFormatter.format(amount) : moneyFormatter.format(amount);
        if (withSymbol === false) {
            return value.substring(1);
        }
        return value;
    }

    static percentValue(amount, withSymbol) {
        if (amount === null || amount === '') return '';
        let value = percentFormatter.format(amount);
        if (withSymbol === false) {
            return value.substring(0, value.length - 1);
        }
        return value;
    }

    onPriceChange(e) {
        let value = e.target.value;
        if (isNaN(value)) return;
        this.mortgageCalculator.totalPrice = value;
        let downPaymentPercent = this.state.downPayment / this.state.totalPrice;
        let downPayment = downPaymentPercent * value;
        this.mortgageCalculator.downPayment = downPayment;
        this.setState({
            totalPrice: value,
            downPayment: downPayment,
            mortgage: this.mortgageCalculator.calculatePayment()
        });
    }

    onDownPaymentChange(e) {
        let value = e.target.value;
        if (isNaN(value)) return;
        this.mortgageCalculator.downPayment = value;
        this.setState({
            downPayment: value,
            mortgage: this.mortgageCalculator.calculatePayment()
        });
    }

    onDownPaymentPercentChange(e) {
        let value = e.target.value;
        if (isNaN(value)) return;
        let downPayment = Math.round((value / 100) * this.state.totalPrice);
        this.mortgageCalculator.downPayment = downPayment;
        this.setState({
            downPayment: downPayment,
            mortgage: this.mortgageCalculator.calculatePayment()
        });
    }

    onInterestRateChange(e) {
        let value = MortgageCalculator.percentToValue(e.target.value);
        if (isNaN(value)) return;
        this.mortgageCalculator.interestRate = value;
        this.setState({
            mortgage: this.mortgageCalculator.calculatePayment()
        });
    }

    onTermMonthsChange(e) {
        let value = e.target.value;
        if (isNaN(value)) return;
        this.mortgageCalculator.months = value;
        this.setState({
            mortgage: this.mortgageCalculator.calculatePayment()
        });
    }

    render() {

        const {totalPrice, downPayment} = this.state;
        const {loanAmount, principalAndInterest, tax, insurance, total} = this.state.mortgage;
        const styles = this.props.styles || DefaultStyles;

        return (
            <div className={styles.container}>
                <form>
                    <div>
                        <label>
                            Home Price
                        </label>
                        <div className={styles.inputIcon}>$</div>
                        <input type="number" name="price" value={Math.round(totalPrice)} onChange={this.onPriceChange}/>
                    </div>
                    <div className="fieldSeparator">&nbsp;</div>

                    <div>
                        <label>
                            Down Payment
                        </label>
                        <div className={styles.inputIcon}>$</div>
                        <input type="number" name="downPayment" value={Math.round(downPayment)} onChange={this.onDownPaymentChange}/>
                    </div>
                    <div>
                        <div className={styles.inputIcon}>%</div>
                        <input type="number" name="downPaymentPercent" value={MortgageCalculator.percentValue(downPayment / totalPrice, false)} onChange={this.onDownPaymentPercentChange}/>
                    </div>
                    <div className="fieldSeparator">&nbsp;</div>

                    <div>
                        <label>
                            Interest Rate
                        </label>
                        <div className={styles.inputIcon}>%</div>
                        <input type="number" name="interestRate" defaultValue="4.5" step="0.01" onInput={this.onInterestRateChange}/>
                    </div>
                    <div className="fieldSeparator">&nbsp;</div>

                    <div>
                        <label>
                            Loan Term
                        </label>
                        <select className="custom-select" name="termMonths" onInput={this.onTermMonthsChange} defaultValue="360">
                            <option value="360">30 years</option>
                            <option value="240">20 years</option>
                            <option value="180">15 years</option>
                            <option value="120">10 years</option>
                            <option value="60">5 years</option>
                        </select>
                    </div>
                </form>
                <hr/>
                <div className={styles.results}>
                    <div className={styles.resultRow}>
                        <div className={styles.resultLabel}>
                            Loan Amount:
                        </div>
                        <div className={styles.resultValue}>
                            {MortgageCalculator.moneyValue(loanAmount)}
                        </div>
                    </div>
                    <div className={styles.resultRow}>
                        <div className={styles.resultLabel}>
                            Principal & Interest:
                        </div>
                        <div className={styles.resultValue}>
                            {MortgageCalculator.moneyValue(principalAndInterest)}
                        </div>
                    </div>
                    <div className={styles.resultRow}>
                        <div className={styles.resultLabel}>
                            Monthly Tax:
                        </div>
                        <div className={styles.resultValue}>
                            {MortgageCalculator.moneyValue(tax)}
                        </div>
                    </div>
                    <div className={styles.resultRow}>
                        <div className={styles.resultLabel}>
                            Monthly Insurance:
                        </div>
                        <div className={styles.resultValue}>
                            {MortgageCalculator.moneyValue(insurance)}
                        </div>
                    </div>
                    <div className={styles.resultRow}>
                        <div className={styles.resultLabel}>
                            Total Payment:
                        </div>
                        <div className={styles.resultValue}>
                            {MortgageCalculator.moneyValue(total)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}