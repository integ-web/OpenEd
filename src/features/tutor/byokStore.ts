export type TutorProvider = "mock" | "openai" | "anthropic" | "gemini" | "openrouter";
export type ByokStorageMode = "session" | "local";

export type ByokPreferences = {
  provider: TutorProvider;
  model: string;
  storageMode: ByokStorageMode;
};

const sessionKey = "opened.byok.sessionKey";
const localKey = "opened.byok.localKey";

export const providerModels: Record<TutorProvider, string[]> = {
  mock: ["grounded-mock"],
  openai: ["gpt-4.1-mini", "gpt-4.1"],
  anthropic: ["claude-3-5-haiku", "claude-3-5-sonnet"],
  gemini: ["gemini-1.5-flash", "gemini-1.5-pro"],
  openrouter: ["openai/gpt-4.1-mini", "anthropic/claude-3.5-haiku"],
};

export function saveBrowserKey(keyValue: string, mode: ByokStorageMode) {
  const existingKey = getBrowserKey();
  const keyToSave = keyValue || existingKey;

  sessionStorage.removeItem(sessionKey);
  localStorage.removeItem(localKey);
  
  if (!keyToSave) return;
  
  if (mode === "session") {
    sessionStorage.setItem(sessionKey, keyToSave);
  } else {
    localStorage.setItem(localKey, keyToSave);
  }
  window.dispatchEvent(new Event("opened-byok"));
}

export function hasBrowserKey() {
  return Boolean(sessionStorage.getItem(sessionKey) || localStorage.getItem(localKey));
}

export function deleteBrowserKey() {
  sessionStorage.removeItem(sessionKey);
  localStorage.removeItem(localKey);
  window.dispatchEvent(new Event("opened-byok"));
}

export function getBrowserKey(): string | null {
  return sessionStorage.getItem(sessionKey) || localStorage.getItem(localKey) || null;
}

export function groundedTutorReply(prompt: string, lessonTitle: string, sourceTitles: string[]) {
  const normalized = prompt.toLowerCase();
  const sourceRef = sourceTitles.length
    ? `Sources in context: ${sourceTitles.slice(0, 2).join("; ")}.`
    : "No mapped source is attached.";
  if (normalized.includes("quiz")) {
    return `Try this: if the final answer is correct but the path violates a constraint, should the evaluation pass, fail, or split the judgment? ${sourceRef}`;
  }
  if (normalized.includes("artifact") || normalized.includes("proof")) {
    return `For the artifact, make three separate claims: outcome signal, trajectory signal, and decision implication. Tie each claim back to ${lessonTitle}. ${sourceRef}`;
  }
  if (normalized.includes("cite") || normalized.includes("source")) {
    return `Use the mapped sources as anchors and avoid unsupported generalizations. ${sourceRef}`;
  }
  return `In simple terms: ${lessonTitle} asks you to judge both what the model produced and how it got there. A good evaluation trace keeps those signals separate. ${sourceRef}`;
}
