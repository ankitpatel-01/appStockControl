import { animate, state, style, transition, trigger } from '@angular/animations';

export const FadeIn = trigger('FadeIn', [
    state('inactive', style({
        opacity: 0
    })),
    state('active', style({
        opacity: 1
    })),
    transition('inactive => active', animate('200ms ease-in')),
    transition('active => inactive', animate('200ms ease-out'))
])

export const FadeInOut = trigger('FadeInOut', [
    state('void', style({ opacity: 0 })),
    transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 })),
    ]),
    transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0 })),
    ]),
])
