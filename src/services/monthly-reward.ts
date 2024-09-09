import { fetchData } from '@/shared/utils/api';
import { DefaultListDataResponse } from '@/types/_response';
import { IMonthlyReward } from '@/types/monthly-reward';
import { get } from 'lodash';

const PATH = 'monthly-reward';

export async function getMonthlyRewards(chainId: number) {
    try {
        const response = await fetchData<any, DefaultListDataResponse<IMonthlyReward>>(`${PATH}/chain/${chainId}`);
        return get(response.data, ['data'], []);
    } catch (error) {
        return Promise.reject(error);
    }
}
