# Components

All reusable components in the system — layout shells, auth components, UI primitives, and composite course components.

---

## Layout Shells

### `CourseLayout`

**File:** `src/app/components/course/CourseLayout.tsx`  
**Renders:** `TopNav` + `LeftRail` + `<Outlet />` (scrollable main)  
**Used for:** All `/course/*` routes (wrapped in `ProtectedRoute`)

**Structure:**
```
<div height:100vh flex:column>
  <TopNav />                  ← 64px fixed header
  <div flex:1 flex:row>
    <LeftRail />              ← 72px collapsed / 200px expanded
    <main flex:1 overflow>    ← screen content
      <Outlet />
    </main>
  </div>
</div>
```

#### `TopNav`

Sub-component inside CourseLayout.

| Region | Contents |
|---|---|
| Left | Logo (Shield icon + "Frontier Evaluation Lab" wordmark) → navigates to dashboard |
| Separator | 1px vertical rule |
| Breadcrumb | Current phase name → navigates to modules; current lesson name |
| Progress | 140px progress bar + `X.Xh / 51h` label |
| Actions | Dark/light toggle button + `UserProfileMenu` |

#### `UserProfileMenu`

Dropdown triggered by avatar button in TopNav.

**Shows:** User initials (from `full_name` metadata or email), chevron icon

**Menu items:**
- Email + full name header (read-only)
- My progress → `navigate('dashboard')`
- Settings → (placeholder, no action yet)
- Divider
- Sign out → `signOut()` → redirects to `/`

**Behavior:** Click outside closes; hover states on menu items; sign out row is danger-colored

#### `LeftRail`

Collapsible sidebar. Expands from 72px → 200px on hover.

**Navigation groups:**

| Section | Items |
|---|---|
| Primary | Dashboard, Learning Map, All Phases, Current Lesson |
| Tools | Evidence Library, Source Library, Benchmark Builder, Risk Dashboard, Glossary, Content QA |
| Bottom | Capstone Studio ↗ (opens `/capstone/brief`), Profile (learner name) |

**Active state:** Blue indicator bar on left edge + `c.primarySoft` background + blue icon/text

**Transition:** `width 0.18s ease, padding 0.18s ease`

---

### `CapstoneStudio`

**File:** `src/app/components/capstone/CapstoneStudio.tsx`  
**Provider:** `CapstoneContext`  
**Layout:** Standalone (does not use CourseLayout)

Left sidebar (section navigation with status dots) + scrollable main area renders the active section component.

---

## Auth Components

### `AuthProvider` + `useAuth`

**File:** `src/app/components/auth/AuthContext.tsx`

Wraps the entire app (lives in `Root` in `routes.tsx`). Exposes:

```ts
interface AuthContextValue {
  user: User | null          // Supabase User object
  session: Session | null    // Supabase Session
  loading: boolean           // true during initial session check
  isAuthenticated: boolean   // !!user
  signUp(email, password, fullName): Promise<{ error: string|null, needsConfirmation: boolean }>
  signIn(email, password): Promise<{ error: string|null }>
  signOut(): Promise<void>
  resetPassword(email): Promise<{ error: string|null }>
}
```

**Session management:** `supabase.auth.getSession()` on mount; `onAuthStateChange` subscription for live updates.

---

### `AuthShell`

**File:** `src/app/components/auth/AuthShell.tsx`

Standalone page shell for auth screens (Login, SignUp, ForgotPassword). Always light mode.

**Props:** `title`, `subtitle`, `children`, `dark?` (unused — reserved)

**Structure:**
```
<div minHeight:100vh>
  <header>             ← Logo wordmark
  <div center>
    <div maxWidth:440>
      <heading block>  ← eyebrow + h1 + subtitle
      <card>           ← children (form content)
```

---

### `AuthField`

Labeled input field for auth forms.

**Props:** `label`, `type?`, `value`, `onChange`, `placeholder?`, `autoComplete?`, `error?`

Renders `<label>` + `<input>` + optional inline error message in danger color.

---

### `AuthBtn`

Full-width submit button.

**Props:** `label`, `loading?`, `onClick?`, `type?`

Loading state: disabled + blue-300 background + spinner icon.

---

### `AuthError` / `AuthSuccess`

Inline alert boxes.

**`AuthError`:** Danger-soft background, danger border, danger text  
**`AuthSuccess`:** Success-soft background, success border, success text

---

### `ProtectedRoute`

**File:** `src/app/components/auth/ProtectedRoute.tsx`

Wraps any subtree. Behavior:

| Auth state | Result |
|---|---|
| `loading: true` | Full-screen dark spinner with Shield logo |
| `isAuthenticated: false` | `<Navigate to="/login" state={{ from: location.pathname }} />` |
| `isAuthenticated: true` | Renders `children` |

---

## UI Primitives

All in `src/app/components/ui/`. These are Radix UI + shadcn/ui-style wrappers with Tailwind class styling. Import by filename:

```ts
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
```

