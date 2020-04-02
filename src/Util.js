const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const penniesFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

export default class Util {
    static percentToValue(percent) {
        let value = parseFloat(percent);
        if (isNaN(value)) {
            return NaN;
        }
        if (value < 0) {
            return 0;
        }
        return value / 100;
    }

    static moneyToValue(money) {
        if (money === undefined) return '';
        let value = parseInt(money.replace(/\D/g, ""));
        return !isNaN(value) ? value : '';
    }

    static moneyValue(amount, showPennies = false, withSymbol = true) {
        if (amount === null || amount === '') return '';
        let value = showPennies ? penniesFormatter.format(amount) : moneyFormatter.format(amount);
        if (withSymbol === false) {
            return value.substring(1);
        }
        return value;
    }

    static percentValue(amount, withSymbol) {
        if (amount === null || amount === '') return '';
        let value = percentFormatter.format(amount);
        if (withSymbol === false) {
            return value.substring(0, value.length - 1);
        }
        return value;
    }

    static numberValueOrDefault(value, minValue, defaultValue) {
        if (value == null || isNaN(value) || value < minValue) return defaultValue;
        return value;
    }

    static numberValueInSetOrDefault(value, possibleValues, defaultValue) {
        if (!Array.isArray(possibleValues)) throw "possibleValues must be an array.";
        if (value == null || isNaN(value) || !possibleValues.includes(value)) return defaultValue;
        return value;
    }
}
