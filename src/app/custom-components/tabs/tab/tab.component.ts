import { Component, Input, OnInit } from '@angular/core';
import { FadeIn } from 'src/app/animations/animation';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  animations: [
    FadeIn
  ]
})
export class TabComponent implements OnInit {
  @Input() tabTitle: string;
  @Input() active = false;
  constructor() { }

  ngOnInit(): void {
  }

}
