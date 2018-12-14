import Switch from "./Switch";
import Util from "./Util"

var React = require('react');
var mortgageJs = require("mortgage-js");
var pjson = require('../package.json');
import DefaultStyles from './DefaultStyle.css';
import PaymentSchedule from "./PaymentSchedule";
import InputWrapper from "./InputWrapper";
import IconInput from "./IconInput";

const DefaultPrice = 500000;
const DefaultDownPayment = 100000;
const DefaultInterestRate = 0.045;
const DefaultTermMonths = 360;
const DefaultTaxRate = 0.0125;
const DefaultInsuranceRate = 0.0014;
const DefaultMortgageInsuranceRate = 0.011;
const DefaultDownPaymentPercent = 0.2;
const DefaultAdditionalPrincipalPayment = 0;

const ValidTermMonths = [60, 120, 180, 240, 360];

export default class MortgageCalculator extends React.Component {

    mortgageCalculator = mortgageJs.createMortgageCalculator();

    constructor(props) {
        super(props);

        this.mortgageCalculator.totalPrice = Util.numberValueOrDefault(props.price, 0, DefaultPrice);
        this.mortgageCalculator.downPayment = Util.numberValueOrDefault(props.downPayment, 0, DefaultDownPayment);
        this.mortgageCalculator.interestRate = Util.numberValueOrDefault(props.interestRate, 0, DefaultInterestRate);
        this.mortgageCalculator.months = Util.numberValueInSetOrDefault(props.months, ValidTermMonths, DefaultTermMonths);
        this.mortgageCalculator.taxRate = Util.numberValueOrDefault(props.taxRate, 0, DefaultTaxRate);
        this.mortgageCalculator.insuranceRate = Util.numberValueOrDefault(props.insuranceRate, 0, DefaultInsuranceRate);
        this.mortgageCalculator.mortgageInsuranceRate = Util.numberValueOrDefault(props.mortgageInsuranceRate, 0, DefaultMortgageInsuranceRate);
        this.mortgageCalculator.mortgageInsuranceEnabled = props.mortgageInsuranceEnabled !== false;
        this.mortgageCalculator.additionalPrincipal = Util.numberValueOrDefault(props.additionalPrincipalPayment, 0, DefaultAdditionalPrincipalPayment);

        this.state = {
            totalPrice: this.mortgageCalculator.totalPrice,
            downPayment: this.mortgageCalculator.downPayment,
            mortgageInsuranceEnabled: this.mortgageCalculator.mortgageInsuranceEnabled,
            additionalPrincipal: 0,
            mortgage: this.mortgageCalculator.calculatePayment()
        };

        this.onPriceChange = this.onPriceChange.bind(this);
        this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
        this.onDownPaymentPercentChange = this.onDownPaymentPercentChange.bind(this);
        this.onInterestRateChange = this.onInterestRateChange.bind(this);
        this.onTermMonthsChange = this.onTermMonthsChange.bind(this);
        this.onAdditionalPrincipalChange = this.onAdditionalPrincipalChange.bind(this);
        this.onTaxRateChange = this.onTaxRateChange.bind(this);
        this.onInsuranceRateChange = this.onInsuranceRateChange.bind(this);
        this.onMortgageInsuranceRateChange = this.onMortgageInsuranceRateChange.bind(this);
        this.onMortgageInsuranceEnabledChange = this.onMortgageInsuranceEnabledChange.bind(this);
    }

    onMortgageChange(mortgage) {

    }

    onPriceChange(e) {
        let value = e.target.value;
        if (value.length === 0) {
            this.setState({
                totalPrice: value
            });
            return
        }
        value = Util.moneyToValue(value);
        if (isNaN(value)) return;
        this.mortgageCalculator.totalPrice = value;
        let downPaymentPercent = (this.state.totalPrice > 0) ? this.state.downPayment / this.state.totalPrice : DefaultDownPaymentPercent;
        let downPayment = downPaymentPercent * value;
        this.mortgageCalculator.downPayment = downPayment;
        let mortgage = this.mortgageCalculator.calculatePayment();
        this.setState({
            totalPrice: value,
            downPayment: downPayment,
            mortgage: mortgage
        });
        this.onMortgageChange(mortgage);
    }

    onDownPaymentChange(e) {
        let value = e.target.value;
        if (value.length === 0) {
            this.setState({
                downPayment: value
            });
            return
        }
        value = Util.moneyToValue(value);
        if (isNaN(value)) return;
        this.mortgageCalculator.downPayment = value;
        let mortgage = this.mortgageCalculator.calculatePayment();
        this.setState({
            downPayment: value,
            mortgage: mortgage
        });
        this.onMortgageChange(mortgage);
    }

