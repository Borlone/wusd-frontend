import { postData } from '@/shared/utils/api';
import { RPCRequest, RPCResponse } from '@/types/rpc-types';
import { get } from 'lodash';

export async function getResultRpc(rpc: string, params: RPCRequest) {
    const response = await postData<RPCRequest, RPCResponse>(rpc, params);

    return get(response, ['result'], null);
}
