import Image from 'next/image';
import GradientButton from '@/shared/base-ui/gradient-button';
import React from 'react';
import { Box, Menu, useMediaQuery } from '@mui/material';
import { supportedChains } from '@/configs/thirdweb/defineChain';

export default function ChainMenu() {
    const matchs = useMediaQuery('(max-width: 756px)');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box
                sx={{ pointerEvents: 'none' }}
                aria-controls={open ? 'chain-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <GradientButton>
                    <div className="flex items-center space-x-2 p-2">
                        <Image src="/images/ETH.png" alt="chain" width={matchs ? 20 : 24} height={matchs ? 20 : 24} />
                    </div>
                </GradientButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="chain-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    className: 'component-border rounded-xl backdrop-blur-[20px] !px-2',
                    sx: {
                        overflow: 'visible',
                        color: 'white',
                        mt: 2,
                        width: 'fit',
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
                {supportedChains?.map((chain) => (
                    <GradientButton key={chain?.id} disabled>
                        <div className="w-full flex items-center gap-2 p-2 pr-6">
                            <Image src="/images/ETH.png" alt="chain" width={24} height={24} />
                            <p className="text-white">{chain?.name}</p>
                        </div>
                    </GradientButton>
                ))}
            </Menu>
        </React.Fragment>
    );
}
