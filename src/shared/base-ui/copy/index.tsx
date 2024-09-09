import { useNotify } from '@/shared/provider/NotifyProvider';
import { CheckIcon, CopyIcon } from '@/shared/icons';
import { cn, copyToClipboard } from '@/shared/utils';
import { IconButton } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
    key?: string;
    children?: ReactNode;
    disabled?: boolean;
    text: string;
    className?: string;
};

const DEFAULT_DURATION = 5000;

const CopyString = ({ disabled, text, className, children }: Props) => {
    const { showNotify } = useNotify();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;

        const copyTimer = setTimeout(() => {
            setCopied(false);
        }, DEFAULT_DURATION);

        return () => clearTimeout(copyTimer);
    }, [copied]);

    const handleClick = (event: any) => {
        event.stopPropagation();
        if (!text) return;
        copyToClipboard(text);
        setCopied(true);
        showNotify({ message: 'Copied to clipboard', type: 'success' });
    };

    if (!text) return;

    return (
        <IconButton className={cn('p-0 group', className)} disabled={disabled || copied || !text} onClick={handleClick}>
            {children}
            {copied ? (
                <CheckIcon className="text-white text-2xl iphone:text-[18px]" />
            ) : (
                <CopyIcon className="text-white text-2xl iphone:text-[18px] group-hover:scale-[1.2] ease-in duration-150" />
            )}
        </IconButton>
    );
};

export default CopyString;
