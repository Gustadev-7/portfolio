import { siGoogle, siRedhat } from 'simple-icons';

/**
 * Logos das instituições da trajetória, sempre monocromáticas (cor do tema).
 *  - svg:  uma ou mais camadas de caminho SVG (Simple Icons ou redesenhadas)
 *  - mask: arquivo em public/ (SVG ou PNG com fundo transparente), recolorido por CSS
 *  - text: iniciais, enquanto não há logo
 */
export interface SvgLayer {
  d: string;
  mode?: 'fill' | 'stroke';
  strokeWidth?: number;
  /** Tom secundário: mesma cor com opacidade menor. */
  opacity?: number;
}

export type OrgLogo =
  | { kind: 'svg'; layers: SvgLayer[]; viewBox?: string }
  | { kind: 'mask'; src: string }
  | { kind: 'text'; text: string };

const simpleIcon = (icon: { path: string }): OrgLogo => ({ kind: 'svg', layers: [{ d: icon.path }] });

/** Quadrado arredondado (lado 120, raio 10) a partir do canto superior esquerdo. */
function roundedSquare(x: number, y: number): string {
  return `M${x + 10} ${y}h100a10 10 0 0 1 10 10v100a10 10 0 0 1-10 10h-100a10 10 0 0 1-10-10v-100a10 10 0 0 1 10-10Z`;
}

/**
 * Símbolo do Instituto Federal (círculo + 9 quadrados), medido sobre a logo
 * oficial do IFSP. Só o símbolo: o nome escrito não cabe legível em 44px.
 */
const IFSP: OrgLogo = {
  kind: 'svg',
  viewBox: '410 4 455 595',
  layers: [
    {
      d: [
        'M429 85a66 66 0 1 0 132 0a66 66 0 1 0-132 0Z',
        ...[
          [580, 24], [725, 24],
          [435, 169], [580, 169],
          [435, 314], [580, 314], [725, 314],
          [435, 459], [580, 459],
        ].map(([x, y]) => roundedSquare(x, y)),
      ].join(''),
    },
  ],
};

/**
 * Símbolo da Vidroeste (rosa dos ventos dentro de uma moldura vazada),
 * medido sobre a logo oficial. A estrela diagonal é o tom secundário.
 */
const VIDROESTE: OrgLogo = {
  kind: 'svg',
  viewBox: '380 155 264 258',
  layers: [
    // moldura: quatro cantos arredondados, abertos no meio de cada lado
    {
      mode: 'stroke',
      strokeWidth: 22,
      d: 'M493 201H464a35 35 0 0 0-35 35v29M532 201H559a35 35 0 0 1 35 35v29M429 305v27a35 35 0 0 0 35 35H493M594 305v27a35 35 0 0 1-35 35H532',
    },
    // estrela diagonal (azul claro no original)
    { opacity: 0.55, d: 'M448 222L512 269L576 222L528 285L576 348L512 301L448 348L496 285Z' },
    // estrela principal
    { d: 'M512 163L526 271L633 285L526 299L512 405L498 299L390 285L498 271Z' },
  ],
};

export const ORG_LOGOS = {
  vidroeste: VIDROESTE,
  ifsp: IFSP,
  redhat: simpleIcon(siRedhat),
  google: simpleIcon(siGoogle),
} satisfies Record<string, OrgLogo>;

export function orgLogo(key?: string): OrgLogo | undefined {
  return key ? (ORG_LOGOS as Record<string, OrgLogo>)[key] : undefined;
}
