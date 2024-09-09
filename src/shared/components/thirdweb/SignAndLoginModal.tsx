import dynamic from 'next/dynamic';
import WarningLottie from './warning-lottie.json';

import SystemModal from '@/shared/components/system-modal';
import { Button } from '@mui/material';

import { useGlobalStore } from '@/shared/store';
import { Wallet } from 'thirdweb/wallets';
import { getInfoUser } from '@/services/users';
import { useActiveAccount, useActiveWallet, useDisconnect, useActiveWalletChain } from 'thirdweb/react';
import { useMutation } from '@tanstack/react-query';
import { signWallet } from '@/shared/utils/sign-wallet-signature';
const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
});

export const SignAndLoginModal = ({ onClose }: { onClose?: () => void }) => {
    const account = useActiveAccount();
    const activeChain = useActiveWalletChain();
    const { disconnect } = useDisconnect();
    const wallet = useActiveWallet();

    const { setUserInfo, openConfirmRequestModal, setOpenConfirmRequestModal } = useGlobalStore();

    const { mutateAsync: getUserInfo } = useMutation({
        mutationFn: getInfoUser,
        mutationKey: ['get-user-info'],
    });

    const handleAccountsChanged = async () => {
        const token = await signWallet(account, activeChain?.id?.toString());

        if (token) {
            const dt = await getUserInfo();
            setUserInfo(dt);
            setOpenConfirmRequestModal(false);
        }
    };

    const handleDisconnect = () => {
        localStorage.removeItem('token');
        setUserInfo(null);
        disconnect(wallet as Wallet);
    };

    return (
        <SystemModal bottomMobile open={openConfirmRequestModal} onClose={onClose} disableClose={true}>
            <div className="flex">
                <Lottie className="w-[160px] h-[160px] mx-auto" animationData={WarningLottie} loop={false} />
            </div>
            <p className="text-center laptop:max-w-[320px] component-text-body-medium">
                You need to sign the required signature to continue viewing the data
            </p>
            <Button className="component-btn w-full mt-2" onClick={handleAccountsChanged}>
                Signature request
            </Button>

            <Button className="component-btn-secondary mt-2" onClick={handleDisconnect}>
                Change wallet
            </Button>
        </SystemModal>
    );
};
