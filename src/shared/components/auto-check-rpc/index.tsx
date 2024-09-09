import { useQuery } from '@tanstack/react-query';
import { getResultRpc } from '@/services/get-result-rpc';
import { defineChain } from 'thirdweb/chains';
import { defaultChain } from '@/configs/thirdweb/defineChain';
import { useEffect, useState } from 'react';
import { useGlobalStore } from '../../store';

const env_app = process.env.NEXT_PUBLIC_APP_ENV;

const defineRpc: { [key: string]: string[] } = {
    development: ['https://eth-sepolia.public.blastapi.io', 'https://rpc.sepolia.org'],
    production: ['https://eth-mainnet.public.blastapi.io', 'https://eth.api.onfinality.io/public'],
};

const rpcs = defineRpc[env_app ?? 'development'] ?? defineRpc.development;

export default function AutoCheckRpc() {
    const { chain, setChain } = useGlobalStore();

    const [rpcIndex, setRpcIndex] = useState(0);

    const params = { jsonrpc: '2.0', method: 'eth_blockNumber', params: [], id: 1 };
    const newChain = defineChain({ ...defaultChain, rpc: rpcs[rpcIndex] });

    const { data: rpcResult, status } = useQuery({
        queryKey: ['get_rpc_result', chain.rpc],
        queryFn: () => getResultRpc(chain.rpc, params),
        select: (data) => data,
        enabled: Boolean(chain),
    });

    useEffect(() => {
        if (rpcIndex === rpcs?.length - 1 || status === 'pending') return;
        if (rpcResult && status === 'success') return;

        setChain(newChain);
        setRpcIndex(rpcIndex + 1);
    }, [rpcResult]);

    return null;
}
