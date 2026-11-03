import { toAsyncViewStatus, toSearchViewStatus } from './async-view-status';

describe('toAsyncViewStatus', () => {
  it('returns loading before other states', () => {
    expect(toAsyncViewStatus(true, true, true)).toBe('loading');
  });

  it('returns error when loading finished with a failure', () => {
    expect(toAsyncViewStatus(false, true, false)).toBe('error');
  });

  it('returns empty when there are no items', () => {
    expect(toAsyncViewStatus(false, false, false)).toBe('empty');
  });

  it('returns ready when items are present', () => {
    expect(toAsyncViewStatus(false, false, true)).toBe('ready');
  });
});

describe('toSearchViewStatus', () => {
  it('returns idle when the query is empty', () => {
    expect(toSearchViewStatus(false, false, '', false)).toBe('idle');
  });

  it('returns empty when a query has no results', () => {
    expect(toSearchViewStatus(false, false, 'matrix', false)).toBe('empty');
  });

  it('returns ready when a query has results', () => {
    expect(toSearchViewStatus(false, false, 'matrix', true)).toBe('ready');
  });
});
