import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** Revela o elemento com uma transição suave na primeira vez que ele aparece na tela. */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal', '[style.--reveal-delay]': 'appRevealDelay() + "ms"' },
})
export class RevealDirective {
  readonly appRevealDelay = input(0);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.host.nativeElement;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          el.classList.add('is-visible');
          observer.disconnect();
        },
        { threshold: 0.12 },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
