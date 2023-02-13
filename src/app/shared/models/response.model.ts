import { PaginationMetaData } from "./api-response.model";

export class PaginateResponse<T> {
    public data: T;
    public meta?: PaginationMetaData;

    constructor(
        data: T,
        meta?: PaginationMetaData,
    ) {
        this.data = data;
        this.meta = meta;
    }
}