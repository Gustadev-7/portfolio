import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STACK } from '../../data/portfolio.data';
import { EndpointDirective } from '../../directives/endpoint.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { SectionHeading } from '../section-heading/section-heading';

@Component({
  selector: 'app-stack',
  imports: [EndpointDirective, RevealDirective, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
})
export class Stack {
  protected readonly groups = STACK;

  /** Versão no formato calendário (ano.mês): o "pacote" está sempre atualizado. */
  protected readonly version = (() => {
    const now = new Date();
    return `${now.getFullYear()}.${now.getMonth() + 1}.0`;
  })();
}
