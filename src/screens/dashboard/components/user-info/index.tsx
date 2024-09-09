import CopyString from '@/shared/base-ui/copy';
import NumberDisplay from '@/shared/components/number-display';
import ImportToken from '@/shared/components/thirdweb/ImportToken';
import { useGlobalStore } from '@/shared/store';
import { shorthandString } from '@/shared/utils';
import Image from 'next/image';
import { useMemo } from 'react';
import { useActiveAccount } from 'thirdweb/react';

const UserInfo = ({ balance }: { balance: number }) => {
    const account = useActiveAccount();
    const { userInfo } = useGlobalStore();

    const link = useMemo(() => {
        if (!userInfo || !userInfo.referralCode) return '';
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        const baseUrl = `${url.origin}`;
        return `${baseUrl}/#${userInfo.referralCode}`;
    }, [userInfo]);

    return (
        <div className="component-box flex-1 max-w-[100%] laptop:max-w-[50%] laptop:min-w-[50%]">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4 component-text-body-medium laptop:component-text-callout-medium">
                    <p className="text-gray-300 min-w-[108px] laptop:min-w-[123px]">Wallet Balance:</p>
                    <div className="flex items-center gap-2 w-full overflow-hidden">
                        <Image src="/images/WUSD.png" alt="" width={24} height={24} />
                        <NumberDisplay number={balance} className="text-white component-text-callout-emphasized" />
                        <div className="block mobile:hidden ml-2">{account ? <ImportToken /> : null}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 component-text-body-medium laptop:component-text-callout-medium">
                    <p className="text-gray-300 min-w-[108px] laptop:min-w-[123px] leading-6">Address:</p>
                    <div className="flex items-center gap-3">
                        <span className="text-white component-text-body-medium leading-6 hidden mobile:block laptop:block s_desktop:hidden">
                            {account?.address ? shorthandString(account?.address, 4, 4) : '--'}
                        </span>
                        <span className="text-white component-text-body-medium leading-6 mobile:hidden laptop:hidden s_desktop:block">
                            {account?.address || '--'}
                        </span>
                        <CopyString text={account?.address ?? ''} />
                    </div>
                </div>
                <div className="flex items-center gap-4 component-text-body-medium laptop:component-text-callout-medium">
                    <p className="text-gray-300 min-w-[108px] laptop:min-w-[123px] leading-6">Referral Code:</p>
                    <div className="flex items-center gap-3 iphone:gap-1">
                        <span className="text-white component-text-body-medium leading-6">{userInfo?.referralCode || '--'}</span>
                        <CopyString text={userInfo?.referralCode!} />
                    </div>
                </div>
                <div className="flex items-center gap-4 component-text-body-medium laptop:component-text-callout-medium">
                    <p className="text-gray-300 min-w-[108px] laptop:min-w-[123px] leading-6">Referral Link:</p>
                    <div className="flex items-center gap-3 iphone:gap-1 overflow-hidden">
                        <span className="text-white component-text-body-medium hidden mobile:block laptop:block s_desktop:hidden leading-6">
                            {shorthandString(link, 8, 6)}
                        </span>
                        <span className="text-white component-text-body-medium mobile:hidden laptop:hidden s_desktop:block leading-6">
                            {link || '--'}
                        </span>
                        <CopyString text={link!} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
