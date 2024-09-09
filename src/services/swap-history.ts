import { postData } from '@/shared/utils/api';
import { ICreateSwapHistoryRequest } from '@/types/swap-history';

const PATH = 'swap-history';

export async function createSwapHistory(data: ICreateSwapHistoryRequest) {
    const response = await postData<ICreateSwapHistoryRequest, void>(`${PATH}`, data);

    return response;
}
