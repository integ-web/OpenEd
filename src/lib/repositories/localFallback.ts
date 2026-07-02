export function scopedKey(scope: string, userId: string | undefined, key: string) {
  return `opened.${scope}.${userId ?? "anonymous"}.${key}`;
}

export function readLocal<T>(scope: string, userId: string | undefined, key: string, fallback: T): T {
  const saved = localStorage.getItem(scopedKey(scope, userId, key));
  return saved ? ({ ...fallback, ...(JSON.parse(saved) as T) } as T) : fallback;
}

export function readLocalArray<T>(scope: string, userId: string | undefined, key: string, fallback: T[]): T[] {
  const saved = localStorage.getItem(scopedKey(scope, userId, key));
  return saved ? (JSON.parse(saved) as T[]) : fallback;
}

export function writeLocal<T>(scope: string, userId: string | undefined, key: string, value: T, eventName: string) {
  localStorage.setItem(scopedKey(scope, userId, key), JSON.stringify(value));
  window.dispatchEvent(new Event(eventName));
}
