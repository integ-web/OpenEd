import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles, ArrowRight, Key, CheckCircle, AlertCircle,
  Trash2, ChevronDown, ExternalLink, X, Loader, Shield,
} from 'lucide-react';
import { C, fonts, shadow } from '../fme/types';
import type { LessonData } from '../../data/lessonContent';
import {
  PROVIDER_CONFIGS, maskKey, saveBYOKKey, getBYOKKey, loadBYOKSettings, clearBYOKKey,
  callProviderAPI, getMockResponse, buildSystemPrompt,
  type AIProvider, type KeyStorageMode, type BYOKSettings, type CoachMessage,
} from '../../data/byokStorage';

// ── BYOK Setup Modal ──────────────────────────────────────────────────────────

function BYOKSetupModal({ dark, onConnected, onDismiss }: {
  dark: boolean;
  onConnected: (settings: BYOKSettings) => void;
  onDismiss: () => void;
}) {
  const c = C(dark);
  const violet = dark ? '#A78BFA' : '#6D28D9';
  const [provider, setProvider] = useState<AIProvider>('openai');
  const [model, setModel] = useState('gpt-4o-mini');
  const [endpoint, setEndpoint] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [storageMode, setStorageMode] = useState<KeyStorageMode>('session_only');
  const [riskAcknowledged, setRiskAcknowledged] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'idle' | 'ok' | 'error'>('idle');
  const [testError, setTestError] = useState('');

  const cfg = PROVIDER_CONFIGS.find(p => p.id === provider)!;
  const isOllama = provider === 'ollama';

  const handleProviderChange = (p: AIProvider) => {
    setProvider(p);
    const cfg = PROVIDER_CONFIGS.find(x => x.id === p)!;
    setModel(cfg.models[0].id);
    setTestResult('idle');
    setTestError('');
  };

  const testConnection = async () => {
    const key = isOllama ? (keyInput || 'ollama') : keyInput.trim();
    if (!isOllama && !key) return;
    setTesting(true);
    setTestResult('idle');
    setTestError('');
    try {
      await callProviderAPI(
        provider, model, endpoint || undefined,
        [{ role: 'user', content: 'Say "connection test ok" in 5 words or less.' }],
        'You are a connection test. Reply with exactly: connection test ok'
      );
      setTestResult('ok');
    } catch (e: any) {
      setTestResult('error');
      const msg = e?.message ?? 'Unknown error';
      if (msg.includes('invalid_key') || msg.includes('401') || msg.includes('403')) {
        setTestError('Invalid key. Check it and try again.');
      } else if (msg.includes('rate_limit') || msg.includes('429')) {
        setTestError('Rate limit hit. Wait a moment or try a different model.');
      } else if (msg.includes('NetworkError') || msg.includes('Failed to fetch')) {
        setTestError('Network error. Check your connection or try mock mode.');
      } else {
        setTestError(msg.slice(0, 120));
      }
    } finally {
      setTesting(false);
    }
  };

  const handleConnect = () => {
    const key = isOllama ? (keyInput || 'ollama-local') : keyInput.trim();
    const settings = saveBYOKKey(key, {
      provider, model,
      endpoint: cfg.supportsCustomEndpoint ? (endpoint || cfg.baseUrl) : undefined,
      storageMode,
    });
    onConnected(settings);
  };

  const canConnect = (isOllama || keyInput.trim().length > 8) &&
    (storageMode === 'session_only' || riskAcknowledged);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: dark ? 'rgba(10,18,32,0.92)' : 'rgba(248,250,252,0.96)',
      display: 'flex', flexDirection: 'column', borderRadius: 14, overflow: 'hidden',
    }}>
      <div style={{ padding: '16px 18px', borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: dark ? 'rgba(167,139,250,0.14)' : '#F5F3FF', border: `1px solid ${dark ? 'rgba(167,139,250,0.28)' : '#DDD6FE'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Key size={12} color={violet} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: c.textPrimary, margin: 0 }}>Connect your own AI key</p>
          <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary, margin: 0 }}>The course will not pay for model calls and will not store your key on our servers.</p>
        </div>
        <button onClick={onDismiss} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: c.textTertiary }}>
          <X size={14} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Provider */}
        <div>
          <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Provider</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
            {PROVIDER_CONFIGS.map(p => (
              <button key={p.id} onClick={() => handleProviderChange(p.id)} style={{
                padding: '6px 8px', borderRadius: 7, border: `1px solid ${provider === p.id ? violet : c.border}`,
                background: provider === p.id ? (dark ? 'rgba(167,139,250,0.12)' : '#F5F3FF') : c.elevated,
                fontFamily: fonts.sans, fontSize: 11, fontWeight: provider === p.id ? 600 : 400,
                color: provider === p.id ? violet : c.textSecondary, cursor: 'pointer', textAlign: 'center',
              }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Model */}
        <div>
          <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Model</label>
          <div style={{ position: 'relative' }}>
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              style={{
                width: '100%', padding: '8px 30px 8px 10px', borderRadius: 7,
                background: c.elevated, border: `1px solid ${c.border}`,
                fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary,
                appearance: 'none', outline: 'none', cursor: 'pointer',
              }}
            >
              {cfg.models.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
            <ChevronDown size={12} color={c.textTertiary} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>

        {/* Custom endpoint */}
        {cfg.supportsCustomEndpoint && (
          <div>
            <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
              Endpoint URL <span style={{ fontWeight: 400 }}>(optional, defaults to {cfg.baseUrl || 'custom'})</span>
            </label>
            <input
              value={endpoint}
              onChange={e => setEndpoint(e.target.value)}
              placeholder={cfg.baseUrl || 'https://your-endpoint/v1/chat/completions'}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 7, background: c.elevated, border: `1px solid ${c.border}`, fontFamily: fonts.mono, fontSize: 11, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        )}

        {/* API key */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {isOllama ? 'API key (not required for local Ollama)' : 'API key'}
            </label>
            {cfg.apiKeyHelpUrl && (
              <a href={cfg.apiKeyHelpUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: fonts.sans, fontSize: 11, color: dark ? '#60A5FA' : '#2563EB', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}>
                Get key <ExternalLink size={10} />
              </a>
            )}
          </div>
          <input
            type="password"
            value={keyInput}
            onChange={e => { setKeyInput(e.target.value); setTestResult('idle'); }}
            placeholder={cfg.apiKeyPlaceholder}
            autoComplete="off"
            style={{ width: '100%', padding: '8px 10px', borderRadius: 7, background: c.elevated, border: `1px solid ${testResult === 'error' ? '#F87171' : testResult === 'ok' ? '#4ADE80' : c.border}`, fontFamily: fonts.mono, fontSize: 12, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }}
          />
          {testResult === 'ok' && (
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginTop: 5 }}>
              <CheckCircle size={12} color='#4ADE80' />
              <span style={{ fontFamily: fonts.sans, fontSize: 11, color: dark ? '#4ADE80' : '#15803D' }}>Connection successful</span>
            </div>
          )}
          {testResult === 'error' && (
            <div style={{ display: 'flex', gap: 5, alignItems: 'flex-start', marginTop: 5 }}>
              <AlertCircle size={12} color='#F87171' style={{ marginTop: 1, flexShrink: 0 }} />
              <span style={{ fontFamily: fonts.sans, fontSize: 11, color: dark ? '#F87171' : '#B91C1C' }}>{testError}</span>
            </div>
          )}
        </div>

        {/* Storage mode */}
        <div>
          <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>Storage</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {([
              {
                value: 'session_only' as KeyStorageMode,
                label: 'Session only',
                badge: 'Recommended',
                desc: 'Keeps the key for this browser session. Cleared when the tab or window closes.',
              },
              {
                value: 'local_browser_storage' as KeyStorageMode,
                label: 'Save in this browser',
                badge: 'Optional',
                desc: 'Stores the key in localStorage so you don\'t have to re-enter it. Convenient, but not a secure vault.',
              },
            ] as { value: KeyStorageMode; label: string; badge: string; desc: string }[]).map(opt => (
              <button
                key={opt.value}
                onClick={() => { setStorageMode(opt.value); if (opt.value === 'session_only') setRiskAcknowledged(false); }}
                style={{
                  padding: '10px 12px', borderRadius: 8, border: `1px solid ${storageMode === opt.value ? violet : c.border}`,
                  background: storageMode === opt.value ? (dark ? 'rgba(167,139,250,0.10)' : '#F5F3FF') : c.elevated,
                  textAlign: 'left', cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3 }}>
                  <span style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: storageMode === opt.value ? violet : c.textPrimary }}>{opt.label}</span>
                  <span style={{ fontFamily: fonts.mono, fontSize: 9, padding: '1px 6px', borderRadius: 999, background: opt.value === 'session_only' ? (dark ? 'rgba(16,185,129,0.15)' : '#D1FAE5') : (dark ? 'rgba(251,191,36,0.12)' : '#FEF3C7'), color: opt.value === 'session_only' ? (dark ? '#4ADE80' : '#047857') : (dark ? '#FBBF24' : '#B45309') }}>{opt.badge}</span>
                </div>
                <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary, margin: 0 }}>{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Risk acknowledgement for persistent */}
        {storageMode === 'local_browser_storage' && (
          <button
            onClick={() => setRiskAcknowledged(v => !v)}
            style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', borderRadius: 8, border: `1px solid ${riskAcknowledged ? '#FBBF24' : c.border}`, background: riskAcknowledged ? (dark ? 'rgba(251,191,36,0.08)' : '#FFFBEB') : c.elevated, cursor: 'pointer', textAlign: 'left' }}
          >
            <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${riskAcknowledged ? '#FBBF24' : c.border}`, background: riskAcknowledged ? '#FBBF24' : 'transparent', flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {riskAcknowledged && <CheckCircle size={10} color="#78350F" />}
            </div>
            <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textSecondary, margin: 0, lineHeight: 1.6 }}>
              I understand this key is stored in my browser and may be accessible to browser extensions, shared-device users, or injected scripts. I will use a restricted or disposable learning key.
            </p>
          </button>
        )}

        {/* Security note */}
        <div style={{ display: 'flex', gap: 8, padding: '10px 12px', borderRadius: 8, background: dark ? 'rgba(96,165,250,0.06)' : '#EFF6FF', border: `1px solid ${dark ? 'rgba(96,165,250,0.15)' : '#BFDBFE'}` }}>
          <Shield size={13} color={dark ? '#60A5FA' : '#2563EB'} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textSecondary, margin: 0, lineHeight: 1.6 }}>
            Your key stays in this browser. We do not store it on our servers. Browser storage is convenient, but it is not a secure vault. Use a restricted or disposable learning key, monitor usage, and delete it when finished.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 18px', borderTop: `1px solid ${c.border}`, display: 'flex', gap: 8, flexShrink: 0 }}>
        <button
          onClick={testConnection}
          disabled={testing || (!isOllama && !keyInput.trim())}
          style={{ padding: '8px 14px', borderRadius: 7, border: `1px solid ${c.border}`, background: c.elevated, fontFamily: fonts.sans, fontSize: 12, color: c.textSecondary, cursor: testing ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
        >
          {testing ? <Loader size={11} style={{ animation: 'spin 1s linear infinite' }} /> : null}
          {testing ? 'Testing…' : 'Test connection'}
        </button>
        <button
          onClick={handleConnect}
          disabled={!canConnect}
          style={{ flex: 1, padding: '8px 14px', borderRadius: 7, border: 'none', background: canConnect ? violet : (dark ? '#1E293B' : '#E2E8F0'), fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: canConnect ? '#fff' : c.textTertiary, cursor: canConnect ? 'pointer' : 'not-allowed', transition: 'background 0.12s' }}
        >
          Connect key
        </button>
        <button onClick={onDismiss} style={{ padding: '8px 14px', borderRadius: 7, border: `1px solid ${c.border}`, background: 'transparent', fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary, cursor: 'pointer' }}>
          Mock mode
        </button>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Delete confirmation ───────────────────────────────────────────────────────

function DeleteConfirmDialog({ dark, onConfirm, onCancel }: {
  dark: boolean; onConfirm: () => void; onCancel: () => void;
}) {
  const c = C(dark);
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 60, background: dark ? 'rgba(10,18,32,0.95)' : 'rgba(248,250,252,0.97)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, borderRadius: 14 }}>
      <Trash2 size={24} color={dark ? '#F87171' : '#B91C1C'} style={{ marginBottom: 12 }} />
      <p style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: c.textPrimary, margin: '0 0 8px', textAlign: 'center' }}>Forget this key?</p>
      <p style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textSecondary, margin: '0 0 20px', textAlign: 'center', lineHeight: 1.6 }}>This removes the key from this browser. You can reconnect later.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onCancel} style={{ padding: '8px 18px', borderRadius: 7, border: `1px solid ${c.border}`, background: c.elevated, fontFamily: fonts.sans, fontSize: 12, color: c.textSecondary, cursor: 'pointer' }}>Keep key</button>
        <button onClick={onConfirm} style={{ padding: '8px 18px', borderRadius: 7, border: 'none', background: dark ? '#7F1D1D' : '#FEE2E2', fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: dark ? '#FCA5A5' : '#B91C1C', cursor: 'pointer' }}>Forget key</button>
      </div>
    </div>
  );
}

