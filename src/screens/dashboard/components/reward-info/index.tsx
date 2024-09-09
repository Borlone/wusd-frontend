import Image from 'next/image';

const RewardInfo = ({ apy, reward }: { apy?: string; reward: string }) => {
    return (
        <div className="component-box flex justify-center flex-col w-full">
            <div className="flex items-center gap-1">
                <p className="text-gray-300 whitespace-nowrap component-text-body-medium laptop:component-text-callout-medium">
                    Total Rewards <span className="font-bold text-white mobile:hidden">(APY: {apy}%)</span>
                </p>
            </div>
            <div className="flex items-center gap-2 mt-1">
                <div className="flex laptop:hidden">
                    <Image src="/images/WUSD.png" alt="" width={24} height={24} />
                </div>
                <div className="hidden laptop:flex">
                    <Image src="/images/WUSD.png" alt="" width={36} height={36} />
                </div>
                <p className="component-text-title-3-emphasized laptop:component-text-large-title-emphasized">{reward}</p>
            </div>
        </div>
    );
};

export default RewardInfo;
