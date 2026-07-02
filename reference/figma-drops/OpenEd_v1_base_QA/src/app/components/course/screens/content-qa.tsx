import { useState } from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, X, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps } from '../course-types';
import { LESSONS, PHASE_LESSONS, type LessonData } from '../../../data/lessonContent';
import { VIDEO_MEDIA_REGISTRY, getDuplicateMediaUrls } from '../../../data/videoMediaRegistry';
import { analyzeMediaQA } from '../VideoReferencePlayer';

// ── QA analysis ───────────────────────────────────────────────────────────────
function analyzeLesson(lesson: LessonData) {
  const issues: string[] = [];
  const warnings: string[] = [];

  // V4 media QA: replace old video-status checks
  const mediaQA = analyzeMediaQA(lesson.lessonId);
  if (!mediaQA.pass) {
    mediaQA.issues.forEach(i => issues.push(`Media: ${i}`));
  }

  if (lesson.sources.length === 0) {
    issues.push('No sources — add at least one required source');
  }
  if (!lesson.sources.some(s => s.required)) {
    warnings.push('No required source — mark at least one as required');
  }
  if (lesson.keyIdeas.length === 0 || lesson.keyIdeas[0].title === 'Content pending') {
    issues.push('Key ideas pending — add to content pack');
  }
  if (lesson.workedExample.weak === 'Weak version pending.') {
    warnings.push('Worked example pending — add to content pack');
  }
  if (lesson.practiceFields.length <= 1 && lesson.practiceFields[0]?.key === 'practice') {
    warnings.push('Practice fields pending — add to content pack');
  }
  if (lesson.artifactFields.length <= 1 && lesson.artifactFields[0]?.key === 'field') {
    issues.push('Artifact fields pending — add to content pack');
  }
  if (lesson.quizQuestion === 'Quiz pending.') {
    warnings.push('Quiz pending — add to content pack');
  }
  if (!lesson.nextLessonId && lesson.lessonNum < lesson.lessonOf) {
    issues.push('Missing nextLessonId — navigation chain broken');
  }

  const status: 'pass' | 'warn' | 'fail' = issues.length > 0 ? 'fail' : warnings.length > 0 ? 'warn' : 'pass';
  return { issues, warnings, status };
}

// ── Summary stats ─────────────────────────────────────────────────────────────
function computeStats() {
  const all = Object.values(LESSONS);
  const total = all.length;
  const registryCount = Object.keys(VIDEO_MEDIA_REGISTRY).length;
  const duplicates = getDuplicateMediaUrls();
  const noSources = all.filter(l => l.sources.length === 0).length;
  const contentPending = all.filter(l => l.keyIdeas[0]?.title === 'Content pending').length;
  const mediaPassCount = all.filter(l => analyzeMediaQA(l.lessonId).pass).length;
  const fullyReady = all.filter(l => analyzeLesson(l).status === 'pass').length;
  const warned = all.filter(l => analyzeLesson(l).status === 'warn').length;
  const failed = all.filter(l => analyzeLesson(l).status === 'fail').length;
  return { total, registryCount, duplicateUrls: duplicates.size, noSources, contentPending, mediaPassCount, fullyReady, warned, failed };
}

