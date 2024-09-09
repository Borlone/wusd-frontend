import BigNumber from 'bignumber.js';
import { toTokens } from 'thirdweb';

export function inMobile() {
    const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

export function getMaxAmount(amountWUSD: bigint, decimals: number) {
    return amountWUSD && decimals ? +toTokens(amountWUSD, decimals) : 0;
}

export function toThousandsNumber(val: string | number) {
    if (!val) return '0';

    if (typeof val === 'string') {
        return (+val).toLocaleString();
    }

    if (typeof val === 'number') {
        return val.toLocaleString();
    }
}

export function routeToDecimals(num: number | string, decimals = 0) {
    const numberStr = num.toString();
    const [integerPart, decimalPart] = numberStr.split('.');
    if (!decimalPart || decimals <= 0) return Math.round(+num);
    const truncatedDecimalPart = decimalPart.substring(0, decimals);
    return parseFloat(`${integerPart}.${truncatedDecimalPart}`);
}

function removeTrailingZeros(number: number) {
    let str = number.toString();
    let dotIndex = str.indexOf('.');
    if (dotIndex === -1) return str;
    str = str.replace(/0+$/, '');
    if (str.endsWith('.')) {
        str = str.slice(0, -1);
    }
    return str;
}

export function formatNumber(input: number | string, num_length = 6): string {
    let temp = removeTrailingZeros(+input);
    let formatter = new Intl.NumberFormat('en-US');
    let formatted_number = formatter.format(+temp);
    if (formatted_number.length <= num_length) {
        return formatted_number;
    }
    let number_input = Number(temp);
    if (number_input < 10) {
        return routeToDecimals(number_input.toString(), num_length - 2).toString();
    }
    if (number_input < 100) {
        return routeToDecimals(number_input.toString(), num_length - 3).toString();
    }
    if (number_input < 1_000) {
        return routeToDecimals(number_input.toString(), num_length - 4).toString();
    }
    const units = ['K', 'M', 'B'];
    let unit_index = -1;
    while (number_input >= 1000 && unit_index < units.length - 1) {
        number_input /= 1000;
        unit_index++;
    }
    let str_input = number_input + '';
    str_input = str_input.replace(/(\.\d)0$/, '$1');
    if (str_input.length + units[unit_index].length > num_length) {
        str_input = str_input.substring(0, num_length - units[unit_index].length);
    }
    let result = removeTrailingZeros(+str_input);
    result += units[unit_index];
    return result;
}

export const formatReward = (val: number, decimals?: number, isFull = false) => {
    const floatStr = isFull ? val.toString() : val.toFixed(decimals || 6);
    const [integerStr, decimalStr] = floatStr.split('.');

    if (!decimalStr || !decimalStr.replace(/0+$/, '')) {
        return val.toLocaleString();
    }

    const trimmedDecimals = decimalStr.replace(/0+$/, '');

    return `${(+integerStr).toLocaleString()}.${trimmedDecimals}`;
};

export function multiplyNumbersByRatios(amount: string, rate: string, decimals = 10) {
    const multipliedValue = new BigNumber(amount).multipliedBy(rate);
    const floatStr = multipliedValue.toFixed(decimals);
    const [integerPart, decimalStr] = floatStr.split('.');

    if (!decimalStr) return multipliedValue.toFixed();

    const trimmedDecimals = decimalStr.replace(/0+$/, '');

    return trimmedDecimals ? `${integerPart}.${trimmedDecimals}` : multipliedValue.toFixed();
}
