import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('Contact', () => {
  beforeEach(async () => {
    globalThis.IntersectionObserver ??= class {
      observe() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;

    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const type = (name: string, value: string) => {
      const input = el.querySelector<HTMLInputElement>(`[formControlName="${name}"]`)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    const submit = async () => {
      el.querySelector('form')!.dispatchEvent(new Event('submit'));
      fixture.detectChanges();
      await fixture.whenStable();
    };
    const status = () => el.querySelector('.res__status')?.textContent?.trim() ?? '';
    return { fixture, el, type, submit, status, http: TestBed.inject(HttpTestingController) };
  }

  it('valida no navegador sem chamar a API', async () => {
    const { submit, status, http } = setup();
    await submit();
    expect(status()).toContain('422');
    http.expectNone('/api/contact');
  });

  it('envia para /api/contact e mostra 202', async () => {
    const { fixture, type, submit, status, http } = setup();
    type('nome', 'Ana');
    type('email', 'ana@exemplo.com');
    type('mensagem', 'Olá, vi seu portfólio!');
    await submit();

    const req = http.expectOne('/api/contact');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toMatchObject({ nome: 'Ana', email: 'ana@exemplo.com', website: '' });
    req.flush({ status: 202, label: 'Accepted', message: 'ok' }, { status: 202, statusText: 'Accepted' });
    fixture.detectChanges();

    expect(status()).toContain('202 Accepted');
  });

  it('oferece o e-mail direto quando o envio falha', async () => {
    const { fixture, el, type, submit, status, http } = setup();
    type('nome', 'Ana');
    type('email', 'ana@exemplo.com');
    type('mensagem', 'Olá, vi seu portfólio!');
    await submit();

    http
      .expectOne('/api/contact')
      .flush({ status: 502, label: 'Bad Gateway', message: 'falhou' }, { status: 502, statusText: 'Bad Gateway' });
    fixture.detectChanges();

    expect(status()).toContain('502 Bad Gateway');
    expect(el.querySelector<HTMLAnchorElement>('.res__fallback')?.href).toContain('mailto:');
  });
});
