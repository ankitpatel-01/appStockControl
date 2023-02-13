import { YarnGryDyeEnum } from "../constants/enums/yarn-gry-dye.enum";
import { Category } from "./category.model";
import { Color } from "./color.model";
import { Hsn } from "./hsn.model";
import { Quality } from "./quality.model";
import { YarnGroup } from "./yarn-group.model";
import { YarnType } from "./yarn-type.model";

export class YarnMaster {
    id: number;
    yarn_code: string;
    yarn_desc: string;
    yarn_type: YarnType;
    ply: number;
    rate: number;
    count: number;
    eng_count: number;
    denier: number;
    quality: Quality;
    twist: string;
    color: Color;
    gryOrDey: YarnGryDyeEnum;
    category: Category;
    group: YarnGroup;
    hsn: Hsn;
}