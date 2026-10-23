import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from '../../data/portfolio.data';
import { EndpointDirective } from '../../directives/endpoint.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { ProjectCard } from '../project-card/project-card';
import { SectionHeading } from '../section-heading/section-heading';

@Component({
  selector: 'app-projects',
  imports: [EndpointDirective, RevealDirective, ProjectCard, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly projects = PROJECTS;
}
