import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tokens } from './core/models/token.model';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'appStockControl';

  constructor(private _router: Router, private _authService: AuthService) {
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage && event.key === null) {
        // Local storage has been cleared, navigate to the login page
        this._router.navigate(['/login']);
      }
    });
  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this._authService.loggedIn$.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.startRefreshTokenTimer();
      }
      if (!loggedIn && this.refreshTokenTimeout) {
        this.stopRefreshTokenTimer();
      }
    })
  }

  refreshTokens() {
    this._authService.refresh_tokens().subscribe({
      next: (res: Tokens) => {
        this._authService.setAccessToken(res.access_token);
        this._authService.setRefreshToken(res.refresh_token);
        this.startRefreshTokenTimer();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private refreshTokenTimeout?: NodeJS.Timeout;

  private startRefreshTokenTimer() {
    const tokenExpirationDate = this._authService.getTokenExpirationDate(this._authService.getAccessToken());
    if (tokenExpirationDate) {
      const timeout = tokenExpirationDate.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => this.refreshTokens(), timeout);
    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }


}
