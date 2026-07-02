# BYOK + Video Tracking Code Scaffold

Use this as implementation guidance for Figma Make / React. It is intentionally explicit so the product does not remain a static prototype.

## 1. Local video progress store

```ts
export type VideoTrackingMode = 'embedded' | 'externalFallback';

export type VideoProgress = {
  lessonId: string;
  provider: string;
  url: string;
  mode: VideoTrackingMode;
  lastPositionSeconds?: number;
  watchedSeconds?: number;
  durationSeconds?: number;
  percentComplete?: number;
  completed: boolean;
  openedExternalReference?: boolean;
  reflection?: string;
  updatedAt: string;
};

const VIDEO_PROGRESS_KEY = 'fme.videoProgress.v1';

export function getVideoProgressMap(): Record<string, VideoProgress> {
  try {
    return JSON.parse(localStorage.getItem(VIDEO_PROGRESS_KEY) || '{}');
  } catch {
    return {};
  }
}

export function getVideoProgress(lessonId: string): VideoProgress | null {
  return getVideoProgressMap()[lessonId] || null;
}

export function saveVideoProgress(progress: VideoProgress) {
  const map = getVideoProgressMap();
  map[progress.lessonId] = { ...progress, updatedAt: new Date().toISOString() };
  localStorage.setItem(VIDEO_PROGRESS_KEY, JSON.stringify(map));
}

export function markExternalVideoOpened(args: {
  lessonId: string;
  provider: string;
  url: string;
}) {
  saveVideoProgress({
    lessonId: args.lessonId,
    provider: args.provider,
    url: args.url,
    mode: 'externalFallback',
    openedExternalReference: true,
    completed: false,
    updatedAt: new Date().toISOString(),
  });
}

export function completeExternalVideoWithReflection(args: {
  lessonId: string;
  provider: string;
  url: string;
  reflection: string;
}) {
  if (!args.reflection.trim()) {
    throw new Error('Reflection is required for external fallback completion.');
  }

  saveVideoProgress({
    lessonId: args.lessonId,
    provider: args.provider,
    url: args.url,
    mode: 'externalFallback',
    openedExternalReference: true,
    reflection: args.reflection.trim(),
    completed: true,
    percentComplete: 100,
    updatedAt: new Date().toISOString(),
  });
}
```

## 2. YouTube iframe tracking logic

```ts
// Load this script once:
// https://www.youtube.com/iframe_api

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export type YouTubeTrackerArgs = {
  lessonId: string;
  elementId: string;
  videoId: string;
  provider: 'YouTube';
  url: string;
  onBlocked: (reason: string) => void;
  onProgress?: (progress: VideoProgress) => void;
};

export function createYouTubeTrackedPlayer(args: YouTubeTrackerArgs) {
  let interval: number | undefined;
  let watchedSeconds = 0;
  let lastTick = 0;

  const player = new window.YT.Player(args.elementId, {
    videoId: args.videoId,
    playerVars: {
      enablejsapi: 1,
      origin: window.location.origin,
      rel: 0,
      modestbranding: 1,
    },
    events: {
      onReady: () => {
        const existing = getVideoProgress(args.lessonId);
        if (existing?.lastPositionSeconds) {
          player.seekTo(existing.lastPositionSeconds, true);
        }
      },
      onStateChange: (event: any) => {
        const YT = window.YT;

        if (event.data === YT.PlayerState.PLAYING) {
          lastTick = Date.now();
          interval = window.setInterval(() => {
            const now = Date.now();
            const elapsed = Math.max(0, (now - lastTick) / 1000);
            lastTick = now;
            watchedSeconds += elapsed;

            const current = player.getCurrentTime?.() || 0;
            const duration = player.getDuration?.() || 0;
            const percent = duration > 0 ? Math.min(100, Math.round((current / duration) * 100)) : 0;
            const completed = percent >= 90;

            const progress: VideoProgress = {
              lessonId: args.lessonId,
              provider: args.provider,
              url: args.url,
              mode: 'embedded',
              lastPositionSeconds: current,
              watchedSeconds,
              durationSeconds: duration,
              percentComplete: percent,
              completed,
              updatedAt: new Date().toISOString(),
            };

            saveVideoProgress(progress);
            args.onProgress?.(progress);
          }, 5000);
        }

        if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
          if (interval) window.clearInterval(interval);
          interval = undefined;

          const current = player.getCurrentTime?.() || 0;
          const duration = player.getDuration?.() || 0;
          const completed = event.data === YT.PlayerState.ENDED || (duration > 0 && current / duration >= 0.9);

          saveVideoProgress({
            lessonId: args.lessonId,
            provider: args.provider,
            url: args.url,
            mode: 'embedded',
            lastPositionSeconds: current,
            watchedSeconds,
            durationSeconds: duration,
            percentComplete: duration > 0 ? Math.min(100, Math.round((current / duration) * 100)) : 0,
            completed,
            updatedAt: new Date().toISOString(),
          });
        }
      },
      onError: (event: any) => {
        if (interval) window.clearInterval(interval);
        interval = undefined;
        const code = event?.data;
        const reason = code === 101 || code === 150
          ? 'Embedding disabled by video owner.'
          : `YouTube player error ${code || 'unknown'}.`;
        args.onBlocked(reason);
      },
    },
  });

  return player;
}
```

