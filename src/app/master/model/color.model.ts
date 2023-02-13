export class Color {
    id?: number;
    color_desc: string;
    color_code: string;

    constructor(color_desc: string, color_code: string, id?: number) {
        this.id = id;
        this.color_desc = color_desc;
        this.color_code = color_code;
    }
}