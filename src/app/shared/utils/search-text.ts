export function normalizeSearchText(value: string | null | undefined): string {
  return value?.trim() ?? '';
}
