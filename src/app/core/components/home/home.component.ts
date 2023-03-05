import { Component, OnInit } from '@angular/core';
import { FadeInOut } from 'src/app/animations/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    FadeInOut
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
