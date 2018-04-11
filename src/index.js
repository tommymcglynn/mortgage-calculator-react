import React from 'react';
import ReactDOM from 'react-dom';
import MortgageCalculator from "./MortgageCalculator";
import "./index.css"

const root = (
    <div className="mortgageCalculator">
        <MortgageCalculator />
    </div>
);

ReactDOM.render(
    root,
    document.getElementById('app')
);