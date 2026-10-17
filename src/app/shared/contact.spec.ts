import { validateContact } from './contact';

describe('validateContact', () => {
  const valid = { nome: 'Ana', email: 'ana@exemplo.com', assunto: '', mensagem: 'Olá, vi seu portfólio!' };

  it('aceita uma mensagem válida e remove espaços nas pontas', () => {
    const result = validateContact({ ...valid, nome: '  Ana  ' });
    expect(result).toEqual({ ok: true, data: { ...valid, nome: 'Ana' } });
  });

  it('aponta o primeiro campo inválido', () => {
    expect(validateContact({ ...valid, nome: '' })).toMatchObject({ ok: false, field: 'nome' });
    expect(validateContact({ ...valid, email: 'sem-arroba' })).toMatchObject({ ok: false, field: 'email' });
    expect(validateContact({ ...valid, mensagem: 'curta' })).toMatchObject({ ok: false, field: 'mensagem' });
  });

  it('remove quebras de linha do assunto para evitar injeção de cabeçalho', () => {
    const result = validateContact({ ...valid, assunto: 'Oi\r\nBcc: alguem@x.com' });
    expect(result.ok && result.data.assunto).toBe('Oi Bcc: alguem@x.com');
  });

  it('trata corpos que não são objetos como vazios', () => {
    expect(validateContact(null)).toMatchObject({ ok: false, field: 'nome' });
    expect(validateContact('texto')).toMatchObject({ ok: false, field: 'nome' });
  });
});
