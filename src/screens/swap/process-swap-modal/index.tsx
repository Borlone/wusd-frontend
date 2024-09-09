import SystemModal from '@/shared/components/system-modal';
import React from 'react';
import Image from 'next/image';
import { ArrowRightIcon } from '@/shared/icons';
import { Button } from '@mui/material';
// import Lottie from 'lottie-react';
import ErrorLottie from './error-lottie.json';
import SuccessLottie from './success-lottie.json';
import { contractInfo } from '@/contracts';

import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
});
import Link from 'next/link';
import { formatNumber } from '@/shared/utils/function';
import LoadingAnimation from '@/shared/components/loading-background/loading-animation';

export enum ENUM_STEP_PROCESS_SWAP {
    CONFIRM = 'CONFIRM',
    LOADING = 'LOADING',
    SWAP_FAILED = 'SWAP_FAILED',
    REJECT_SWAP = 'REJECT_SWAP',
    APPROVE_FAILED = 'APPROVE_FAILED',
    REJECT_APPROVE = 'REJECT_APPROVE',
    SUCCESS = 'SUCCESS',
}

interface ITokenInfo {
    logo: string;
    token: number;
    name: string;
}

interface IProps {
    open: boolean;
    onClose: () => void;
    stepProcess: ENUM_STEP_PROCESS_SWAP;
    tokenIn?: ITokenInfo;
    tokenOut?: ITokenInfo;
    tranHash?: string;
    handleConfirm?: () => void;
}

const explorerURL = contractInfo.EXPLORER_URL;

