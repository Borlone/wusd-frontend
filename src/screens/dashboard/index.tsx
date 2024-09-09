import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { contractInfo, getDecimals, getPoolAmountContract } from '@/contracts';
import { getMonthlyRewards } from '@/services/monthly-reward';
import { getMaxAmount, formatReward } from '@/shared/utils/function';
import { useGlobalStore } from '@/shared/store';
import DashboardTable from './components/dashboard-table';
import UserInfo from './components/user-info';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import RewardInfo from './components/reward-info';
import PointInfo from './components/point-info';

const { WUSD_TOKEN } = contractInfo;

export default function Dashboard() {
    const account = useActiveAccount();

    const { userInfo, chain } = useGlobalStore();

    const { data: amountWUSD } = useReadContract({
        contract: getPoolAmountContract(chain, WUSD_TOKEN),
        method: 'balanceOf',
        params: [account?.address],
    });

    const { data: decimals } = useReadContract({
        contract: getDecimals(chain, WUSD_TOKEN),
        method: 'decimals',
    });

    const { data: monthlyRewardList, isLoading: loadingMonthlyRewardList } = useQuery({
        queryKey: ['monthly-reward-list', userInfo, chain, account],
        queryFn: () => getMonthlyRewards(chain?.id || 0),
        enabled: !!userInfo && !!chain && !!account,
    });

    const monthlyRewards = useMemo(() => {
        return (monthlyRewardList || []).map((reward: any, index: number) => ({
            ...reward,
            index: index,
        }));
    }, [monthlyRewardList]);

    const rewardTotal = monthlyRewards?.reduce((acc: any, reward: any) => acc + reward?.amountReward, 0) || 0;
    const rewardNum = formatReward(rewardTotal) ?? '0';

    const maxAmountWUSD = getMaxAmount(amountWUSD, decimals);

    return (
        <>
            <div className="w-full h-full pb-4 flex flex-col laptop:py-4 px-4 laptop:px-6">
                <div className="flex flex-col laptop:flex-row laptop:space-x-6">
                    <UserInfo balance={maxAmountWUSD} />
                    <div className="flex gap-4 laptop:gap-6 mt-4 laptop:mt-0 w-full">
                        <RewardInfo apy={Number(userInfo?.apyRate || 0).toFixed()} reward={rewardNum} />
                        <PointInfo />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="component-text-callout-emphasized laptop:component-text-title-2-emphasized text-white mt-4 laptop:mt-6">
                        Rewards Earned
                    </p>
                    <p className="component-text-callout-emphasized laptop:component-text-title-2-emphasized text-white mt-4 laptop:mt-6 mobile:block hidden">
                        APY: {Number(userInfo?.apyRate || 0).toFixed()}%
                    </p>
                </div>
                <DashboardTable data={monthlyRewards} loading={loadingMonthlyRewardList} />
            </div>
        </>
    );
}
