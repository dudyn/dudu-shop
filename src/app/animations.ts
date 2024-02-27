import { animate, style, trigger, transition } from '@angular/animations';
export const animations = [
  trigger('stars', [
    transition(':enter', [
      style({ transform: 'scale(0.5)', opacity: 0 }),
      animate(
        `1.5s cubic-bezier(0.8, -0.6, 0.2, 1.5)`,
        style({ transform: 'scale(1)', opacity: 1 })
      ),
    ]),
    transition(':leave', [
      animate(
        `1s cubic-bezier(0.8, -0.6, 0.2, 1.5)`,
        style({ transform: 'translateY(-100px)', opacity: 0 })
      ),
    ]),
  ]),
];
