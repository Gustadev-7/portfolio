import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROFILE } from '../../data/portfolio.data';
import { EndpointDirective } from '../../directives/endpoint.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { RequestLogService } from '../../services/request-log.service';
import { SectionHeading } from '../section-heading/section-heading';

interface ContactResponse {
  status: number;
  label: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, EndpointDirective, RevealDirective, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly log = inject(RequestLogService);

  protected readonly profile = PROFILE;
  protected readonly copied = signal(false);
  protected readonly response = signal<ContactResponse | null>(null);

  protected readonly form = inject(NonNullableFormBuilder).group({
    nome: ['', [Validators.required, Validators.maxLength(80)]],
    assunto: ['', [Validators.maxLength(120)]],
    mensagem: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected send(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const field = Object.entries(this.form.controls).find(([, c]) => c.invalid)?.[0];
      const reason =
        field === 'mensagem' && this.form.controls.mensagem.hasError('minlength')
          ? '"mensagem" precisa de pelo menos 10 caracteres'
          : `o campo "${field}" é obrigatório`;
      this.respond({ status: 400, label: 'Bad Request', message: reason });
      return;
    }

    const { nome, assunto, mensagem } = this.form.getRawValue();
    const subject = assunto || `Contato pelo portfólio: ${nome}`;
    const body = `${mensagem}\n\n— ${nome}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    this.respond({
      status: 202,
      label: 'Accepted',
      message: 'abrindo seu cliente de e-mail com a mensagem pronta.',
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
    this.log.log('POST', '/contato', response.status);
  }
}
