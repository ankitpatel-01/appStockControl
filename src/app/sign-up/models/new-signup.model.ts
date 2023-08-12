export class SignUpDTO {
    company_details: Companydetails;
    user_details: Userdetails;
}

export class Userdetails {
    first_name: string;
    middle_name: string;
    last_name: string;
    username: string;
    password: string;
}

export class Companydetails {
    company_name: string;
    trading_name: string;
    company_short_name: string;
    company_type: number;
    address_details: Addressdetails;
    contact_details: Contactdetails;
    taxation_details: Taxationdetails;
    bank_details: Bankdetails;
}

export class Bankdetails {
    bank_name: string;
    branch_name: string;
    ifsc_code: string;
    account_no: number;
}

export class Taxationdetails {
    pan_no: string;
    gst_no: string;
    cin_no: string;
    opening_date: string;
    to_date: string;
    from_date: string;
}

export class Contactdetails {
    mobile1: number;
    mobile2: number;
    tel_no: number;
    fax_no: number;
    email: string;
    website: string;
}

export class Addressdetails {
    address1: string;
    address2: string;
    address3: string;
    country_id: number;
    state_id: number;
    city_name: string;
    pincode: number;
}