import SystemModal from '@/shared/components/system-modal';
import React from 'react';
import WarningLottie from '@/shared/lottie-json/warning-lottie.json';
import { Button } from '@mui/material';

import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
});

export default function UnsupportImportToken() {
    return (
        <div>
            <div className="flex">
                <Lottie className="w-[160px] h-[160px] mx-auto" animationData={WarningLottie} loop={false} />
            </div>

            <p className="text-center laptop:max-w-[320px] component-text-body-medium">
                Swap service is temporarily unavailable due to low liquidity. Please try again later.
            </p>
        </div>
    );
}
