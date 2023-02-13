import { YarnGryDyeEnum } from "../constants/enums/yarn-gry-dye.enum";

export class CreateYarnDto {

    yarn_code: string;
    yarn_desc: string;
    yarn_type_id: number;
    ply: number;
    rate: number;
    count: number;
    eng_count: number;
    denier: number;
    quality_id: number;
    twist: string;
    color_id: number;
    gryOrGey: YarnGryDyeEnum;
    ctgr_id: number;
    group_id: number;
    hsn_id: number;

    constructor(
        yarn_code: string,
        yarn_desc: string,
        yarn_type_id: number,
        ply: number,
        rate: number,
        count: number,
        eng_count: number,
        denier: number,
        quality_id: number,
        twist: string,
        color_id: number,
        gryOrGey: YarnGryDyeEnum,
        ctgr_id: number,
        group_id: number,
        hsn_id: number,
    ) {

        this.yarn_code = yarn_code;
        this.yarn_desc = yarn_desc;
        this.yarn_type_id = yarn_type_id;
        this.ply = ply;
        this.rate = rate;
        this.count = count;
        this.eng_count = eng_count;
        this.denier = denier;
        this.quality_id = quality_id;
        this.twist = twist;
        this.color_id = color_id;
        this.gryOrGey = gryOrGey;
        this.ctgr_id = ctgr_id;
        this.group_id = group_id;
        this.hsn_id = hsn_id;

    }
}

export class UpdateYarnDto {

    id: number;
    yarn_code: string;
    yarn_desc: string;
    yarn_type_id: number;
    ply: number;
    rate: number;
    count: number;
    eng_count: number;
    denier: number;
    quality_id: number;
    twist: string;
    color_id: number;
    gryOrGey: YarnGryDyeEnum;
    ctgr_id: number;
    group_id: number;
    hsn_id: number;

    constructor(
        id: number,
        yarn_code: string,
        yarn_desc: string,
        yarn_type_id: number,
        ply: number,
        rate: number,
        count: number,
        eng_count: number,
        denier: number,
        quality_id: number,
        twist: string,
        color_id: number,
        gryOrGey: YarnGryDyeEnum,
        ctgr_id: number,
        group_id: number,
        hsn_id: number,
    ) {

        this.id = id;
        this.yarn_code = yarn_code;
        this.yarn_desc = yarn_desc;
        this.yarn_type_id = yarn_type_id;
        this.ply = ply;
        this.rate = rate;
        this.count = count;
        this.eng_count = eng_count;
        this.denier = denier;
        this.quality_id = quality_id;
        this.twist = twist;
        this.color_id = color_id;
        this.gryOrGey = gryOrGey;
        this.ctgr_id = ctgr_id;
        this.group_id = group_id;
        this.hsn_id = hsn_id;

    }
}