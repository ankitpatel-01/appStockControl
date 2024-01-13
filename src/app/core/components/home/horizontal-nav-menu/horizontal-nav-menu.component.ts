import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
// ------------------------------------------------------------------------------------
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
// ------------------------------------------------------------------------------------
import { CompanyBranchList } from 'src/app/core/models/company-branch.model';
import { UserProfile } from 'src/app/core/models/user-profile.model';

/**
 * Component to display a horizontal navigation menu
 */
@Component({
  selector: 'app-horizontal-nav-menu',
  templateUrl: './horizontal-nav-menu.component.html'
})
export class HorizontalNavMenuComponent implements OnInit, OnDestroy {

  /** Flag to show/hide the dropdown menu */
  showDropdown = true;


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



  @Output() accountFlyout: EventEmitter<Event>;
  @Output() closeAllFlyout: EventEmitter<Event>;


  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _router: Router,
  ) {
    this.accountFlyout = new EventEmitter<Event>();
    this.closeAllFlyout = new EventEmitter<Event>();
  }


  /**
   * Initialize the component and subscribe to the router events to show/hide the dropdown menu
   */
  ngOnInit(): void {
    this._router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      // hide the dropdown when the route changes
      if (event instanceof NavigationStart) {
        this.showDropdown = false;
        this.closeAllFlyout.emit();
      } else {
        setTimeout(() => {
          this.showDropdown = true;
        }, 100);
      }
    });


  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Check if the current route is active
   * @param url - The URL to match against
   * @param matchExact - Whether to match the entire URL or just the beginning. Defaults to false.
   * @returns true if the URL matches the current route, false otherwise
   */
  isActive(url: string, matchExact = false): boolean {
    return this._router.isActive(url, matchExact);
  }

  accountFlyoutClicked() {
    this.accountFlyout.emit()
  }

}
