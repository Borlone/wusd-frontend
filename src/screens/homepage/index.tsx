/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Button from '@mui/material/Button';
import ReferralForm from './components/referral';
import { Diamond, LineIcon, SmallLineIcon, SmallDiamond } from '@/shared/icons';

export default function Homepage() {
    return (
        <section className="pb-8 laptop:py-0 flex flex-col laptop:flex-row tablet:justify-center laptop:items-center px-4 tablet:px-[40px] laptop:px-[56px] desktop:px-[82px]">
            <div className="mt-[3rem] tablet:mt-[6rem]">
                <LineIcon className="hidden tablet:block" />
                <SmallLineIcon className="tablet:hidden" />
                <div className="w-[356px] iphone:w-full tablet:w-[600px] laptop:w-[510px] desktop:w-[842px] mt-4 relative">
                    <h1 className="text-white font-[600] flex flex-col">
                        <span className="flex items-end w-fit gap-2 tablet:gap-4">
                            <span className="text-[54px] leading-[54px] iphone:text-[44px] leading:text-[44px] tablet:text-[80px] tablet:leading-[88px] laptop:leading-[94px] desktop:leading-[100px] desktop:text-[100px]">
                                Hold
                            </span>
                            <span className="border-white border-[2px] py-2 border-solid rounded-full bg-clip-text bg-btn text-transparent bg-homepage-wrapper w-fit iphone:px-2 tablet:px-5 px-4 overflow-hidden">
                                <span className="px-3 iphone:px-1 text-[54px] leading-[54px] iphone:text-[48px] leading:text-[48px] tablet:text-[100px] tablet:leading-[88px] laptop:leading-[94px] desktop:leading-[120px] desktop:text-[140px]">
                                    WUSD
                                </span>
                            </span>
                        </span>
                        <span className="mb-[.5rem] ml-[20px] flex gap-2 tablet:gap-4">
                            <span className="text-[54px] iphone:text-[44px] leading:text-[44px] tablet:text-[80px] tablet:leading-[88px] laptop:leading-[94px] desktop:leading-[120px] desktop:text-[100px]  tablet:mb-[1rem] tablet:ml-[50px] laptop:ml-[64px] desktop:ml-[93px]">
                                to get
                            </span>
                            <div className="relative">
                                <Diamond className="hidden tablet:block absolute top-[15px]" />
                                <SmallDiamond className="tablet:hidden absolute top-[6px]" />
                            </div>
                        </span>
                        <span className="border-white border-[2px] py-2 border-solid rounded-full bg-clip-text bg-btn text-transparent bg-homepage-wrapper w-fit iphone:px-2 tablet:px-5 px-4 overflow-hidden">
                            <span className="px-3 iphone:px-1 text-[54px] leading-[54px] iphone:text-[48px] leading:text-[48px] tablet:text-[100px] tablet:leading-[88px] laptop:leading-[94px] desktop:leading-[120px] desktop:text-[140px]">
                                Rewards
                            </span>
                        </span>
                    </h1>
                </div>

                <div className="mt-4">
                    <p className="text-white text-[34px] mobile:text-[18px] mobile:leading-[28px] leading-[41px] laptop:text-[30px] laptop:leading-[41px]">
                        No staking required
                    </p>
                </div>

                <Link href="/swap" className="no-underline">
                    <Button className="mt-4 laptop:mt-6 w-[140px] component-btn">LAUNCH APP</Button>
                </Link>
            </div>

            <ReferralForm />
        </section>
    );
}
