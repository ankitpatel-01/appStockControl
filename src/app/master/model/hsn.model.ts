import { Gst } from "./gst.model";

export class Hsn {
    id: number;
    hsn_desc: string;
    hsn_code: number;
    hsn_type: number;
    gst: Gst;

    constructor(
        hsn_desc: string,
        hsn_code: number,
        hsn_type: number,
        gst: Gst,
        id: number,
    ) {
        this.id = id;
        this.hsn_desc = hsn_desc;
        this.hsn_code = hsn_code;
        this.hsn_type = hsn_type;
        this.gst = gst;
    }
}

export class CreateHsnDto {
    hsn_desc: string;
    hsn_code: number;
    hsn_type: number;
    gst_id: number;

    constructor(
        hsn_desc: string,
        hsn_code: number,
        hsn_type: number,
        gst_id: number,
    ) {
        this.hsn_desc = hsn_desc;
        this.hsn_code = hsn_code;
        this.hsn_type = hsn_type;
        this.gst_id = gst_id;
    }
}

export class UpdateHsnDto {
    id: number;
    hsn_desc: string;
    hsn_code: number;
    hsn_type: number;
    gst_id: number;

    constructor(
        id: number,
        hsn_desc: string,
        hsn_code: number,
        hsn_type: number,
        gst_id: number,
    ) {
        this.id = id;
        this.hsn_desc = hsn_desc;
        this.hsn_code = hsn_code;
        this.hsn_type = hsn_type;
        this.gst_id = gst_id;
    }
}