import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[alphabetOnly]'
})
export class AlphabetOnlyDirective {

  constructor(private _el: ElementRef,
    private _renderer: Renderer2) {
  }

  @HostListener('input', ['$event']) onInputChange() {
    let initialValue = this._el.nativeElement.value;
    initialValue = initialValue.replace(/[^a-z\s\/]*/gi, '');
    this._renderer.setProperty(this._el.nativeElement, 'value', initialValue);
  }

}
