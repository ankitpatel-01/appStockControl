export class LocationMaster {
    id: number;
    location_name: string;
    factory_name: string;
    factory_city: string;

    constructor(location_name: string, factory_name: string, factory_city: string, id: number) {
        this.id = id;
        this.location_name = location_name;
        this.factory_name = factory_name;
        this.factory_city = factory_city;
    }
}

export class CreateLocationMasterDto {
    location_name: string;
    factory_name: string;
    factory_city: string;

    constructor(location_name: string, factory_name: string, factory_city: string) {
        this.location_name = location_name;
        this.factory_name = factory_name;
        this.factory_city = factory_city;
    }
}

export class UpdateLocationMasterDto {
    id: number;
    location_name: string;
    factory_name: string;
    factory_city: string;

    constructor(location_name: string, factory_name: string, factory_city: string, id: number) {
        this.id = id;
        this.location_name = location_name;
        this.factory_name = factory_name;
        this.factory_city = factory_city;
    }
}