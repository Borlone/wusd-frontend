import SystemModal from '@/shared/components/system-modal';
import React from 'react';
import { Button } from '@mui/material';
import ErrorLottie from './error-lottie.json';

import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
});

type Props = {
    open: boolean;
    onClose: () => void;
    message: string;
    titleBtn?: string;
};

export default function SomethingWrongModal({ open, onClose, message, titleBtn }: Props) {
    return (
        <SystemModal bottomMobile open={open} onClose={onClose}>
            <div>
                <div className="flex">
                    <Lottie className="w-[160px] h-[160px] mx-auto" animationData={ErrorLottie} loop={false} />
                </div>
                <p className="component-text-body-medium text-center text-[#FF3B30]">Something Wrong...!</p>

                {message && (
                    <div className="tablet:w-[325px] max-h-[200px] mt-3 overflow-auto p-2">
                        <p className="component-text-body-medium text-white text-center">{message}</p>
                    </div>
                )}

                <Button onClick={onClose} className="component-btn w-full mt-2">
                    {titleBtn || 'Close'}
                </Button>
            </div>
        </SystemModal>
    );
}
