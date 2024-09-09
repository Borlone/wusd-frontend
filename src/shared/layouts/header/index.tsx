import Image from 'next/image';
import { Accounts } from '@/shared/components/thirdweb';
import Link from 'next/link';
import { NavBarMobile, NavBarPc } from '../nav';

export default function Header() {
    return (
        <header className="bg-transparent w-full py-4 px-4 laptop:px-6 sticky z-40">
            <div className="bg-card backdrop-blur-[20px] component-border w-full rounded-2xl h-[64px] px-4 iphone:px-2 flex items-center justify-between">
                <div className="flex gap-[24px] mobile:!gap-3 items-center">
                    <Link href="/" className="no-underline cursor-pointer">
                        <div className="flex items-center">
                            <div className="hidden mobile:hidden laptop:flex">
                                <Image src="/images/swap_flow_pc.svg" alt="" width={180} height={42} />
                            </div>
                            <div className="flex mobile:hidden laptop:hidden">
                                <Image src="/images/swap_flow_pc.svg" alt="" width={155} height={36} />
                            </div>
                            <div className="hidden mobile:flex">
                                <Image src="/images/only_logo.svg" alt="" width={36} height={36} />
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="gap-16 max_tablet:gap-3 flex items-center">
                    <div className="mobile:hidden">
                        <NavBarPc />
                    </div>
                    <Accounts />
                    <NavBarMobile />
                </div>
            </div>
        </header>
    );
}
