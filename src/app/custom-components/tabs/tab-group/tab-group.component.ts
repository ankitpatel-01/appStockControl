import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  animations: [
    // trigger('slide', [
    //   state('in', style({ transform: 'translateX(0)' })),
    //   transition(':enter', [
    //     style({ transform: 'translateX(-100%)' }),
    //     animate(200)
    //   ]),
    //   transition(':leave', [
    //     animate(200, style({ transform: 'translateX(100%)' }))
    //   ])
    // ])
    // trigger('slideInOut', [
    //   transition(':enter', [
    //     style({ transform: 'translateX(+100%)' }),
    //     animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
    //   ]),
    // ]),
  ],

})
export class TabGroupComponent implements OnInit {

  activeTab = -1;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() { }

  ngOnInit(): void { }

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    tab.active = true;
    this.activeTab = 1;
  }

}
