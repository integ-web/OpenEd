/* ============================================================================
   BYOK AI Coach — Client-only storage
   Source of truth: byok_state_model_and_storage_v4.md
   SECURITY: No key may be sent to any server, log, or analytics.
   ============================================================================ */

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

export interface ProviderConfig {
  id: AIProvider;
  label: string;
  models: { id: string; label: string }[];
  baseUrl: string;
  supportsCustomEndpoint?: boolean;
  apiKeyPlaceholder: string;
  apiKeyHelpUrl: string;
}

export const PROVIDER_CONFIGS: ProviderConfig[] = [
  {
    id: 'openai',
    label: 'OpenAI',
    models: [
      { id: 'gpt-4o', label: 'GPT-4o' },
      { id: 'gpt-4o-mini', label: 'GPT-4o mini' },
      { id: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    ],
    baseUrl: 'https://api.openai.com/v1/chat/completions',
    apiKeyPlaceholder: 'sk-...',
    apiKeyHelpUrl: 'https://platform.openai.com/api-keys',
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    models: [
      { id: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5' },
      { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6' },
      { id: 'claude-opus-4-8', label: 'Claude Opus 4.8' },
    ],
    baseUrl: 'https://api.anthropic.com/v1/messages',
    apiKeyPlaceholder: 'sk-ant-...',
    apiKeyHelpUrl: 'https://console.anthropic.com/settings/keys',
  },
  {
    id: 'google',
    label: 'Google Gemini',
    models: [
      { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
      { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
    ],
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    apiKeyPlaceholder: 'AIza...',
    apiKeyHelpUrl: 'https://aistudio.google.com/app/apikey',
  },
  {
    id: 'openrouter',
    label: 'OpenRouter',
    models: [
      { id: 'anthropic/claude-haiku', label: 'Claude Haiku (via OR)' },
      { id: 'openai/gpt-4o-mini', label: 'GPT-4o mini (via OR)' },
      { id: 'google/gemini-flash-1.5', label: 'Gemini Flash (via OR)' },
      { id: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B (via OR)' },
    ],
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
    apiKeyPlaceholder: 'sk-or-...',
    apiKeyHelpUrl: 'https://openrouter.ai/keys',
  },
  {
    id: 'ollama',
    label: 'Local / Ollama',
    models: [
      { id: 'llama3.2', label: 'Llama 3.2' },
      { id: 'mistral', label: 'Mistral' },
      { id: 'phi3', label: 'Phi-3' },
    ],
    baseUrl: 'http://localhost:11434/api/chat',
    supportsCustomEndpoint: true,
    apiKeyPlaceholder: 'No key needed (leave blank)',
    apiKeyHelpUrl: 'https://ollama.com',
  },
  {
    id: 'custom',
    label: 'Custom endpoint',
    models: [
      { id: 'custom', label: 'Custom model' },
    ],
    baseUrl: '',
    supportsCustomEndpoint: true,
    apiKeyPlaceholder: 'Your API key',
    apiKeyHelpUrl: '',
  },
];

// ── Storage ───────────────────────────────────────────────────────────────────

const KEY_NS = 'fel_byok';
let _sessionKey: string | null = null;

export function maskKey(key: string): string {
  if (!key || key.length < 10) return '••••••••';
  return `${key.slice(0, 6)}••••${key.slice(-4)}`;
}

export function saveBYOKKey(
  key: string,
  opts: { provider: AIProvider; model: string; endpoint?: string; storageMode: KeyStorageMode }
): BYOKSettings {
  _sessionKey = key;
  const settings: BYOKSettings = {
    ...opts,
    keyMasked: maskKey(key),
    connectedAt: new Date().toISOString(),
  };
  const safeJson = JSON.stringify(settings); // does not contain the raw key
  try {
    if (opts.storageMode === 'local_browser_storage') {
      localStorage.setItem(`${KEY_NS}_key`, key);
      localStorage.setItem(`${KEY_NS}_settings`, safeJson);
    } else {
      sessionStorage.setItem(`${KEY_NS}_settings`, safeJson);
    }
  } catch {
    // storage blocked — key lives in memory only for this session
  }
  return settings;
}

export function getBYOKKey(): string | null {
  if (_sessionKey) return _sessionKey;
  try {
    return localStorage.getItem(`${KEY_NS}_key`);
  } catch { return null; }
}

export function loadBYOKSettings(): BYOKSettings | null {
  try {
    const local = localStorage.getItem(`${KEY_NS}_settings`);
    if (local) return JSON.parse(local);
    const session = sessionStorage.getItem(`${KEY_NS}_settings`);
    if (session) return JSON.parse(session);
  } catch { /* ignore */ }
  return null;
}

export function clearBYOKKey(): void {
  _sessionKey = null;
  try {
    localStorage.removeItem(`${KEY_NS}_key`);
    localStorage.removeItem(`${KEY_NS}_settings`);
  } catch { /* ignore */ }
  try {
    sessionStorage.removeItem(`${KEY_NS}_settings`);
  } catch { /* ignore */ }
}

// ── Live API call (client-only, key never logged) ─────────────────────────────

export interface CoachMessage { role: 'user' | 'assistant'; content: string }

export async function callProviderAPI(
  provider: AIProvider,
  model: string,
  endpoint: string | undefined,
  messages: CoachMessage[],
  systemPrompt: string
): Promise<string> {
  const key = getBYOKKey();
  if (!key) throw new Error('No API key available');

  if (provider === 'anthropic') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model,
        max_tokens: 512,
        system: systemPrompt,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as any)?.error?.message ?? `Provider error ${res.status}`);
    }
    const data = await res.json();
    return data.content?.[0]?.text ?? '';
  }

  if (provider === 'google') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as any)?.error?.message ?? `Provider error ${res.status}`);
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  }

  // OpenAI-compatible (openai, openrouter, ollama, custom)
  const baseUrl =
    provider === 'ollama' ? (endpoint ?? 'http://localhost:11434/v1/chat/completions')
    : provider === 'custom' ? (endpoint ?? '')
    : provider === 'openrouter' ? 'https://openrouter.ai/api/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (provider !== 'ollama') headers['Authorization'] = `Bearer ${key}`;

  const res = await fetch(baseUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model,
      max_tokens: 512,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = (err as any)?.error?.message ?? `Provider error ${res.status}`;
    if (res.status === 401 || res.status === 403) throw new Error(`invalid_key: ${msg}`);
    if (res.status === 429) throw new Error(`rate_limit: ${msg}`);
    throw new Error(msg);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

// ── Mock responses ────────────────────────────────────────────────────────────

export function getMockResponse(prompt: string, lessonTitle: string): string {
  const lc = prompt.toLowerCase();
  if (lc.includes('diagram') || lc.includes('visual') || lc.includes('show me')) {
    return `Here's a simple text diagram for "${lessonTitle}":\n\n[Objective] → [Measurement design] → [Data collection] → [Analysis] → [Evidence card] → [Decision]\n\nEach step should trace back to the specific claim you're testing. Mock mode — connect a key for full AI responses.`;
  }
  if (lc.includes('quiz') || lc.includes('test me') || lc.includes('question')) {
    return `Quick quiz question for "${lessonTitle}":\n\nWhat is the most common validity threat when reusing a public benchmark for a private capability claim?\n\nA) Benchmark saturation\nB) Contamination from training data\nC) Prompt format mismatch\nD) All of the above — they compound\n\n(Mock mode — connect your own key for adaptive quizzing.)`;
  }
  if (lc.includes('artifact') || lc.includes('fill') || lc.includes('help me write')) {
    return `For the artifact in "${lessonTitle}", start by naming:\n1. The specific claim being tested\n2. The model access condition (API / black-box / weights)\n3. What counts as success\n4. What evidence would change the recommendation\n\n(Mock mode — connect your own key for personalized artifact coaching.)`;
  }
  if (lc.includes('capstone') || lc.includes('aster') || lc.includes('portfolio')) {
    return `This lesson connects to the capstone through the evidence card workflow. The key artifact from "${lessonTitle}" should feed directly into your Aster-3 dossier. Specifically: document your evaluation objective, the benchmark or task used, and the decision it informed.\n\n(Mock mode — connect your own key for full capstone coaching.)`;
  }
  if (lc.includes('explain') || lc.includes('simply') || lc.includes('what is')) {
    return `"${lessonTitle}" in plain terms: evaluation is the discipline of turning model behavior into decision-grade evidence. The practical habit is to start with the decision — who needs to decide what — and work backward to the measurement.\n\n(Mock mode — connect your own key for lesson-specific explanations.)`;
  }
  return `Good question about "${prompt.slice(0, 60)}". In evaluation design, the key is always to trace your answer back to the specific claim you're testing and the decision it needs to support. Want a concrete example?\n\n(Mock mode — connect your own key for full AI coaching on "${lessonTitle}".)`;
}

// ── System prompt builder ─────────────────────────────────────────────────────

export function buildSystemPrompt(lessonTitle: string, objective: string, keyIdeas: string[]): string {
  return `You are the AI Coach for the Frontier Evaluation Lab course. You help learners understand and practice frontier model evaluation.

Lesson: ${lessonTitle}
Objective: ${objective}
Key ideas: ${keyIdeas.slice(0, 3).join('; ')}

Rules:
- Keep all examples fictional, sandboxed, and non-operational.
- Never provide actual harmful instructions, exploit code, or dangerous uplift.
- Focus on evaluation design, evidence discipline, and decision-grade reasoning.
- Be concise and specific. Reference the lesson objective when relevant.
- If asked about cyber/bio/persuasion risks, redirect to safe evaluation design and threat modeling.
- Suggest next questions at the end of each response.`;
}
