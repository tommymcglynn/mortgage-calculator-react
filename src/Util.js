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
        return money.replace(/\D/g, "");
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
}
