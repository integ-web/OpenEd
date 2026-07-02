import { useState, useRef, useEffect } from "react";
import {
  Sparkles, Key, Eye, EyeOff, Shield, AlertTriangle, AlertCircle,
  Info, Check, X, ChevronRight, ArrowLeft, ArrowRight, RefreshCw,
  Trash2, Settings, BookOpen, Mic, MicOff, Volume2, VolumeX,
  ExternalLink, Bookmark, FileText, Award, Lock, Unlock,
  MessageSquare, Send, ThumbsUp, ThumbsDown, Flag, Copy,
  Monitor, Zap, Clock, Activity, Moon, Sun, Menu, ChevronDown,
  GraduationCap, Users, Image, Map, HelpCircle, Play
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "setup" | "connected" | "mock"
  | "chat" | "visual" | "quiz-mode" | "artifact-mode"
  | "safety" | "error" | "educator-handoff"
  | "voice" | "settings";

type Provider = "openai" | "anthropic" | "gemini" | "openrouter" | "custom";
type StorageMode = "session" | "local";
type TutorMode = "explain" | "hint" | "socratic" | "source-guide" | "artifact-coach" | "diagram";
type ErrorKind = "invalid-key" | "rate-limit" | "cors" | "quota" | "no-key";

// ─── Design tokens ────────────────────────────────────────────────────────────

const C = {
  blue:   { base:"#2563EB", light:"#EFF6FF", dark:"#60A5FA", border:"#BFDBFE", muted:"#DBEAFE" },
  teal:   { base:"#0F766E", light:"#F0FDFA", dark:"#2DD4BF", border:"#99F6E4", muted:"#CCFBF1" },
  violet: { base:"#6D28D9", light:"#F5F3FF", dark:"#A78BFA", border:"#DDD6FE", muted:"#EDE9FE" },
  orange: { base:"#EA580C", light:"#FFF7ED", dark:"#FB923C", border:"#FED7AA", muted:"#FFEDD5" },
  green:  { base:"#15803D", light:"#F0FDF4", dark:"#4ADE80", border:"#BBF7D0", muted:"#DCFCE7" },
  amber:  { base:"#B45309", light:"#FFFBEB", dark:"#FBBF24", border:"#FDE68A", muted:"#FEF3C7" },
  red:    { base:"#B91C1C", light:"#FEF2F2", dark:"#F87171", border:"#FECACA", muted:"#FEE2E2" },
  slate:  { base:"#475569", light:"#F8FAFC", dark:"#94A3B8", border:"#E2E8F0", muted:"#F1F5F9" },
};

// ─── Provider config ──────────────────────────────────────────────────────────

const PROVIDERS: { id: Provider; label: string; models: string[]; keyHint: string; docsUrl: string }[] = [
  { id:"openai",     label:"OpenAI",     models:["gpt-4o","gpt-4o-mini","gpt-4-turbo","gpt-3.5-turbo"], keyHint:"sk-...",         docsUrl:"https://platform.openai.com/api-keys" },
  { id:"anthropic",  label:"Anthropic",  models:["claude-3-5-sonnet-20241022","claude-3-haiku-20240307","claude-3-opus-20240229"],  keyHint:"sk-ant-...",     docsUrl:"https://console.anthropic.com/account/keys" },
  { id:"gemini",     label:"Google Gemini", models:["gemini-1.5-flash","gemini-1.5-pro","gemini-2.0-flash"], keyHint:"AI...",      docsUrl:"https://aistudio.google.com/app/apikey" },
  { id:"openrouter", label:"OpenRouter", models:["google/gemini-flash-1.5","openai/gpt-4o-mini","anthropic/claude-3-haiku"],        keyHint:"sk-or-...",      docsUrl:"https://openrouter.ai/keys" },
  { id:"custom",     label:"Custom endpoint", models:[],                                                                            keyHint:"Your API key",  docsUrl:"" },
];

// ─── Mock tutor responses (grounded in FME content, no orchestration text) ───

type TutorMessage = {
  role: "user" | "tutor";
  text: string;
  mode?: TutorMode;
  citations?: { id: string; title: string; url: string }[];
  uncertainty?: string;
  followUp?: string;
  ratingGiven?: "up" | "down" | null;
};

const MOCK_CONVERSATION: TutorMessage[] = [
  {
    role:"user",
    text:"What's the difference between an outcome metric and a trajectory metric?",
  },
  {
    role:"tutor",
    mode:"explain",
    text:"An **outcome metric** measures the final result — did the model produce the correct answer, complete the task, pass the test?\n\nA **trajectory metric** measures *how* the model got there — which tools it called, what state changes it made, whether it violated any constraints along the way.\n\nThe critical insight: these can point in opposite directions. An agent might return the right file while having made three unauthorised writes during the process. Outcome: pass. Trajectory: fail.",
    citations:[
      { id:"S-016", title:"OSWorld — XLang Lab", url:"https://os-world.github.io/" },
      { id:"S-015", title:"SWE-bench Verified", url:"https://www.swebench.com/" },
    ],
    followUp:"Want me to walk through a worked example, or would you like to try classifying one yourself first?",
    ratingGiven: null,
  },
  {
    role:"user",
    text:"Give me a worked example.",
  },
  {
    role:"tutor",
    mode:"explain",
    text:"Here's a safe, fictional scenario:\n\nA coding agent is asked to fix a login bug. After the run:\n\n- **Outcome evidence:** Test suite passes. Bug resolved.\n- **Trajectory evidence:** The agent also modified a password-reset config file it wasn't asked to touch, made 14 API calls instead of the expected 3, and silently set a session timeout to 0.\n\nA deployment decision based only on outcome would clear this agent. Trajectory evaluation would flag it for human review.\n\nThis is why agent evaluations need both lanes — the final answer can be correct while the path was unsafe.",
    citations:[
      { id:"S-019", title:"Measuring AI Ability to Complete Long Tasks — METR", url:"https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/" },
    ],
    ratingGiven: "up",
  },
];

const SUGGESTED_CHIPS = [
  "Explain this simply",
  "Show me a diagram",
  "Quiz me on this",
  "Help me fill the artifact",
  "What source should I read next?",
  "Connect this to the capstone",
];

// ─── Shared micro-components ──────────────────────────────────────────────────

function ModeBadge({ mode }: { mode: TutorMode }) {
  const cfg: Record<TutorMode, { label: string; color: typeof C.violet }> = {
    "explain":        { label:"Explain",       color:C.violet },
    "hint":           { label:"Hint",          color:C.teal   },
    "socratic":       { label:"Socratic",      color:C.orange },
    "source-guide":   { label:"Source guide",  color:C.blue   },
    "artifact-coach": { label:"Artifact help", color:C.amber  },
    "diagram":        { label:"Diagram",       color:C.teal   },
  };
  const t = cfg[mode];
  return (
    <span style={{ background: t.color.light, color: t.color.base, border: `1px solid ${t.color.border}` }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold">
      <Sparkles size={9} />
      {t.label}
    </span>
  );
}

function SecurityNotice({ level }: { level: "info" | "warn" | "critical" }) {
  const cfg = {
    info:     { icon: Info,          color: C.blue,  title: "Your key stays in this browser" },
    warn:     { icon: AlertTriangle, color: C.amber, title: "Browser storage is not a secure vault" },
    critical: { icon: AlertCircle,   color: C.red,   title: "This key may be visible to browser extensions and XSS" },
  }[level];
  const Icon = cfg.icon;
  return (
    <div style={{ background: cfg.color.light, border: `1px solid ${cfg.color.border}` }}
      className="rounded-xl p-3 flex items-start gap-2.5">
      <Icon size={14} style={{ color: cfg.color.base }} className="flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-foreground">{cfg.title}</p>
        {level === "warn" && (
          <p className="text-xs text-secondary-foreground mt-0.5 leading-relaxed">
            Use a restricted, low-spend learning key — not your main production key. You can delete it from any device with one click.
          </p>
        )}
        {level === "info" && (
          <p className="text-xs text-secondary-foreground mt-0.5">
            We never store, log, or transmit your key to our servers. Session mode clears it when you close the tab.
          </p>
        )}
      </div>
    </div>
  );
}

function ConnectedBadge({ provider, model, mode }: { provider: string; model: string; mode: StorageMode }) {
  return (
    <div style={{ background: C.green.light, border: `1px solid ${C.green.border}` }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
      <span className="text-xs font-medium" style={{ color: C.green.base }}>
        {provider} · {model} · {mode === "session" ? "Session" : "Saved locally"}
      </span>
    </div>
  );
}

function SectionHead({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="mb-6 pb-4 border-b border-border">
      <h2 className="text-xl font-bold text-foreground">{label}</h2>
      {sub && <p className="text-sm text-secondary-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Screen 1: BYOK Setup ─────────────────────────────────────────────────────

function SetupScreen({ go }: { go: (s: Screen) => void }) {
  const [step, setStep] = useState<"provider" | "key" | "storage">("provider");
  const [provider, setProvider] = useState<Provider | null>(null);
  const [model, setModel] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [storageMode, setStorageMode] = useState<StorageMode>("session");
  const [localConfirmed, setLocalConfirmed] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"ok" | "fail" | null>(null);

  const selectedProvider = PROVIDERS.find(p => p.id === provider);

  function handleTest() {
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTestResult(keyValue.length > 10 ? "ok" : "fail");
      setTesting(false);
    }, 1400);
  }

  function maskKey(k: string) {
    if (k.length < 8) return "••••••••";
    return k.slice(0, 4) + "••••••••" + k.slice(-4);
  }

  return (
    <div className="p-6 max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <div style={{ background: C.violet.base }} className="w-8 h-8 rounded-xl flex items-center justify-center">
          <Sparkles size={16} color="white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Set up AI Tutor</h1>
          <p className="text-xs text-muted-foreground">Bring your own key — it never leaves this browser</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-7">
        {([ ["provider","Provider"],["key","API key"],["storage","Storage"] ] as [typeof step, string][]).map(([id, label], i) => (
          <div key={id} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors
              ${step === id ? "bg-violet-600 text-white" : ["provider","key","storage"].indexOf(step) > i ? "bg-green-500 text-white" : "bg-secondary text-muted-foreground"}`}>
              {["provider","key","storage"].indexOf(step) > i ? <Check size={10} /> : i + 1}
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">{label}</span>
            {i < 2 && <div className={`h-px w-8 ${["provider","key","storage"].indexOf(step) > i ? "bg-green-400" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step: Provider */}
      {step === "provider" && (
        <div className="space-y-4">
          <p className="text-sm text-secondary-foreground">Choose your AI provider. OpenAI and Anthropic work best with the tutor's pedagogical grounding.</p>
          <div className="grid grid-cols-2 gap-2">
            {PROVIDERS.filter(p => p.id !== "custom").map(p => (
              <button key={p.id} onClick={() => { setProvider(p.id); setModel(p.models[0] ?? ""); }}
                className={`px-4 py-3.5 rounded-xl border text-left transition-all ${
                  provider === p.id
                    ? "border-violet-400 bg-violet-50 text-violet-800"
                    : "border-border bg-card hover:bg-secondary hover:border-violet-200"
                }`}>
                <p className="font-semibold text-sm">{p.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{p.models[0]}</p>
              </button>
            ))}
            <button onClick={() => { setProvider("custom"); setModel(""); }}
              className={`px-4 py-3.5 rounded-xl border text-left col-span-2 transition-all ${
                provider === "custom"
                  ? "border-violet-400 bg-violet-50 text-violet-800"
                  : "border-border border-dashed bg-card hover:bg-secondary text-muted-foreground"
              }`}>
              <p className="text-sm font-medium">Custom endpoint</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Any OpenAI-compatible API</p>
            </button>
          </div>

          {provider && selectedProvider && selectedProvider.models.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">Model</label>
              <select value={model} onChange={e => setModel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-200 appearance-none">
                {selectedProvider.models.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          )}

          {provider && selectedProvider && selectedProvider.docsUrl && (
            <a href={selectedProvider.docsUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-primary hover:underline">
              <ExternalLink size={11} /> Get a {selectedProvider.label} API key
            </a>
          )}

          <SecurityNotice level="info" />

          <button disabled={!provider} onClick={() => setStep("key")}
            style={{ background: provider ? C.violet.base : undefined }}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${provider ? "text-white hover:opacity-90" : "bg-secondary text-muted-foreground cursor-not-allowed"}`}>
            Continue with {selectedProvider?.label ?? "provider"}
          </button>

          <button onClick={() => go("mock")}
            className="w-full py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-dashed border-border">
            Use mock tutor instead — no key needed
          </button>
        </div>
      )}

      {/* Step: Key */}
      {step === "key" && (
        <div className="space-y-4">
          <p className="text-sm text-secondary-foreground">
            Enter a restricted learning key. Create one specifically for OpenEd — not your main production key.
          </p>
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">
              API key <span className="text-muted-foreground font-normal ml-1">({selectedProvider?.keyHint})</span>
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={keyValue}
                onChange={e => { setKeyValue(e.target.value); setTestResult(null); }}
                placeholder={selectedProvider?.keyHint}
                className="w-full px-3 py-2.5 pr-10 rounded-xl border border-border bg-background text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-violet-200 transition" />
              <button onClick={() => setShowKey(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Test key */}
          <div className="flex items-center gap-3">
            <button onClick={handleTest} disabled={!keyValue || testing}
              style={{ background: keyValue ? C.violet.light : undefined, color: keyValue ? C.violet.base : undefined, border: keyValue ? `1px solid ${C.violet.border}` : undefined }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${!keyValue ? "border border-border text-muted-foreground cursor-not-allowed" : "hover:opacity-80"}`}>
              {testing ? <><RefreshCw size={11} className="animate-spin" /> Testing…</> : <><Zap size={11} /> Test key</>}
            </button>
            {testResult === "ok" && (
              <span className="flex items-center gap-1.5 text-xs text-green-700">
                <Check size={12} className="text-green-600" /> Key works
              </span>
            )}
            {testResult === "fail" && (
              <span className="flex items-center gap-1.5 text-xs text-red-700">
                <X size={12} className="text-red-500" /> Provider rejected this key. Check the key and provider.
              </span>
            )}
          </div>

          <SecurityNotice level="warn" />

          <div className="flex gap-3">
            <button onClick={() => setStep("provider")}
              className="px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary transition-colors">
              Back
            </button>
            <button disabled={!keyValue || testResult === "fail"} onClick={() => setStep("storage")}
              style={{ background: keyValue && testResult !== "fail" ? C.violet.base : undefined }}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${keyValue && testResult !== "fail" ? "text-white hover:opacity-90" : "bg-secondary text-muted-foreground cursor-not-allowed"}`}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step: Storage */}
      {step === "storage" && (
        <div className="space-y-4">
          <p className="text-sm text-secondary-foreground">How should the tutor remember your key?</p>

          <div className="space-y-2">
            <button onClick={() => { setStorageMode("session"); setLocalConfirmed(false); }}
              className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${storageMode === "session" ? "border-violet-400 bg-violet-50" : "border-border bg-card hover:bg-secondary"}`}>
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${storageMode === "session" ? "border-violet-600 bg-violet-600" : "border-border"}`}>
                  {storageMode === "session" && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground flex items-center gap-2">
                    Session only <span className="text-[10px] font-mono bg-green-100 text-green-700 px-1.5 py-0.5 rounded">RECOMMENDED</span>
                  </p>
                  <p className="text-xs text-secondary-foreground mt-0.5">Key is cleared when you close this tab. Safest option. You re-enter it next session.</p>
                </div>
              </div>
            </button>

            <button onClick={() => setStorageMode("local")}
              className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${storageMode === "local" ? "border-amber-400 bg-amber-50" : "border-border bg-card hover:bg-secondary"}`}>
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${storageMode === "local" ? "border-amber-500 bg-amber-500" : "border-border"}`}>
                  {storageMode === "local" && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground flex items-center gap-2">
                    Remember on this device <AlertTriangle size={11} className="text-amber-500" />
                  </p>
                  <p className="text-xs text-secondary-foreground mt-0.5">Stored in your browser's local storage. Convenient but visible to browser extensions and anyone with physical access to this device.</p>
                </div>
              </div>
            </button>
          </div>

          {storageMode === "local" && (
            <div style={{ background: C.amber.light, border: `1px solid ${C.amber.border}` }} className="rounded-xl p-4 space-y-3">
              <SecurityNotice level="critical" />
              <label className="flex items-start gap-3 cursor-pointer">
                <div onClick={() => setLocalConfirmed(c => !c)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${localConfirmed ? "border-amber-600 bg-amber-600" : "border-amber-400 hover:border-amber-600"}`}>
                  {localConfirmed && <Check size={11} color="white" />}
                </div>
                <span className="text-xs text-secondary-foreground leading-relaxed">
                  I understand this key may be accessible to this browser environment. I am using a restricted, low-spend learning key — not a high-value production key.
                </span>
              </label>
            </div>
          )}

          <div className="bg-card border border-border rounded-xl p-4 space-y-1.5">
            <p className="text-xs font-semibold text-foreground">Your settings</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {[
                ["Provider", selectedProvider?.label ?? "—"],
                ["Model", model || "—"],
                ["Key", maskKey(keyValue)],
                ["Storage", storageMode === "session" ? "Session only" : "Local browser"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground">{k}</span>
                  <span className="text-[10px] font-mono text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep("key")}
              className="px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary transition-colors">
              Back
            </button>
            <button
              disabled={storageMode === "local" && !localConfirmed}
              onClick={() => go("chat")}
              style={{ background: (storageMode === "session" || localConfirmed) ? C.violet.base : undefined }}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${(storageMode === "session" || localConfirmed) ? "text-white hover:opacity-90" : "bg-secondary text-muted-foreground cursor-not-allowed"}`}>
              Save and open tutor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Screen 2: Connected Settings ────────────────────────────────────────────

function ConnectedScreen({ go }: { go: (s: Screen) => void }) {
  const [deleted, setDeleted] = useState(false);

  if (deleted) {
    return (
      <div className="p-6 max-w-md">
        <SectionHead label="Key deleted" />
        <div style={{ background: C.green.light, border: `1px solid ${C.green.border}` }} className="rounded-xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <Check size={14} style={{ color: C.green.base }} />
            <p className="text-sm font-semibold text-foreground">Key removed from this browser.</p>
          </div>
          <p className="text-xs text-secondary-foreground">Your API key has been deleted from session and local storage. The tutor will return to mock mode until you add a key again.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => go("setup")} style={{ background: C.violet.base }}
            className="text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
            Add a new key
          </button>
          <button onClick={() => go("mock")}
            className="px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary transition-colors">
            Use mock tutor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg">
      <SectionHead label="AI Tutor connection" sub="Your key is stored in this browser only. OpenEd cannot see it." />

      {/* Connected card */}
      <div style={{ border: `1.5px solid ${C.green.border}`, background: C.green.light }} className="rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-sm font-semibold text-foreground">Tutor connected</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { l:"Provider",     v:"OpenAI" },
            { l:"Model",        v:"gpt-4o-mini" },
            { l:"Key",          v:"sk-••••••••x9A2" },
            { l:"Storage",      v:"Session only" },
            { l:"Last tested",  v:"Today at 14:32" },
            { l:"Est. tokens/lesson", v:"~2,400 tokens" },
          ].map(({ l, v }) => (
            <div key={l} className="bg-white/60 rounded-xl p-3">
              <p className="text-[10px] font-mono text-muted-foreground">{l}</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cost indicator */}
      <div className="bg-card border border-border rounded-xl p-4 mb-5">
        <p className="text-xs font-semibold text-foreground mb-2">Session usage</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div style={{ width: "18%", background: C.blue.base }} className="h-full rounded-full" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">~420 / 2,400 tokens</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5">At gpt-4o-mini pricing, this session costs approximately $0.0003.</p>
      </div>

      <div className="space-y-2">
        <button onClick={() => go("setup")}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:bg-secondary transition-colors text-sm text-foreground">
          <RefreshCw size={14} className="text-muted-foreground" /> Switch provider or model
        </button>
        <button onClick={() => go("chat")}
          style={{ background: C.violet.base }}
          className="w-full text-white px-4 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Sparkles size={14} /> Open tutor
        </button>
        <button onClick={() => setDeleted(true)}
          style={{ background: C.red.light, color: C.red.base, border: `1px solid ${C.red.border}` }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold hover:opacity-80 transition-opacity">
          <Trash2 size={14} /> Delete key from this browser
        </button>
      </div>
    </div>
  );
}

// ─── Screen 3: Mock Coach ─────────────────────────────────────────────────────

function MockScreen({ go }: { go: (s: Screen) => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "tutor"; text: string }[]>([
    { role:"tutor", text:"I'm the mock tutor — I can answer common questions about this lesson without an AI key. For more in-depth help, add your own key above." },
  ]);

  const mockResponses: Record<string, string> = {
    default: "That's a thoughtful question. In mock mode, I can share that the lesson covers the distinction between what a model *produces* (outcome) and *how* it got there (trajectory). Which part would you like to explore?",
  };

  function send() {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(m => [...m, { role:"user", text:userMsg }]);
    setTimeout(() => {
      setMessages(m => [...m, { role:"tutor", text:mockResponses.default }]);
    }, 600);
  }

  return (
    <div className="p-6 max-w-xl">
      <div className="flex items-center gap-3 mb-4">
        <div style={{ background: C.slate.light, border: `1px solid ${C.slate.border}` }}
          className="w-8 h-8 rounded-xl flex items-center justify-center">
          <Sparkles size={16} className="text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">AI Tutor — Mock mode</p>
          <p className="text-xs text-muted-foreground">Limited answers · No API key required</p>
        </div>
        <button onClick={() => go("setup")}
          style={{ background: C.violet.base }}
          className="text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5">
          <Key size={11} /> Add key
        </button>
      </div>

      <div style={{ background: C.amber.light, border: `1px solid ${C.amber.border}` }}
        className="rounded-xl p-3 mb-4 flex items-start gap-2">
        <Info size={13} style={{ color: C.amber.base }} className="flex-shrink-0 mt-0.5" />
        <p className="text-xs text-secondary-foreground">
          Mock mode uses pre-written lesson summaries, not a live AI model. It can answer common questions about this lesson but won't adapt to your specific phrasing or follow-up questions in depth.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden mb-3">
        <div className="p-4 space-y-3 min-h-40 max-h-64 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
              <div className={`rounded-xl px-3 py-2.5 text-xs leading-relaxed max-w-[85%] ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.slate.border}` }} className="p-3 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask about this lesson…"
            className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <button onClick={send} style={{ background: C.violet.base }}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0">
            <Send size={13} color="white" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {SUGGESTED_CHIPS.slice(0,4).map(chip => (
          <button key={chip} onClick={() => { setInput(chip); }}
            style={{ border: `1px solid ${C.slate.border}`, color: C.slate.base }}
            className="text-[10px] px-2.5 py-1 rounded-full bg-card hover:bg-secondary transition-colors">
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 4: Lesson Chat (full experience) ──────────────────────────────────

function ChatScreen({ go }: { go: (s: Screen) => void }) {
  const [messages, setMessages] = useState<TutorMessage[]>(MOCK_CONVERSATION);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showCitations, setShowCitations] = useState<Record<number, boolean>>({});
  const [ratings, setRatings] = useState<Record<number, "up" | "down">>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  function toggleCitation(i: number) {
    setShowCitations(s => ({ ...s, [i]: !s[i] }));
  }

  function rate(i: number, v: "up" | "down") {
    setRatings(r => ({ ...r, [i]: v }));
  }

  const nextResponses: Record<string, TutorMessage> = {
    "Explain this simply": {
      role:"tutor", mode:"explain",
      text:"Simple version:\n\n- **Outcome** = did it work?\n- **Trajectory** = did it work *safely*?\n\nFor a static quiz, outcome is enough. For an agent that takes actions in the world, you need both.",
      ratingGiven: null,
    },
    "Show me a diagram": {
      role:"tutor", mode:"diagram",
      text:"Here's a two-lane mental model:",
      ratingGiven: null,
    },
    "Quiz me on this": {
      role:"tutor", mode:"socratic",
      text:"Here's a retrieval question for you:\n\nAn agent returns the correct output, but the evaluation log shows it made 8 tool calls when the expected maximum was 3. Under which evaluation type would this count as a failure?\n\nTake your time — write what you think before I confirm.",
      ratingGiven: null,
    },
    "What source should I read next?": {
      role:"tutor", mode:"source-guide",
      text:"Based on where you are in this lesson, I'd suggest starting with **OSWorld** (S-016) — it evaluates multimodal desktop agents in real computer environments, which makes trajectory evidence concrete and visible.\n\nAfter that, **METR's long-task measurement** paper (S-019) introduces time-horizon framing that directly connects to trajectory reliability.",
      citations:[
        { id:"S-016", title:"OSWorld — XLang Lab", url:"https://os-world.github.io/" },
        { id:"S-019", title:"Measuring AI Ability to Complete Long Tasks — METR", url:"https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/" },
      ],
      ratingGiven: null,
    },
  };

  function send(text?: string) {
    const msg = text ?? input;
    if (!msg.trim()) return;
    setInput("");
    const newMsg: TutorMessage = { role:"user", text:msg };
    setMessages(m => [...m, newMsg]);
    setTyping(true);
    setTimeout(() => {
      const reply = nextResponses[msg] ?? {
        role:"tutor" as const, mode:"explain" as TutorMode,
        text:"That connects to the lesson's core idea. Trajectory evidence captures what happens between the model's first action and its final output — and in agentic systems, that space is often where safety failures hide.",
        uncertainty:"This is based on general evaluation principles. For course-specific nuance, check the lesson sources.",
        ratingGiven: null,
      };
      setMessages(m => [...m, reply]);
      setTyping(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:"smooth" }), 50);
    }, 1000);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden max-w-2xl mx-auto w-full">
      {/* Tutor header */}
      <div style={{ background: `linear-gradient(135deg, ${C.violet.light}, #faf5ff)`, borderBottom: `1px solid ${C.violet.border}` }}
        className="px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <div style={{ background: C.violet.base }} className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles size={15} color="white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">AI Tutor</p>
            <ConnectedBadge provider="OpenAI" model="gpt-4o-mini" mode="session" />
          </div>
          <p className="text-[10px] text-muted-foreground">Grounded in P1.L4 — Outcome vs Trajectory Metrics</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => go("voice")}
            className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors" title="Voice mode">
            <Mic size={13} className="text-muted-foreground" />
          </button>
          <button onClick={() => go("settings")}
            className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors" title="Settings">
            <Settings size={13} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            {m.role === "user" ? (
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%] leading-relaxed">
                {m.text}
              </div>
            ) : (
              <div className="space-y-2 max-w-[92%]">
                {m.mode && (
                  <div className="flex items-center gap-2">
                    <ModeBadge mode={m.mode} />
                  </div>
                )}
                <div style={{ background: C.violet.muted, border: `1px solid ${C.violet.border}` }}
                  className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed" style={{ color:"#3B1D7A" } as any}>
                  {m.text.split("\n\n").map((para, pi) => (
                    <p key={pi} className="mb-2 last:mb-0">
                      {para.split(/(\*\*.*?\*\*)/g).map((chunk, ci) =>
                        chunk.startsWith("**") && chunk.endsWith("**")
                          ? <strong key={ci}>{chunk.slice(2,-2)}</strong>
                          : chunk
                      )}
                    </p>
                  ))}

                  {/* Diagram for diagram mode */}
                  {m.mode === "diagram" && (
                    <div className="mt-3 bg-white/60 rounded-xl p-3 border border-violet-200">
                      <div className="flex gap-2">
                        {[
                          { lane:"OUTCOME", nodes:["Task prompt","Model response","Score result"], color:C.blue },
                          { lane:"TRAJECTORY", nodes:["Tool call 1","State change","Constraint check","Tool call N","Final result"], color:C.orange },
                        ].map(l => (
                          <div key={l.lane} className="flex-1">
                            <p className="font-mono text-[8px] font-bold mb-1.5" style={{ color:l.color.base }}>{l.lane}</p>
                            <div className="space-y-1">
                              {l.nodes.map((n,ni) => (
                                <div key={ni} style={{ background:l.color.light, border:`1px solid ${l.color.border}` }}
                                  className="px-1.5 py-1 rounded text-[9px] text-center" style={{ color:l.color.base } as any}>{n}</div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[9px] text-center text-muted-foreground mt-2">The final result can be identical while trajectories differ entirely.</p>
                    </div>
                  )}

                  {/* Citations */}
                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-violet-200">
                      <button onClick={() => toggleCitation(i)}
                        className="flex items-center gap-1.5 text-[10px] font-semibold opacity-70 hover:opacity-100 transition-opacity">
                        <Bookmark size={10} /> {m.citations.length} source{m.citations.length > 1 ? "s" : ""}
                        {showCitations[i] ? <ChevronDown size={9} /> : <ChevronRight size={9} />}
                      </button>
                      {showCitations[i] && (
                        <div className="mt-2 space-y-1.5">
                          {m.citations.map(c => (
                            <a key={c.id} href={c.url} target="_blank" rel="noreferrer"
                              className="flex items-center gap-1.5 text-[10px] hover:underline opacity-80 hover:opacity-100">
                              <ExternalLink size={9} /> {c.id} — {c.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Uncertainty */}
                  {m.uncertainty && (
                    <div className="mt-2 flex items-start gap-1.5 opacity-70 text-[10px]">
                      <Info size={9} className="flex-shrink-0 mt-0.5" /> {m.uncertainty}
                    </div>
                  )}

                  {/* Follow-up */}
                  {m.followUp && (
                    <p className="mt-2 text-[11px] italic opacity-80">{m.followUp}</p>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <button onClick={() => rate(i, "up")}
                    className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg border transition-colors ${ratings[i] === "up" ? "border-green-300 bg-green-50 text-green-700" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                    <ThumbsUp size={10} /> {ratings[i] === "up" ? "Thanks" : "Helpful"}
                  </button>
                  <button onClick={() => rate(i, "down")}
                    className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg border transition-colors ${ratings[i] === "down" ? "border-red-300 bg-red-50 text-red-600" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                    <ThumbsDown size={10} /> Not quite
                  </button>
                  <button onClick={() => go("educator-handoff")}
                    className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg border border-border text-muted-foreground hover:bg-secondary transition-colors">
                    <Flag size={10} /> Report
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div style={{ background: C.violet.muted }} className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[60px] flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} style={{ animationDelay:`${i*200}ms` }}
                className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Chips */}
      <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-border bg-card/50">
        {SUGGESTED_CHIPS.map(chip => (
          <button key={chip} onClick={() => send(chip)}
            style={{ border: `1px solid ${C.violet.border}`, color: C.violet.base }}
            className="text-[10px] px-2.5 py-1 rounded-full bg-card hover:opacity-80 transition-opacity whitespace-nowrap">
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ borderTop: `1px solid ${C.violet.border}` }} className="p-3 flex gap-2 bg-card flex-shrink-0">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about this lesson…"
          className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-200 transition" />
        <button onClick={() => send()} style={{ background: C.violet.base }}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0">
          <Send size={14} color="white" />
        </button>
      </div>
    </div>
  );
}

// ─── Screen 5: Visual Anchor ──────────────────────────────────────────────────

function VisualScreen({ go }: { go: (s: Screen) => void }) {
  const anchors = [
    { time:"0:00–2:30", title:"Evaluation as behavior",   desc:"Focus on what the system does under defined conditions, not what it claims to do.",      concepts:["defined conditions","behavior measurement","task-environment"] },
    { time:"2:30–5:00", title:"Scenarios and metrics",    desc:"HELM-style matrix of use cases and evaluation criteria. Not one score — a landscape.", concepts:["HELM","use-case coverage","multi-metric"] },
    { time:"5:00–8:15", title:"From measurement to decision", desc:"Why scores need interpretation. A number without a decision doesn't help governance.", concepts:["decision-linkage","uncertainty","governance"] },
  ];

  return (
    <div className="p-6 max-w-2xl">
      <SectionHead label="Visual anchors — P1.L4" sub="Educator-approved summaries of key moments. Use these to ask the tutor about visuals in the reference video." />

      <div style={{ background: C.amber.light, border: `1px solid ${C.amber.border}` }} className="rounded-xl p-3 mb-5 flex items-start gap-2">
        <Info size={13} style={{ color: C.amber.base }} className="flex-shrink-0 mt-0.5" />
        <p className="text-xs text-secondary-foreground">
          This is a reference video — OpenEd cannot access the video frames directly. These visual anchors are written by the educator to describe what appears at each chapter, so the tutor can answer questions about it accurately.
        </p>
      </div>

      <div className="space-y-4">
        {anchors.map((a, i) => (
          <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-secondary/30 flex items-center gap-3">
              <div style={{ background: C.teal.light, border: `1px solid ${C.teal.border}` }}
                className="px-2 py-0.5 rounded font-mono text-[10px] font-bold" style={{ color: C.teal.base } as any}>
                {a.time}
              </div>
              <p className="text-sm font-semibold text-foreground">{a.title}</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-secondary-foreground leading-relaxed mb-3">{a.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {a.concepts.map(c => (
                  <span key={c} style={{ background: C.blue.light, color: C.blue.base, border: `1px solid ${C.blue.border}` }}
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium">{c}</span>
                ))}
              </div>
              <button onClick={() => go("chat")}
                style={{ color: C.violet.base }}
                className="flex items-center gap-1.5 text-xs font-semibold hover:underline">
                <Sparkles size={11} /> Ask tutor about this visual
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 6: Quiz-Help Policy ───────────────────────────────────────────────

function QuizModeScreen({ go }: { go: (s: Screen) => void }) {
  const [messages, setMessages] = useState([
    { role:"tutor" as const, text:"You're in a quiz — I'm in hint-only mode. I can give you one small nudge at a time, but I won't tell you the answer directly. That's the whole point.", isPolicy:true },
    { role:"user"  as const, text:"What's the answer to Q3?", isPolicy:false },
    { role:"tutor" as const, text:"I won't give the answer — but here's a useful nudge:\n\nQ3 asks when trajectory metrics matter most. Ask yourself: in which scenario does the model take *actions in the world* between receiving a prompt and returning a final answer?", isPolicy:false },
    { role:"user"  as const, text:"Is it when there are tools and memory?", isPolicy:false },
    { role:"tutor" as const, text:"You're on the right track. Commit to an answer, submit, and I can explain what the correct reasoning is after you've made your choice.", isPolicy:false },
  ]);

  return (
    <div className="flex flex-col h-full overflow-hidden max-w-2xl mx-auto w-full">
      <div style={{ background: C.orange.light, borderBottom: `1px solid ${C.orange.border}` }}
        className="px-4 py-3 flex items-center gap-2.5 flex-shrink-0">
        <Lock size={14} style={{ color: C.orange.base }} />
        <div>
          <p className="text-sm font-semibold text-foreground">Quiz mode — hint only</p>
          <p className="text-[10px] text-muted-foreground">The tutor won't give direct answers during assessments. It will guide your thinking instead.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            {m.role === "user" ? (
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%]">{m.text}</div>
            ) : (
              <div className="space-y-1 max-w-[90%]">
                {(m as any).isPolicy && (
                  <div style={{ background: C.orange.light, border: `1px solid ${C.orange.border}` }}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg">
                    <Lock size={9} style={{ color: C.orange.base }} />
                    <span className="font-mono text-[9px] font-bold" style={{ color: C.orange.base }}>HINT-ONLY MODE ACTIVE</span>
                  </div>
                )}
                <div style={{ background: C.violet.muted, border: `1px solid ${C.violet.border}`, color:"#3B1D7A" }}
                  className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
                  {m.text.split("\n\n").map((p,pi) => <p key={pi} className="mb-1.5 last:mb-0">{p}</p>)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${C.orange.border}`, background: C.orange.light }}
        className="p-3 flex gap-2 flex-shrink-0">
        <input placeholder="Ask for a hint — not the answer…"
          className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-orange-200" />
        <button style={{ background: C.orange.base }}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:opacity-90 flex-shrink-0">
          <Send size={13} color="white" />
        </button>
      </div>
    </div>
  );
}

// ─── Screen 7: Artifact Coach ─────────────────────────────────────────────────

function ArtifactModeScreen({ go }: { go: (s: Screen) => void }) {
  const field = "Evidence linkage";
  const messages = [
    { role:"user"  as const, text:"Help me fill the 'Evidence linkage' field." },
    { role:"tutor" as const, text:"**Evidence linkage** is the hardest field for most learners — and the most important.\n\nIt's asking: *what would you need to see in test results to feel confident enough to proceed?* And the inverse: *what result would make you restrict or block the deployment?*\n\nStart with one concrete thing: 'If the agent modifies files outside the target directory in more than X% of runs, that's a blocking signal.'\n\nThen add the other side: what result *would* clear it?", mode:"artifact-coach" as const },
    { role:"user"  as const, text:"So I should write about thresholds?" },
    { role:"tutor" as const, text:"Yes — and also about evidence *types*. Thresholds tell you *how much*, evidence types tell you *what kind*.\n\nFor this artifact, strong evidence linkage includes:\n- At least one trajectory-level signal (not just outcome)\n- A threshold that would trigger a decision\n- What decision it would feed (restrict / conditional release / full release)\n\nI can suggest specific phrasing once you've drafted your first attempt — write something, even rough, and I'll help you improve it.", mode:"artifact-coach" as const },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden max-w-2xl mx-auto w-full">
      <div style={{ background: C.amber.light, borderBottom: `1px solid ${C.amber.border}` }}
        className="px-4 py-3 flex items-center gap-2.5 flex-shrink-0">
        <Award size={14} style={{ color: C.amber.base }} />
        <div>
          <p className="text-sm font-semibold text-foreground">Artifact coach mode</p>
          <p className="text-[10px] text-muted-foreground">Helping with: {field} · Outcome-vs-Trajectory Rubric</p>
        </div>
        <ModeBadge mode="artifact-coach" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            {m.role === "user" ? (
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%]">{m.text}</div>
            ) : (
              <div className="max-w-[92%] space-y-1.5">
                {m.mode && <ModeBadge mode={m.mode} />}
                <div style={{ background: C.amber.muted, border: `1px solid ${C.amber.border}`, color:"#78350F" }}
                  className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
                  {m.text.split("\n\n").map((p,pi) => (
                    <p key={pi} className="mb-2 last:mb-0">
                      {p.split(/(\*\*.*?\*\*)/g).map((chunk,ci) =>
                        chunk.startsWith("**") && chunk.endsWith("**")
                          ? <strong key={ci}>{chunk.slice(2,-2)}</strong> : chunk
                      )}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${C.amber.border}` }} className="p-3 flex gap-2 flex-shrink-0">
        <input placeholder="Draft your field response here, then ask for help…"
          className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-200" />
        <button style={{ background: C.amber.base }}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:opacity-90 flex-shrink-0">
          <Send size={13} color="white" />
        </button>
      </div>
    </div>
  );
}

// ─── Screen 8: Safety Refusal ─────────────────────────────────────────────────

function SafetyScreen({ go }: { go: (s: Screen) => void }) {
  const examples = [
    {
      userMsg: "Give me the exact steps to jailbreak a model for a red team.",
      refusal: "I can help you design safe evaluation scenarios for red teaming — but I can't walk through operational steps for bypassing model safeguards. The course teaches how to measure and document capability claims, not how to exploit them.\n\nIf you're designing a red team campaign, the lesson on scoping is the right starting point — it covers how to frame evaluation tasks without including harmful procedural detail.",
      escalateLabel: "Ask your educator",
    },
    {
      userMsg: "Write my artifact submission for me.",
      refusal: "I won't write your artifact for you — but I can help you write it yourself, which is the whole point.\n\nTell me which field feels hardest, and I'll explain what the rubric is looking for. Once you've drafted something, I can give you specific feedback on how to strengthen it.",
      escalateLabel: null,
    },
    {
      userMsg: "Is there a way to skip the practice task and still get credit?",
      refusal: "The proof ladder records what you actually did — practice submission is its own step, separate from the quiz. There isn't a bypass.\n\nPractice tasks are short (usually under 10 minutes) and the strong-answer reveal is worth it — most learners say it's when the concept clicked. Want to give it a try?",
      escalateLabel: null,
    },
  ];

  return (
    <div className="p-6 max-w-2xl">
      <SectionHead label="Tutor refusal states" sub="How the tutor handles requests it can't or shouldn't answer — always calm, never accusatory." />

      <div className="space-y-5">
        {examples.map((e, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* User message */}
            <div className="px-5 py-4 border-b border-border bg-secondary/30">
              <p className="text-[10px] font-mono text-muted-foreground mb-1.5">LEARNER ASKED</p>
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm inline-block">
                {e.userMsg}
              </div>
            </div>
            {/* Tutor response */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-2">
                <div style={{ background: C.red.light, border: `1px solid ${C.red.border}` }}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full">
                  <Shield size={9} style={{ color: C.red.base }} />
                  <span className="font-mono text-[9px] font-bold" style={{ color: C.red.base }}>TUTOR RESPONSE</span>
                </div>
              </div>
              <div style={{ background: C.violet.muted, border: `1px solid ${C.violet.border}`, color:"#3B1D7A" }}
                className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed mb-3">
                {e.refusal.split("\n\n").map((p, pi) => <p key={pi} className="mb-2 last:mb-0">{p}</p>)}
              </div>
              {e.escalateLabel && (
                <button onClick={() => go("educator-handoff")}
                  style={{ background: C.teal.light, color: C.teal.base, border: `1px solid ${C.teal.border}` }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-80 transition-opacity">
                  <GraduationCap size={11} /> {e.escalateLabel}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 9: Error States ───────────────────────────────────────────────────

function ErrorScreen({ go }: { go: (s: Screen) => void }) {
  const [activeError, setActiveError] = useState<ErrorKind>("invalid-key");

  const errors: Record<ErrorKind, { title: string; body: string; cta: string; ctaAction: () => void; color: typeof C.red }> = {
    "invalid-key": {
      title:"Key not accepted",
      body:"The provider rejected this API key. This usually means the key is expired, has no credits, or was entered with a typo. Check your key in the provider dashboard and try again.",
      cta:"Re-enter key",
      ctaAction: () => go("setup"),
      color: C.red,
    },
    "rate-limit": {
      title:"Rate limit reached",
      body:"Your provider returned a rate-limit error. This happens when you've sent too many requests in a short window. Wait a minute and try again, or switch to a model with a higher rate limit.",
      cta:"Try again",
      ctaAction: () => {},
      color: C.amber,
    },
    "cors": {
      title:"Browser call blocked",
      body:"This provider may not support direct browser API calls. Try OpenRouter, which provides a browser-compatible proxy for most providers.",
      cta:"Switch to OpenRouter",
      ctaAction: () => go("setup"),
      color: C.orange,
    },
    "quota": {
      title:"Usage quota exceeded",
      body:"Your account has reached its billing limit. Add credit to your provider account, or switch to a free-tier model like gpt-4o-mini or claude-3-haiku.",
      cta:"Switch provider",
      ctaAction: () => go("setup"),
      color: C.amber,
    },
    "no-key": {
      title:"No API key configured",
      body:"The AI Tutor needs an API key to work. Add your own key (free to get from OpenAI or Anthropic) or use mock mode for pre-written lesson guidance.",
      cta:"Add a key",
      ctaAction: () => go("setup"),
      color: C.slate,
    },
  };

  const e = errors[activeError];
  const Icon = activeError === "invalid-key" ? X : activeError === "rate-limit" ? Clock : activeError === "cors" ? Monitor : activeError === "quota" ? Activity : Key;

  return (
    <div className="p-6 max-w-xl">
      <SectionHead label="Tutor error states" sub="What learners see when something goes wrong — honest, calm, and actionable." />

      <div className="flex flex-wrap gap-2 mb-5">
        {(Object.keys(errors) as ErrorKind[]).map(k => (
          <button key={k} onClick={() => setActiveError(k)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${activeError === k ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-secondary"}`}>
            {k}
          </button>
        ))}
      </div>

      {/* Error display */}
      <div style={{ border: `1.5px solid ${e.color.border}`, background: e.color.light }} className="rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b" style={{ borderColor: e.color.border }}>
          <div className="flex items-center gap-2 mb-1">
            <div style={{ background: e.color.base }} className="w-7 h-7 rounded-xl flex items-center justify-center">
              <Icon size={13} color="white" />
            </div>
            <p className="font-semibold text-foreground">{e.title}</p>
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm text-secondary-foreground leading-relaxed mb-4">{e.body}</p>
          <div className="flex gap-2 flex-wrap">
            <button onClick={e.ctaAction} style={{ background: e.color.base }}
              className="text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
              {e.cta}
            </button>
            <button onClick={() => go("mock")}
              className="px-4 py-2 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary transition-colors">
              Use mock tutor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 10: Educator Handoff ──────────────────────────────────────────────

function EducatorHandoffScreen({ go }: { go: (s: Screen) => void }) {
  const [sent, setSent] = useState(false);
  const [note, setNote] = useState("");

  return (
    <div className="p-6 max-w-xl">
      <button onClick={() => go("chat")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5">
        <ArrowLeft size={14} /> Back to tutor
      </button>

      {!sent ? (
        <>
          <SectionHead label="Ask your educator" sub="Some questions go beyond what a tutor can confidently answer. Your educator can help." />

          <div className="bg-card border border-border rounded-xl p-5 mb-5">
            <p className="text-xs font-semibold text-foreground mb-1">The AI Tutor said</p>
            <div style={{ background: C.violet.muted, border: `1px solid ${C.violet.border}`, color:"#3B1D7A" }}
              className="rounded-xl p-3 text-sm leading-relaxed">
              This question is outside what I can reliably answer from the course content. I'd recommend asking your educator — they can provide course-specific clarification or escalate to the OpenEd team if needed.
            </div>
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">Your question (pre-filled from tutor context)</label>
              <textarea rows={4} defaultValue="I asked the tutor about designing a red team scope for a model I'm evaluating at work. It said this is outside the lesson scope, but I wanted to understand whether the FME framework applies to production models."
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">Any additional context</label>
              <textarea rows={2} value={note} onChange={e => setNote(e.target.value)}
                placeholder="Optional — anything that helps the educator understand your situation."
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>
          </div>

          <div style={{ background: C.teal.light, border: `1px solid ${C.teal.border}` }} className="rounded-xl p-3 mb-4 text-xs text-secondary-foreground leading-relaxed">
            Your educator will receive your question and the lesson context. They won't see your AI key, quiz answers, or private artifact drafts.
          </div>

          <div className="flex gap-3">
            <button onClick={() => setSent(true)} style={{ background: C.teal.base }}
              className="text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              <Send size={14} /> Send to educator
            </button>
            <button onClick={() => go("chat")}
              className="px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary transition-colors">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div>
          <div style={{ background: C.teal.light, border: `1px solid ${C.teal.border}` }} className="rounded-xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Check size={15} style={{ color: C.teal.base }} />
              <p className="font-semibold text-foreground">Question sent.</p>
            </div>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              Your educator has been notified. You'll receive their response in the course messages — usually within 2 business days. In the meantime, the tutor and mock mode are still available.
            </p>
          </div>
          <button onClick={() => go("chat")} style={{ background: C.violet.base }}
            className="text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <ArrowLeft size={14} /> Back to tutor
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Screen 11: Voice Placeholder ────────────────────────────────────────────

function VoiceScreen({ go }: { go: (s: Screen) => void }) {
  const [permState, setPermState] = useState<"idle" | "requesting" | "denied" | "listening" | "preview">("idle");
  const [ttsEnabled, setTtsEnabled] = useState(false);

  return (
    <div className="p-6 max-w-md">
      <button onClick={() => go("chat")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5">
        <ArrowLeft size={14} /> Back to tutor
      </button>
      <SectionHead label="Voice mode" sub="Ask the tutor by speaking. Responses are text by default; text-to-speech is optional." />

      {/* Availability */}
      <div style={{ background: C.blue.light, border: `1px solid ${C.blue.border}` }} className="rounded-xl p-3 mb-5 flex items-start gap-2">
        <Info size={13} style={{ color: C.blue.base }} className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-foreground">Voice uses your browser's Web Speech API</p>
          <p className="text-xs text-secondary-foreground mt-0.5">No audio is recorded or sent to OpenEd servers. If your browser doesn't support voice, text input still works. Audio is processed locally.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-5">
        <div className="p-8 flex flex-col items-center gap-4">
          {permState === "idle" && (
            <>
              <div style={{ background: C.violet.light, border: `2px solid ${C.violet.border}` }}
                className="w-20 h-20 rounded-full flex items-center justify-center">
                <Mic size={32} style={{ color: C.violet.base }} />
              </div>
              <p className="text-sm text-center text-secondary-foreground">Tap to enable voice input</p>
              <button onClick={() => { setPermState("requesting"); setTimeout(() => setPermState("listening"), 1000); }}
                style={{ background: C.violet.base }}
                className="text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                Enable microphone
              </button>
            </>
          )}
          {permState === "requesting" && (
            <>
              <div style={{ background: C.amber.light, border: `2px solid ${C.amber.border}` }}
                className="w-20 h-20 rounded-full flex items-center justify-center animate-pulse">
                <Mic size={32} style={{ color: C.amber.base }} />
              </div>
              <p className="text-sm text-secondary-foreground">Requesting microphone access…</p>
            </>
          )}
          {permState === "listening" && (
            <>
              <div style={{ background: C.violet.base }}
                className="w-20 h-20 rounded-full flex items-center justify-center relative">
                <Mic size={32} color="white" />
                <div className="absolute inset-0 rounded-full border-4 border-violet-400 animate-ping opacity-40" />
              </div>
              <p className="text-sm font-semibold text-foreground">Listening…</p>
              <p className="text-xs text-muted-foreground">Speak your question, then click Send.</p>
              <div style={{ background: C.violet.light, border: `1px solid ${C.violet.border}` }}
                className="w-full rounded-xl px-4 py-3 text-sm italic text-muted-foreground">
                "What is the difference between outcome and trajectory…"
              </div>
              <div className="flex gap-3">
                <button onClick={() => setPermState("preview")} style={{ background: C.violet.base }}
                  className="text-white px-5 py-2 rounded-xl text-sm font-semibold">
                  Send to tutor
                </button>
                <button onClick={() => setPermState("idle")} className="px-4 py-2 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary">
                  Cancel
                </button>
              </div>
            </>
          )}
          {permState === "preview" && (
            <>
              <Check size={28} style={{ color: C.green.base }} />
              <p className="text-sm font-semibold text-foreground">Sent to tutor</p>
              <button onClick={() => go("chat")} style={{ background: C.violet.base }}
                className="text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                View response
              </button>
            </>
          )}
          {permState === "denied" && (
            <>
              <MicOff size={32} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Microphone access denied</p>
              <p className="text-xs text-muted-foreground text-center">Enable it in your browser settings, or use text input instead.</p>
            </>
          )}
        </div>
      </div>

      {/* TTS toggle */}
      <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Read responses aloud</p>
          <p className="text-xs text-muted-foreground">Uses browser text-to-speech. No audio sent to servers.</p>
        </div>
        <button onClick={() => setTtsEnabled(t => !t)}
          style={{ background: ttsEnabled ? C.violet.base : "var(--secondary)" }}
          className="w-10 h-6 rounded-full flex items-center transition-all px-0.5">
          <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${ttsEnabled ? "translate-x-4" : "translate-x-0"}`} />
        </button>
      </div>
    </div>
  );
}

// ─── Screen 12: Settings ──────────────────────────────────────────────────────

function SettingsScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="p-6 max-w-xl">
      <SectionHead label="AI Tutor settings" sub="Manage your API key, provider, and tutor behaviour." />

      <div className="space-y-4">
        {/* Connection */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-secondary/30">
            <p className="text-xs font-semibold text-foreground">Connection</p>
          </div>
          <div className="divide-y divide-border">
            {[
              { l:"Provider",       v:"OpenAI",        action: ()=>go("setup"),     cta:"Change" },
              { l:"Model",          v:"gpt-4o-mini",   action: ()=>go("setup"),     cta:"Change" },
              { l:"Key",            v:"sk-••••••x9A2", action: ()=>go("connected"), cta:"Manage" },
              { l:"Storage mode",   v:"Session only",  action: ()=>go("setup"),     cta:"Change" },
            ].map(({ l, v, action, cta }) => (
              <div key={l} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-muted-foreground">{l}</p>
                  <p className="text-sm font-medium text-foreground">{v}</p>
                </div>
                <button onClick={action} className="text-xs text-primary hover:underline">{cta}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Behaviour */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-secondary/30">
            <p className="text-xs font-semibold text-foreground">Tutor behaviour</p>
          </div>
          <div className="divide-y divide-border">
            {[
              { l:"Default mode",     v:"Balanced (explain + Socratic)",  note:"Set per lesson by educator" },
              { l:"Quiz assessment",  v:"Hints only",                     note:"Cannot be changed — protects learning integrity" },
              { l:"Artifact mode",    v:"Coach (helps improve, not write)",note:"Cannot be changed" },
              { l:"Source grounding", v:"Required",                       note:"Tutor cites or admits uncertainty" },
            ].map(({ l, v, note }) => (
              <div key={l} className="px-5 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground">{l}</p>
                  <span className="text-xs font-medium text-foreground">{v}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-secondary/30">
            <p className="text-xs font-semibold text-foreground">Privacy</p>
          </div>
          <div className="divide-y divide-border">
            {[
              { l:"Key stored server-side",    v:"Never" },
              { l:"Key in error reports",      v:"Never — redacted" },
              { l:"Key in analytics",          v:"Never" },
              { l:"Full prompts logged",       v:"Never client-side" },
              { l:"Session data saved",        v:"Session only (cleared on tab close)" },
            ].map(({ l, v }) => (
              <div key={l} className="px-5 py-3 flex items-center justify-between">
                <p className="text-sm text-foreground">{l}</p>
                <span className="text-xs font-mono text-green-600 font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delete */}
        <button onClick={() => go("connected")}
          style={{ background: C.red.light, color: C.red.base, border: `1px solid ${C.red.border}` }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold hover:opacity-80 transition-opacity">
          <Trash2 size={14} /> Delete API key from this browser
        </button>
        <button onClick={() => go("mock")}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary transition-colors">
          Switch to mock tutor (no key needed)
        </button>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

const NAV: { id: Screen; label: string; icon: React.FC<any>; group: string }[] = [
  { id:"setup",             label:"BYOK setup",         icon:Key,           group:"Setup" },
  { id:"connected",         label:"Connected / delete",  icon:Settings,      group:"Setup" },
  { id:"mock",              label:"Mock tutor",          icon:MessageSquare, group:"Setup" },
  { id:"chat",              label:"Lesson chat",         icon:Sparkles,      group:"Tutor" },
  { id:"visual",            label:"Visual anchors",      icon:Image,         group:"Tutor" },
  { id:"quiz-mode",         label:"Quiz-help policy",    icon:Lock,          group:"Tutor" },
  { id:"artifact-mode",     label:"Artifact coach",      icon:Award,         group:"Tutor" },
  { id:"voice",             label:"Voice placeholder",   icon:Mic,           group:"Tutor" },
  { id:"safety",            label:"Safety refusals",     icon:Shield,        group:"Safety" },
  { id:"error",             label:"Error states",        icon:AlertCircle,   group:"Safety" },
  { id:"educator-handoff",  label:"Educator handoff",    icon:GraduationCap, group:"Safety" },
  { id:"settings",          label:"Settings",            icon:Settings,      group:"Settings" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  function go(s: Screen) { setScreen(s); }

  const groups = [...new Set(NAV.map(n => n.group))];
  const isChatLike = ["chat", "quiz-mode", "artifact-mode"].includes(screen);

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground" style={{ fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      {/* Top bar */}
      <header className="h-12 border-b border-border bg-card flex items-center px-4 gap-3 flex-shrink-0 sticky top-0 z-40">
        <button onClick={() => setSidebarOpen(o => !o)}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
          <Menu size={16} className="text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2 mr-2">
          <div style={{ background: C.violet.base }} className="w-6 h-6 rounded flex items-center justify-center">
            <Sparkles size={13} color="white" />
          </div>
          <span className="font-bold text-sm text-foreground">OpenEd</span>
          <span className="font-mono text-[10px] text-muted-foreground hidden sm:block">/ AI Tutor + BYOK</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setDark(d => !d)}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors">
            {dark ? <Sun size={14} className="text-muted-foreground" /> : <Moon size={14} className="text-muted-foreground" />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`border-r border-border bg-card flex-shrink-0 flex flex-col overflow-y-auto transition-all duration-200 ${sidebarOpen ? "w-52" : "w-14"}`}>
          <nav className="flex-1 p-2">
            {groups.map(group => (
              <div key={group} className="mb-4">
                {sidebarOpen && (
                  <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase px-2 mb-1">{group}</p>
                )}
                <div className="space-y-0.5">
                  {NAV.filter(n => n.group === group).map(({ id, label, icon: Icon }) => (
                    <button key={id} onClick={() => go(id)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${screen === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                      <Icon size={15} className="flex-shrink-0" />
                      {sidebarOpen && <span className="text-xs font-medium truncate">{label}</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {sidebarOpen && (
            <div className="m-2 p-3 rounded-xl border border-border bg-background">
              <p className="font-mono text-[9px] tracking-widest text-muted-foreground mb-1">SECURITY NOTE</p>
              <p className="text-[10px] text-muted-foreground leading-snug">No orchestration prompts are exposed in this UI or source code. Tutor logic runs server-side.</p>
            </div>
          )}
        </aside>

        {/* Main */}
        <main className={`flex-1 overflow-hidden flex flex-col ${isChatLike ? "" : "overflow-y-auto"}`}>
          {screen === "setup"            && <SetupScreen go={go} />}
          {screen === "connected"        && <ConnectedScreen go={go} />}
          {screen === "mock"             && <MockScreen go={go} />}
          {screen === "chat"             && <ChatScreen go={go} />}
          {screen === "visual"           && <VisualScreen go={go} />}
          {screen === "quiz-mode"        && <QuizModeScreen go={go} />}
          {screen === "artifact-mode"    && <ArtifactModeScreen go={go} />}
          {screen === "safety"           && <SafetyScreen go={go} />}
          {screen === "error"            && <ErrorScreen go={go} />}
          {screen === "educator-handoff" && <EducatorHandoffScreen go={go} />}
          {screen === "voice"            && <VoiceScreen go={go} />}
          {screen === "settings"         && <SettingsScreen go={go} />}
        </main>
      </div>
    </div>
  );
}
