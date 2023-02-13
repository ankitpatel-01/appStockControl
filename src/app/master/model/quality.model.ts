import { YarnType } from "./yarn-type.model";

export class Quality {
    id?: number;
    quality_desc: string;
    type: YarnType | number;

    constructor(quality_desc: string, type: number | YarnType, id?: number) {
        this.id = id;
        this.quality_desc = quality_desc;
        this.type = type;
    }
}