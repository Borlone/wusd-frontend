import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/utils';
import React from 'react';
import { Box, Menu } from '@mui/material';
import GradientButton from '@/shared/base-ui/gradient-button';
import { ArrowForward } from '@mui/icons-material';
import { MenuIcon } from '@/shared/icons';

const NavBarPc = () => {
    const pathname = usePathname();
    return (
        <div className="flex gap-4">
            <Link href="/swap" className="relative no-underline group h-[45px] w-[90px] flex justify-center items-center">
                <Image
                    src="/images/nav-hover-top.svg"
                    width={14}
                    height={14}
                    alt=""
                    className={cn('absolute top-0 left-0 invisible-custom group-hover:visible', {
                        '!visible group-hover:visible': pathname === '/swap',
                    })}
                />
                <div className="text-[16px] font-bold leading-[21px] text-white uppercase">Swap</div>
                <Image
                    src="/images/nav-hover-bottom.svg"
                    width={14}
                    height={14}
                    alt=""
                    className={cn('absolute bottom-0 right-0 invisible-custom group-hover:visible', {
                        '!visible group-hover:visible': pathname === '/swap',
                    })}
                />
            </Link>
            <Link href="/dashboard" className="relative no-underline group h-[45px] w-[130px] flex justify-center items-center">
                <Image
                    src="/images/nav-hover-top.svg"
                    width={14}
                    height={14}
                    alt=""
                    className={cn('absolute top-0 left-0 invisible-custom group-hover:visible', {
                        '!visible group-hover:visible': pathname === '/dashboard',
                    })}
                />
                <div className="text-[16px] font-bold leading-[21px] text-white uppercase">Dashboard</div>
                <Image
                    src="/images/nav-hover-bottom.svg"
                    width={14}
                    height={14}
                    alt=""
                    className={cn('absolute bottom-0 right-0 invisible-custom group-hover:visible', {
                        '!visible group-hover:visible': pathname === '/dashboard',
                    })}
                />
            </Link>
        </div>
    );
};

const NavBarMobile = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="min_mobile:hidden">
            <Box
                aria-controls={open ? 'nav-menu-mobile' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="h-[24px]"
            >
                <MenuIcon className="h-[24px] w-[24px] text-white cursor-pointer" />
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="nav-menu-mobile"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    className: 'component-border rounded-xl backdrop-blur-[20px] !px-2',
                    sx: {
                        overflow: 'visible',
                        color: 'white',
                        mt: 3,
                        width: '100%',
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
                <div className="flex flex-col gap-4">
                    <Link href="/swap" className="no-underline">
                        <GradientButton roundedFull={false}>
                            <div className="w-full flex items-center justify-between px-4 py-6">
                                <p className="text-[16px] font-normal leading-[21px] text-white no-underline uppercase">Swap</p>
                                <ArrowForward className="group-hover:scale-[1.2] ease-in duration-150 text-white" sx={{ width: 24, height: 24 }} />
                            </div>
                        </GradientButton>
                    </Link>
                    <Link href="/dashboard" className="no-underline">
                        <GradientButton roundedFull={false}>
                            <div className="w-full flex items-center justify-between px-4 py-6 rounded-[16px]">
                                <p className="text-[16px] font-normal leading-[21px] text-white no-underline uppercase">Dashboard</p>
                                <ArrowForward className="group-hover:scale-[1.2] ease-in duration-150 text-white" sx={{ width: 24, height: 24 }} />
                            </div>
                        </GradientButton>
                    </Link>
                </div>
            </Menu>
        </div>
    );
};

export { NavBarPc, NavBarMobile };
