import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { toJsonLines } from './utils/json-lines';

describe('App', () => {
  beforeEach(async () => {
    globalThis.IntersectionObserver ??= class {
      observe() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('renderiza o nome no hero', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Gustavo');
  });

  it('consulta a API do GitHub ao iniciar', () => {
    TestBed.createComponent(App).detectChanges();
    const http = TestBed.inject(HttpTestingController);
    http.expectOne('https://api.github.com/users/Gustadev-7').flush({ public_repos: 12, followers: 0 });
    http.verify();
  });
});

describe('toJsonLines', () => {
  it('mantém arrays simples em uma linha e coloca vírgulas corretamente', () => {
    const lines = toJsonLines({ a: 'x', b: [1, 2] }).map((line) => line.map((t) => t.text).join(''));
    expect(lines).toEqual(['{', '  "a": "x",', '  "b": [1, 2]', '}']);
  });
});