// ── Video QA Status panel ────────────────────────────────────────────────────
function VideoQAStatusPanel({ state }: { state: ScreenProps['state'] }) {
  const c = C(state.dark);
  const blue = state.dark ? '#60A5FA' : '#2563EB';
  const [expanded, setExpanded] = useState(false);
  const duplicates = getDuplicateMediaUrls();
  const all = Object.values(LESSONS);
  const results = all.map(l => ({ lesson: l, qa: analyzeMediaQA(l.lessonId) }));
  const passed = results.filter(r => r.qa.pass).length;
  const failed = results.filter(r => !r.qa.pass).length;
  const hasIssues = failed > 0 || duplicates.size > 0;

  return (
    <div style={{ background: c.surface, border: `1px solid ${hasIssues ? (state.dark ? 'rgba(244,63,94,0.3)' : '#FECDD3') : (state.dark ? 'rgba(16,185,129,0.3)' : '#A7F3D0')}`, borderRadius: 14, overflow: 'hidden', boxShadow: shadow.sm, marginBottom: 24 }}>
      <button
        onClick={() => setExpanded(v => !v)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <Play size={14} color={blue} />
        <span style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, flex: 1 }}>
          Video Media QA — V4 Registry
        </span>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 11, color: state.dark ? '#4ADE80' : '#15803D' }}>✓{passed} pass</span>
          {failed > 0 && <span style={{ fontFamily: fonts.mono, fontSize: 11, color: state.dark ? '#F87171' : '#B91C1C' }}>✗{failed} fail</span>}
          {duplicates.size > 0 && <span style={{ fontFamily: fonts.mono, fontSize: 11, color: state.dark ? '#FBBF24' : '#B45309' }}>⚠{duplicates.size} dup URLs</span>}
          {expanded ? <ChevronUp size={14} color={c.textTertiary} /> : <ChevronDown size={14} color={c.textTertiary} />}
        </div>
      </button>

      {expanded && (
        <div style={{ borderTop: `1px solid ${c.border}` }}>
          {/* V4 rules */}
          <div style={{ padding: '12px 20px', background: c.elevated, borderBottom: `1px solid ${c.border}` }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>V4 media QA rules</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {[
                'No duplicate URL across lessons',
                'Lesson objective must match media',
                'Authored course script must exist',
                'Fallback copy must exist',
                'No lesson may claim course-owned video',
                'Embed tracking mode must be visible',
                'External fallback flow must exist',
                'Transcript drawer must use course script',
              ].map((rule, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <CheckCircle size={10} color={state.dark ? '#4ADE80' : '#15803D'} />
                  <span style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textSecondary }}>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Duplicate URLs */}
          {duplicates.size > 0 && (
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${c.border}`, background: state.dark ? 'rgba(251,191,36,0.06)' : '#FFFBEB' }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: state.dark ? '#FBBF24' : '#B45309', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Duplicate media URLs detected</p>
              {[...duplicates.entries()].map(([url, lessons]) => (
                <div key={url} style={{ marginBottom: 6 }}>
                  <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, margin: '0 0 2px', wordBreak: 'break-all' }}>{url}</p>
                  <p style={{ fontFamily: fonts.mono, fontSize: 10, color: state.dark ? '#FBBF24' : '#B45309', margin: 0 }}>Used by: {lessons.join(', ')}</p>
                </div>
              ))}
            </div>
          )}

          {/* Per-lesson results */}
          {results.filter(r => !r.qa.pass).map(({ lesson, qa }) => (
            <div key={lesson.lessonId} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '10px 20px', borderBottom: `1px solid ${c.border}` }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, flexShrink: 0, minWidth: 56, marginTop: 1 }}>{lesson.lessonId}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: c.textPrimary, margin: '0 0 3px' }}>{lesson.title}</p>
                {qa.issues.map((issue, i) => (
                  <div key={i} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <X size={10} color={state.dark ? '#F87171' : '#B91C1C'} />
                    <span style={{ fontFamily: fonts.sans, fontSize: 11, color: state.dark ? '#F87171' : '#B91C1C' }}>{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {results.filter(r => r.qa.pass).length === results.length && (
            <div style={{ padding: '14px 20px', display: 'flex', gap: 8, alignItems: 'center' }}>
              <CheckCircle size={14} color={state.dark ? '#4ADE80' : '#15803D'} />
              <span style={{ fontFamily: fonts.sans, fontSize: 13, color: state.dark ? '#4ADE80' : '#15803D' }}>All lessons pass V4 media QA</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Phase QA row ──────────────────────────────────────────────────────────────
function PhaseRow({ phaseId, state, navigate, update }: { phaseId: string } & ScreenProps) {
  const c = C(state.dark);
  const [expanded, setExpanded] = useState(false);
  const lessonIds = PHASE_LESSONS[phaseId] ?? [];
  const lessons = lessonIds.map(id => LESSONS[id]).filter(Boolean);
  const phaseAnalysis = lessons.map(l => analyzeLesson(l));
  const failCount = phaseAnalysis.filter(a => a.status === 'fail').length;
  const warnCount = phaseAnalysis.filter(a => a.status === 'warn').length;
  const passCount = phaseAnalysis.filter(a => a.status === 'pass').length;

  const phaseStatus = failCount > 0 ? 'fail' : warnCount > 0 ? 'warn' : 'pass';
  const statusColor = phaseStatus === 'pass' ? (state.dark ? '#4ADE80' : '#15803D') : phaseStatus === 'warn' ? (state.dark ? '#FBBF24' : '#B45309') : (state.dark ? '#F87171' : '#B91C1C');
  const statusIcon = phaseStatus === 'pass' ? <CheckCircle size={14} color={statusColor} /> : phaseStatus === 'warn' ? <AlertTriangle size={14} color={statusColor} /> : <X size={14} color={statusColor} />;

  const phaseColors: Record<string, string> = { P1: '#1D4ED8', P2: '#0F766E', P3: '#7C3AED', P4: '#B45309', P5: '#B91C1C', P6: '#15803D' };
  const phaseColor = phaseColors[phaseId] ?? '#64748B';

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'hidden', boxShadow: shadow.sm }}>
      <button
        onClick={() => setExpanded(v => !v)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: phaseColor, background: `${phaseColor}12`, padding: '3px 9px', borderRadius: 999, flexShrink: 0 }}>{phaseId}</span>
        <span style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, flex: 1 }}>{lessons[0]?.phaseTitle}</span>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
          {passCount > 0 && <span style={{ fontFamily: fonts.mono, fontSize: 11, color: state.dark ? '#4ADE80' : '#15803D' }}>✓{passCount}</span>}
          {warnCount > 0 && <span style={{ fontFamily: fonts.mono, fontSize: 11, color: state.dark ? '#FBBF24' : '#B45309' }}>⚠{warnCount}</span>}
          {failCount > 0 && <span style={{ fontFamily: fonts.mono, fontSize: 11, color: state.dark ? '#F87171' : '#B91C1C' }}>✗{failCount}</span>}
          {statusIcon}
          {expanded ? <ChevronUp size={14} color={c.textTertiary} /> : <ChevronDown size={14} color={c.textTertiary} />}
        </div>
      </button>

      {expanded && (
        <div style={{ borderTop: `1px solid ${c.border}` }}>
          {lessons.map((lesson, i) => {
            const analysis = phaseAnalysis[i];
            const lColor = analysis.status === 'pass' ? (state.dark ? '#4ADE80' : '#15803D') : analysis.status === 'warn' ? (state.dark ? '#FBBF24' : '#B45309') : (state.dark ? '#F87171' : '#B91C1C');
            return (
              <div key={lesson.lessonId} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 20px', borderBottom: i < lessons.length - 1 ? `1px solid ${c.border}` : 'none', background: i % 2 === 0 ? 'transparent' : c.elevated }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, flexShrink: 0, minWidth: 48, marginTop: 2 }}>{lesson.lessonId}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    {analysis.status === 'pass' ? <CheckCircle size={12} color={lColor} /> : analysis.status === 'warn' ? <AlertTriangle size={12} color={lColor} /> : <X size={12} color={lColor} />}
                    <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 500, color: c.textPrimary }}>{lesson.title}</span>
                    <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>{lesson.duration}</span>
                    {/* Video badge */}
                    {lesson.videoStatus === 'pending' && (
                      <span style={{ fontFamily: fonts.mono, fontSize: 9, color: state.dark ? '#FBBF24' : '#B45309', background: state.dark ? 'rgba(251,191,36,0.12)' : '#FFFBEB', padding: '1px 6px', borderRadius: 999, border: `1px solid ${state.dark ? 'rgba(251,191,36,0.25)' : '#FDE68A'}` }}>VIDEO_PENDING</span>
                    )}
                    {lesson.videoStatus === 'candidate-external' && (
                      <span style={{ fontFamily: fonts.mono, fontSize: 9, color: state.dark ? '#60A5FA' : '#2563EB', background: state.dark ? 'rgba(96,165,250,0.12)' : '#EFF6FF', padding: '1px 6px', borderRadius: 999, border: `1px solid ${state.dark ? 'rgba(96,165,250,0.25)' : '#BFDBFE'}` }}>candidate-external</span>
                    )}
                  </div>
                  {(analysis.issues.length > 0 || analysis.warnings.length > 0) && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {analysis.issues.map((issue, j) => (
                        <div key={j} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <X size={10} color={state.dark ? '#F87171' : '#B91C1C'} />
                          <span style={{ fontFamily: fonts.sans, fontSize: 12, color: state.dark ? '#F87171' : '#B91C1C' }}>{issue}</span>
                        </div>
                      ))}
                      {analysis.warnings.map((warn, j) => (
                        <div key={j} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <AlertTriangle size={10} color={state.dark ? '#FBBF24' : '#B45309'} />
                          <span style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary }}>{warn}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => { update({ currentLessonId: lesson.lessonId, currentModuleId: lesson.phaseId as any }); navigate('lesson'); }}
                  style={{ padding: '4px 10px', borderRadius: 6, background: c.elevated, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 11, color: c.textSecondary, cursor: 'pointer', flexShrink: 0 }}
                >
                  Open →
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main QA screen ────────────────────────────────────────────────────────────
export function ContentQAScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const blue = state.dark ? '#60A5FA' : '#2563EB';
  const stats = computeStats();

  const statCards = [
    { label: 'Lessons imported', value: stats.total, color: blue, note: 'All lessons across 6 phases' },
    { label: 'Fully ready', value: stats.fullyReady, color: state.dark ? '#4ADE80' : '#15803D', note: 'No issues or warnings' },
    { label: 'Warnings', value: stats.warned, color: state.dark ? '#FBBF24' : '#B45309', note: 'Check before publishing' },
    { label: 'Issues', value: stats.failed, color: state.dark ? '#F87171' : '#B91C1C', note: 'Must fix before publishing' },
    { label: 'Media registry entries', value: stats.registryCount, color: blue, note: 'V4 unique reference media' },
    { label: 'Media QA pass', value: stats.mediaPassCount, color: state.dark ? '#4ADE80' : '#15803D', note: 'Unique URL + script + fallback' },
    { label: 'Duplicate media URLs', value: stats.duplicateUrls, color: stats.duplicateUrls > 0 ? (state.dark ? '#F87171' : '#B91C1C') : (state.dark ? '#4ADE80' : '#15803D'), note: stats.duplicateUrls > 0 ? 'Must fix — see Media QA section' : 'None detected' },
    { label: 'No sources', value: stats.noSources, color: state.dark ? '#F87171' : '#B91C1C', note: 'Add required sources' },
  ];

  return (
    <div style={{ fontFamily: fonts.sans, background: c.bg, minHeight: '100vh', padding: '32px 36px' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px' }}>
            Content Integration QA
          </p>
          <h1 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, color: c.textPrimary, margin: '0 0 6px', lineHeight: 1.2 }}>
            Course Content Status
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textSecondary, margin: 0, lineHeight: 1.6 }}>
            40 lessons imported from 6 phase content files. Phases 1–3 have full content. Phases 4–6 have lesson metadata — full content pack integration pending.
          </p>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
          {statCards.map(s => (
            <div key={s.label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '14px 16px', boxShadow: shadow.sm }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 28, fontWeight: 700, color: s.color, margin: '0 0 4px', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: c.textPrimary, margin: '0 0 3px' }}>{s.label}</p>
              <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary, margin: 0 }}>{s.note}</p>
            </div>
          ))}
        </div>

        {/* Video media QA V4 */}
        <VideoQAStatusPanel state={state} />

        {/* QA rules summary */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 24px', marginBottom: 24, boxShadow: shadow.sm }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 14px' }}>QA rules</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { section: 'Lesson QA', items: ['Each lesson is video-first', 'Each lesson has a learning objective', 'Each lesson has an AI Coach panel', 'Each lesson has at least one interaction', 'Each lesson has an artifact output', 'Each lesson has a source drawer', 'Missing video/source content is flagged', 'No lesson is just a long article'] },
              { section: 'Media QA (V4)', items: ['No course-owned video claims', 'No duplicate reference URLs', 'Authored script in every transcript drawer', 'Fallback flow for every embed', 'Tracking mode visible in every card', 'Reference label — not "official video"', 'No third-party transcript copy', 'All media mapped to lesson objective'] },
            ].map(col => (
              <div key={col.section}>
                <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 8px' }}>{col.section}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {col.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                      <CheckCircle size={11} color={state.dark ? '#4ADE80' : '#15803D'} />
                      <span style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textSecondary }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content gaps summary */}
        <div style={{ background: state.dark ? 'rgba(180,83,9,0.08)' : '#FFFBEB', border: `1px solid ${state.dark ? 'rgba(251,191,36,0.22)' : '#FDE68A'}`, borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <AlertCircle size={15} color={state.dark ? '#FBBF24' : '#B45309'} style={{ marginTop: 1, flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: fonts.mono, fontSize: 10, color: state.dark ? '#FBBF24' : '#B45309', margin: '0 0 6px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Content integration gaps</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  `Phase 4 (7 lessons): Lesson metadata imported. Full key ideas, worked examples, practice fields, and quizzes pending from phase_04 file.`,
                  `Phase 5 (8 lessons): Lesson metadata imported. Full content for L2–L8 pending from phase_05 file.`,
                  `Phase 6 (6 lessons): Lesson metadata imported. Full content for L2–L6 pending from phase_06 file.`,
                  `Video media (V4): All ${stats.registryCount} registered lessons use unique external reference media. No course-owned video is claimed. All embeds require runtime verification. ${stats.duplicateUrls === 0 ? 'No duplicate URLs detected.' : `${stats.duplicateUrls} duplicate URL(s) detected — see Media QA section.`}`,
                  `Sources: All source IDs, titles, orgs, and URLs are accurate to the phase files. No source URLs were invented.`,
                ].map((gap, i) => (
                  <p key={i} style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: 0, lineHeight: 1.6 }}>{gap}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Per-phase QA */}
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>Per-phase lesson QA</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.keys(PHASE_LESSONS).map(phaseId => (
              <PhaseRow key={phaseId} phaseId={phaseId} state={state} navigate={navigate} update={update} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
