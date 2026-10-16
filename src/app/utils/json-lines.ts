export type TokenKind = 'punct' | 'key' | 'string' | 'number' | 'boolean' | 'null';

export interface Token {
  text: string;
  kind: TokenKind;
}

export type JsonLine = Token[];

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Serializa um objeto em linhas de tokens para renderizar JSON com
 * realce de sintaxe sem usar innerHTML. Arrays de valores simples ficam
 * em uma linha só, como um `jq` compacto.
 */
export function toJsonLines(value: JsonValue, indent = 2): JsonLine[] {
  const lines: JsonLine[] = [];
  write(value, 0, [], true);
  return lines;

  function write(val: JsonValue, depth: number, prefix: Token[], last: boolean): void {
    const pad: Token = { text: ' '.repeat(depth * indent), kind: 'punct' };
    const comma: Token[] = last ? [] : [{ text: ',', kind: 'punct' }];

    if (Array.isArray(val) && val.every(isPrimitive)) {
      const items = val.flatMap((item, i) => [
        primitive(item),
        ...(i < val.length - 1 ? [{ text: ', ', kind: 'punct' as const }] : []),
      ]);
      lines.push([pad, ...prefix, { text: '[', kind: 'punct' }, ...items, { text: ']', kind: 'punct' }, ...comma]);
      return;
    }

    if (val !== null && typeof val === 'object') {
      const isArray = Array.isArray(val);
      const entries: [string | null, JsonValue][] = isArray
        ? val.map((v) => [null, v])
        : Object.entries(val);
      lines.push([pad, ...prefix, { text: isArray ? '[' : '{', kind: 'punct' }]);
      entries.forEach(([key, child], i) => {
        const keyTokens: Token[] =
          key === null
            ? []
            : [
                { text: `"${key}"`, kind: 'key' },
                { text: ': ', kind: 'punct' },
              ];
        write(child, depth + 1, keyTokens, i === entries.length - 1);
      });
      lines.push([pad, { text: isArray ? ']' : '}', kind: 'punct' }, ...comma]);
      return;
    }

    lines.push([pad, ...prefix, primitive(val), ...comma]);
  }
}

function isPrimitive(val: JsonValue): boolean {
  return val === null || typeof val !== 'object';
}

function primitive(val: JsonValue): Token {
  if (typeof val === 'string') return { text: JSON.stringify(val), kind: 'string' };
  if (typeof val === 'number') return { text: String(val), kind: 'number' };
  if (typeof val === 'boolean') return { text: String(val), kind: 'boolean' };
  return { text: 'null', kind: 'null' };
}
