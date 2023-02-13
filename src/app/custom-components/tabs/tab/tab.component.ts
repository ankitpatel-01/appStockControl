import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  animations: [
    // trigger('tabSwitch', [
    //   state('inactive', style({
    //     transform: 'scale(0)'
    //   })),
    //   state('active', style({
    //     transform: 'scale(1)'
    //   })),
    //   transition('inactive => active', animate('300ms ease-in')),
    //   transition('active => inactive', animate('300ms ease-out'))
    // ])
    // trigger('tabSwitch', [
    //   state('inactive', style({
    //     transform: 'translateX(100%)'
    //   })),
    //   state('active', style({
    //     transform: 'translateX(0%)'
    //   })),
    //   transition('inactive => active', animate('300ms ease-in')),
    //   transition('active => inactive', animate('300ms ease-out'))
    // ])
    trigger('tabSwitch', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 1
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])



  ]
})
export class TabComponent implements OnInit {
  @Input() tabTitle: string;
  @Input() active = false;
  constructor() { }

  ngOnInit(): void {
  }

}
