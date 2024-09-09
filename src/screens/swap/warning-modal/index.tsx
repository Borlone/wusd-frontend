import SystemModal from '@/shared/components/system-modal';
import React from 'react';
// import Lottie from 'lottie-react';
import WarningLottie from './warning-lottie.json';
import { Button } from '@mui/material';

import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
});

type Props = {
    open: boolean;
    onClose: () => void;
    onOk?: () => void;
};

export default function WarningModal({ open, onClose, onOk }: Props) {
    return (
        <SystemModal bottomMobile open={open} onClose={onClose}>
            <div className="flex">
                <Lottie className="w-[160px] h-[160px] mx-auto" animationData={WarningLottie} loop={false} />
            </div>

            <p className="text-center laptop:max-w-[320px] component-text-body-medium">
                Swap service is temporarily unavailable due to low liquidity. Please try again later.
            </p>

            <div className="util-flex-center mt-3">
                <Button className="component-btn w-[200px]" onClick={onOk}>
                    OK
                </Button>
            </div>
        </SystemModal>
    );
}
