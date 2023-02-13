import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NUMBER_ONLY } from '../constants/constants';

@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {

  constructor(private _el: ElementRef,
    private _renderer: Renderer2) {
  }

  @HostListener('input', ['$event']) onInputChange() {
    let initialValue = this._el.nativeElement.value;
    initialValue = initialValue.replace(NUMBER_ONLY, '');
    this._renderer.setProperty(this._el.nativeElement, 'value', initialValue);
  }
}
