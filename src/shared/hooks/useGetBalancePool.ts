import { getPoolAddressContract, getPoolAmountContract } from '@/contracts';
import { useReadContract } from 'thirdweb/react';
import { useGlobalStore } from '../store';

export default function useGetBalancePool(tokenOut: string) {
    const { chain } = useGlobalStore();

    // get getPoolAddress
    const { data: poolAddress } = useReadContract({
        contract: getPoolAddressContract(chain),
        method: 'getPoolAddress',
    });

    // get balance pool
    const { data: poolAmount } = useReadContract({
        contract: getPoolAmountContract(chain, tokenOut),
        method: 'balanceOf',
        params: [poolAddress],
        queryOptions: {
            enabled: Boolean(poolAddress && tokenOut),
        },
    });

    return { poolAmount };
}