## 3. BYOK storage utilities

```ts
export type BYOKStorageMode = 'session' | 'local';
export type BYOKProvider = 'openai' | 'anthropic' | 'gemini' | 'openrouter' | 'custom';

export type BYOKConfig = {
  provider: BYOKProvider;
  model: string;
  endpoint?: string;
  keyPreview: string;
  storageMode: BYOKStorageMode;
  createdAt: string;
  lastTestedAt?: string;
};

const CONFIG_KEY = 'fme.aiCoach.byok.config.v1';
const SECRET_KEY = 'fme.aiCoach.byok.secret.v1';

function getStore(mode: BYOKStorageMode): Storage {
  return mode === 'local' ? localStorage : sessionStorage;
}

function previewKey(key: string): string {
  if (key.length <= 8) return '••••';
  return `${key.slice(0, 3)}••••••••${key.slice(-4)}`;
}

export function saveBYOK(args: {
  provider: BYOKProvider;
  model: string;
  endpoint?: string;
  key: string;
  storageMode: BYOKStorageMode;
  localStorageRiskAccepted: boolean;
}) {
  if (args.storageMode === 'local' && !args.localStorageRiskAccepted) {
    throw new Error('Learner must accept browser-storage risk before saving to localStorage.');
  }

  clearBYOK();

  const config: BYOKConfig = {
    provider: args.provider,
    model: args.model,
    endpoint: args.endpoint,
    keyPreview: previewKey(args.key),
    storageMode: args.storageMode,
    createdAt: new Date().toISOString(),
  };

  const store = getStore(args.storageMode);
  store.setItem(CONFIG_KEY, JSON.stringify(config));
  store.setItem(SECRET_KEY, args.key);
}

export function loadBYOK(): { config: BYOKConfig; key: string } | null {
  for (const store of [sessionStorage, localStorage]) {
    const rawConfig = store.getItem(CONFIG_KEY);
    const key = store.getItem(SECRET_KEY);
    if (rawConfig && key) {
      return { config: JSON.parse(rawConfig), key };
    }
  }
  return null;
}

export function clearBYOK() {
  for (const store of [sessionStorage, localStorage]) {
    store.removeItem(CONFIG_KEY);
    store.removeItem(SECRET_KEY);
  }
}
```

## 4. Coach adapter skeleton

```ts
export type CoachMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export interface CoachProviderAdapter {
  id: BYOKProvider;
  label: string;
  defaultModels: string[];
  validateKey(key: string, config: BYOKConfig): Promise<{ ok: boolean; message: string }>;
  sendMessage(args: {
    key: string;
    model: string;
    endpoint?: string;
    messages: CoachMessage[];
    signal?: AbortSignal;
  }): Promise<{ text: string; usage?: { inputTokens?: number; outputTokens?: number } }>;
}

export const mockCoachAdapter: CoachProviderAdapter = {
  id: 'custom',
  label: 'Mock Coach',
  defaultModels: ['mock-coach'],
  async validateKey() {
    return { ok: true, message: 'Mock mode does not require a key.' };
  },
  async sendMessage({ messages }) {
    const last = messages[messages.length - 1]?.content || '';
    return {
      text: `Mock coach response: connect this question back to the lesson objective, name the evidence needed, and save one artifact field. Your question was: ${last}`,
    };
  },
};
```

## 5. Safety system prompt

```ts
export const COACH_SYSTEM_PROMPT = `
You are the AI Coach for the Frontier Model Evaluations course.
Be calm, precise, practical, and non-authoritarian.
Teach evaluation design, source interpretation, evidence reasoning, artifact completion, and capstone preparation.
Do not provide harmful operational cyber, biological, chemical, persuasion, evasion, or real-world misuse instructions.
Use fictional, sandboxed, de-risked examples.
When the learner asks for unsafe details, redirect to safe evaluation design, validity, safeguards, governance, or reporting.
`;
```