export default function ProcessSwapModal({ stepProcess, tokenIn, tokenOut, open, onClose, tranHash, handleConfirm }: IProps) {
    const renderChildren = () => {
        const new_token_in = formatNumber(tokenIn?.token || 0);
        const new_token_out = formatNumber(tokenOut?.token || 0);

        if (stepProcess === ENUM_STEP_PROCESS_SWAP.CONFIRM) {
            return (
                <div>
                    <p className="component-text-body-medium text-center">You are swapping</p>

                    <div className="util-flex-center space-x-3 mt-1 min-w-[320px] -mx-1">
                        <div className="flex items-center space-x-1">
                            <Image alt="wallet" src={`/images/${tokenIn?.logo}`} width={20} height={20} />
                            <span className="component-text-title-2-emphasized bg-clip-text text-transparent bg-amount mb-1">{new_token_in}</span>
                            <span className="component-text-body-medium">{tokenIn?.name}</span>
                        </div>

                        <div className="w-6 util-flex-center">
                            <ArrowRightIcon></ArrowRightIcon>
                        </div>

                        <div className="flex items-center space-x-1">
                            <Image alt="wallet" src={`/images/${tokenOut?.logo}`} width={20} height={20} />
                            <span className="component-text-title-2-emphasized bg-clip-text text-transparent bg-amount mb-1">{new_token_out}</span>
                            <span className="component-text-body-medium">{tokenOut?.name}</span>
                        </div>
                    </div>

                    <Button className="component-btn w-full mt-2" onClick={handleConfirm}>
                        Confirm Swap
                    </Button>
                </div>
            );
        }

        if (stepProcess === ENUM_STEP_PROCESS_SWAP.LOADING) {
            return (
                <div>
                    <div className="util-flex-center">
                        <LoadingAnimation></LoadingAnimation>
                    </div>
                    <p className="component-text-body-medium text-center">Confirm swap</p>

                    <div className="util-flex-center space-x-3 mt-1 min-w-[320px]">
                        <div className="flex items-center space-x-1">
                            <Image alt="wallet" src={`/images/${tokenIn?.logo}`} width={20} height={20} />
                            <span className="component-text-title-2-emphasized bg-clip-text text-transparent bg-amount mb-1">{new_token_in}</span>
                            <span className="component-text-body-medium">{tokenIn?.name}</span>
                        </div>

                        <div className="w-6 util-flex-center">
                            <ArrowRightIcon></ArrowRightIcon>
                        </div>

                        <div className="flex items-center space-x-1">
                            <Image alt="wallet" src={`/images/${tokenOut?.logo}`} width={20} height={20} />
                            <span className="component-text-title-2-emphasized bg-clip-text text-transparent bg-amount mb-1">{new_token_out}</span>
                            <span className="component-text-body-medium">{tokenOut?.name}</span>
                        </div>
                    </div>

                    <p className="component-text-body-medium text-center mt--1">Proceed in your wallet</p>
                </div>
            );
        }

        if (stepProcess === ENUM_STEP_PROCESS_SWAP.SWAP_FAILED) {
            return (
                <div>
                    <div className="flex">
                        <Lottie className="w-[160px] h-[160px] mx-auto" animationData={ErrorLottie} loop={false} />
                    </div>
                    <p className="component-text-body-medium text-center text-[#FF3B30]">Swap Failed!</p>

                    <p className="tablet:w-[325px] mt-3 text-center component-text-body-medium">
                        The transaction was reverted. Please check the Explorer for details.
                    </p>

                    <Button onClick={onClose} className="component-btn w-full mt-2">
                        Back to swap
                    </Button>

                    <div className="mt-4">
                        <Link href={`${explorerURL}/${tranHash}`} target="_blank" className="no-underline ">
                            <p className="text-center component-text-caption-1-emphasized bg-clip-text text-transparent bg-explorer">
                                VIEW ON EXPLORER
                            </p>
                        </Link>
                    </div>
                </div>
            );
        }

        if (stepProcess === ENUM_STEP_PROCESS_SWAP.REJECT_SWAP) {
            return (
                <div>
                    <div className="flex">
                        <Lottie className="w-[160px] h-[160px] mx-auto" animationData={ErrorLottie} loop={false} />
                    </div>
                    <p className="component-text-body-medium text-center text-[#FF3B30]">Swap Rejected!</p>

                    <p className="tablet:w-[325px] mt-3 text-center component-text-body-medium">You have rejected to sign the swap transaction.</p>

                    <Button onClick={onClose} className="component-btn w-full mt-2">
                        Back to swap
                    </Button>
                </div>
            );
        }

        if (stepProcess === ENUM_STEP_PROCESS_SWAP.APPROVE_FAILED) {
            return (
                <div>
                    <div className="flex">
                        <Lottie className="w-[160px] h-[160px] mx-auto" animationData={ErrorLottie} loop={false} />
                    </div>
                    <p className="component-text-body-medium text-center text-[#FF3B30]">Approval Failed!</p>

                    <p className="tablet:w-[325px] mt-3 text-center component-text-body-medium">
                        The transaction was reverted. Please check the Explorer for details.
                    </p>

                    <Button onClick={onClose} className="component-btn w-full mt-2">
                        Back to swap
                    </Button>

                    <div className="mt-4">
                        <Link href={`${explorerURL}/${tranHash}`} target="_blank" className="no-underline ">
                            <p className="text-center component-text-caption-1-emphasized bg-clip-text text-transparent bg-explorer">
                                VIEW ON EXPLORER
                            </p>
                        </Link>
                    </div>
                </div>
            );
        }

        if (stepProcess === ENUM_STEP_PROCESS_SWAP.REJECT_APPROVE) {
            return (
                <div>
                    <div className="flex">
                        <Lottie className="w-[160px] h-[160px] mx-auto" animationData={ErrorLottie} loop={false} />
                    </div>
                    <p className="component-text-body-medium text-center text-[#FF3B30]">Approval Rejected!</p>

                    <p className="tablet:w-[325px] mt-3 text-center component-text-body-medium">
                        You have rejected to sign the approval transaction.
                    </p>

                    <Button onClick={onClose} className="component-btn w-full mt-2">
                        Back to swap
                    </Button>
                </div>
            );
        }

        if (stepProcess === ENUM_STEP_PROCESS_SWAP.SUCCESS) {
            return (
                <div>
                    <div className="flex">
                        <Lottie className="w-[160px] h-[160px] mx-auto" animationData={SuccessLottie} loop={false} />
                    </div>
                    <p className="component-text-body-medium text-[#00BD7D] text-center">Swap Success!</p>

                    <div className="util-flex-center space-x-3 mt-1 min-w-[320px] -mx-1">
                        <div className="flex items-center space-x-1">
                            <Image alt="wallet" src={`/images/${tokenIn?.logo}`} width={20} height={20} />
                            <span className="component-text-title-2-emphasized bg-clip-text text-transparent bg-amount mb-1">{new_token_in}</span>
                            <span className="component-text-body-medium">{tokenIn?.name}</span>
                        </div>

                        <div className="w-6 util-flex-center">
                            <ArrowRightIcon></ArrowRightIcon>
                        </div>

                        <div className="flex items-center space-x-1">
                            <Image alt="wallet" src={`/images/${tokenOut?.logo}`} width={20} height={20} />
                            <span className="component-text-title-2-emphasized bg-clip-text text-transparent bg-amount mb-1">{new_token_out}</span>
                            <span className="component-text-body-medium">{tokenOut?.name}</span>
                        </div>
                    </div>

                    <div className=" flex items-center flex-col mt-2">
                        <Button onClick={onClose} className="component-btn w-full mt-2">
                            Back to swap
                        </Button>
                    </div>

                    <div className="mt-4">
                        <Link href={`${explorerURL}/${tranHash}`} target="_blank" className="no-underline ">
                            <p className="text-center component-text-caption-1-emphasized bg-clip-text text-transparent bg-explorer">
                                VIEW ON EXPLORER
                            </p>
                        </Link>
                    </div>
                </div>
            );
        }

        return <></>;
    };

    return (
        <SystemModal bottomMobile title={stepProcess === ENUM_STEP_PROCESS_SWAP.CONFIRM ? 'Review swap' : ''} open={open} onClose={onClose}>
            {renderChildren()}
        </SystemModal>
    );
}
