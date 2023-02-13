export class APIResponse<T> {
    public statusCode: number;
    public message: string;
    public data: T;
    public meta?: PaginationMetaData;

    constructor(
        statusCode: number,
        message: string,
        data: T,
        meta?: PaginationMetaData,
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }
}

export class PaginationMetaData {
    current_page: number;
    total_pages: number;
    per_page: number;
    total_items: number;
}
