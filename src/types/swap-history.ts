export interface ICreateSwapInfoRequest {
    amount: string;
    tokenAddress: string;
    address: string;
}

export interface ICreateSwapHistoryRequest {
    txHash: string;
}
