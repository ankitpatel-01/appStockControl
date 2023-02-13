import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NUMBER_FLOAT } from '../constants/constants';

@Directive({
  selector: '[numberFloat]'
})
export class NumberFloatDirective {
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete',
  ];

  constructor(private el: ElementRef) { }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [
      current.slice(0, position),
      event.key == 'Decimal' ? '.' : event.key,
      current.slice(position),
    ].join('');

    if (next && !String(next).match(NUMBER_FLOAT)) {
      event.preventDefault();
    }
  }

}