    onDownPaymentPercentChange(e) {
        let value = e.target.value;
        if (value.length === 0) {
            this.setState({
                downPayment: value
            });
            return
        }
        if (isNaN(value)) return;
        let downPayment = Math.round((value / 100) * this.state.totalPrice);
        this.mortgageCalculator.downPayment = downPayment;
        let mortgage = this.mortgageCalculator.calculatePayment();
        this.setState({
            downPayment: downPayment,
            mortgage: mortgage
        });
        this.onMortgageChange(mortgage);
    }

    onInterestRateChange(e) {
        let value = Util.percentToValue(e.target.value);
        if (isNaN(value)) return;
        this.mortgageCalculator.interestRate = value;
        let mortgage = this.mortgageCalculator.calculatePayment();
        this.setState({
            mortgage: mortgage
        });
        this.onMortgageChange(mortgage);
    }

    onTermMonthsChange(e) {
        let value = e.target.value;
        if (isNaN(value)) return;
        this.mortgageCalculator.months = value;
        let mortgage = this.mortgageCalculator.calculatePayment();
        this.setState({
            mortgage: mortgage
        });
        this.onMortgageChange(mortgage);
    }

    onAdditionalPrincipalChange(e) {
        let value = Util.moneyToValue(e.target.value);
        this.mortgageCalculator.additionalPrincipalPayment = !isNaN(value) ? value : 0;
        let mortgage = this.mortgageCalculator.calculatePayment();
        this.setState({
            additionalPrincipal: value,
            mortgage: mortgage
        });
        this.onMortgageChange(mortgage);
    }

    onTaxRateChange(e) {
        let value = Util.percentToValue(e.target.value);
        if (isNaN(value)) return;
        this.mortgageCalculator.taxRate = value;
        let mortgage = this.mortgageCalculator.calculatePayment();
        this.setState({
            mortgage: mortgage
        });
        this.onMortgageChange(mortgage);
    }

    onInsuranceRateChange(e) {
        let value = Util.percentToValue(e.target.value);
        if (isNaN(value)) return;
        this.mortgageCalculator.insuranceRate = value;
        let mortgage = this.mortgageCalculator.calculatePayment();
        this.setState({
            mortgage: mortgage
        });
        this.onMortgageChange(mortgage);
    }

    onMortgageInsuranceRateChange(e) {
        let value = Util.percentToValue(e.target.value);
        if (isNaN(value)) return;
        this.mortgageCalculator.mortgageInsuranceRate = value;
        let mortgage = this.mortgageCalculator.calculatePayment();
        this.setState({
            mortgage: mortgage
        });
        this.onMortgageChange(mortgage);
    }

    onMortgageInsuranceEnabledChange(e) {
        this.mortgageCalculator.mortgageInsuranceEnabled = e;
        let mortgage = this.mortgageCalculator.calculatePayment();
        this.setState({
            mortgageInsuranceEnabled: this.mortgageCalculator.mortgageInsuranceEnabled,
            mortgage: mortgage
        });
        this.onMortgageChange(mortgage);
    }

