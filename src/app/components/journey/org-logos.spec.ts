import { EDUCATION, EXPERIENCE } from '../../data/portfolio.data';
import { ORG_LOGOS } from './org-logos';

describe('logos da trajetória', () => {
  it('toda logo citada nos dados existe', () => {
    const missing = [...EXPERIENCE, ...EDUCATION]
      .filter((c) => c.logo && !(c.logo in ORG_LOGOS))
      .map((c) => `${c.place} (${c.logo})`);
    expect(missing).toEqual([]);
  });
});
