import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="avatar"
      [class.has-image]="imageUrl"
      [class.has-name]="!imageUrl"
      [style.width.px]="width"
      [style.height.px]="height"
      [ngStyle]="{ 'font-size': (width + height) / 4 + 'px' }"
    >
      <span *ngIf="!imageUrl">{{ getInitials(name) }}</span>
    </div>
  `,
})
export class AvatarComponent {
  @Input() imageUrl: string;
  @Input() name: string;
  @Input() width = 40;
  @Input() height = 40;

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('');
  }
}
