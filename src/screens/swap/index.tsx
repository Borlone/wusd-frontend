import { useEffect, useState } from 'react';
import SwapItem from './swap-item';
import Button from '@mui/material/Button';
import { BlinkStarIcon, CertikLogoIcon, SwapIcon } from '@/shared/icons';
import IconButton from '@mui/material/IconButton';
import { useActiveAccount, useReadContract, useSwitchActiveWalletChain, useSendTransaction } from 'thirdweb/react';
import { prepareContractCall, toTokens, toUnits } from 'thirdweb';
import Image from 'next/image';
import { approveContract, getDecimals, getRateContract, swapContract, contractInfo } from '@/contracts';
import ProcessSwapModal, { ENUM_STEP_PROCESS_SWAP } from './process-swap-modal';
import useDebounceValue from '@/shared/hooks/useDebounceValue';
import { multiplyNumbersByRatios } from '@/shared/utils/function';
import SomethingWrongModal from '@/shared/components/something-wrong-modal';
import WarningModal from './warning-modal';
import LoadingAnimation from '@/shared/components/loading-background/loading-animation';
import useCatchTransaction from '@/shared/hooks/useCatchTransaction';
import { TransactionReceipt } from 'viem';
import useGetSymbols from '@/shared/hooks/useGetSymbols';
import useGetBalances from '@/shared/hooks/useGetBalances';
import useGetBalancePool from '@/shared/hooks/useGetBalancePool';
import { useGlobalStore } from '@/shared/store';
import { createSwapHistory } from '@/services/swap-history';
import { txEvent } from '@/types/tx-event';
import { TOKEN_ADDRESS, tokenTypes } from '@/shared/constant';
import { useMediaQuery } from '@mui/material';

const { SWAP_ADDRESS } = contractInfo;

