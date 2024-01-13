export class Unit {
    id: number;
    unit_name: string;
    unit_desc: string;

    constructor(unit_name: string, unit_desc: string, factory_city: string, id: number) {
        this.id = id;
        this.unit_name = unit_name;
        this.unit_desc = unit_desc;
    }
}

export class CreateUnitDto {
    unit_name: string;
    unit_desc: string;

    constructor(unit_name: string, unit_desc: string) {
        this.unit_name = unit_name;
        this.unit_desc = unit_desc;
    }
}

export class UpdateUnitDto {
    id: number;
    unit_name: string;
    unit_desc: string;

    constructor(unit_name: string, unit_desc: string, factory_city: string, id: number) {
        this.id = id;
        this.unit_name = unit_name;
        this.unit_desc = unit_desc;
    }
}