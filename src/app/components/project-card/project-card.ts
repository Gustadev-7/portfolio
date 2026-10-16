import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly index = input.required<number>();

  protected statusClass(code: number): string {
    if (code >= 500) return 'code code--5xx';
    if (code >= 400) return 'code code--4xx';
    return 'code code--2xx';
  }
}
