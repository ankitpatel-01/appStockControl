import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-horizontal-nav-menu',
  templateUrl: './horizontal-nav-menu.component.html'
})
export class HorizontalNavMenuComponent implements OnInit, OnDestroy {

  logutSub: Subscription;

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  ngOnDestroy(): void {
    this.logutSub?.unsubscribe();
  }

  ngOnInit(): void {
  }

  /**
   * check if route in active or not
   * @param url : route
   * @param matchExact : true if want to match full exact default is false
   * @returns true if route if match
   */
  isActive(url: string, matchExact = false): boolean {
    return this._router.isActive(url, matchExact);
  }

  logout() {
    this.logutSub = this._authService.logout().subscribe({
      next: () => {
        this._authService.clearLocalStorage();
        this._authService.setLoggedInStatus(false);
        this._router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
