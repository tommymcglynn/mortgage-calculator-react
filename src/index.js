import React from 'react';
import ReactDOM from 'react-dom';
import MortgageCalculator from "./MortgageCalculator";

const root = (
    <div style={{width: '400px', margin: '0 auto'}}>
        <MortgageCalculator />
    </div>
);

ReactDOM.render(
    root,
    document.getElementById('app')
);