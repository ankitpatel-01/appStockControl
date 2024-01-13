export interface CompanyBranchList {
    id: number;
    name: string;
    address1: string;
    address2?: string | null;
    address3?: string | null;
    city: string;
}