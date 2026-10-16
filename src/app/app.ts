import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Hero } from './components/hero/hero';
import { Journey } from './components/journey/journey';
import { Projects } from './components/projects/projects';
import { SiteHeader } from './components/site-header/site-header';
import { Stack } from './components/stack/stack';
import { StatusBar } from './components/status-bar/status-bar';
import { RequestLogService } from './services/request-log.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [SiteHeader, Hero, About, Projects, Stack, Journey, Contact, StatusBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKeydown($event)' },
  template: `
    <app-site-header />
    <main>
      <app-hero />
      <app-about />
      <app-projects />
      <app-stack />
      <app-journey />
      <app-contact />
    </main>
    <app-status-bar />
  `,
})
export class App {
  private readonly theme = inject(ThemeService);
  private readonly log = inject(RequestLogService);

  /** Atalhos: T alterna o tema, L abre o access log. */
  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    const typing = target.closest('input, textarea, [contenteditable="true"]');
    if (typing || event.ctrlKey || event.metaKey || event.altKey) return;

    const key = event.key.toLowerCase();
    if (key === 't') this.theme.toggle();
    if (key === 'l') this.log.togglePanel();
  }
}
