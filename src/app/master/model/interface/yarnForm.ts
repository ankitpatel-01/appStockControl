import { YarnGryDyeEnum } from "../../constants/enums/yarn-gry-dye.enum";

export interface YarnForm {
    yarn_code: string;
    yarn_desc: string;
    yarn_type: number;
    yarn_ply: number;
    yarn_count: number;
    yarn_qly: number;
    yarn_twist: string;
    yarn_color: number;
    eng_count: number;
    denier: number;
    gry_dye: YarnGryDyeEnum;
    yarn_category: number;
    yarn_group: number;
    hsn_code: number;
    yarn_rate: number;
}