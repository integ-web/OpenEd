import { KeyRound, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import {
  deleteBrowserKey,
  hasBrowserKey,
  providerModels,
  saveBrowserKey,
  type ByokStorageMode,
  type TutorProvider,
} from "./byokStore";
import { useTutorPreferences } from "./useTutorPreferences";

export function ByokSettingsPage() {
  const { preferences, setPreferences, savePreferences } = useTutorPreferences();
  const [keyPresent, setKeyPresent] = useState(() => hasBrowserKey());
  const [keyValue, setKeyValue] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await savePreferences(preferences);
    saveBrowserKey(keyValue, preferences.storageMode);
    setKeyPresent(hasBrowserKey());
    setKeyValue("");
  }

  function handleProvider(provider: TutorProvider) {
    setPreferences({
      ...preferences,
      provider,
      model: providerModels[provider][0],
    });
  }

  return (
    <section className="auth-shell">
      <form className="form-card" onSubmit={handleSubmit}>
        <KeyRound size={24} />
        <p className="eyebrow">AI Tutor / BYOK</p>
        <h1>Use a browser-only learning key</h1>
        <label>
          Provider
          <select
            value={preferences.provider}
            onChange={(event) => handleProvider(event.target.value as TutorProvider)}
          >
            <option value="mock">Mock tutor</option>
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="gemini">Gemini</option>
            <option value="openrouter">OpenRouter</option>
          </select>
        </label>
        <label>
          Model
          <select
            value={preferences.model}
            onChange={(event) => setPreferences({ ...preferences, model: event.target.value })}
          >
            {providerModels[preferences.provider].map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="field-group">
          <legend>Storage mode</legend>
          <label>
            <input
              type="radio"
              checked={preferences.storageMode === "session"}
              onChange={() => setPreferences({ ...preferences, storageMode: "session" })}
            />{" "}
            Session only
          </label>
          <label>
            <input
              type="radio"
              checked={preferences.storageMode === "local"}
              onChange={() => setPreferences({ ...preferences, storageMode: "local" as ByokStorageMode })}
            />{" "}
            Local browser storage
          </label>
        </fieldset>
        {preferences.storageMode === "local" && (
          <p className="form-error">
            Local storage survives browser restarts. Use a restricted learning key and delete it when finished.
          </p>
        )}
        <label>
          API key
          <input
            type="password"
            value={keyValue}
            onChange={(event) => setKeyValue(event.target.value)}
            placeholder={keyPresent ? "Key saved in this browser" : "Stored in this browser only"}
          />
        </label>
        <div className="inline-actions">
          <button type="submit" className="button">
            Save browser key
          </button>
          <button
            type="button"
            className="button danger"
            onClick={() => {
              deleteBrowserKey();
              setKeyPresent(false);
            }}
          >
            <Trash2 size={15} /> Delete key
          </button>
        </div>
        <p className="muted">
          No BYOK key is sent to or stored in Supabase. Only provider/model preferences are safe to persist server-side.
        </p>
      </form>
    </section>
  );
}
