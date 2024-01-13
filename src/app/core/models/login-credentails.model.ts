import { CompanyBranchList } from "./company-branch.model";
import { Tokens } from "./token.model";
import { UserProfile } from "./user-profile.model";

export class LoginCredentials {
    username: string;
    password: string;
}

export class LoginRes {
    token: Tokens;
    companyBranchList: CompanyBranchList[];
    userProfile: UserProfile;
}