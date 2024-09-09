import { useActiveAccount } from 'thirdweb/react';
import Button from '@mui/material/Button';
import { useGlobalStore } from '@/shared/store';
import AccountMenu from './AccountMenu';
import ChainMenu from './ChainMenu';

export default function Accounts() {
    const { setOpenWalletConnectModal } = useGlobalStore();

    const account = useActiveAccount();

    if (!account)
        return (
            <Button className="w-[200px] iphone:w-[168px] cm-btn iphone:px-0.5 iphone:py-2" onClick={() => setOpenWalletConnectModal(true)}>
                Connect wallet
            </Button>
        );

    return (
        <div className="flex items-center gap-3 mobile:gap-3 text-white">
            <ChainMenu />
            <AccountMenu />
        </div>
    );
}
