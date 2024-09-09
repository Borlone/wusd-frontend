import { fetchData, postData } from '@/shared/utils/api';
import { ResponseData } from '@/types/_response';
import { IGetPayloadParams, ILoginPayloadDto, ILoginUserRequest, IUserResponse } from '@/types/users';
import { get } from 'lodash';

const PATH = 'users';

export async function getInfoUser() {
    try {
        const response = await fetchData<any, IUserResponse>(`${PATH}/me`);

        return get(response, ['data'], null) as IUserResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function checkUserLoggedIn() {
    const response = await fetchData<any, boolean>(`${PATH}/isLoggedIn`);

    return response;
}

export async function getInfoUserByWallet(wallet_id: string) {
    const response = await fetchData<any, IUserResponse>(`${PATH}/${wallet_id}`);

    return response;
}

export async function verifyReferal({ referral_code }: { referral_code: string }) {
    try {
        const response = await postData<
            { referral_code: string },
            {
                accessToken: string;
                user: IUserResponse;
            }
        >(`${PATH}/referralcode`, { referral_code });

        return get(response, ['success'], false);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function loginUser(request: ILoginUserRequest) {
    try {
        const response = await postData<
            ILoginUserRequest,
            {
                accessToken: string;
                user: IUserResponse;
            }
        >(`${PATH}/login`, request);

        return get(response, ['data'], null);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getPayload(params: IGetPayloadParams) {
    try {
        const response = await fetchData<IGetPayloadParams, ILoginPayloadDto>(`${PATH}/login`, params);

        return get(response, ['data'], null);
    } catch (error) {
        return Promise.reject(error);
    }
}
