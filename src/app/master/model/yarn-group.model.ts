export class YarnGroup {
    id?: number;
    yarn_grp_name: string;

    constructor(yarn_grp_name: string, id?: number) {
        this.id = id;
        this.yarn_grp_name = yarn_grp_name;
    }
}