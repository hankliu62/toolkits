export const isWorkboxPresent =
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  (window as any).workbox !== undefined;
