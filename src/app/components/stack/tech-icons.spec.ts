import { STACK } from '../../data/portfolio.data';
import { resolveProjectRefs } from './stack';
import { TECH_ICONS } from './tech-icons';

const items = STACK.flatMap((g) => g.items);

describe('seção de stack', () => {
  it('tem um ícone para cada tecnologia', () => {
    const missing = items.filter((item) => !(item.icon in TECH_ICONS)).map((item) => `${item.name} (${item.icon})`);
    expect(missing).toEqual([]);
  });

  it('só cita projetos que existem', () => {
    const broken = items.filter((item) => resolveProjectRefs(item.usedIn).length !== (item.usedIn ?? []).length);
    expect(broken.map((item) => item.name)).toEqual([]);
  });
});
