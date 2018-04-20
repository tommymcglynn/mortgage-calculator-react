import React from 'react';
import ReactDOM from 'react-dom';
import MortgageCalculator from "../../src/MortgageCalculator";

/*
Alternate styles are possible.
import redStyles from "./RedStyle.css";
<MortgageCalculator styles={redStyles} />
 */

const root = (
    <div>
        <MortgageCalculator />
    </div>
);

ReactDOM.render(
    root,
    document.getElementById('mortgage-calculator-react')
);