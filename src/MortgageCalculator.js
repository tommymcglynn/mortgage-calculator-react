import Switch from "./Switch";

var React = require('react');
var mortgageJs = require("mortgage-js");
import DefaultStyles from './DefaultStyle.css';

const DefaultPrice = 500000;
const DefaultDownPayment = 100000;
const DefaultInterestRate = 0.045;
const DefaultTermMonths = 360;
const DefaultTaxRate = 0.0125;
const DefaultInsuranceRate = 0.0014;
const DefaultMortgageInsuranceRate = 0.011;

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
        this.mortgageCalculator.taxRate = props.taxRate || DefaultTaxRate;
        this.mortgageCalculator.insuranceRate = props.insuranceRate || DefaultInsuranceRate;
        this.mortgageCalculator.mortgageInsuranceRate = props.mortgageInsuranceRate || DefaultMortgageInsuranceRate;
        this.mortgageCalculator.mortgageInsuranceEnabled = true;

        this.state = {
            totalPrice: this.mortgageCalculator.totalPrice,
            downPayment: this.mortgageCalculator.downPayment,
            mortgageInsuranceEnabled: this.mortgageCalculator.mortgageInsuranceEnabled,
            mortgage: this.mortgageCalculator.calculatePayment()
        };

        this.onPriceChange = this.onPriceChange.bind(this);
        this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
        this.onDownPaymentPercentChange = this.onDownPaymentPercentChange.bind(this);
        this.onInterestRateChange = this.onInterestRateChange.bind(this);
        this.onTermMonthsChange = this.onTermMonthsChange.bind(this);
        this.onTaxRateChange = this.onTaxRateChange.bind(this);
        this.onInsuranceRateChange = this.onInsuranceRateChange.bind(this);
        this.onMortgageInsuranceRateChange = this.onMortgageInsuranceRateChange.bind(this);
        this.onMortgageInsuranceEnabledChange = this.onMortgageInsuranceEnabledChange.bind(this);
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

    static moneyToValue(money) {
        return money.replace(/\D/g, "");
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
        let value = MortgageCalculator.moneyToValue(e.target.value);
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
        let value = MortgageCalculator.moneyToValue(e.target.value);
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

    onTaxRateChange(e) {
        let value = MortgageCalculator.percentToValue(e.target.value);
        if (isNaN(value)) return;
        this.mortgageCalculator.taxRate = value;
        this.setState({
            mortgage: this.mortgageCalculator.calculatePayment()
        });
    }

    onInsuranceRateChange(e) {
        let value = MortgageCalculator.percentToValue(e.target.value);
        if (isNaN(value)) return;
        this.mortgageCalculator.insuranceRate = value;
        this.setState({
            mortgage: this.mortgageCalculator.calculatePayment()
        });
    }

    onMortgageInsuranceRateChange(e) {
        let value = MortgageCalculator.percentToValue(e.target.value);
        if (isNaN(value)) return;
        this.mortgageCalculator.mortgageInsuranceRate = value;
        this.setState({
            mortgage: this.mortgageCalculator.calculatePayment()
        });
    }

    onMortgageInsuranceEnabledChange(e) {
        this.mortgageCalculator.mortgageInsuranceEnabled = e;
        this.setState({
            mortgageInsuranceEnabled: this.mortgageCalculator.mortgageInsuranceEnabled,
            mortgage: this.mortgageCalculator.calculatePayment()
        });
    }

    render() {

        const {totalPrice, downPayment, showAdvanced} = this.state;
        const {loanAmount, principalAndInterest, tax, insurance, mortgageInsurance, total} = this.state.mortgage;
        const {interestRate, taxRate, insuranceRate, mortgageInsuranceRate, mortgageInsuranceEnabled} = this.mortgageCalculator;
        const styles = this.props.styles || DefaultStyles;

        return (
            <div className={styles.container}>
                <form>
                    <div>
                        <label>
                            Home Price
                        </label>
                        <div className={styles.inputIcon}>$</div>
                        <input type="text" name="price" value={MortgageCalculator.moneyValue(totalPrice, false, false)} onChange={this.onPriceChange}/>
                    </div>
                    <div className="fieldSeparator">&nbsp;</div>

                    <div>
                        <label>
                            Down Payment
                        </label>
                        <div className={styles.inputIcon}>$</div>
                        <input type="text" name="downPayment" value={MortgageCalculator.moneyValue(downPayment, false, false)} onChange={this.onDownPaymentChange}/>
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
                        <input type="number" name="interestRate" defaultValue={MortgageCalculator.percentValue(interestRate, false)} step="0.01" onInput={this.onInterestRateChange}/>
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
                    <div className="fieldSeparator">&nbsp;</div>

                    <button type="button" onClick={() => this.setState({showAdvanced: !showAdvanced})}>{showAdvanced ? "Hide" : "Show"} Advanced</button>
                    {showAdvanced ? (
                        <div className={styles.advanced}>
                            <div>
                                <label>
                                    Tax Rate
                                </label>
                                <div className={styles.inputIcon}>%</div>
                                <input type="number" name="taxRate" defaultValue={MortgageCalculator.percentValue(taxRate, false)} step="0.01" onInput={this.onTaxRateChange}/>
                            </div>
                            <div className="fieldSeparator">&nbsp;</div>

                            <div>
                                <label>
                                    Insurance Rate
                                </label>
                                <div className={styles.inputIcon}>%</div>
                                <input type="number" name="insuranceRate" defaultValue={MortgageCalculator.percentValue(insuranceRate, false)} step="0.01" onInput={this.onInsuranceRateChange}/>
                            </div>
                            <div className="fieldSeparator">&nbsp;</div>

                            <div>
                                <label>
                                    Mortgage Insurance Rate
                                </label>
                                <div className={styles.inputIcon}>%</div>
                                <input type="number" name="mortgageInsuranceRate" defaultValue={MortgageCalculator.percentValue(mortgageInsuranceRate, false)} step="0.01" onInput={this.onMortgageInsuranceRateChange}/>
                            </div>
                            <div className="fieldSeparator">&nbsp;</div>

                            <div>
                                <label className="switch">
                                    Mortgage Insurance
                                </label>
                                <Switch active={mortgageInsuranceEnabled} onChange={this.onMortgageInsuranceEnabledChange}/>
                            </div>
                        </div>
                    ) : null}
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
                    {mortgageInsurance > 0 ? (
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>
                                Monthly PMI:
                            </div>
                            <div className={styles.resultValue}>
                                {MortgageCalculator.moneyValue(mortgageInsurance)}
                            </div>
                        </div>
                    ): null}
                    <div className={`${styles.resultRow} ${styles.totalPayment}`}>
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