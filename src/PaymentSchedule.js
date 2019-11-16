import Util from "./Util";

var React = require('react');
import DefaultStyles from './DefaultStyle.css';

export default class PaymentSchedule extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const mortgage = this.props.mortgage;
        const currency = this.props.currency;
        const {paymentSchedule} = mortgage;
        const styles = this.props.styles || DefaultStyles;
        const showPennies = false;
        const paymentRows = paymentSchedule.map(function(payment) {
                let rowClass = styles.paymentRow;
                const isYearlyPayment = payment.count % 12 === 0;
                if (isYearlyPayment) {
                    rowClass += " "+styles.paymentRowYear;
                }
                return (
                    <li key={payment.count} className={rowClass}>
                        <div>{!isYearlyPayment ? payment.count : "Year "+(payment.count / 12)}</div>
                        <div>{Util.moneyValue(payment.principalPayment, showPennies, true, currency)}</div>
                        <div>{Util.moneyValue(payment.interestPayment, showPennies, true, currency)}</div>
                        <div>{Util.moneyValue(payment.totalInterest, showPennies, true, currency)}</div>
                        <div>{Util.moneyValue(payment.balance, showPennies, true, currency)}</div>
                    </li>
                );
            }
        );
        return (
            <ul className={styles.paymentList}>
                <li className={styles.paymentRow+" "+styles.paymentHeader}>
                    <div>#</div>
                    <div>Principal</div>
                    <div>Interest</div>
                    <div>Total Interest</div>
                    <div>Balance</div>
                </li>
                {paymentRows}
            </ul>
        );
    }
}