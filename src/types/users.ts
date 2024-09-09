export interface IUserResponse {
    id: number;

    username: string;

    email: string;

    emailVerified: boolean;

    walletAddress: string;

    referralCode: string;

    apyRate: number;

    score: number;
}

export type LoginPayload = {
    domain: string;
    address: string;
    statement: string;
    uri?: string;
    version: string;
    chain_id?: string;
    nonce: string;
    issued_at: string;
    expiration_time: string;
    invalid_before: string;
    resources?: string[];
};

export interface ILoginPayloadDto extends LoginPayload {
    domain: string;

    address: string;

    statement: string;

    uri?: string;

    version: string;

    chain_id?: string;

    nonce: string;

    issued_at: string;

    expiration_time: string;

    invalid_before: string;

    resources?: string[];
}

export interface ILoginUserRequest {
    payload: ILoginPayloadDto;

    signature: string;
}

export interface IGetPayloadParams {
    address: string;

    chainId: string;
}
