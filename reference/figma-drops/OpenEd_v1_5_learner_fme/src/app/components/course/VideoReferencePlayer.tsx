import { useState, useRef, useEffect, useCallback } from 'react';
import { ExternalLink, BookOpen, CheckCircle, AlertCircle, Play, Clock, Eye } from 'lucide-react';
import { C, fonts, shadow } from '../fme/types';
import {
  VIDEO_MEDIA_REGISTRY,
  toEmbedUrl,
  loadVideoProgress,
  saveVideoProgress,
  buildInitialProgress,
  type VideoProgressState,
  type MediaStatus,
} from '../../data/videoMediaRegistry';

// ── Badge ─────────────────────────────────────────────────────────────────────

function QABadge({ status, trackingMode, dark }: { status: MediaStatus; trackingMode: string; dark: boolean }) {
  const configs: Record<string, { label: string; bg: string; color: string }> = {
    external_reference_unverified: {
      label: 'Verify embed before publishing',
      bg: 'rgba(251,191,36,0.15)',
      color: '#B45309',
    },
    embed_verified: {
      label: 'Embedded tracking active',
      bg: 'rgba(16,185,129,0.12)',
      color: dark ? '#10B981' : '#047857',
    },
    embed_blocked: {
      label: 'External viewing required',
      bg: 'rgba(244,63,94,0.10)',
      color: dark ? '#F43F5E' : '#BE123C',
    },
    no_external_video_yet: {
      label: 'Media pending — use authored script',
      bg: 'rgba(148,163,184,0.12)',
      color: dark ? '#94A3B8' : '#475569',
    },
  };
  const cfg = configs[status] ?? configs.external_reference_unverified;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <span style={{
        fontFamily: fonts.mono, fontSize: 10, fontWeight: 700,
        padding: '2px 8px', borderRadius: 999,
        background: cfg.bg, color: cfg.color,
        border: `1px solid ${cfg.color}33`,
      }}>
        {cfg.label}
      </span>
      <span style={{
        fontFamily: fonts.mono, fontSize: 10,
        padding: '2px 8px', borderRadius: 999,
        background: dark ? 'rgba(96,165,250,0.10)' : '#EFF6FF',
        color: dark ? '#60A5FA' : '#2563EB',
        border: `1px solid ${dark ? 'rgba(96,165,250,0.25)' : '#BFDBFE'}`,
      }}>
        {trackingMode === 'embedded_tracking' ? 'Embedded tracking' :
         trackingMode === 'external_fallback_tracking' ? 'External fallback tracking' :
         'Reading script only'}
      </span>
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────

function WatchProgress({ progress, dark }: { progress: VideoProgressState; dark: boolean }) {
  const blue = dark ? '#60A5FA' : '#2563EB';
  if (!progress.hasPlayed && progress.watchedPercent === 0) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 3, background: dark ? '#1E293B' : '#E2E8F0', borderRadius: 999 }}>
        <div style={{ height: 3, width: `${progress.watchedPercent}%`, background: blue, borderRadius: 999, transition: 'width 1s' }} />
      </div>
      <span style={{ fontFamily: fonts.mono, fontSize: 10, color: dark ? '#94A3B8' : '#64748B', whiteSpace: 'nowrap' }}>
        {progress.watchedPercent}% watched
      </span>
      {progress.completed && <CheckCircle size={13} color={dark ? '#10B981' : '#047857'} />}
    </div>
  );
}

// ── External fallback ─────────────────────────────────────────────────────────

