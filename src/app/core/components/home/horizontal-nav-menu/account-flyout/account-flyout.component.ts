import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyBranchList } from 'src/app/core/models/company-branch.model';
import { UserProfile } from 'src/app/core/models/user-profile.model';

@Component({
  selector: 'app-account-flyout',
  templateUrl: './account-flyout.component.html',
  styles: [
    ':host { height: 100%; }',
  ]
})
export class AccountFlyoutComponent implements OnInit {

  private _userProfile: UserProfile;
  public get userProfile(): UserProfile {
    return this._userProfile;
  }
  @Input() public set userProfile(v: UserProfile | null) {
    if (v)
      this._userProfile = v;
  }


  private _companyBranchList: CompanyBranchList[];
  public get companyBranchList(): CompanyBranchList[] {
    return this._companyBranchList;
  }
  @Input() public set companyBranchList(v: CompanyBranchList[] | null) {
    if (v)
      this._companyBranchList = v;
  }

  private _selectedBranch: CompanyBranchList;
  public get selectedBranch(): CompanyBranchList {
    return this._selectedBranch;
  }
  @Input() public set selectedBranch(v: CompanyBranchList | undefined) {
    if (v)
      this._selectedBranch = v;
  }

  @Output() cancel: EventEmitter<Event>;
  @Output() signOut: EventEmitter<Event>;

  constructor() {
    this.cancel = new EventEmitter<Event>();
    this.signOut = new EventEmitter<Event>();
  }

  ngOnInit(): void {
  }

  close() {
    this.cancel.emit();
  }

  logout() {
    this.signOut.emit();
  }

}
