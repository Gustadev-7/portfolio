import {
  siExpress,
  siGit,
  siIntellijidea,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostman,
  siTypescript,
  siWhatsapp,
} from 'simple-icons';

/**
 * Ícones da seção de stack (viewBox 24×24). Logos vêm do Simple Icons (CC0),
 * importadas uma a uma para entrar no build só o que é usado. Marcas que não
 * estão no Simple Icons usam ícones genéricos desenhados em traço.
 */
export type TechIcon =
  /** 'fill' para logos; 'stroke' para os ícones genéricos em linha. */
  | { mode: 'fill' | 'stroke'; path: string }
  /** Imagem com fundo transparente em public/, recortada e pintada na cor do tema via CSS mask. */
  | { mode: 'mask'; src: string };

const logo = (icon: { path: string }): TechIcon => ({ path: icon.path, mode: 'fill' });
const mask = (src: string): TechIcon => ({ mode: 'mask', src });

const GENERIC = {
  database: {
    mode: 'stroke',
    path: 'M5 6c0 1.66 3.13 3 7 3s7-1.34 7-3-3.13-3-7-3-7 1.34-7 3Zm0 0v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3',
  },
  api: {
    mode: 'stroke',
    path: 'M8 4C6 4 6 5.5 6 7v2c0 1-.7 2-2 2 1.3 0 2 1 2 2v2c0 1.5 0 3 2 3M16 4c2 0 2 1.5 2 3v2c0 1 .7 2 2 2-1.3 0-2 1-2 2v2c0 1.5 0 3-2 3',
  },
  code: {
    mode: 'stroke',
    path: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  },
  /** Chama, em referência ao nome Firebird. */
  flame: {
    mode: 'stroke',
    path: 'M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.3 2.4-5.4 3.7-7.6.4 1.7 1.3 2.8 2.3 3.2C11.7 7.4 12.9 5 15 3c.2 3.5 3.5 5.7 3.5 10.6 0 4.3-2.8 7.4-6.5 7.4Z',
  },
  /** Cápsula horizontal, forma característica da marca Oracle. */
  capsule: {
    mode: 'stroke',
    path: 'M8.5 6.5h7a5.5 5.5 0 0 1 0 11h-7a5.5 5.5 0 0 1 0-11Z',
  },
} satisfies Record<string, TechIcon>;

export const TECH_ICONS = {
  nodejs: logo(siNodedotjs),
  php: logo(siPhp),
  typescript: logo(siTypescript),
  express: logo(siExpress),
  java: logo(siOpenjdk),
  sql: GENERIC.database,
  firebird: GENERIC.flame,
  mysql: logo(siMysql),
  oracle: GENERIC.capsule,
  rest: GENERIC.api,
  whatsapp: logo(siWhatsapp),
  websocket: mask('logos/websocket.png'),
  git: logo(siGit),
  postman: logo(siPostman),
  vscode: GENERIC.code,
  intellij: logo(siIntellijidea),
} satisfies Record<string, TechIcon>;

export type TechIconKey = keyof typeof TECH_ICONS;
