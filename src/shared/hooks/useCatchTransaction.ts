import { useEffect, useState } from 'react';
import { client } from '@/configs/thirdweb/client';
import { useWatchTransactions } from '@thirdweb-dev/react';
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react';
import { getRpcClient, eth_getTransactionReceipt } from 'thirdweb/rpc';
import { TransactionReceipt } from 'viem';
import { txEvent } from '@/types/tx-event';
import { useGlobalStore } from '../store';

type TransactionResult = {
    receipt?: TransactionReceipt;
};

export default function useCatchTransaction(txHash?: `0x${string}`, processEvent?: string) {
    const activeChain = useActiveWalletChain();
    const account = useActiveAccount();
    const { chain } = useGlobalStore();

    const [prevTrans, setPrevTrans] = useState<any[]>([]);
    const [result, setResult] = useState<TransactionResult>({ receipt: undefined });

    const transactions = useWatchTransactions({
        address: account?.address,
        network: activeChain?.name,
    });

    const checkTransaction = async (txHash?: `0x${string}`) => {
        setPrevTrans(transactions);

        // get transaction in processing
        const processingTx = transactions?.find((tx) => tx.hash === txHash) ?? transactions[0];

        const rpcRequest = getRpcClient({ client, chain });
        const tranReceipt = await eth_getTransactionReceipt(rpcRequest, {
            hash: processingTx?.hash as `0x${string}`,
        });

        setResult({ receipt: tranReceipt });
    };

    useEffect(() => {
        // check if account is available, only watch the transaction for actived wallet
        // with Swap event, need 'txHash' for get the transaction
        if (!account || (processEvent === txEvent.SWAP && !txHash)) return;

        // if no have a new transaction, then no action
        if (transactions.length <= prevTrans?.length) return;

        // check transaction for success or fail
        checkTransaction(txHash);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, txHash, transactions, processEvent]);

    return result;
}
