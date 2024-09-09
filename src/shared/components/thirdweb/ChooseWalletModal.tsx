import { Modal } from '@mui/material';
import Divider from '@mui/material/Divider';
import WalletButton from './WalletButton';
import { ArrowDownIcon, CloseIcon } from '@/shared/icons';
import { WalletId } from 'thirdweb/wallets';
import { useEffect, useState } from 'react';
import Collapse from '@/shared/base-ui/collapse';
import { inMobile } from '@/shared/utils/function';

type Wallet = {
    id: WalletId;
    name: string;
    logo: string;
};

type Props = {
    open: boolean;
    disableClose?: boolean;
    onClose: () => void;
};

const squares = Array.from(Array(5).keys());

const baseWallets: Wallet[] = [
    { logo: '/images/metamask.png', id: 'io.metamask', name: 'MetaMask' },
    { logo: '/images/bitget.png', id: 'com.bitget.web3', name: 'Bitget Wallet' },
    { logo: '/images/okx.png', id: 'com.okex.wallet', name: 'OKX Wallet' },
];

const moreWallets: Wallet[] = [
    { logo: '/images/wallet_connect.png', id: 'walletConnect', name: 'WalletConnect' },
    { logo: '/images/trust.png', id: 'com.trustwallet.app', name: 'Trust Wallet' },
    // @ts-ignore
    { logo: '/images/safe.png', id: 'https://www.safepal.com/download', name: 'SafePal' },
    // @ts-ignore
    { logo: '/images/uniswap.png', id: 'org.uniswap.app', name: 'Uniswap Wallet' },
];

export default function ChooseWalletModal({ open, onClose, disableClose = false }: Props) {
    const [expandWallet, setExpandWallet] = useState(false);
    const [wallets, setWallets] = useState([...baseWallets]);

    const rotateClass = expandWallet ? 'rotate-180' : 'rotate-0';

    useEffect(() => {
        if (inMobile()) return;
        setWallets([...baseWallets, { logo: '/images/rabby.png', id: 'io.rabby' as WalletId, name: 'Rabby' }]);
    }, []);

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            disableEnforceFocus={true}
            disableAutoFocus={true}
            className="flex items-center justify-center z-50"
            slotProps={{
                backdrop: {
                    sx: {
                        background: `#0A090FB2`,
                        backdropFilter: 'blur(20px)',
                    },
                },
            }}
        >
            <div className="flex flex-col w-[486px] mobile:w-[311px] max-h-[90svh]">
                <div className="flex items-center justify-between bg-radial border-[1px] border-solid border-second-300 text-white p-4 rounded-t-xl backdrop-blur-[20px]">
                    <p className="component-text-callout-emphasized">Connect a wallet</p>
                    {!disableClose && <CloseIcon className="text-white w-6 h-6 cursor-pointer" onClick={onClose} />}
                </div>

                <div className="flex items-center justify-between relative">
                    <tbody className="w-full bg-black-400">
                        <tr className="grid grid-cols-5">
                            {squares.map((index) => (
                                <td key={index} className="border-[1px] border-solid border-black-200 pb-[75%]" />
                            ))}
                        </tr>
                        <tr className="grid grid-cols-5">
                            {squares.map((index) => (
                                <td key={index} className="border-[1px] border-solid border-black-200 pb-[75%]" />
                            ))}
                        </tr>
                    </tbody>
                    <div className="w-full absolute text-white text-center pb-3">
                        <p className="text-[18px] leading-[32px] font-medium">Connect Wallet</p>
                        <p className="text-[12px] leading-[24px]">Select your favourite wallet to log in</p>
                    </div>
                </div>

                <div className="bg-radial border-[1px] border-solid border-second-300 rounded-b-xl backdrop-blur-[20px] overflow-y-auto">
                    <div className="flex flex-col gap-4 p-4">
                        <div className="flex items-center mobile:flex-wrap gap-4">
                            {wallets?.slice(0, 2).map((wallet) => <WalletButton className="w-full" key={wallet.id} wallet={wallet} />)}
                        </div>
                        <div className="flex items-center mobile:flex-wrap gap-4">
                            {wallets?.slice(2).map((wallet) => <WalletButton className="w-full" key={wallet.id} wallet={wallet} />)}
                        </div>
                    </div>

                    <Divider className="px-4 pb-4">
                        <div className="flex gap-2 text-white items-center cursor-pointer" onClick={() => setExpandWallet(!expandWallet)}>
                            <p className="component-text-body-medium">More wallets</p>
                            <ArrowDownIcon className={`text-2xl transition-all ${rotateClass}`} />
                        </div>
                    </Divider>

                    <Collapse expand={expandWallet}>
                        <div className="grid grid-cols-auto-2 mobile:grid-cols-1 gap-4 p-4 pt-0">
                            {moreWallets.map((wallet) => (
                                <WalletButton key={wallet.id} wallet={wallet} />
                            ))}
                        </div>
                    </Collapse>
                </div>
            </div>
        </Modal>
    );
}
