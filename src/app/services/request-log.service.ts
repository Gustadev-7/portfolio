import { Injectable, signal } from '@angular/core';
import { HttpMethod } from '../models/portfolio.models';

export interface LogEntry {
  id: number;
  time: string;
  method: HttpMethod;
  path: string;
  status: number;
}

const MAX_ENTRIES = 40;

/**
 * Registra a navegação do visitante como se fosse o access log de um servidor.
 * Também guarda qual "endpoint" (seção) está ativo para destacar a navegação.
 */
@Injectable({ providedIn: 'root' })
export class RequestLogService {
  private nextId = 0;

  readonly entries = signal<LogEntry[]>([]);
  readonly currentPath = signal('');
  readonly panelOpen = signal(false);

  log(method: HttpMethod, path: string, status = 200): void {
    const entry: LogEntry = {
      id: this.nextId++,
      time: new Date().toLocaleTimeString('pt-BR', { hour12: false }),
      method,
      path,
      status,
    };
    this.entries.update((list) => [entry, ...list].slice(0, MAX_ENTRIES));
  }

  visit(path: string): void {
    if (this.currentPath() === path) return;
    this.currentPath.set(path);
    this.log('GET', path);
  }

  togglePanel(): void {
    this.panelOpen.update((open) => !open);
  }
}
