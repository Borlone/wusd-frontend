import { InformationIcon } from '@/shared/icons';
import { cn } from '@/shared/utils';
import { IconButton, Tooltip, TooltipProps } from '@mui/material';
import { FC, ReactNode } from 'react';

interface ITooltip {
    children?: ReactNode;
    leaveTouchDelay?: number;
    showIcon?: boolean;
    icon?: ReactNode;
    title?: ReactNode | string;
}

const TooltipBase: FC<ITooltip & TooltipProps> = ({ children, leaveTouchDelay = 3000, showIcon = true, icon, placement = 'top', title }) => {
    return (
        <div className="flex items-center justify-end gap-1">
            {children}
            <Tooltip arrow placement={placement} title={title} enterTouchDelay={0} leaveTouchDelay={leaveTouchDelay}>
                {icon ? (
                    <span>{icon}</span>
                ) : (
                    <IconButton
                        className={cn('p-0', {
                            'hidden p-0': !showIcon,
                        })}
                    >
                        <InformationIcon className="text-gray-300 text-lg tablet:text-lg iphone:text-[16px]" />
                    </IconButton>
                )}
            </Tooltip>
        </div>
    );
};

export default TooltipBase;
