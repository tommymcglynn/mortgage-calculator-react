const moneyFormatter = amount => formatMoney(amount, 0);
const penniesFormatter = amount => formatMoney(amount, 2);

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

export default class Util {
  static percentToValue(percent) {
    var value = parseFloat(percent);
    if (isNaN(value)) {
      return NaN;
    }
    if (value < 0) {
      return 0;
    }
    return value / 100;
  }

  static moneyToValue(money) {
    if (money === undefined) return "";
    var value = parseInt(money.replace(/\D/g, ""));
    return !isNaN(value) ? value : "";
  }

  static moneyValue(amount, showPennies = false, withSymbol = true, currency = "$") {
    if (amount === null || amount === "") return "";
    var value = showPennies
      ? penniesFormatter(amount)
      : moneyFormatter(amount);
    if (withSymbol === false) {
      return value;
    }
    return `${currency}${value}`;
  }

  static percentValue(amount, withSymbol) {
    if (amount === null || amount === "") return "";
    var value = percentFormatter.format(amount);
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
    if (!Array.isArray(possibleValues))
      throw "possibleValues must be an array.";
    if (value == null || isNaN(value) || !possibleValues.includes(value))
      return defaultValue;
    return value;
  }
}
