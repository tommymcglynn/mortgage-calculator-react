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
    <div>
        <MortgageCalculator showPaymentSchedule />
    </div>
);

ReactDOM.render(
    root,
    document.getElementById('app')
);