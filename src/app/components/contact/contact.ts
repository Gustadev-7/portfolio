import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { PROFILE } from '../../data/portfolio.data';
import { EndpointDirective } from '../../directives/endpoint.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { RequestLogService } from '../../services/request-log.service';
import { CONTACT_LIMITS, ContactReply, validateContact } from '../../shared/contact';
import { SectionHeading } from '../section-heading/section-heading';

interface ContactResponse extends ContactReply {
  latencyMs?: number;
  /** Falha no envio: oferece o e-mail direto como alternativa. */
  fallback?: boolean;
}

const CONTACT_ENDPOINT = '/api/contact';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, EndpointDirective, RevealDirective, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly http = inject(HttpClient);
  private readonly log = inject(RequestLogService);

  protected readonly profile = PROFILE;
  protected readonly endpoint = CONTACT_ENDPOINT;
  protected readonly limits = CONTACT_LIMITS;
  protected readonly copied = signal(false);
  protected readonly sending = signal(false);
  protected readonly response = signal<ContactResponse | null>(null);

  protected readonly form = inject(NonNullableFormBuilder).group({
    nome: ['', [Validators.required, Validators.maxLength(CONTACT_LIMITS.nome)]],
    email: ['', [Validators.required, Validators.email]],
    assunto: ['', [Validators.maxLength(CONTACT_LIMITS.assunto)]],
    mensagem: [
      '',
      [
        Validators.required,
        Validators.minLength(CONTACT_LIMITS.mensagemMin),
        Validators.maxLength(CONTACT_LIMITS.mensagem),
      ],
    ],
    // honeypot: escondido de pessoas, preenchido por robôs
    website: [''],
  });

  protected readonly mailtoHref = computed(() => {
    const res = this.response();
    if (!res?.fallback) return '';
    const { nome, assunto, mensagem } = this.form.getRawValue();
    const subject = assunto || `Contato pelo portfólio: ${nome}`;
    return `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mensagem)}`;
  });

  protected send(): void {
    if (this.sending()) return;

    // mesma validação que o backend executa
    const result = validateContact(this.form.getRawValue());
    if (!result.ok) {
      this.form.markAllAsTouched();
      this.respond({ status: 422, label: 'Unprocessable Entity', message: result.message, field: result.field });
      return;
    }

    this.sending.set(true);
    this.response.set({ status: 102, label: 'Processing', message: 'enviando…' });
    const startedAt = performance.now();
    const latency = () => Math.round(performance.now() - startedAt);

    this.http
      .post<ContactReply>(CONTACT_ENDPOINT, { ...result.data, website: this.form.controls.website.value })
      .pipe(finalize(() => this.sending.set(false)))
      .subscribe({
        next: (reply) => {
          this.respond({ ...reply, latencyMs: latency() });
          this.form.reset();
        },
        error: (error: HttpErrorResponse) => {
          const reply = error.error as Partial<ContactReply> | null;
          const hasBody = typeof reply?.message === 'string';
          this.respond({
            status: error.status || 503,
            label: hasBody ? (reply.label ?? 'Erro') : 'Service Unavailable',
            message: hasBody ? reply.message! : 'não foi possível enviar agora',
            field: reply?.field,
            latencyMs: latency(),
            fallback: !reply?.field,
          });
        },
      });
  }

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }

  protected downloadCv(): void {
    this.log.log('GET', '/curriculo.pdf');
  }

  private respond(response: ContactResponse): void {
    this.response.set(response);
    this.log.log('POST', CONTACT_ENDPOINT, response.status);
  }
}