function ExternalMediaFallback({
  lessonId, mediaUrl, mediaTitle, mediaProvider, fallbackCopy, dark,
  onComplete,
}: {
  lessonId: string;
  mediaUrl: string;
  mediaTitle: string;
  mediaProvider: string;
  fallbackCopy: string;
  dark: boolean;
  onComplete: (reflection: string) => void;
}) {
  const c = C(dark);
  const [opened, setOpened] = useState(false);
  const [reflection, setReflection] = useState('');
  const [done, setDone] = useState(false);
  const blue = dark ? '#60A5FA' : '#2563EB';

  if (done) {
    return (
      <div style={{
        aspectRatio: '16/9', background: dark ? '#060D1A' : '#0F172A',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
      }}>
        <CheckCircle size={32} color='#10B981' />
        <p style={{ fontFamily: fonts.sans, fontSize: 14, color: '#10B981', margin: 0 }}>Reference marked as watched</p>
        <p style={{ fontFamily: fonts.mono, fontSize: 11, color: '#64748B', margin: 0 }}>Reflection saved</p>
      </div>
    );
  }

  return (
    <div style={{
      aspectRatio: '16/9', background: dark ? '#060D1A' : '#0F172A',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 16, padding: '24px 32px', textAlign: 'center',
    }}>
      <AlertCircle size={28} color='#F59E0B' />
      <div>
        <p style={{ fontFamily: fonts.sans, fontSize: 13, color: '#94A3B8', margin: '0 0 6px' }}>{fallbackCopy}</p>
        <p style={{ fontFamily: fonts.mono, fontSize: 11, color: '#60A5FA', margin: 0 }}>{mediaTitle}</p>
      </div>

      {/* Step 1: open */}
      <a
        href={mediaUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpened(true)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '9px 18px', borderRadius: 8,
          background: blue, color: '#fff',
          fontFamily: fonts.sans, fontSize: 13, fontWeight: 600,
          textDecoration: 'none', cursor: 'pointer',
        }}
      >
        <ExternalLink size={14} /> Open on {mediaProvider}
      </a>

      {/* Step 2+3: after opening */}
      {opened && (
        <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            placeholder="One-sentence reflection on what you took from this reference…"
            maxLength={300}
            style={{
              width: '100%', minHeight: 56, padding: '8px 10px',
              background: dark ? '#0F172A' : '#1E293B', color: '#F8FAFC',
              fontFamily: fonts.sans, fontSize: 12,
              border: `1px solid ${dark ? '#1E293B' : '#334155'}`, borderRadius: 6,
              resize: 'vertical', outline: 'none', boxSizing: 'border-box',
            }}
          />
          <button
            disabled={reflection.trim().length < 8}
            onClick={() => { setDone(true); onComplete(reflection.trim()); }}
            style={{
              padding: '8px 16px', borderRadius: 7, border: 'none', cursor: 'pointer',
              background: reflection.trim().length >= 8 ? blue : (dark ? '#1E293B' : '#E2E8F0'),
              color: reflection.trim().length >= 8 ? '#fff' : (dark ? '#475569' : '#94A3B8'),
              fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, transition: 'background 0.12s',
            }}
          >
            <Eye size={12} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
            Mark as watched
          </button>
        </div>
      )}
    </div>
  );
}

// ── Transcript drawer ─────────────────────────────────────────────────────────

function TranscriptDrawer({
  open, onClose, script, chapters, dark,
}: {
  open: boolean;
  onClose: () => void;
  script: string;
  chapters: { title: string; cue: string }[];
  dark: boolean;
}) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';

  if (!open) return null;

  // Convert **bold** markdown to spans
  const renderScript = (text: string) =>
    text.split('\n\n').map((para, i) => {
      const parts = para.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.7, margin: '0 0 14px' }}>
          {parts.map((part, j) =>
            j % 2 === 1
              ? <strong key={j} style={{ color: c.textPrimary, fontWeight: 600 }}>{part}</strong>
              : part
          )}
        </p>
      );
    });

  return (
    <div style={{
      padding: '20px 24px',
      borderTop: `1px solid ${c.border}`,
      background: dark ? 'rgba(14,22,40,0.6)' : '#FAFBFF',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, margin: '0 0 2px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Course-authored transcript / reading script
          </p>
          <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary, margin: 0 }}>
            Not a third-party video transcript — this is the course's own teaching layer.
          </p>
        </div>
        <button
          onClick={onClose}
          style={{ padding: '4px 10px', borderRadius: 6, border: `1px solid ${c.border}`, background: 'transparent', cursor: 'pointer', fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary }}
        >
          Close
        </button>
      </div>

      {chapters.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Chapters / what to watch for
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {chapters.map((ch, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, color: blue, minWidth: 20, paddingTop: 2 }}>{i + 1}.</span>
                <div>
                  <span style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: c.textPrimary }}>{ch.title}</span>
                  <span style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary }}> — {ch.cue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: '16px 18px', background: c.elevated, borderRadius: 8, border: `1px solid ${c.border}` }}>
        {renderScript(script)}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface VideoReferencePlayerProps {
  lessonId: string;
  dark: boolean;
}

