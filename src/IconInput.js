import React from "react";

export default class IconInput extends React.Component {
    render() {
        const {styles, icon} = this.props;
        return (
            <div className={styles.inputField}>
                <div className={styles.inputIcon}>{icon}</div>
                <input {...this.props} />
            </div>
        );
    }
}