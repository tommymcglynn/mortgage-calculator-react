import React from 'react';
import ReactDOM from 'react-dom';
import MortgageCalculator from "../../src/MortgageCalculator";
import PaymentSchedule from "../../src/PaymentSchedule";

/*
Alternate styles are possible.
import redStyles from "./RedStyle.css";
<MortgageCalculator styles={redStyles} />
 */

const root = (
    <div style={{maxWidth: '600px', margin: '0 auto', fontFamily: 'Helvetica, Arial, sans-serif'}}>
        <div style={{textAlign: 'center'}}>
            <h1>Mortgage Calculator</h1>
        </div>
        <MortgageCalculator showPaymentSchedule />
    </div>
);

ReactDOM.render(
    root,
    document.getElementById('app')
);