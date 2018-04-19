import React from 'react';
import ReactDOM from 'react-dom';
import MortgageCalculator from "../../src/MortgageCalculator";

/*
Alternate styles are possible.
import redStyles from "./RedStyle.css";
<MortgageCalculator styles={redStyles} />
 */

const root = (
    <div style={{width: '400px', margin: '0 auto', fontFamily: 'Helvetica, Arial, sans-serif'}}>
        <div style={{textAlign: 'center'}}>
            <h1>Mortgage Calculator</h1>
        </div>
        <MortgageCalculator />
    </div>
);

ReactDOM.render(
    root,
    document.getElementById('app')
);