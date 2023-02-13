export class YarnType {
    id?: number;
    type_desc: string;
    type: string;
    count_type: string;

    constructor(type_decs: string, type: string, count_type: string, id?: number) {
        this.id = id;
        this.type_desc = type_decs;
        this.type = type;
        this.count_type = count_type;
    }
}