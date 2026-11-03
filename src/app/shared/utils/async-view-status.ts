export type AsyncViewStatus = 'loading' | 'error' | 'empty' | 'ready';
export type SearchViewStatus = AsyncViewStatus | 'idle';

export function toAsyncViewStatus(
  isLoading: boolean,
  hasError: boolean,
  hasItems: boolean,
): AsyncViewStatus {
  if (isLoading) {
    return 'loading';
  }
  if (hasError) {
    return 'error';
  }
  if (!hasItems) {
    return 'empty';
  }
  return 'ready';
}

export function toSearchViewStatus(
  isLoading: boolean,
  hasError: boolean,
  searchText: string,
  hasItems: boolean,
): SearchViewStatus {
  if (isLoading) {
    return 'loading';
  }
  if (hasError) {
    return 'error';
  }
  if (!searchText) {
    return 'idle';
  }
  if (!hasItems) {
    return 'empty';
  }
  return 'ready';
}
