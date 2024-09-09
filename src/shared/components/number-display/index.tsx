import { cn } from '@/shared/utils';
import { formatReward } from '@/shared/utils/function';
import { Tooltip, useMediaQuery } from '@mui/material';

const NumberDisplay = ({ number, className }: { number: number; className: string }) => {
    const matchMax375 = useMediaQuery('(max-width: 375px)');
    const amountNum = formatReward(number, matchMax375 ? 2 : 6) ?? '0';
    return (
        <Tooltip arrow title={formatReward(number, 6, true)} placement="top" enterTouchDelay={0}>
            <span className={cn('truncate', className)}>{amountNum}</span>
        </Tooltip>
    );
};

export default NumberDisplay;
