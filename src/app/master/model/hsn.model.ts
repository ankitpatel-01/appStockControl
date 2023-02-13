import { Gst } from "./gst.model";

export class Hsn {
    id?: number;
    hsn_desc: string;
    hsn_code: number;
    hsn_type: number;
    gst: Gst | number;

    constructor(
        hsn_desc: string,
        hsn_code: number,
        hsn_type: number,
        gst: Gst | number,
        id?: number,
    ) {
        this.id = id;
        this.hsn_desc = hsn_desc;
        this.hsn_code = hsn_code;
        this.hsn_type = hsn_type;
        this.gst = gst;
    }
}