# BYOK State Model + Client Storage V4

```ts
export type AIProvider = 'openai' | 'anthropic' | 'google' | 'openrouter' | 'ollama' | 'custom';
export type KeyStorageMode = 'session_only' | 'local_browser_storage';
export type CoachMode = 'mock' | 'byok_connected' | 'error';

export interface BYOKSettings {
  provider: AIProvider;
  model: string;
  endpoint?: string;
  storageMode: KeyStorageMode;
  keyMasked: string;
  connectedAt: string;
  lastTestedAt?: string;
}
```

## Storage implementation

```ts
const KEY_NS = 'fel_byok';
let sessionKey: string | null = null;

export function maskKey(key: string) {
  if (!key) return '';
  return `${key.slice(0, 6)}••••${key.slice(-4)}`;
}

export function saveBYOKKey(key: string, settings: Omit<BYOKSettings, 'keyMasked' | 'connectedAt'>) {
  sessionKey = key;

  const safeSettings: BYOKSettings = {
    ...settings,
    keyMasked: maskKey(key),
    connectedAt: new Date().toISOString(),
  };

  if (settings.storageMode === 'local_browser_storage') {
    localStorage.setItem(`${KEY_NS}_key`, key);
    localStorage.setItem(`${KEY_NS}_settings`, JSON.stringify(safeSettings));
  } else {
    sessionStorage.setItem(`${KEY_NS}_settings`, JSON.stringify(safeSettings));
  }

  return safeSettings;
}

export function getBYOKKey() {
  if (sessionKey) return sessionKey;
  return localStorage.getItem(`${KEY_NS}_key`);
}

export function clearBYOKKey() {
  sessionKey = null;
  localStorage.removeItem(`${KEY_NS}_key`);
  localStorage.removeItem(`${KEY_NS}_settings`);
  sessionStorage.removeItem(`${KEY_NS}_settings`);
}
```

## Security guardrails
- Never log the raw key.
- Never render the raw key after save.
- Never include the key in URL params.
- Never send the key to course analytics.
- Add Content Security Policy guidance separately before production.
- Add warning that local browser storage is not a secure vault.
