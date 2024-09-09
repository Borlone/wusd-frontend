export interface RPCResponse {
    id: number;
    jsonrpc: string;
    result?: string;
    error?: any;
}

export interface RPCRequest {
    id: number;
    jsonrpc: string;
    method: string;
    params: any[];
}
