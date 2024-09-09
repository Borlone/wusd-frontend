import Image from 'next/image';
import { createWallet, WalletId, injectedProvider } from 'thirdweb/wallets';
import { client } from '@/configs/thirdweb/client';
import { useConnect } from 'thirdweb/react';
import GradientButton from '@/shared/base-ui/gradient-button';
import { signWallet } from '@/shared/utils/sign-wallet-signature';
import { useGlobalStore } from '@/shared/store';

type Props = {
    wallet: {
        id: WalletId;
        name: string;
        logo: string;
    };
    className?: string;
};

export default function WalletButton({ wallet, className }: Props) {
    const { connect } = useConnect();
    const { chain } = useGlobalStore();

    const getProviderId = (walletId: string): string | null => {
        const providers: any = {
            'org.uniswap.app': 'org.uniswap',
            'https://www.safepal.com/download': 'com.safepal',
        };
        return providers[walletId] ?? '';
    };

    const handleConnectWallet = async () => {
        await connect(async () => {
            // @ts-ignore
            const providerId: any = getProviderId(wallet.id);
            if (providerId && !injectedProvider(wallet.id)) {
                const walletCn = createWallet(providerId);
                await walletCn.connect({
                    client,
                    chain,
                    walletConnect: providerId !== wallet.id ? { showQrModal: true } : {},
                });
                await signWallet(walletCn?.getAccount());
                return walletCn;
            }
            const walletCn = createWallet(wallet.id);
            await walletCn.connect({
                client,
                chain,
                showQrModal: wallet.id === 'walletConnect' ? true : undefined,
            });
            await signWallet(walletCn?.getAccount());

            return walletCn;
        });
    };

    const transferName = (name: string) => {
        let result = name;

        if (name.length >= 15) {
            const temp = name.split(' ');
            if (temp.length > 1) {
                return temp[0];
            }
        }

        return result;
    };

    return (
        <GradientButton className={`h-[50px] ${className}`} onClick={handleConnectWallet}>
            <div className="flex items-center gap-3 px-4 py-1">
                <Image alt="wallet" className="rounded-md" src={wallet.logo} quality={100} width={30} height={30} />
                <p className="text-white text-[18px] leading-[32px] font-medium truncate w-[140px]">{transferName(wallet.name)}</p>
            </div>
        </GradientButton>
    );
}
