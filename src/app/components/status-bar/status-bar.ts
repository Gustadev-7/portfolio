import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { RequestLogService } from '../../services/request-log.service';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * Barra fixa no rodapé, no estilo da status bar de uma IDE:
 * mostra o endpoint atual, o uptime da sessão e abre o access log.
 */
@Component({
  selector: 'app-status-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-bar.html',
  styleUrl: './status-bar.scss',
})
export class StatusBar {
  protected readonly log = inject(RequestLogService);
  protected readonly location = PROFILE.location;
  protected readonly year = new Date().getFullYear();

  private readonly seconds = signal(0);

  protected readonly uptime = computed(() => {
    const s = this.seconds();
    return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  });

  protected readonly requestCount = computed(() => this.log.entries().length);

  constructor() {
    const timer = setInterval(() => this.seconds.update((s) => s + 1), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  protected statusClass(status: number): string {
    return status >= 400 ? 'is-err' : status >= 300 ? 'is-warn' : 'is-ok';
  }
}
