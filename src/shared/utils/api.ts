import { ResponseData } from '@/types/_response';
import axios, { AxiosResponse, AxiosInstance } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

class ApiClient {
    baseURL: string;
    tokenType: string;

    constructor(baseURL?: string, tokenType?: string) {
        this.baseURL = baseURL || BASE_URL || '';
        this.tokenType = tokenType || 'Authorization';
    }

    getInstance() {
        const api: AxiosInstance = axios.create({
            baseURL: `${this.baseURL}/v1`,
            timeout: 30000,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        api.interceptors.request.use(
            (config: any) => {
                const token = localStorage.getItem('token') ?? '';
                if (token) {
                    config.headers[this.tokenType] = token;
                }
                return config;
            },
            (error: Error) => {
                return Promise.reject(error);
            },
        );

        api.interceptors.response.use(
            (response: AxiosResponse) => {
                return response.data;
            },
            (error: any) => {
                return error?.response?.data;
            },
        );
        return api;
    }
}

export const api = new ApiClient().getInstance();

export async function fetchData<T, R>(path: string, params?: T): Promise<ResponseData<R>> {
    const response = await api.get<T, ResponseData<R>>(path, {
        params,
    });

    return response;
}

export async function postData<T, R>(path: string, body?: T): Promise<ResponseData<R>> {
    const response = await api.post<T, ResponseData<R>>(path, body);

    return response;
}

export default ApiClient;
