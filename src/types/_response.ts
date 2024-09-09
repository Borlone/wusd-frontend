export class ResponseData<T> {
    success!: boolean;
    error?: any;
    data!: T;
}

export class DefaultListDataResponse<T> {
    data!: T[];
}

interface IPaginationResponse {
    total: number;
    limit: number;
    page: number;
    total_pages: number;
}

export class PaginationDataResponse<T> extends DefaultListDataResponse<T> {
    pagination!: IPaginationResponse;
}
