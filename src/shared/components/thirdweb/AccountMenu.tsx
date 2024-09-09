import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { KeyboardArrowDown, PowerSettingsNew } from '@mui/icons-material';
import { useActiveAccount, useActiveWallet, useDisconnect, useReadContract } from 'thirdweb/react';
import { Wallet } from 'thirdweb/wallets';
import { getDecimals, getPoolAmountContract, contractInfo } from '@/contracts';
import { useGlobalStore } from '@/shared/store';
import { cn, shorthandString } from '@/shared/utils';
import Image from 'next/image';
import { getMaxAmount } from '@/shared/utils/function';
import { useMediaQuery } from '@mui/material';
import CopyString from '@/shared/base-ui/copy';
import GradientButton from '@/shared/base-ui/gradient-button';
import WalletIcon from '@mui/icons-material/Wallet';
import ImportToken from './ImportToken';
import NumberDisplay from '../number-display';

const { WUSD_TOKEN } = contractInfo;

const AccountMenu = () => {
    const isTABLET = useMediaQuery('(max-width: 756px)');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { chain, setUserInfo } = useGlobalStore();
    const account = useActiveAccount();
    const wallet = useActiveWallet();
    const { disconnect } = useDisconnect();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDisconnect = () => {
        localStorage.removeItem('token');
        setUserInfo(null);
        disconnect(wallet as Wallet);
        handleClose();
    };

    const { data: amountWUSD } = useReadContract({
        contract: getPoolAmountContract(chain, WUSD_TOKEN),
        method: 'balanceOf',
        params: [account?.address],
    });

    const { data: decimals } = useReadContract({
        contract: getDecimals(chain, WUSD_TOKEN),
        method: 'decimals',
    });

    const maxAmountWUSD = getMaxAmount(amountWUSD, decimals);

    return (
        <React.Fragment>
            <Box
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <GradientButton id="chain-switch-btn" className="flex items-center text-center gap-[4px] cursor-pointer">
                    <p className="pl-2 mobile:hidden">{shorthandString(account?.address, 4, 4)}</p>
                    <IconButton size="small" className="pr-2 mobile:hidden">
                        <KeyboardArrowDown
                            className={cn('duration-1000 ease-in-out', {
                                'rotate-180 duration-1000 ease-in-out': open,
                            })}
                            sx={{ width: 24, height: 24, color: 'white' }}
                        />
                    </IconButton>
                    <IconButton size="small" className="space-x-2 p-2 hidden mobile:flex">
                        <WalletIcon sx={{ width: isTABLET ? 20 : 24, height: isTABLET ? 20 : 24, color: 'white' }} />
                    </IconButton>
                </GradientButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    className: 'component-border rounded-xl backdrop-blur-[20px]',
                    sx: {
                        overflow: 'visible',
                        color: 'white',
                        mt: 2,
                        width: '375px',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid #26D3A5',
                        backgroundColor: 'transparent',
                        background: ' radial-gradient(107.32% 141.42% at 0% 0%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)',
                        boxShadow: '-5px -5px 250px 0px rgba(255, 255, 255, 0.02)',
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <div className="py-2 flex justify-between items-center">
                    <div className="flex flex-col gap-[2px]">
                        <div className="text-[14px] font-normal leading-[20px] text-gray-300">Connected Account:</div>
                        <div className="flex gap-4 items-center">
                            <div className="text-[14px] font-bold leading-[20px] text-white">{shorthandString(account?.address, 6, 4)}</div>
                            <CopyString text={account?.address!} />
                        </div>
                    </div>
                    <PowerSettingsNew
                        className="hover:scale-[1.2] ease-in duration-150"
                        sx={{ width: 24, height: 24, color: '#FF3B30', cursor: 'pointer' }}
                        onClick={handleDisconnect}
                    />
                </div>
                <Divider className="my-4 border-white" />
                <div
                    className="py-2 flex justify-between gap-2 items-center"
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <div className="flex items-center gap-2 w-[60%]">
                        <Image src="/images/WUSD.png" alt="" width={24} height={24} />
                        <NumberDisplay number={maxAmountWUSD} className="text-white text-[24px] font-bold leading-[24px]" />
                    </div>
                    <ImportToken />
                </div>
            </Menu>
        </React.Fragment>
    );
};

export default AccountMenu;
