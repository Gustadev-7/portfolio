import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FRONTEND_NOTE, PROJECTS, STACK } from '../../data/portfolio.data';
import { EndpointDirective } from '../../directives/endpoint.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { SectionHeading } from '../section-heading/section-heading';
import { TECH_ICONS, TechIcon } from './tech-icons';

export interface ProjectRef {
  label: string;
  href: string;
}

const PROJECT_REFS = new Map<string, ProjectRef>([
  ...PROJECTS.map((p): [string, ProjectRef] => [p.slug, { label: p.shortName ?? p.name, href: `#projeto-${p.slug}` }]),
  ['portfolio', { label: 'este site', href: '#inicio' }],
]);

/** Converte slugs em links para os cards de projeto; slugs desconhecidos são ignorados. */
export function resolveProjectRefs(slugs: string[] = []): ProjectRef[] {
  return slugs.map((slug) => PROJECT_REFS.get(slug)).filter((ref): ref is ProjectRef => !!ref);
}

function iconFor(key: string): TechIcon {
  return TECH_ICONS[key as keyof typeof TECH_ICONS] ?? TECH_ICONS.vscode;
}

@Component({
  selector: 'app-stack',
  imports: [EndpointDirective, RevealDirective, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
})
export class Stack {
  protected readonly frontendNote = FRONTEND_NOTE;

  // resolvido uma vez: o conteúdo é estático
  protected readonly groups = STACK.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      svg: iconFor(item.icon),
      refs: resolveProjectRefs(item.usedIn),
    })),
  }));
}
