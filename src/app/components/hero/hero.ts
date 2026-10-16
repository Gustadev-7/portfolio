import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { EndpointDirective } from '../../directives/endpoint.directive';
import { GithubService } from '../../services/github.service';
import { RequestLogService } from '../../services/request-log.service';
import { toJsonLines } from '../../utils/json-lines';

const LINE_INTERVAL_MS = 55;
const START_DELAY_MS = 450;

@Component({
  selector: 'app-hero',
  imports: [EndpointDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly github = inject(GithubService);
  private readonly log = inject(RequestLogService);

  protected readonly profile = PROFILE;
  protected readonly githubState = this.github.state;

  protected readonly repos = computed(() => {
    const state = this.githubState();
    return state.status === 'ok' ? state.repos : PROFILE.publicReposFallback;
  });

  protected readonly latency = computed(() => {
    const state = this.githubState();
    return state.status === 'ok' ? state.latencyMs : null;
  });

  protected readonly lines = computed(() =>
    toJsonLines({
      nome: PROFILE.fullName,
      foco: PROFILE.focus,
      local: PROFILE.location,
      stack: ['Node.js', 'TypeScript', 'Java'],
      bancos: ['MySQL', 'Oracle'],
      estudando: ['Angular', 'C'],
      formacao: 'ADS · IFSP',
      repos_publicos: this.repos(),
      buscando: 'estágio · júnior',
    }),
  );

  /** Quantas linhas da resposta já foram "transmitidas". */
  protected readonly visibleLines = signal(0);
  protected readonly streaming = computed(() => this.visibleLines() < this.lines().length);

  protected downloadCv(): void {
    this.log.log('GET', '/curriculo.pdf');
  }

  constructor() {
    this.github.load();

    const reduceMotion =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.visibleLines.set(Number.MAX_SAFE_INTEGER);
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        this.visibleLines.update((n) => n + 1);
        if (!this.streaming()) clearInterval(interval);
      }, LINE_INTERVAL_MS);
    }, START_DELAY_MS);

    inject(DestroyRef).onDestroy(() => {
      clearTimeout(timeout);
      clearInterval(interval);
    });
  }
}
