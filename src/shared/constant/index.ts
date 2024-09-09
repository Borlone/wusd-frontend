import { contractInfo } from '@/contracts';

const { WUSD_TOKEN, USDT_TOKEN } = contractInfo;

export interface IDateTimeConstant {
    MONTHS_SHORT: string[];
    FORMAT_DATE: string;
    FORMAT_DATE_TIME: string;
}
export interface IToken {
    [key: string]: any;
}

export const DATE_TIME_CONST: IDateTimeConstant = {
    MONTHS_SHORT: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    FORMAT_DATE: 'MM/DD/YYYY',
    FORMAT_DATE_TIME: 'MM/DD/YYYY HH:mm',
};

export const ONE_BILLION = 1000000000;

export const TOKEN_ADDRESS: IToken = { TUSDT: USDT_TOKEN, WUSD: WUSD_TOKEN };

export const tokenTypes: any = {
    TUSDT: {
        logo: 'USDT.png',
    },
    WUSD: {
        logo: 'WUSD.png',
    },
};
