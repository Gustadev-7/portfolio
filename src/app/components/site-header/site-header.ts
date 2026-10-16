import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HttpMethod } from '../../models/portfolio.models';
import { RequestLogService } from '../../services/request-log.service';
import { ThemeService } from '../../services/theme.service';

interface NavItem {
  label: string;
  path: string;
  method: HttpMethod;
}

@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly log = inject(RequestLogService);
  protected readonly theme = inject(ThemeService);

  protected readonly nav: NavItem[] = [
    { label: 'sobre', path: '/sobre', method: 'GET' },
    { label: 'projetos', path: '/projetos', method: 'GET' },
    { label: 'stack', path: '/stack', method: 'GET' },
    { label: 'trajetória', path: '/trajetoria', method: 'GET' },
    { label: 'contato', path: '/contato', method: 'POST' },
  ];

  protected anchor(path: string): string {
    return '#' + path.slice(1);
  }
}
