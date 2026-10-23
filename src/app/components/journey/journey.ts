import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EDUCATION, EXPERIENCE } from '../../data/portfolio.data';
import { EndpointDirective } from '../../directives/endpoint.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { Commit } from '../../models/portfolio.models';
import { SectionHeading } from '../section-heading/section-heading';
import { OrgLogo, orgLogo } from './org-logos';

/** Hash curto e determinístico (djb2), só para dar cara de `git log`. */
function shortHash(text: string): string {
  let hash = 5381;
  for (const char of text) hash = ((hash << 5) + hash + char.charCodeAt(0)) >>> 0;
  return hash.toString(16).padStart(7, '0').slice(0, 7);
}

interface Track {
  title: string;
  branch: string;
  commits: (Commit & { hash: string; org?: OrgLogo })[];
}

function track(title: string, branch: string, commits: Commit[]): Track {
  return {
    title,
    branch,
    commits: commits.map((c) => ({ ...c, hash: shortHash(c.message + c.place), org: orgLogo(c.logo) })),
  };
}

@Component({
  selector: 'app-journey',
  imports: [EndpointDirective, RevealDirective, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './journey.html',
  styleUrl: './journey.scss',
})
export class Journey {
  protected readonly tracks: Track[] = [
    track('Experiência profissional', 'carreira', EXPERIENCE),
    track('Formação e cursos', 'formacao', EDUCATION),
  ];
}
