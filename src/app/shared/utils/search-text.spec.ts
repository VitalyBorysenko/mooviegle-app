import { normalizeSearchText } from './search-text';

describe('normalizeSearchText', () => {
  it('trims surrounding whitespace', () => {
    expect(normalizeSearchText('  matrix  ')).toBe('matrix');
  });

  it('returns an empty string for nullish values', () => {
    expect(normalizeSearchText(null)).toBe('');
    expect(normalizeSearchText(undefined)).toBe('');
  });
});
