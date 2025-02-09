export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString(undefined, { dateStyle: 'full' });
}
