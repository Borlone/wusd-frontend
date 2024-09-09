import { useGlobalStore } from '@/shared/store';
import { Button } from '@mui/material';
import { NotificationType } from '@/types/notification';
import { getDecimals, getSymbolContract, contractInfo } from '@/contracts';
import { useActiveAccount, useReadContract, useSwitchActiveWalletChain } from 'thirdweb/react';

const { WUSD_TOKEN } = contractInfo;

const ImportToken = () => {
    const account = useActiveAccount();
    const { chain, setOpenWalletConnectModal, setNotiInfo } = useGlobalStore();
    const switchChain = useSwitchActiveWalletChain();

    const { data: decimals } = useReadContract({
        contract: getDecimals(chain, WUSD_TOKEN),
        method: 'decimals',
    });

    const { data: symbolOut } = useReadContract({
        contract: getSymbolContract(chain, WUSD_TOKEN),
        method: 'symbol',
        queryOptions: {
            enabled: Boolean(WUSD_TOKEN),
        },
    });

    const handleAddToken = async () => {
        if (!account) return setOpenWalletConnectModal(true);
        if (!account.watchAsset) return;

        // request switch to active chain before
        await switchChain(chain);

        const success = await account.watchAsset({
            type: 'ERC20',
            options: { address: WUSD_TOKEN, symbol: symbolOut, decimals },
        });

        if (success) return setNotiInfo({ open: true, title: '', contentType: NotificationType.SUCCESS });
    };

    return (
        <Button
            className="component-btn w-fit h-[24px] rounded-[4px] text-[12px] font-[700] leading-[16px] capitalize min-w-[100px]"
            onClick={handleAddToken}
        >
            Import Token
        </Button>
    );
};

export default ImportToken;