**Complete list (47 components):**

| Component file | Radix primitive | Notes |
|---|---|---|
| `accordion.tsx` | Accordion | Expandable section |
| `alert.tsx` | — | Alert box with variants |
| `alert-dialog.tsx` | AlertDialog | Destructive action confirm |
| `avatar.tsx` | Avatar | Image with fallback initials |
| `badge.tsx` | — | Small status chip |
| `button.tsx` | — | Button with variants (default/destructive/outline/ghost/link) |
| `calendar.tsx` | — | Date picker calendar |
| `card.tsx` | — | Card, CardHeader, CardContent, CardFooter |
| `checkbox.tsx` | Checkbox | Controlled checkbox |
| `collapsible.tsx` | Collapsible | Show/hide region |
| `command.tsx` | Command | Searchable command palette |
| `context-menu.tsx` | ContextMenu | Right-click menu |
| `dialog.tsx` | Dialog | Modal overlay |
| `drawer.tsx` | — | Slide-in panel |
| `dropdown-menu.tsx` | DropdownMenu | Click-triggered menu |
| `form.tsx` | — | react-hook-form integration |
| `hover-card.tsx` | HoverCard | Hover-triggered card |
| `input.tsx` | — | Text input |
| `input-otp.tsx` | — | OTP code input |
| `label.tsx` | Label | Form label |
| `menubar.tsx` | Menubar | Top-level menu bar |
| `navigation-menu.tsx` | NavigationMenu | Multi-level nav |
| `pagination.tsx` | — | Page navigation |
| `popover.tsx` | Popover | Click-anchored popover |
| `progress.tsx` | Progress | Linear progress bar |
| `radio-group.tsx` | RadioGroup | Radio button group |
| `resizable.tsx` | — | Resizable panel layout |
| `scroll-area.tsx` | ScrollArea | Custom scrollbar |
| `select.tsx` | Select | Dropdown select |
| `separator.tsx` | Separator | Horizontal/vertical rule |
| `sheet.tsx` | Dialog | Side-sheet panel |
| `skeleton.tsx` | — | Loading placeholder |
| `slider.tsx` | Slider | Range input |
| `sonner.tsx` | — | Toast notifications (sonner) |
| `switch.tsx` | Switch | Toggle switch |
| `table.tsx` | — | Table, TableHeader, TableBody, TableRow, TableCell |
| `tabs.tsx` | Tabs | Tab bar + panels |
| `textarea.tsx` | — | Multi-line input |
| `toast.tsx` | Toast | Toast notification |
| `toaster.tsx` | — | Toast container |
| `toggle.tsx` | Toggle | Pressed/unpressed button |
| `toggle-group.tsx` | ToggleGroup | Group of toggle buttons |
| `tooltip.tsx` | Tooltip | Hover tooltip |
| `use-toast.ts` | — | Toast hook |
| `chart.tsx` | — | Recharts wrapper |

> **Note:** These Tailwind-styled primitives are available for new components. Existing course screens do **not** use them — they use inline styles with the `C()` token system. When adding to course screens, match the inline style approach. When building new standalone components (e.g., a settings page), you may use either approach.

---

## Composite Course Components

These are inline sub-components defined within screen files. Extract them only if you need to reuse them.

### Phase card

Used in: module-index, landing, dashboard carousel

**Props (implicit):** `phase` (from MODULES array), `dark`, `onNavigate`

**Structure:** Color stripe (top border), phase ID badge (mono font), hours chip, difficulty label, title, description, skills list, progress bar, status badge

### Evidence card

Used in: evidence-library (display), capstone/evidence-cards

**Fields:** ID, domain, type, confidence, finding text, source, date  
**Visual:** Confidence dot (green=high, amber=medium, red=low), domain badge, type chip

### Benchmark row

Used in: benchmark-builder (step 2 table), capstone/benchmarks

**Fields:** Description, type, difficulty, target score, task number

### Risk dot

Used in: risk-dashboard matrix

Positioned circle within a 5×5 grid. Color: green (low), amber (medium), red (high), rose (critical). Hover → tooltip with finding detail.

### Lesson timeline item

Used in: learning-map, module-detail

**Fields:** Lesson name, hours, status icon (✓ done / ▶ active / ○ upcoming / 🔒 locked)  
**Connected:** By left vertical line with status-colored circles

### Source card

Used in: sources screen, lesson Sources tab

**Fields:** Title, authors, organization, year, type badge, phase badge, description, external link button

### Skill chip

Used in: module-detail skills grid, module-index cards

**Earned:** Filled background + check icon  
**Locked:** Outlined, reduced opacity + lock icon

### Progress ring (SVG)

Used in: module-detail hero

Circular SVG progress indicator. `strokeDasharray` computed from percent complete. Blue stroke on elevated background.

### AI Coach sidebar card

Used in: lesson screen (right sidebar, toggleable)

Blue-tinted card with AI Coach header, contextual message text, and optional text input for follow-up questions.