export default function Swap() {
    const matchMax756 = useMediaQuery('(max-width: 640px)');
    const matchMax430 = useMediaQuery('(max-width: 430px)');
    const { chain, setOpenWalletConnectModal } = useGlobalStore();

    const account = useActiveAccount();

    const switchChain = useSwitchActiveWalletChain();

    const [allowShowModal, setAllowShowModal] = useState(false);
    const [swapType, setSwapType] = useState({ from: 'TUSDT', to: 'WUSD' });
    const [swapAmount, setSwapAmount] = useState('');
    const [process, setProcess] = useState({ processing: false, processEvent: '' });
    const [btnType, setBtnType] = useState({ name: 'Swap', type: 'swap' });
    const [processModal, setProgressModal] = useState({ open: false, step: ENUM_STEP_PROCESS_SWAP.CONFIRM });
    const [infoStwModal, setInfoStwModal] = useState({ open: false, message: '' });
    const [swapReceipt, setSwapReceipt] = useState<any>();
    const [showWarningModal, setShowWarningModal] = useState(false);

    const { processing, processEvent } = process;

    const { mutate: sendTx, data: txData, reset: resetTx } = useSendTransaction({ payModal: false });

    const tokenIn = TOKEN_ADDRESS[swapType.from];
    const tokenOut = TOKEN_ADDRESS[swapType.to];

    // get symbol token
    const { symbolIn, symbolOut } = useGetSymbols(tokenIn, tokenOut);

    // get balance amount
    const { amountIn, amountOut, maxAllowance, refetchAmountIn, refetchAllowance } = useGetBalances(tokenIn, tokenOut);

    // get pool amount
    const { poolAmount } = useGetBalancePool(tokenOut);

    // getRate contract
    const { data: rate } = useReadContract({
        contract: getRateContract(chain),
        method: 'getRate',
        params: [tokenIn, tokenOut],
    });

    // get decimal of tokenOut
    const { data: decimals } = useReadContract({
        contract: getDecimals(chain, tokenOut),
        method: 'decimals',
        queryOptions: {
            enabled: Boolean(tokenOut),
        },
    });

    const { receipt } = useCatchTransaction(txData?.transactionHash, processEvent);

    useEffect(() => {
        if (!decimals || maxAllowance === undefined) return;

        const newMaxAllowance = toTokens(maxAllowance, decimals);

        if (parseFloat(newMaxAllowance) < parseFloat(swapAmount)) {
            return setBtnType({ type: 'approve', name: `Approve ${symbolIn}` });
        }

        setBtnType({ type: 'swap', name: 'Swap' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxAllowance, decimals, swapAmount, symbolIn]);

    useEffect(() => {
        if (!receipt) return;
        setSwapReceipt(receipt);

        if (processEvent === txEvent.APPROVAL) {
            return handleApprovalResult(receipt);
        }

        if (processEvent === txEvent.SWAP) {
            return handleSwapResult(receipt);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receipt]);

    useEffect(() => {
        if (account) return setOpenWalletConnectModal(false);
        if (!account) {
            setAllowShowModal(false);
            resetTx();
            setProcess({ processing: false, processEvent: '' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    const handleChangeSwap = () => {
        if (swapType.from === 'TUSDT') return setSwapType({ from: 'WUSD', to: 'TUSDT' });
        setSwapType({ from: 'TUSDT', to: 'WUSD' });
    };

    const checkAllowanceAfterApprove = async () => {
        const response = await refetchAllowance();

        if (response.status === 'success') {
            const newMaxAllowance = toTokens(response.data, decimals);

            if (+newMaxAllowance >= +swapAmount) {
                setProgressModal({ open: true, step: ENUM_STEP_PROCESS_SWAP.CONFIRM });
            }
        }
    };

    const handleSwapButton = () => {
        if (!account) {
            return setOpenWalletConnectModal(true);
        }

        const newPoolAmount = toTokens(poolAmount, decimals);

        const toAmount = multiplyNumbersByRatios(swapAmount, amountRate.toString());

        if (parseFloat(newPoolAmount) < parseFloat(toAmount.toString())) {
            setShowWarningModal(true);
            return;
        }

        setAllowShowModal(true);
        if (btnType.type === 'approve') {
            return handleApproveToken();
        }

        if (btnType.type === 'swap') {
            return handleSwapToken();
        }
    };

    const handleSwitchChain = async () => {
        let isSwitchSuccess = true;
        try {
            await switchChain(chain);
        } catch (error: any) {
            isSwitchSuccess = false;
            setProcess({ processing: false, processEvent: '' });
            setProgressModal({ open: false, step: ENUM_STEP_PROCESS_SWAP.CONFIRM });

            let message = error?.message || '';
            if (message.indexOf('An error occurred when attempting to switch chain') !== -1) {
                message = `Chain is mismatched. Please make sure your wallet is switched to expected chain`;
                return setInfoStwModal({ open: true, message });
            }

            setInfoStwModal({ open: true, message });
        }
        return isSwitchSuccess;
    };

    const handleApproveToken = async () => {
        setProcess({ processing: true, processEvent: txEvent.APPROVAL });

        // approve token if has a actived wallet
        const approveTran = prepareContractCall({
            contract: approveContract(chain, tokenIn),
            method: 'approve',
            params: [SWAP_ADDRESS, toUnits(swapAmount, decimals)],
        });

        const isSwitchSuccess = await handleSwitchChain();
        if (!isSwitchSuccess) return;

        sendTx(approveTran, {
            onError: (error: any) => {
                // Unknow reason: the transaction was expired. Don't show expired error in the modal.
                // 4001 : user click "cancel" on interface
                if ([4001, 5000].some((code) => code === error?.code)) {
                    setProcess({ processing: false, processEvent: '' });
                    setProgressModal({ open: true, step: ENUM_STEP_PROCESS_SWAP.REJECT_APPROVE });
                }
            },
        });
    };

    const handleCreateSwapHistory = async (data: any) => {
        const { transactionHash } = data;
        await createSwapHistory({ txHash: transactionHash });
    };

    const handleSwapToken = async () => {
        setProcess({ processing: true, processEvent: txEvent.SWAP });
        setProgressModal({ open: true, step: ENUM_STEP_PROCESS_SWAP.LOADING });

        // request to switch chain if wallet's chain is not same
        const isSwitchSuccess = await handleSwitchChain();
        if (!isSwitchSuccess) return;

        const swapTran = prepareContractCall({
            contract: swapContract(chain),
            method: 'swap',
            params: [tokenIn, tokenOut, toUnits(swapAmount, decimals)],
        });

        sendTx(swapTran, {
            onSuccess: (data) => {
                handleCreateSwapHistory(data);
            },
            onError: (error: any) => {
                // Unknow reason: the transaction was expired. Don't show expired error in the modal.
                // 4001 : user click "cancel" on interface
                if ([4001, 5000].some((code) => code === error?.code)) {
                    setProcess({ processing: false, processEvent: '' });
                    setProgressModal({ open: true, step: ENUM_STEP_PROCESS_SWAP.REJECT_SWAP });
                }
            },
        });
    };

    const handleApprovalResult = (receipt: TransactionReceipt) => {
        setProcess({ processing: false, processEvent: '' });

        if (!allowShowModal) return;

        if (receipt.status === 'reverted') {
            setProgressModal({ open: true, step: ENUM_STEP_PROCESS_SWAP.APPROVE_FAILED });
            return;
        }

        setBtnType({ type: 'swap', name: 'Swap' });
        checkAllowanceAfterApprove();
    };

    const handleSwapResult = (receipt: TransactionReceipt) => {
        setProcess({ processing: false, processEvent: '' });

        if (!allowShowModal) return;

        if (receipt.status === 'reverted') {
            setProgressModal({ open: true, step: ENUM_STEP_PROCESS_SWAP.SWAP_FAILED });
            return;
        }

        refetchAmountIn();
        refetchAllowance();
        setProgressModal({ open: true, step: ENUM_STEP_PROCESS_SWAP.SUCCESS });
    };

    const handleCloseWarningModal = () => {
        setShowWarningModal(false);
    };

    const labelBtnSwap = account ? (processing ? 'Processing' : btnType.name) : 'Connect wallet';

    const amountRate = rate ? Number((rate.output * BigInt(100)) / rate.input) / 100 : 1;

    const toAmount = useDebounceValue(swapAmount && rate ? multiplyNumbersByRatios(swapAmount, amountRate.toString()) : '');

    const maxAmountIn = amountIn && decimals ? toTokens(amountIn, decimals) : '';
    const maxAmountOut = amountOut && decimals ? toTokens(amountOut, decimals) : '';

    const showInsufficient = maxAmountIn !== undefined && parseFloat(swapAmount) > parseFloat(maxAmountIn);
    const allowSwap = !account || (Boolean(amountIn) && swapAmount && Boolean(parseFloat(swapAmount)));

    const disabledClass = processing || !allowSwap || showInsufficient ? 'cm-btn-disabled' : 'cm-btn';

    return (
        <>
            <div className="flex flex-col h-full">
                <div className="w-full h-full flex flex-col justify-center">
                    <div className="flex flex-col items-center gap-4 mobile:gap-0 pt-12 mobile:pt-5 max_tablet:pb-10 max_tablet:pt-5">
                        <div className="flex items-center gap-4 mobile:gap-2 max-w-[91vw]">
                            {matchMax756 ? (
                                <Image className="max-w-full" src="/images/usdt_wusd_mb.svg" alt="" width={319} height={48} />
                            ) : (
                                <Image className="max-w-full" src="/images/usdt_wusd_pc.svg" alt="" width={603} height={64} />
                            )}
                        </div>
                        <div className="flex items-center gap-1 max-w-[91vw]">
                            <BlinkStarIcon className="blink-star-swap" />
                            <div
                                className="min-width-text-swap flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mobile:gap-x-[5px] mobile:gap-y-[2px] text-white text-[28px] leading-[34px] mobile:text-[16px] mobile:leading-[21px]"
                                style={{ fontSize: matchMax430 ? '14px !important' : '' }}
                            >
                                <p className="whitespace-nowrap">Hold WUSD in your own wallet</p>
                                <p className="flex items-center gap-2 whitespace-nowrap">
                                    to get
                                    <p className="px-2 py-1 mobile:p-1 rounded-xl text-[34px] leading-[41px] mobile:text-[17px] mobile:leading-4 mobile:rounded-lg font-bold border-[2px] mobile:border-[1px] border-solid border-emerald-400 text-emerald-400 bg-transparent">
                                        5%
                                    </p>
                                    rewards
                                </p>
                            </div>
                            <BlinkStarIcon className="blink-star-swap" />
                        </div>
                    </div>

                    <div className="w-full h-full max_tablet:h-fit flex items-stretch mb-5">
                        <div className="w-[579px] mobile:w-[343px] relative m-auto text-white max-w-[91vw] bg-no-repeat bg-contain bg-center">
                            <Image
                                className="absolute max-w-full z-[-1] mobile:hidden"
                                src="/images/bg-card.webp"
                                alt="modal"
                                width={579}
                                height={383}
                            />
                            <Image
                                className="absolute max-w-full z-[-1] hidden mobile:block"
                                src="/images/bg-card_mb.webp"
                                alt="modal"
                                width={579}
                                height={383}
                            />
                            <div className="flex flex-col justify-center p-4 iphone:px-3 iphone:py-4">
                                <p className="component-text-title-2-emphasized uppercase iphone:text-[20px]">Swap</p>
                                <div className="flex flex-col gap-1 mt-6 relative">
                                    <SwapItem
                                        title="from"
                                        readOnly={processing}
                                        symbol={symbolIn}
                                        type={swapType.from}
                                        maxAmount={maxAmountIn}
                                        decimals={decimals}
                                        amount={swapAmount}
                                        onChange={setSwapAmount}
                                        onMax={() => setSwapAmount(maxAmountIn)}
                                    />
                                    <div className="relative">
                                        <SwapItem
                                            readOnly
                                            title="to"
                                            symbol={symbolOut}
                                            type={swapType.to}
                                            maxAmount={maxAmountOut}
                                            amount={toAmount ?? ''}
                                        />
                                        <IconButton
                                            className="w-[26px] h-[26px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase bg-btn text-white rounded p-1"
                                            onClick={handleChangeSwap}
                                            disabled={processing}
                                        >
                                            <SwapIcon />
                                        </IconButton>
                                    </div>
                                </div>

                                <div className="text-center my-4 iphone:my-3">
                                    <Button className={`min-w-[200px] gap-2 ${disabledClass}`} onClick={handleSwapButton}>
                                        {processing && <LoadingAnimation className="w-10 h-11 -my-3" />}
                                        {labelBtnSwap}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-4">
                    <div className="w-[343px] max-w-[91vw] flex items-center justify-center rounded-full p-2 m-auto bg-card backdrop-blur-[20px] border border-solid border-second-300">
                        <div className="text-white flex items-center gap-4">
                            <p className="text-xl leading-[25px] max_tablet:text-sm max_tablet:leading-5 font-normal">Audited by</p>
                            <CertikLogoIcon className="max_tablet:text-xs" />
                        </div>
                    </div>
                </div>
            </div>

            <WarningModal open={showWarningModal} onClose={handleCloseWarningModal} onOk={handleCloseWarningModal} />

            <ProcessSwapModal
                open={processModal.open}
                onClose={() => {
                    if (processModal.step === ENUM_STEP_PROCESS_SWAP.SUCCESS) setSwapAmount('');
                    setProgressModal({ open: false, step: ENUM_STEP_PROCESS_SWAP.CONFIRM });
                }}
                stepProcess={processModal.step}
                tokenIn={{
                    ...tokenTypes[swapType.from],
                    name: symbolIn,
                    token: swapAmount,
                }}
                tokenOut={{
                    ...tokenTypes[swapType.to],
                    name: symbolOut,
                    token: toAmount,
                }}
                tranHash={swapReceipt?.transactionHash}
                handleConfirm={handleSwapButton}
            />

            <SomethingWrongModal
                open={infoStwModal.open}
                onClose={() =>
                    setInfoStwModal({
                        open: false,
                        message: '',
                    })
                }
                message={infoStwModal.message}
                titleBtn="Back to swap"
            ></SomethingWrongModal>
        </>
    );
}
