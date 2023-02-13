import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[toUpperCase]'
})
export class ToUpperCaseDirective {

  constructor(private _el: ElementRef,
    private _renderer: Renderer2) {
  }

  @HostListener('input', ['$event']) onInputChange() {
    let initialValue = this._el.nativeElement.value;
    initialValue = initialValue.toUpperCase();
    this._renderer.setProperty(this._el.nativeElement, 'value', initialValue);
  }

}
