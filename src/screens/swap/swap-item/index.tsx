import Image from 'next/image';
import { ArrowDownIcon, WalletIcon, WarningIcon } from '@/shared/icons';
import { NumericFormat } from 'react-number-format';

type Props = {
    title: string;
    symbol: string;
    type: string;
    readOnly?: boolean;
    decimals?: number;
    amount: string;
    maxAmount?: string;
    onChange?: (value: string) => void;
    onMax?: () => void;
};

const tokenTypes: any = {
    TUSDT: {
        name: 'TUSDT',
        icon: '/images/USDT.png',
    },
    WUSD: {
        name: 'WUSD',
        icon: '/images/WUSD.png',
    },
};

export default function SwapItem({ title, symbol, type, readOnly, decimals, amount, maxAmount, onChange, onMax }: Props) {
    const token = tokenTypes[type];

    const showInsufficient = maxAmount !== undefined && parseFloat(amount) > parseFloat(maxAmount || '0');
    const disabledClass = readOnly ? 'pointer-events-none' : '';

    return (
        <div className="h-[116px] flex flex-col justify-center bg-gray-800 rounded-xl p-4 iphone:p-3">
            <p className="capitalize">{title}</p>

            <div className="flex items-center justify-between">
                <NumericFormat
                    className="w-1/2 text-[34px] outline-none border-none bg-transparent text-white"
                    placeholder="0"
                    inputMode="decimal"
                    allowedDecimalSeparators={[',']}
                    allowNegative={false}
                    readOnly={readOnly}
                    decimalScale={decimals}
                    value={amount}
                    onValueChange={({ value }) => onChange?.(value)}
                />
                <div className="rounded-full border border-solid border-[#EEEDED66]">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-radial">
                        <Image src={token.icon} alt="token icon" width={24} height={24} />
                        <p className="text-xl leading-[25px]">{symbol}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-[2px]">
                <div className="flex items-center gap-1 text-orange-600">
                    {title === 'from' && showInsufficient && (
                        <>
                            <WarningIcon />
                            <p className="component-text-caption-2-medium">Insufficient balance</p>
                        </>
                    )}
                </div>
                <div className="flex items-center justify-between gap-2">
                    {title === 'from' && (
                        <>
                            <WalletIcon className="text-xl text-white" />
                            <p className="component-text-caption-1-medium">{maxAmount || 0}</p>
                            <p
                                className={`component-text-caption-1-emphasized bg-btn bg-clip-text text-transparent cursor-pointer ${disabledClass}`}
                                onClick={onMax}
                            >
                                Max
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
