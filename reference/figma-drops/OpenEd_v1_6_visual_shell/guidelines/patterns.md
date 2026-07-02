# Patterns

Recurring interaction, layout, and data-display patterns across the system. When building new screens, follow these patterns to maintain visual and behavioral consistency.

---

## Layout Patterns

### Full-screen page

Used by: Landing, Onboarding, Diagnostic, Certificate, auth screens

```tsx
// routes.tsx uses FullScreenWrapper:
<div style={{ minHeight: '100vh', background: c.bg, overflowY: 'auto' }}>
  <Screen {...props} />
</div>
```

Screen components own their own header (64px nav bar) + all section content.

**Header pattern:**
```tsx
<header style={{
  height: 64, background: c.surface,
  borderBottom: `1px solid ${c.border}`,
  padding: '0 48px',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
}}>
  <Logo />
  <Actions />
</header>
```

**Content section pattern:**
```tsx
<section style={{ padding: '60px 48px', background: c.surface, borderTop: `1px solid ${c.border}` }}>
  <div style={{ maxWidth: 1000, margin: '0 auto' }}>
    <EyebrowLabel />  {/* fonts.mono, 11px, uppercase, blue */}
    <H2 />            {/* fonts.display, 26px, 700 */}
    {content}
  </div>
</section>
```

---

### Course shell page

Used by: all `/course/*` screens

Screens receive `ScreenProps` and render inside `<main>` (flex:1, overflowY:auto). They own their internal layout but not the nav or sidebar.

**Common screen header:**
```tsx
<div style={{ padding: '28px 32px', borderBottom: `1px solid ${c.border}` }}>
  <p style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, ... }}>Eyebrow</p>
  <h1 style={{ fontFamily: fonts.display, fontSize: 22, ... }}>Title</h1>
</div>
<div style={{ padding: '24px 32px' }}>
  {/* body content */}
</div>
```

---

### Two-column layout

Used by: lesson (content + sidebar), case-study (main + sidebar), risk-dashboard (matrix + report), portfolio (checklist + grid)

```tsx
<div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
  <div style={{ flex: 1, minWidth: 0 }}>
    {/* main content */}
  </div>
  <div style={{ width: 300, flexShrink: 0 }}>
    {/* sidebar */}
  </div>
</div>
```

---

### Card grid

Used by: module-index, landing phases, course promises, sources, evidence library

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: 14
}}>
  {items.map(item => <Card key={item.id} ... />)}
</div>
```

Card anatomy:
```tsx
<div style={{
  background: c.surface,
  border: `1px solid ${c.border}`,
  borderRadius: 14,
  padding: '20px 22px',
  boxShadow: shadow.sm,
}}>
  <IconBadge />
  <CardTitle />   {/* fonts.display, 14px, 700 */}
  <CardBody />    {/* fonts.sans, 13px, c.textSecondary */}
</div>
```

---

## Navigation Patterns

### Course navigation

**`navigate(screenId: ScreenId)`** from `useCourse()` — updates both React state and the URL.

```ts
navigate('dashboard')     // → /course/dashboard
navigate('lesson')        // → /course/lesson
navigate('modules')       // → /course/modules
```

Full mapping in `CourseContext.SCREEN_PATHS`.

**Never use `window.location.href` or bare `<a href>` for in-app course navigation.** Always use `navigate()` from CourseContext or `useNavigate()` from react-router.

### Auth redirect

`<Navigate to="/login" state={{ from: location.pathname }} replace />` — ProtectedRoute saves the attempted path so login can redirect back after auth (future implementation).

### External links

```tsx
<a href={url} target="_blank" rel="noopener noreferrer" style={{ color: blue }}>
  {label} <ExternalLink size={12} />
</a>
```

---

## Interaction Patterns

### Stepper / multi-step flow

Used by: benchmark-builder (4 steps), simulation (4 phases), onboarding (4 steps), diagnostic, module-detail challenge (3 steps)

```tsx
const [step, setStep] = useState(0);
const steps = ['Step 1', 'Step 2', 'Step 3'];

// Progress indicator
<div style={{ display: 'flex', gap: 8 }}>
  {steps.map((s, i) => (
    <div key={s} style={{
      height: 3, flex: 1, borderRadius: 999,
      background: i <= step ? blue : c.elevated,
    }} />
  ))}
</div>

// Navigation
<button onClick={() => setStep(s => s - 1)} disabled={step === 0}>Back</button>
<button onClick={() => setStep(s => s + 1)} disabled={step === steps.length - 1}>Next</button>
```

---

### Expandable card / accordion

Used by: lesson key ideas, artifact list in module-detail, phase rows in content-qa, case-study timeline

Pattern: local `useState<string | null>(null)` for open ID; click toggles; chevron rotates.

```tsx
const [open, setOpen] = useState<string | null>(null);

