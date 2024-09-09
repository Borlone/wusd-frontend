import { ReactNode } from 'react';
import cx from 'classnames';
import { Box, SxProps, Theme } from '@mui/material';

type Props = {
    id?: string;
    disabled?: boolean;
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    sx?: SxProps<Theme>;
    roundedFull?: boolean;
};

export default function GradientButton({ id, disabled, children, onClick, className, sx, roundedFull = true }: Props) {
    const hanldeClick = () => {
        if (disabled) return;
        onClick && onClick();
    };

    const disabledClass = disabled ? 'cursor-not-allowed hover:bg-black-400' : 'hover:bg-hover-black-400';
    return (
        <Box
            id={id}
            className={cx('p-[2px] bg-linear cursor-pointer', className)}
            onClick={hanldeClick}
            sx={{ ...sx, borderRadius: roundedFull ? '9999px' : '16px' }}
        >
            <Box className={cx('w-full h-full flex items-center bg-black-400', disabledClass)} sx={{ borderRadius: roundedFull ? '9999px' : '16px' }}>
                {children}
            </Box>
        </Box>
    );
}
