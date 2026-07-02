# Video Tracking Implementation Patch V4

## Goal
Track lesson-video progress in real time when an embedded provider allows playback. When playback is blocked by creator restrictions, use an honest external fallback flow.

## Data model additions

```ts
export type MediaStatus =
  | 'external_reference_unverified'
  | 'embed_verified'
  | 'embed_blocked'
  | 'no_external_video_yet';

export type TrackingMode =
  | 'embedded_tracking'
  | 'external_fallback_tracking'
  | 'reading_script_only';

export interface VideoProgressState {
  lessonId: string;
  mediaUrl: string | null;
  trackingMode: TrackingMode;
  currentTimeSeconds: number;
  durationSeconds: number | null;
  watchedPercent: number;
  hasPlayed: boolean;
  completed: boolean;
  lastUpdatedAt: string;
  reflection?: string;
}
```

## YouTube embedded tracking behavior

Use the YouTube IFrame Player API only for videos that successfully embed. Save progress locally by lesson ID.

```ts
function calculateWatchedPercent(currentTime: number, duration: number | null) {
  if (!duration || duration <= 0) return 0;
  return Math.min(100, Math.round((currentTime / duration) * 100));
}

function saveVideoProgress(state: VideoProgressState) {
  localStorage.setItem(`fel_video_progress_${state.lessonId}`, JSON.stringify(state));
}

function loadVideoProgress(lessonId: string): VideoProgressState | null {
  const raw = localStorage.getItem(`fel_video_progress_${lessonId}`);
  return raw ? JSON.parse(raw) : null;
}
```

## Event handling requirements

When embedded:
- onReady: read duration if available.
- onStateChange playing: set `hasPlayed=true` and start polling every 2 seconds.
- onStateChange paused/ended: save current time.
- onStateChange ended: set completed=true.
- polling: call `getCurrentTime()` and update watched percent.

When blocked:
- show fallback card.
- learner opens provider link.
- learner returns and clicks `Mark as watched`.
- require a one-sentence reflection before marking complete.
- store completion as `external_fallback_tracking`.

## UI states

1. `external_reference_unverified`
   - Badge: Verify embed before publishing.
   - Show embedded player attempt and fallback link.

2. `embed_verified`
   - Badge: Embedded tracking active.
   - Show watched percent, last watched time, continue button.

3. `embed_blocked`
   - Badge: External viewing required.
   - Show provider button, reflection box, manual watched confirmation.

4. `no_external_video_yet`
   - Badge: Media pending.
   - Show authored course script as the primary learning content.

## Content QA additions

A lesson fails video QA if:
- media URL duplicates another lesson URL.
- media is unrelated to the lesson objective.
- no authored course script is present.
- no fallback state exists.
- UI says “official video” or “course-owned video.”

A lesson passes video QA if:
- unique media OR explicit `no_external_video_yet` state exists.
- authored course script exists.
- fallback exists.
- tracking mode is visible.
- transcript drawer is labeled correctly.
