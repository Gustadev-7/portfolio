import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { EndpointDirective } from '../../directives/endpoint.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { SectionHeading } from '../section-heading/section-heading';

@Component({
  selector: 'app-about',
  imports: [EndpointDirective, RevealDirective, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly profile = PROFILE;

  /** Largura da maior chave, para alinhar os ":" como o MySQL faz no modo \G. */
  protected readonly keyWidth = Math.max(...PROFILE.facts.map((f) => f.key.length));

  protected readonly columns = PROFILE.facts.map((f) => f.key).join(', ');
}