// ── Connected header badge ────────────────────────────────────────────────────

function ConnectedBadge({ settings, dark, onForget, onTest }: {
  settings: BYOKSettings; dark: boolean; onForget: () => void; onTest: () => void;
}) {
  const c = C(dark);
  const violet = dark ? '#A78BFA' : '#6D28D9';
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, border: `1px solid ${dark ? 'rgba(74,222,128,0.3)' : '#A7F3D0'}`, background: dark ? 'rgba(16,185,129,0.10)' : '#D1FAE5', cursor: 'pointer' }}
      >
        <CheckCircle size={10} color={dark ? '#4ADE80' : '#047857'} />
        <span style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 700, color: dark ? '#4ADE80' : '#047857', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {PROVIDER_CONFIGS.find(p => p.id === settings.provider)?.label ?? settings.provider}
        </span>
        <ChevronDown size={9} color={dark ? '#4ADE80' : '#047857'} />
      </button>
      {open && (
        <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 4, zIndex: 100, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: '12px 14px', minWidth: 200, boxShadow: shadow.md }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: dark ? '#4ADE80' : '#047857', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connected</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
            {[
              ['Provider', PROVIDER_CONFIGS.find(p => p.id === settings.provider)?.label ?? settings.provider],
              ['Model', settings.model],
              ['Key', settings.keyMasked],
              ['Storage', settings.storageMode === 'session_only' ? 'Session only' : 'Browser storage'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 6 }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, minWidth: 56 }}>{k}</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textPrimary }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <button onClick={() => { onTest(); setOpen(false); }} style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${c.border}`, background: c.elevated, fontFamily: fonts.sans, fontSize: 11, color: c.textSecondary, cursor: 'pointer', textAlign: 'left' }}>Test connection again</button>
            <button onClick={() => { onForget(); setOpen(false); }} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid transparent', background: 'transparent', fontFamily: fonts.sans, fontSize: 11, color: dark ? '#F87171' : '#B91C1C', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Trash2 size={11} /> Forget this key
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main BYOK Coach Panel ─────────────────────────────────────────────────────

interface BYOKCoachPanelProps {
  lesson: LessonData;
  dark: boolean;
}

export function BYOKCoachPanel({ lesson, dark }: BYOKCoachPanelProps) {
  const c = C(dark);
  const violet = dark ? '#A78BFA' : '#6D28D9';

  const [settings, setSettings] = useState<BYOKSettings | null>(() => loadBYOKSettings());
  const [hasKey, setHasKey] = useState(() => !!getBYOKKey());
  const [showSetup, setShowSetup] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [msgs, setMsgs] = useState<{ role: 'coach' | 'user'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagramMode, setDiagramMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Reset conversation when lesson changes
  useEffect(() => {
    setMsgs([{ role: 'coach', text: lesson.coachOpening }]);
    setDiagramMode(false);
  }, [lesson.lessonId]);

  const scrollBottom = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 60);
  }, []);

  const send = useCallback(async (text: string) => {
    setInput('');
    setMsgs(m => [...m, { role: 'user', text }]);
    scrollBottom();
    setLoading(true);

    const currentKey = getBYOKKey();
    const currentSettings = settings ?? loadBYOKSettings();

    if (!currentKey || !currentSettings) {
      const mock = getMockResponse(text, lesson.title);
      setMsgs(m => [...m, { role: 'coach', text: mock }]);
      setLoading(false);
      scrollBottom();
      return;
    }

    try {
      const history: CoachMessage[] = msgs.slice(-8).map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));
      history.push({ role: 'user', content: text });

      const systemPrompt = buildSystemPrompt(
        lesson.title,
        lesson.objective,
        lesson.keyIdeas.map(k => k.title)
      );

      const reply = await callProviderAPI(
        currentSettings.provider,
        currentSettings.model,
        currentSettings.endpoint,
        history,
        systemPrompt
      );
      setMsgs(m => [...m, { role: 'coach', text: reply }]);
    } catch (e: any) {
      const msg = e?.message ?? 'Unknown error';
      let userMsg = `Something went wrong: ${msg.slice(0, 100)}. Mock mode is still available — forget your key and reconnect, or continue without a key.`;
      if (msg.includes('invalid_key')) userMsg = 'The provider rejected this key. Check the key in settings, or continue in mock mode.';
      if (msg.includes('rate_limit')) userMsg = 'Rate limit hit. Try again in a moment, or switch models.';
      setMsgs(m => [...m, { role: 'coach', text: userMsg }]);
    } finally {
      setLoading(false);
      scrollBottom();
    }
  }, [msgs, settings, lesson]);

  const handleConnected = (s: BYOKSettings) => {
    setSettings(s);
    setHasKey(true);
    setShowSetup(false);
    setMsgs(m => [...m, { role: 'coach', text: `Key connected (${PROVIDER_CONFIGS.find(p => p.id === s.provider)?.label} · ${s.model}). Ask me anything about this lesson.` }]);
    scrollBottom();
  };

  const handleForget = () => {
    clearBYOKKey();
    setSettings(null);
    setHasKey(false);
    setShowDelete(false);
    setMsgs(m => [...m, { role: 'coach', text: 'Key removed. I\'m now in mock mode. Reconnect anytime.' }]);
    scrollBottom();
  };

  const mode = hasKey && settings ? 'connected' : 'mock';

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', boxShadow: shadow.sm, position: 'relative' }}>

      {/* Overlays */}
      {showSetup && (
        <BYOKSetupModal
          dark={dark}
          onConnected={handleConnected}
          onDismiss={() => setShowSetup(false)}
        />
      )}
      {showDelete && (
        <DeleteConfirmDialog
          dark={dark}
          onConfirm={handleForget}
          onCancel={() => setShowDelete(false)}
        />
      )}

      {/* Header */}
      <div style={{ padding: '12px 14px', borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: dark ? 'rgba(167,139,250,0.14)' : '#F5F3FF', border: `1px solid ${dark ? 'rgba(167,139,250,0.28)' : '#DDD6FE'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Sparkles size={12} color={violet} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: c.textPrimary, margin: 0 }}>AI Coach</p>
          <p style={{ fontFamily: fonts.sans, fontSize: 10, color: c.textTertiary, margin: 0 }}>
            {mode === 'connected' ? 'Live · your key' : 'Mock mode · no key'}
          </p>
        </div>
        {mode === 'connected' && settings ? (
          <ConnectedBadge
            settings={settings}
            dark={dark}
            onForget={() => setShowDelete(true)}
            onTest={() => send('Test connection — reply with one sentence confirming you can hear me.')}
          />
        ) : (
          <button
            onClick={() => setShowSetup(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 9px', borderRadius: 6, border: `1px solid ${dark ? 'rgba(167,139,250,0.3)' : '#DDD6FE'}`, background: dark ? 'rgba(167,139,250,0.10)' : '#F5F3FF', fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: violet, cursor: 'pointer' }}
          >
            <Key size={10} /> Connect key
          </button>
        )}
      </div>

      {/* No-key CTA strip */}
      {mode === 'mock' && (
        <div style={{ margin: '10px 12px 0', padding: '9px 12px', borderRadius: 8, background: dark ? 'rgba(167,139,250,0.07)' : '#F5F3FF', border: `1px solid ${dark ? 'rgba(167,139,250,0.18)' : '#DDD6FE'}`, flexShrink: 0 }}>
          <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textSecondary, margin: '0 0 6px', lineHeight: 1.5 }}>
            Mock mode — responses are prewritten. <strong style={{ color: violet }}>Connect your own AI key</strong> for live coaching.
          </p>
          <button
            onClick={() => setShowSetup(true)}
            style={{ padding: '5px 12px', borderRadius: 6, border: `1px solid ${dark ? 'rgba(167,139,250,0.3)' : '#DDD6FE'}`, background: 'transparent', fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: violet, cursor: 'pointer' }}
          >
            Connect your own AI key →
          </button>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 7, justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.role === 'coach' && (
              <div style={{ width: 20, height: 20, borderRadius: 5, background: dark ? 'rgba(167,139,250,0.14)' : '#F5F3FF', border: `1px solid ${dark ? 'rgba(167,139,250,0.22)' : '#DDD6FE'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <Sparkles size={9} color={violet} />
              </div>
            )}
            <div style={{ maxWidth: '84%', padding: '9px 11px', borderRadius: 10, background: m.role === 'user' ? (dark ? 'rgba(37,99,235,0.18)' : '#EFF6FF') : c.elevated, border: `1px solid ${m.role === 'user' ? (dark ? 'rgba(96,165,250,0.22)' : '#BFDBFE') : c.border}` }}>
              <p style={{ fontFamily: fonts.sans, fontSize: 12, color: m.role === 'user' ? (dark ? '#93C5FD' : '#1D4ED8') : c.textSecondary, margin: 0, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 7 }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: dark ? 'rgba(167,139,250,0.14)' : '#F5F3FF', border: `1px solid ${dark ? 'rgba(167,139,250,0.22)' : '#DDD6FE'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={9} color={violet} />
            </div>
            <div style={{ padding: '9px 14px', borderRadius: 10, background: c.elevated, border: `1px solid ${c.border}`, display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: violet, opacity: 0.6, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{ padding: '10px 12px', borderTop: `1px solid ${c.border}`, flexShrink: 0 }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 6px' }}>Suggested</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 7 }}>
          {lesson.coachPrompts.slice(0, 4).map((p, i) => (
            <button key={i} onClick={() => !loading && send(p)} style={{ padding: '4px 8px', borderRadius: 5, background: c.elevated, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 11, color: c.textSecondary, cursor: loading ? 'wait' : 'pointer', textAlign: 'left', lineHeight: 1.4 }}>{p}</button>
          ))}
        </div>
        <button
          onClick={() => setDiagramMode(d => !d)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 7, marginBottom: 7, background: diagramMode ? (dark ? 'rgba(167,139,250,0.1)' : '#F5F3FF') : c.elevated, border: `1px solid ${diagramMode ? (dark ? 'rgba(167,139,250,0.22)' : '#DDD6FE') : c.border}`, color: diagramMode ? violet : c.textSecondary, fontFamily: fonts.sans, fontSize: 12, cursor: 'pointer' }}
        >
          <Sparkles size={11} color={diagramMode ? violet : c.textTertiary} /> Generate quick visual
        </button>
        {diagramMode && (
          <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 7, padding: '9px 11px', marginBottom: 7 }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 9, color: violet, margin: '0 0 7px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{lesson.mentalModelTitle.split('→')[0]?.trim() ?? 'Flow'}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {lesson.flowNodes.slice(0, 5).map((n, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ flex: 1, padding: '3px 8px', borderRadius: 4, background: `${n.color}12`, border: `1px solid ${n.color}25` }}>
                    <span style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: n.color }}>{n.label}</span>
                  </div>
                  {i < Math.min(lesson.flowNodes.length, 5) - 1 && <span style={{ color: c.textTertiary, fontSize: 11 }}>↓</span>}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textTertiary, margin: '6px 0 0' }}>
              {mode === 'connected' ? 'Click "Generate quick visual" to ask the AI for a custom diagram.' : 'Lesson flow diagram · connect key for AI-generated diagrams'}
            </p>
          </div>
        )}
        <div style={{ display: 'flex', gap: 5 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !loading) send(input.trim()); }}
            placeholder={loading ? 'Waiting for response…' : 'Ask a question…'}
            disabled={loading}
            style={{ flex: 1, padding: '7px 11px', fontFamily: fonts.sans, fontSize: 12, background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 7, color: c.textPrimary, outline: 'none' }}
          />
          <button
            onClick={() => { if (input.trim() && !loading) send(input.trim()); }}
            disabled={!input.trim() || loading}
            style={{ padding: '7px 11px', borderRadius: 7, background: (input.trim() && !loading) ? violet : (dark ? '#1E293B' : '#E2E8F0'), color: (input.trim() && !loading) ? '#fff' : c.textTertiary, border: 'none', cursor: (input.trim() && !loading) ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'background 0.1s' }}
          >
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
