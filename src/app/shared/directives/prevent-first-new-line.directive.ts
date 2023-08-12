import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'textarea[preventFirstNewline]'
})
export class PreventFirstNewlineDirective {

  constructor() { }

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    const value = textArea.value;
    if (value && value.charAt(0) === '\n') {
      textArea.value = value.substring(1);
      textArea.dispatchEvent(new Event('input'));
    }
  }

}
