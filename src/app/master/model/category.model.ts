export class Category {
    id?: number;
    category_desc: string;

    constructor(category_desc: string, id?: number) {
        this.id = id;
        this.category_desc = category_desc;
    }
}