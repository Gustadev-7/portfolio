import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  effect,
  inject,
  signal,
} from '@angular/core';
import { HttpMethod } from '../../models/portfolio.models';
import { RequestLogService } from '../../services/request-log.service';
import { ThemeService } from '../../services/theme.service';
import { BrandLogo } from '../brand-logo/brand-logo';

interface NavItem {
  label: string;
  path: string;
  method: HttpMethod;
}

/** Abaixo desta largura a navegação vira o menu do celular (igual ao CSS). */
const MOBILE_QUERY = '(max-width: 860px)';

@Component({
  selector: 'app-site-header',
  imports: [BrandLogo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  host: { '(document:keydown.escape)': 'closeMenu()' },
})
export class SiteHeader {
  protected readonly log = inject(RequestLogService);
  protected readonly theme = inject(ThemeService);

  protected readonly menuOpen = signal(false);

  protected readonly nav: NavItem[] = [
    { label: 'sobre', path: '/sobre', method: 'GET' },
    { label: 'projetos', path: '/projetos', method: 'GET' },
    { label: 'stack', path: '/stack', method: 'GET' },
    { label: 'trajetória', path: '/trajetoria', method: 'GET' },
    { label: 'contato', path: '/contato', method: 'POST' },
  ];

  constructor() {
    const document = inject(DOCUMENT);

    // com o menu aberto, a página por trás não rola
    effect(() => {
      document.documentElement.style.overflow = this.menuOpen() ? 'hidden' : '';
    });

    // se a tela crescer (girar o celular, redimensionar), fecha o menu
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const query = matchMedia(MOBILE_QUERY);
      const onChange = () => !query.matches && this.closeMenu();
      query.addEventListener('change', onChange);
      destroyRef.onDestroy(() => query.removeEventListener('change', onChange));
    });
  }

  protected anchor(path: string): string {
    return '#' + path.slice(1);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
