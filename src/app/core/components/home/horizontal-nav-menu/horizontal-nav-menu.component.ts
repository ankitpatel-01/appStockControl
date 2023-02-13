import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horizontal-nav-menu',
  templateUrl: './horizontal-nav-menu.component.html'
})
export class HorizontalNavMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * check if route in active or not
   * @param url : route
   * @param matchExact : true if want to match full exact default is false
   * @returns true if route if match
   */
  isActive(url: string, matchExact = false): boolean {
    return this.router.isActive(url, matchExact);
  }

}
