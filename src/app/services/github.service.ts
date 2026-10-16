import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';

interface GithubUser {
  public_repos: number;
  followers: number;
}

export type GithubState =
  | { status: 'pending' }
  | { status: 'ok'; repos: number; latencyMs: number }
  | { status: 'error' };

/**
 * Busca dados reais do perfil na API pública do GitHub.
 * Se falhar (rate limit, offline), o site usa os valores de fallback.
 */
@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);

  readonly state = signal<GithubState>({ status: 'pending' });

  load(): void {
    const startedAt = performance.now();
    this.http.get<GithubUser>(`https://api.github.com/users/${PROFILE.githubUser}`).subscribe({
      next: (user) =>
        this.state.set({
          status: 'ok',
          repos: user.public_repos,
          latencyMs: Math.round(performance.now() - startedAt),
        }),
      error: () => this.state.set({ status: 'error' }),
    });
  }
}
