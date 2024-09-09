import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DATE_TIME_CONST } from '../constant';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function logError(data: any) {
    // eslint-disable-next-line no-console
    console.error(data);
}

export function getShortMonthName(monthNum: number) {
    if (monthNum < 1 || monthNum > 12) {
        return '';
    }

    return DATE_TIME_CONST.MONTHS_SHORT[monthNum - 1];
}

export function shorthandString(text?: string, beforeChars = 15, afterChars = 10, numberDots = 3) {
    if (!text) return '';
    let dots = '';
    for (let i = 0; i < numberDots; i++) {
        dots += '.';
    }
    return `${text.slice(0, beforeChars)}${dots}${text.slice(-afterChars)}`;
}

export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        logError('Could not copy text: ' + err);
    }
    document.body.removeChild(textarea);
}