<div onClick={() => setOpen(open === item.id ? null : item.id)} style={{ cursor: 'pointer' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>{item.label}</span>
    <ChevronDown size={14} style={{ transform: open === item.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
  </div>
  {open === item.id && <div>{item.content}</div>}
</div>
```

---

### Filter tabs

Used by: module-index (status filters), sources (type + phase), evidence-library (type + confidence)

```tsx
const [filter, setFilter] = useState('all');
const filters = [
  { id: 'all', label: 'All' },
  { id: 'completed', label: 'Completed' },
  { id: 'in-progress', label: 'In Progress' },
];

<div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
  {filters.map(f => (
    <button
      key={f.id}
      onClick={() => setFilter(f.id)}
      style={{
        padding: '6px 14px', borderRadius: 999, fontSize: 12,
        background: filter === f.id ? blue : c.elevated,
        color: filter === f.id ? '#fff' : c.textSecondary,
        border: `1px solid ${filter === f.id ? blue : c.border}`,
        cursor: 'pointer', fontFamily: fonts.sans,
      }}
    >
      {f.label}
    </button>
  ))}
</div>
```

---

### Inline create form

Used by: evidence-library (new card), benchmark-builder (add task)

Appears below the header or above the list. Controlled state for each field; save button commits to context state via `update()`.

```tsx
const [creating, setCreating] = useState(false);
{creating && (
  <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 20, marginBottom: 16 }}>
    <input ... />
    <select ... />
    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => setCreating(false)}>Cancel</button>
    </div>
  </div>
)}
```

---

### Hover state (nav items, menu rows)

For interactive rows and nav buttons without a Radix primitive:

```tsx
<button
  onMouseEnter={e => (e.currentTarget.style.background = c.elevated)}
  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
  style={{ background: 'transparent', transition: 'background 0.12s' }}
>
```

---

## Progress Visualization

### Linear bar (course progress)

```tsx
<div style={{ height: 4, background: c.elevated, borderRadius: 999 }}>
  <div style={{ height: 4, width: `${pct}%`, background: blue, borderRadius: 999 }} />
</div>
```

### Segmented bar (quiz progress)

```tsx
{questions.map((_, i) => (
  <div key={i} style={{
    flex: 1, height: 4, borderRadius: 999,
    background: i < currentIndex ? blue : i === currentIndex ? c.primary : c.elevated,
  }} />
))}
```

### SVG progress ring (module detail hero)

```tsx
const circumference = 2 * Math.PI * 40; // r=40
const dash = circumference * (pct / 100);
<svg width={100} height={100}>
  <circle cx={50} cy={50} r={40} fill="none" stroke={c.elevated} strokeWidth={6} />
  <circle cx={50} cy={50} r={40} fill="none" stroke={blue} strokeWidth={6}
    strokeDasharray={`${dash} ${circumference}`}
    strokeLinecap="round"
    transform="rotate(-90 50 50)"
  />
</svg>
```

### Step dots (onboarding)

```tsx
{steps.map((_, i) => (
  <div key={i} style={{
    width: i === step ? 20 : 8, height: 8,
    borderRadius: 999,
    background: i === step ? blue : c.border,
    transition: 'all 0.2s',
  }} />
))}
```

---

## Status & State Indicators

### Lesson / item status icons

| Status | Icon | Color |
|---|---|---|
| Completed | `CheckCircle2` or ✓ | `c.success` |
| Active / In Progress | `Play` or ▶ | `blue` |
| Upcoming | `Circle` or ○ | `c.textTertiary` |
| Locked | `Lock` | `c.textTertiary` (reduced opacity) |

### Evidence confidence dots

| Level | Color |
|---|---|
| High | `c.success` (`#10B981` / `#047857`) |
| Medium | `c.warning` (`#F59E0B` / `#B45309`) |
| Low | `c.danger` (`#F43F5E` / `#BE123C`) |

---

## Typography Patterns

### Eyebrow label

```tsx
<p style={{
  fontFamily: fonts.mono, fontSize: 11, color: blue,
  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12
}}>
  Section Category
</p>
```

### Section heading

```tsx
<h2 style={{
  fontFamily: fonts.display, fontSize: 26, fontWeight: 700,
  color: c.textPrimary, margin: '0 0 8px', letterSpacing: '-0.015em'
}}>
  Heading Text
</h2>
```

### Mono metadata / ID

```tsx
<span style={{
  fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary,
  background: c.elevated, padding: '2px 7px',
  borderRadius: 999, border: `1px solid ${c.border}`
}}>
  EVD-0042
</span>
```

---

## Dark Mode Pattern

Dark mode is toggled via the TopNav button and stored in `CourseState.dark`. The pattern for consuming it:

```tsx
// In any screen component receiving ScreenProps:
const c = C(state.dark);
const blue = state.dark ? '#60A5FA' : '#2563EB';

// For components that get dark prop directly:
function MyComponent({ dark }: { dark: boolean }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
}
```

**Never read dark mode from localStorage or media queries** in course components. Always use `state.dark` from CourseContext.

Auth screens are always light. Do not add dark mode to auth screens without explicit instruction.

---

## Spinner / Loading Pattern

```tsx
<div style={{
  width: 14, height: 14,
  border: '2px solid rgba(255,255,255,0.4)',
  borderTopColor: '#fff',
  borderRadius: '50%',
  animation: 'spin 0.7s linear infinite'
}} />
<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
```

For dark backgrounds (protected route loading screen), use blue tones:
```tsx
border: '2px solid rgba(96,165,250,0.3)', borderTopColor: '#60A5FA'
```

---

## Button Styles

### Primary CTA button

```tsx
<button style={{
  background: '#2563EB', color: '#fff', border: 'none',
  padding: '14px 30px', borderRadius: 8,
  fontSize: 15, fontWeight: 600,
  cursor: 'pointer', fontFamily: fonts.sans,
  display: 'flex', alignItems: 'center', gap: 8,
}}>
  Action label <ArrowRight size={15} />
</button>
```

### Secondary / ghost button

```tsx
<button style={{
  background: 'transparent', color: c.textSecondary,
  border: `1px solid ${c.border}`,
  padding: '14px 24px', borderRadius: 8,
  fontSize: 14, cursor: 'pointer', fontFamily: fonts.sans,
}}>
  Secondary action
</button>
```

### Icon button (nav / toggle)

```tsx
<button style={{
  width: 34, height: 34, borderRadius: 8,
  background: c.elevated, border: `1px solid ${c.border}`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
}}>
  <Moon size={14} color={c.textSecondary} />
</button>
```
