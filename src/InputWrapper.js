import React from "react";

export default class InputWrapper extends React.Component {
    render() {
        const {label, styles, children, subtext} = this.props;
        let i = 0;
        const inputs = React.Children.toArray(children).map((child) =>
            <div className={styles.inputSection} key={i++}>
                {child}
            </div>
        );
        return (
            <div className={styles.inputWrapper}>
                <label>{label}</label>
                {inputs}
                {subtext}
            </div>
        );
    }
}