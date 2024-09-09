import { Fragment, useEffect, useState } from 'react';
import { ChooseWalletModal } from '@/shared/components/thirdweb';
import { useGlobalStore } from '@/shared/store';
import { getInfoUser } from '@/services/users';
import { useActiveAccount, useAutoConnect } from 'thirdweb/react';
import { SignAndLoginModal } from '@/shared/components/thirdweb/SignAndLoginModal';
import { useChainId } from '@thirdweb-dev/react';
import { useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { createWallet, inAppWallet } from 'thirdweb/wallets';
import { client } from '@/configs/thirdweb/client';

const wallets = [
    inAppWallet(),
    createWallet('io.metamask'),
    createWallet('com.okex.wallet'),
    createWallet('com.bitget.web3'),
    createWallet('io.rabby'),
    createWallet('walletConnect'),
    createWallet('com.trustwallet.app'),
    createWallet('com.safepal'),
    createWallet('org.uniswap'),
];

export const ConnectWalletProvider = () => {
    const { isLoading: loadingReconnect, error } = useAutoConnect({ client, wallets });

    const pathname = usePathname();
    const isDashboard = pathname === '/dashboard';
    const account = useActiveAccount();
    const chainId = useChainId();

    const { openWalletConnectModal, setOpenWalletConnectModal, setUserInfo, userInfo, setOpenConfirmRequestModal, setIsError } = useGlobalStore();

    const [prevAddress, setPrevAddress] = useState('');

    const { mutateAsync: getUserInfo } = useMutation({
        mutationFn: getInfoUser,
        mutationKey: ['get-user-info'],
    });

    useEffect(() => {
        if (account) setOpenWalletConnectModal(false);
        if (!account || userInfo) setOpenConfirmRequestModal(false);
        let timer: any;

        timer = setTimeout(() => {
            if (isDashboard) {
                setOpenWalletConnectModal(!account);
                setOpenConfirmRequestModal(!!(account && !userInfo));
            }
        }, 800);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, userInfo, chainId, isDashboard]);

    useEffect(() => {
        if (!account) {
            setPrevAddress('');
            setIsError(false);
            return;
        }

        if (!prevAddress) {
            setPrevAddress(account.address);
            const token = localStorage.getItem('token');
            if (token) {
                const fetchUserInfo = async () => {
                    const data = await getUserInfo();
                    setUserInfo(data);
                };
                fetchUserInfo();
            }
            setIsError(false);
            return;
        }

        if (prevAddress !== account.address) {
            setPrevAddress(account.address);
            localStorage.removeItem('token');
            setUserInfo(null);
            setOpenConfirmRequestModal(true);
            setIsError(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    return (
        <Fragment>
            <ChooseWalletModal disableClose={isDashboard} open={openWalletConnectModal} onClose={() => setOpenWalletConnectModal(isDashboard)} />
            <SignAndLoginModal />
        </Fragment>
    );
};
