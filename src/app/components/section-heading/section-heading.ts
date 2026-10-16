import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HttpMethod } from '../../models/portfolio.models';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-section-heading',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="heading" appReveal>
      <p class="heading__route mono">
        <span class="heading__index">{{ index() }}</span>
        <span class="method" [class]="methodClass()">{{ method() }}</span>
        <span>{{ path() }}</span>
      </p>
      <h2 class="heading__title display">
        {{ title() }} @if (emphasis()) {<em>{{ emphasis() }}</em>}
      </h2>
      @if (lead()) {
        <p class="heading__lead">{{ lead() }}</p>
      }
    </header>
  `,
  styles: `
    .heading {
      display: grid;
      gap: 18px;
      margin-bottom: clamp(48px, 7vw, 80px);
      max-width: 760px;
    }

    .heading__route {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .heading__index {
      color: var(--text-faint);
      padding-right: 12px;
      border-right: 1px solid var(--line-strong);
    }

    .heading__title {
      font-size: clamp(2.2rem, 5vw, 3.6rem);
      line-height: 1.02;

      em {
        color: var(--text-muted);
      }
    }

    .heading__lead {
      color: var(--text-muted);
      max-width: 56ch;
      font-size: 1.05rem;
    }
  `,
})
export class SectionHeading {
  readonly index = input.required<string>();
  readonly method = input<HttpMethod>('GET');
  readonly path = input.required<string>();
  readonly title = input.required<string>();
  readonly emphasis = input<string>('');
  readonly lead = input<string>('');

  protected readonly methodClass = computed(() => `method method--${this.method().toLowerCase()}`);
}