    render() {

        const {totalPrice, downPayment, showAdvanced, additionalPrincipal} = this.state;
        const {loanAmount, principalAndInterest, tax, insurance, mortgageInsurance, total} = this.state.mortgage;
        const {interestRate, taxRate, insuranceRate, mortgageInsuranceRate, mortgageInsuranceEnabled, months} = this.mortgageCalculator;
        const styles = this.props.styles || DefaultStyles;
        let paymentCount = this.state.mortgage.paymentSchedule.length;
        let years = Math.floor(paymentCount / 12);
        let remainingMonths = paymentCount % 12;
        let yearsLabel = years === 1 ? 'year' : 'years';
        let monthsLabel = remainingMonths === 1 ? 'month' : 'months';
        let separatorLabel = years > 0 && remainingMonths > 0 ? ' and ' : '';
        let payoffMessage = '';
        if (years > 0) payoffMessage += `${years} ${yearsLabel}`;
        payoffMessage += separatorLabel;
        if (remainingMonths > 0) payoffMessage += `${remainingMonths} ${monthsLabel}`;
        if (payoffMessage.length > 0) payoffMessage = `Fully paid in ${payoffMessage}`;

        const downPaymentPercent = downPayment.length === 0 ? '' : (totalPrice > 0 && downPayment > 0) ? downPayment / totalPrice : DefaultDownPaymentPercent;

        return (
            <div className={styles.container}>
                <form className={styles.inputForm}>
                    <InputWrapper styles={styles} label="Home Price">
                        <IconInput styles={styles} icon="$" type="text" name="price" value={Util.moneyValue(totalPrice, false, false)} onChange={this.onPriceChange}/>
                    </InputWrapper>

                    <InputWrapper styles={styles} label="Down Payment">
                        <IconInput styles={styles} icon="$" type="text" name="downPayment" value={Util.moneyValue(downPayment, false, false)} onChange={this.onDownPaymentChange}/>
                        <IconInput styles={styles} icon="%" type="number" name="downPaymentPercent" value={Util.percentValue(downPaymentPercent, false)} onChange={this.onDownPaymentPercentChange}/>
                    </InputWrapper>


                    <InputWrapper styles={styles} label="Interest Rate">
                        <IconInput styles={styles} icon="%" type="number" name="interestRate" defaultValue={Util.percentValue(interestRate, false)} step="0.01" onInput={this.onInterestRateChange}/>
                    </InputWrapper>


                    <InputWrapper styles={styles} label="Loan Term">
                        <select className="custom-select" name="termMonths" onInput={this.onTermMonthsChange} defaultValue={months}>
                            <option value="360">30 years</option>
                            <option value="240">20 years</option>
                            <option value="180">15 years</option>
                            <option value="120">10 years</option>
                            <option value="60">5 years</option>
                        </select>
                    </InputWrapper>


                    <InputWrapper styles={styles} label="Additional Principal Payment" subtext={(<div>{payoffMessage}</div>)}>
                        <IconInput styles={styles} icon="$" type="text" name="additionalPrincipal" value={Util.moneyValue(additionalPrincipal, false, false)} onChange={this.onAdditionalPrincipalChange}/>
                    </InputWrapper>


                    <div className={styles.advancedButton}>
                        <button type="button" onClick={() => this.setState({showAdvanced: !showAdvanced})}>{showAdvanced ? "Hide" : "Show"} Advanced</button>
                    </div>
                    {showAdvanced ? (
                        <div className={styles.advanced}>
                            <InputWrapper styles={styles} label="Tax Rate">
                                <IconInput styles={styles} icon="%" type="number" name="taxRate" defaultValue={Util.percentValue(taxRate, false)} step="0.01" onInput={this.onTaxRateChange}/>
                            </InputWrapper>


                            <InputWrapper styles={styles} label="Insurance Rate">
                                <IconInput styles={styles} icon="%" type="number" name="insuranceRate" defaultValue={Util.percentValue(insuranceRate, false)} step="0.01" onInput={this.onInsuranceRateChange}/>
                            </InputWrapper>


                            <InputWrapper styles={styles} label="Mortgage Insurance Rate">
                                <IconInput styles={styles} icon="%" type="number" name="mortgageInsuranceRate" defaultValue={Util.percentValue(mortgageInsuranceRate, false)} step="0.01" onInput={this.onMortgageInsuranceRateChange}/>
                            </InputWrapper>


                            <InputWrapper styles={styles} label="Mortgage Insurance">
                                <Switch active={mortgageInsuranceEnabled} onChange={this.onMortgageInsuranceEnabledChange}/>
                            </InputWrapper>
                        </div>
                    ) : null}
                </form>
                <div className={styles.results}>
                    <div className={styles.resultRow}>
                        <div className={styles.resultLabel}>
                            Loan Amount:
                        </div>
                        <div className={styles.resultValue}>
                            {Util.moneyValue(loanAmount)}
                        </div>
                    </div>
                    <div className={styles.resultRow}>
                        <div className={styles.resultLabel}>
                            Principal & Interest:
                        </div>
                        <div className={styles.resultValue}>
                            {Util.moneyValue(principalAndInterest)}
                        </div>
                    </div>
                    <div className={styles.resultRow}>
                        <div className={styles.resultLabel}>
                            Monthly Tax:
                        </div>
                        <div className={styles.resultValue}>
                            {Util.moneyValue(tax)}
                        </div>
                    </div>
                    <div className={styles.resultRow}>
                        <div className={styles.resultLabel}>
                            Monthly Insurance:
                        </div>
                        <div className={styles.resultValue}>
                            {Util.moneyValue(insurance)}
                        </div>
                    </div>
                    {mortgageInsurance > 0 ? (
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>
                                Monthly PMI:
                            </div>
                            <div className={styles.resultValue}>
                                {Util.moneyValue(mortgageInsurance)}
                            </div>
                        </div>
                    ): null}
                    <div className={`${styles.resultRow} ${styles.totalPayment}`}>
                        <div className={styles.resultLabel}>
                            Total Payment:
                        </div>
                        <div className={styles.resultValue}>
                            {Util.moneyValue(total)}
                        </div>
                    </div>
                </div>

                {this.props.showPaymentSchedule ? (
                    <div className={styles.schedule}>
                        <h3>Payment Schedule</h3>
                        <PaymentSchedule mortgage={this.state.mortgage}/>
                    </div>
                ) : null}

                <div className={styles.versionInfo}>
                    <a href="https://github.com/tommymcglynn/mortgage-calculator-react">mortgage-calculator-react {pjson.version}</a>
                </div>
            </div>
        );
    }
}