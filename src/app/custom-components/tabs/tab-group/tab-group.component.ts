import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
})
export class TabGroupComponent implements OnInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @Input() public set selectedTabIndex(v: number) {
    this._selectedTabIndex = v;
  }

  @Input() public set verticalLayout(v: boolean) {
    this._verticalLayout = v;
  }

  @Output() onTabChange: EventEmitter<number>;

  private _verticalLayout: boolean;
  public get verticalLayout(): boolean {
    return this._verticalLayout;
  }

  private _selectedTabIndex: number;
  public get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }

  constructor() {
    this.verticalLayout = false;
    this._selectedTabIndex = 0;
    this.onTabChange = new EventEmitter<number>();
  }

  ngOnInit(): void { }

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.toArray()[0]);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    tab.active = true;
    this.selectedTabIndex = this.tabs.toArray().findIndex(tab => tab.active === true);
    this.onTabChange.emit(this.selectedTabIndex);
  }

}