export function VideoReferencePlayer({ lessonId, dark }: VideoReferencePlayerProps) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const entry = VIDEO_MEDIA_REGISTRY[lessonId];

  const [embedBlocked, setEmbedBlocked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [progress, setProgress] = useState<VideoProgressState>(() => {
    const saved = loadVideoProgress(lessonId);
    const mediaUrl = entry?.mediaUrl ?? null;
    return saved ?? buildInitialProgress(lessonId, mediaUrl);
  });

  const updateProgress = useCallback((patch: Partial<VideoProgressState>) => {
    setProgress(prev => {
      const next = { ...prev, ...patch, lastUpdatedAt: new Date().toISOString() };
      saveVideoProgress(next);
      return next;
    });
  }, []);

  // Cleanup polling on unmount
  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  if (!entry) {
    return (
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ aspectRatio: '16/9', background: dark ? '#060D1A' : '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 12, color: '#64748B' }}>No media registered for {lessonId}</p>
        </div>
      </div>
    );
  }

  const embedUrl = entry.mediaUrl ? toEmbedUrl(entry.mediaUrl) : null;
  const trackingMode = embedBlocked ? 'external_fallback_tracking' : 'embedded_tracking';

  const handleFallbackComplete = (reflection: string) => {
    updateProgress({
      trackingMode: 'external_fallback_tracking',
      completed: true,
      hasPlayed: true,
      watchedPercent: 100,
      reflection,
    });
  };

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: shadow.sm }}>

      {/* 16:9 media area */}
      <div style={{ aspectRatio: '16/9', background: dark ? '#060D1A' : '#0F172A', position: 'relative' }}>
        {entry.mediaStatus === 'no_external_video_yet' ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(37,99,235,0.18)', border: '2px solid rgba(37,99,235,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={22} color="#60A5FA" style={{ marginLeft: 3 }} />
            </div>
            <div style={{ textAlign: 'center', padding: '0 32px' }}>
              <p style={{ fontFamily: fonts.sans, fontSize: 14, color: '#94A3B8', margin: '0 0 6px' }}>Media pending</p>
              <p style={{ fontFamily: fonts.mono, fontSize: 11, color: '#64748B', margin: 0 }}>Use the authored course script in the transcript drawer.</p>
            </div>
          </div>
        ) : embedBlocked || !embedUrl ? (
          <ExternalMediaFallback
            lessonId={lessonId}
            mediaUrl={entry.mediaUrl!}
            mediaTitle={entry.mediaTitle}
            mediaProvider={entry.mediaProvider}
            fallbackCopy={entry.fallbackCopy}
            dark={dark}
            onComplete={handleFallbackComplete}
          />
        ) : (
          <>
            {entry.mediaStatus === 'external_reference_unverified' && (
              <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: 'rgba(251,191,36,0.92)', borderRadius: 6, padding: '4px 10px', display: 'flex', gap: 5, alignItems: 'center' }}>
                <AlertCircle size={11} color="#78350F" />
                <span style={{ fontFamily: fonts.mono, fontSize: 10, color: '#78350F', fontWeight: 700 }}>Verify embed before publishing</span>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title={entry.mediaTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => setEmbedBlocked(true)}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </>
        )}
      </div>

      {/* Meta bar */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${c.border}` }}>
        {/* Label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Reference video
          </span>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>·</span>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>Not course-owned</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {entry.mediaTitle}
            </p>
            <p style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, margin: '0 0 8px' }}>
              {entry.mediaProvider}
            </p>
            <QABadge status={entry.mediaStatus} trackingMode={trackingMode} dark={dark} />
          </div>

          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button
              onClick={() => setShowTranscript(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px',
                borderRadius: 6, border: `1px solid ${showTranscript ? (dark ? 'rgba(96,165,250,0.3)' : '#BFDBFE') : c.border}`,
                background: showTranscript ? (dark ? 'rgba(96,165,250,0.14)' : '#EFF6FF') : c.elevated,
                color: showTranscript ? blue : c.textSecondary,
                fontFamily: fonts.sans, fontSize: 12, cursor: 'pointer',
              }}
            >
              <BookOpen size={13} /> Course script
            </button>
            {entry.mediaUrl && !embedUrl && (
              <a
                href={entry.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px',
                  borderRadius: 6, border: `1px solid ${c.border}`,
                  background: c.elevated, color: c.textSecondary,
                  fontFamily: fonts.sans, fontSize: 12, textDecoration: 'none',
                }}
              >
                <ExternalLink size={13} /> Open
              </a>
            )}
          </div>
        </div>

        {progress.hasPlayed && (
          <div style={{ marginTop: 10 }}>
            <WatchProgress progress={progress} dark={dark} />
          </div>
        )}

        {/* Why this video */}
        <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, margin: '8px 0 0', lineHeight: 1.5 }}>
          <strong style={{ color: c.textSecondary }}>Why this reference: </strong>{entry.whyThisVideo}
        </p>
      </div>

      {/* Transcript drawer */}
      <TranscriptDrawer
        open={showTranscript}
        onClose={() => setShowTranscript(false)}
        script={entry.authoredScript}
        chapters={entry.chapters}
        dark={dark}
      />
    </div>
  );
}

// ── VideoQAStatus (for content-qa.tsx) ───────────────────────────────────────

interface MediaQAResult {
  lessonId: string;
  pass: boolean;
  issues: string[];
}

export function analyzeMediaQA(lessonId: string): MediaQAResult {
  const issues: string[] = [];
  const entry = VIDEO_MEDIA_REGISTRY[lessonId];

  if (!entry) {
    issues.push('No entry in video media registry v4');
    return { lessonId, pass: false, issues };
  }

  if (!entry.mediaUrl && entry.mediaStatus !== 'no_external_video_yet') {
    issues.push('Media URL missing but status is not no_external_video_yet');
  }

  if (!entry.authoredScript || entry.authoredScript.trim().length < 50) {
    issues.push('Authored course script missing or too short');
  }

  if (!entry.fallbackCopy || entry.fallbackCopy.trim().length < 10) {
    issues.push('Fallback copy missing');
  }

  // Duplicate URL check
  if (entry.mediaUrl) {
    const usedBy = Object.values(VIDEO_MEDIA_REGISTRY).filter(e => e.mediaUrl === entry.mediaUrl && e.lessonId !== lessonId);
    if (usedBy.length > 0) {
      issues.push(`Duplicate media URL used by: ${usedBy.map(e => e.lessonId).join(', ')}`);
    }
  }

  return { lessonId, pass: issues.length === 0, issues };
}
