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

export default class MortgageCalculator extends React.Component {

    mortgageCalculator = mortgageJs.createMortgageCalculator();

    constructor(props) {
        super(props);

        this.mortgageCalculator.totalPrice = props.price || DefaultPrice;
        this.mortgageCalculator.downPayment = props.downPayment || DefaultDownPayment;
        this.mortgageCalculator.interestRate = props.interestRate || DefaultInterestRate;
        this.mortgageCalculator.months = props.months || DefaultTermMonths;

        this.state = {
            mortgage: this.mortgageCalculator.calculatePayment()
        };

        this.onPriceChange = this.onPriceChange.bind(this);
        this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
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

    onPriceChange(e) {
        let value = e.target.value;
        if (isNaN(value)) return;
        this.mortgageCalculator.totalPrice = value;
        this.setState({
            mortgage: this.mortgageCalculator.calculatePayment()
        });
    }

    onDownPaymentChange(e) {
        let value = e.target.value;
        if (isNaN(value)) return;
        this.mortgageCalculator.downPayment = value;
        this.setState({
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

        const {loanAmount, principalAndInterest, tax, insurance, total} = this.state.mortgage;
        const styles = this.props.styles || DefaultStyles;

        return (
            <div className={styles.container}>
                <form>
                    <div>
                        <label>
                            Home Price
                        </label>
                        <input type="text" name="price" defaultValue="500000" onInput={this.onPriceChange}/>
                    </div>
                    <div>
                        <label>
                            Down Payment
                        </label>
                        <input type="text" name="downPayment" defaultValue="100000" onInput={this.onDownPaymentChange}/>
                    </div>
                    <div>
                        <label>
                            Interest Rate
                        </label>
                        <input type="text" name="interestRate" defaultValue="4.5" onInput={this.onInterestRateChange}/>
                    </div>
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