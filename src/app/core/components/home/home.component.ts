import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FadeInOut } from 'src/app/animations/animation';
import { FlyoutComponent } from 'src/app/custom-components/flyout/flyout/flyout.component';
import { AccountFlyoutComponent } from './horizontal-nav-menu/account-flyout/account-flyout.component';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user-profile.model';
import { CompanyBranchList } from '../../models/company-branch.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    FadeInOut
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('flyout') flyout: FlyoutComponent;

  userProfile: UserProfile;
  companyBranchList: CompanyBranchList[];

  /** Subscription object to unsubscribe from the logout observable */
  logutSub: Subscription;
  selectedBranchId: number;
  selectedBranch: CompanyBranchList | undefined;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private _authService: AuthService,
    private _router: Router,
  ) { }
  ngOnInit(): void {
    this._prop();
  }


  /**
   * Unsubscribe from the logout observable to prevent memory leaks
   */
  ngOnDestroy(): void {
    this.logutSub?.unsubscribe();
  }

  accountFlyout() {
    // Create a factory for your custom component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AccountFlyoutComponent);

    // Create an instance of your custom component and pass in any inputs
    const componentRef = componentFactory.create(this.flyout.flyoutContainerRef.injector);

    // Attach the component to the flyout
    if (this.flyout.isFlyoutOpen()) {
      this.flyout.closeFlyout();
    } else {
      this.flyout.flyoutContainerRef.insert(componentRef.hostView);

      componentRef.instance.userProfile = this.userProfile;
      componentRef.instance.companyBranchList = this.companyBranchList;
      componentRef.instance.selectedBranch = this.selectedBranch;
      // Subscribe to any outputs from your custom component
      componentRef.instance.cancel.subscribe(data => {
        this.flyout.closeFlyout();
      });
      componentRef.instance.signOut.subscribe(data => {
        this.logout()
      });

      // Open the flyout
      this.flyout.openFlyout();
    }
  }

  _prop() {
    this.userProfile = this._authService.getUserProfilefromStorage();
    this.companyBranchList = this._authService.getBranchListfromStorage();
    this.selectedBranchId = this._authService.getLoggedInBranchId();
    this.selectedBranch = this.companyBranchList.find(el => el.id === this.selectedBranchId);
  }

  /**
   * Logout the user and clear the session storage
   */
  logout() {
    this.logutSub = this._authService.logout().subscribe({
      next: () => {
        this._authService.clearSessionStorage();
        this._authService.setLoggedInStatus(false);
        this._router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
