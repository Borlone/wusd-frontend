import { getSymbolContract } from '@/contracts';
import { useReadContract } from 'thirdweb/react';
import { useGlobalStore } from '../store';

export default function useGetSymbols(tokenIn: string, tokenOut: string) {
    const { chain } = useGlobalStore();

    const { data: symbolIn } = useReadContract({
        contract: getSymbolContract(chain, tokenIn),
        method: 'symbol',
        queryOptions: {
            enabled: Boolean(tokenIn),
        },
    });

    const { data: symbolOut } = useReadContract({
        contract: getSymbolContract(chain, tokenOut),
        method: 'symbol',
        queryOptions: {
            enabled: Boolean(tokenOut),
        },
    });

    return { symbolIn, symbolOut };
}
