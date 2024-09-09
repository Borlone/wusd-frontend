import { ReactNode } from 'react';
import Header from '../header';
import { poppins } from '@/configs/localFont';
import { cn } from '@/shared/utils';
import { ConnectWalletProvider } from '@/shared/provider/ConnectWalletProvider';
import GraphicBg from '../graphic';
import NotificationModal from '@/shared/components/notification-modal';
import { useRouter } from 'next/router';
import AutoCheckRpc from '@/shared/components/auto-check-rpc';

type Props = {
    children: ReactNode;
};

export default function MainLayout({ children }: Props) {
    const router = useRouter();

    const mainClass = router.pathname === '/swap' ? 'auto-height' : 'h-full';

    return (
        <div className={cn(`w-full h-svh relative `, poppins.className)}>
            <GraphicBg />
            <AutoCheckRpc />
            <div className="w-full h-full flex flex-col overflow-auto page-scrollbar">
                <Header />
                <div className={mainClass}>{children}</div>
                <ConnectWalletProvider />
                <NotificationModal />
            </div>
        </div>
    );
}
