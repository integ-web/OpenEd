# BYOK AI Coach Implementation Spec — Client-Side Key Storage

## Purpose

Enable a low-cost AI Coach by letting learners bring their own model provider key. The product should remain usable for free through a mock/offline coach, but learners can opt into real model calls with their own key.

## Important security position

This is privacy-preserving for the course operator because the key is never sent to our server. It is **not equivalent to secure server-side secret management**. A key stored in a browser can be exposed by XSS, malicious extensions, shared devices, or browser compromise.

Therefore the product must:

- Explain the risk plainly before saving a key.
- Offer `Session only` mode as the safer default.
- Offer `Remember on this device` only after explicit confirmation.
- Never send the key to our backend, analytics, logs, telemetry, or error reporting.
- Provide one-click delete.
- Encourage learners to create a restricted, low-spend, disposable learning key.
- Provide mock coach mode if no key exists.

## UX flow

### Entry points

- AI Coach empty state: `Connect your own AI key`
- Settings: `AI Coach → Bring your own key`
- Lesson toolbar: `Enable AI Coach`

### BYOK modal

Title: `Bring your own AI key`

Body copy:

> Your key stays in this browser. We do not store it on our servers. Browser storage is convenient but not perfectly secure; use a restricted learning key and delete it when finished.

Fields:

- Provider: OpenAI / Anthropic / Google Gemini / OpenRouter / Custom compatible endpoint
- API key input: password field with reveal toggle
- Model selector
- Storage choice:
  - Session only — cleared when the tab/session ends
  - Remember on this device — stored in local browser storage
- Checkbox: `I understand this key may be visible to this browser environment and should not be a high-value production key.`
- Button: `Test key`
- Button: `Save locally`
- Button: `Use mock coach`

### Connected state

Show:

- Provider
- Model
- Storage mode
- Last tested timestamp
- Token budget estimate per lesson
- Clear key button
- Switch provider button

Never show the full key after save. Show only prefix/suffix, e.g. `sk-••••••••x9A2`.

## Storage model

Use two storage modes:

```ts
type BYOKStorageMode = 'session' | 'local';

type BYOKProvider = 'openai' | 'anthropic' | 'gemini' | 'openrouter' | 'custom';

type BYOKConfig = {
  provider: BYOKProvider;
  model: string;
  endpoint?: string;
  keyPreview: string;
  storageMode: BYOKStorageMode;
  createdAt: string;
  lastTestedAt?: string;
};
```

Storage keys:

```ts
const CONFIG_KEY = 'fme.aiCoach.byok.config.v1';
const SECRET_KEY = 'fme.aiCoach.byok.secret.v1';
```

Rules:

- If storage mode is `session`, store config and key in `sessionStorage`.
- If storage mode is `local`, store config and key in `localStorage` only after confirmation.
- Do not sync storage to cloud.
- Do not include the key in Redux devtools, URL params, analytics, logs, Sentry, console logs, or exported portfolio files.

## Optional passphrase encryption

For `Remember on this device`, offer an optional `Protect with passphrase` toggle.

Implementation note:

- Use Web Crypto API with a passphrase-derived key.
- The passphrase is not stored.
- This protects casual local inspection but does not protect against active XSS running in the same origin while the key is unlocked.

## AI Coach request construction

The coach should only send the minimum lesson context needed:

```ts
type CoachContext = {
  lessonId: string;
  phaseId: string;
  lessonTitle: string;
  learningObjective: string;
  currentTab: 'watch' | 'understand' | 'practice' | 'build' | 'sources';
  selectedText?: string;
  currentArtifactDraft?: Record<string, string>;
  relevantTranscriptExcerpt?: string;
};
```

Do not send:

- API key to our backend
- Learner email
- Full portfolio
- Full course corpus
- Analytics identifiers
- unrelated localStorage data

## Prompt template

System:

```text
You are the AI Coach for the Frontier Model Evaluations course. Be calm, precise, practical, and safe. Teach evaluation design, evidence reasoning, source interpretation, and artifact completion. Do not provide harmful operational cyber, bio, persuasion, or evasion instructions. Use fictional or de-risked examples. When a learner asks for something outside the lesson, connect it back to the course objective.
```

Developer/context:

```text
Current lesson: {{lessonTitle}}
Learning objective: {{learningObjective}}
Current tab: {{currentTab}}
Relevant transcript excerpt: {{relevantTranscriptExcerpt}}
Artifact draft: {{currentArtifactDraft}}
```

User:

```text
{{learnerMessage}}
```

## Suggested prompt chips

- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone
- What source should I read next?
- What evidence would be stronger?

## Voice mode

Voice mode is optional and browser-dependent.

UI:

- `Voice` button in AI Coach panel
- permission request state
- listening waveform state
- transcript preview before sending
- `Send to coach` button
- text-to-speech response toggle

Implementation:

- Use Web Speech API where available for speech recognition and speech synthesis.
- Provide text fallback if unsupported.
- Do not record or store audio.
- Do not send audio to our server.

## Provider adapter interface

```ts
interface CoachProviderAdapter {
  id: BYOKProvider;
  label: string;
  defaultModels: string[];
  validateKey(key: string, config: BYOKConfig): Promise<{ ok: boolean; message: string }>;
  sendMessage(args: {
    key: string;
    model: string;
    endpoint?: string;
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
    signal?: AbortSignal;
  }): Promise<{ text: string; usage?: { inputTokens?: number; outputTokens?: number } }>;
}
```

## Error states

- Missing key: show BYOK modal.
- Invalid key: show `The provider rejected this key. Check the key and provider.`
- CORS/browser blocked: show `This provider may not support direct browser calls. Use mock mode or a supported provider.`
- Rate limited: show `Your provider rate limit was reached. Try again later or switch model.`
- Safety refusal: show `The coach can help with evaluation design, but not operational harmful instructions.`

## Privacy and telemetry rules

Allowed telemetry:

- coach opened
- provider type selected, without key
- model selected, without key
- request success/failure category
- token count if returned

Disallowed telemetry:

- API key
- full prompts
- full responses
- artifact drafts unless user explicitly exports
- external video URLs with personal identifiers

## Figma Make task checklist

Create/refactor these components:

- `BYOKSetupModal`
- `BYOKProviderSelector`
- `BYOKKeyField`
- `BYOKStorageModeToggle`
- `BYOKSecurityNotice`
- `BYOKConnectedBadge`
- `BYOKClearKeyButton`
- `AICoachPanel`
- `CoachMessageList`
- `CoachPromptChips`
- `CoachVoiceMode`
- `CoachDiagramCard`
- `MockCoachFallback`

Add settings page section:

- AI Coach connection
- Provider
- Model
- Storage mode
- Delete key
- Use mock coach

Add Content QA checks:

- BYOK modal exists
- mock mode exists
- no key in code
- no key in analytics
- delete key works
- storage mode is explicit
- warning copy is visible before localStorage save
