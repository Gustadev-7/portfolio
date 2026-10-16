import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { RequestLogService } from '../services/request-log.service';

/**
 * Marca uma seção como um "endpoint". Quando ela cruza o meio da tela,
 * vira o caminho atual e gera uma linha no access log.
 */
@Directive({ selector: '[appEndpoint]' })
export class EndpointDirective {
  readonly appEndpoint = input.required<string>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly log = inject(RequestLogService);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) this.log.visit(this.appEndpoint());
        },
        { rootMargin: '-45% 0px -54% 0px' },
      );
      observer.observe(this.host.nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
