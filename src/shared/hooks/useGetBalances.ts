import { getAllowance, getPoolAmountContract } from '@/contracts';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { useGlobalStore } from '../store';
import { contractInfo } from '@/contracts';

const SWAP_ADDRESS = contractInfo.SWAP_ADDRESS;

export default function useGetBalances(tokenIn: string, tokenOut: string) {
    const account = useActiveAccount();
    const { chain } = useGlobalStore();

    // get balance pool
    const { data: amountIn, refetch: refetchAmountIn } = useReadContract({
        contract: getPoolAmountContract(chain, tokenIn),
        method: 'balanceOf',
        params: [account?.address],
        queryOptions: {
            enabled: Boolean(account),
        },
    });

    // get allowance
    const { data: maxAllowance, refetch: refetchAllowance } = useReadContract({
        contract: getAllowance(chain, tokenIn),
        method: 'allowance',
        params: [account?.address, SWAP_ADDRESS],
        queryOptions: {
            enabled: Boolean(account),
        },
    });

    const { data: amountOut } = useReadContract({
        contract: getPoolAmountContract(chain, tokenOut),
        method: 'balanceOf',
        params: [account?.address],
        queryOptions: {
            enabled: Boolean(account),
        },
    });

    return { amountIn, amountOut, maxAllowance, refetchAmountIn, refetchAllowance };
}
