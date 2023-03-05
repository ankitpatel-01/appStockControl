import { YarnType } from "./yarn-type.model";

export class Quality {
    id: number;
    quality_desc: string;
    type: YarnType;

    constructor(quality_desc: string, type: YarnType, id: number) {
        this.id = id;
        this.quality_desc = quality_desc;
        this.type = type;
    }
}

export class CreateQualityDto {
    quality_desc: string;
    type: number;

    constructor(quality_desc: string, type: number) {
        this.quality_desc = quality_desc;
        this.type = type;
    }
}

export class UpdateQualityDto {
    id: number;
    quality_desc: string;
    type: number;

    constructor(quality_desc: string, type: number, id: number) {
        this.id = id;
        this.quality_desc = quality_desc;
        this.type = type;
    }
}