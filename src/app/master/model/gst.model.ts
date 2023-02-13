export class Gst {
    id?: number;
    gst_desc: string;
    gst_rate: number;
    igst: number;
    sgst: number;
    cgst: number;

    constructor(
        gst_desc: string,
        gst_rate: number,
        igst: number,
        sgst: number,
        cgst: number,
        id: number) {

        this.id = id;
        this.gst_desc = gst_desc;
        this.gst_rate = gst_rate;
        this.igst = igst;
        this.sgst = sgst;
        this.cgst = cgst;
    }
}