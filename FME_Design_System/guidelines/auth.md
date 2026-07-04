# Auth System

Supabase Auth integration for the Frontier Evaluation Lab platform.

---

## Overview

Authentication is handled by Supabase Auth. The system uses email/password sign-up and login. No social providers are configured yet.

| File | Role |
|---|---|
| `src/lib/supabase.ts` | Supabase client (anon key only) |
| `src/app/components/auth/AuthContext.tsx` | React context — session state, auth methods |
| `src/app/components/auth/ProtectedRoute.tsx` | Route guard component |
| `src/app/routes.tsx` | Route definitions with AuthProvider + ProtectedRoute |
| `utils/supabase/info.tsx` | Auto-generated projectId + publicAnonKey |

---

## Supabase Client

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);
```

**Key rules:**
- Only the `publicAnonKey` is used client-side. Never the service role key.
- `detectSessionInUrl: true` enables the `/auth/callback` route to pick up tokens from email links.
- `persistSession: true` stores the session in localStorage (Supabase default).

---

## AuthContext API

```ts
import { useAuth } from 'src/app/components/auth/AuthContext';

const {
  user,            // Supabase User | null
  session,         // Supabase Session | null
  loading,         // boolean — true during initial session check on mount
  isAuthenticated, // boolean — !!user
  signUp,
  signIn,
  signOut,
  resetPassword,
} = useAuth();
```

### `signUp(email, password, fullName)`

```ts
const { error, needsConfirmation } = await signUp(email, password, fullName);
```

- Calls `supabase.auth.signUp()` with `data: { full_name: fullName }` in options (stored in `user.user_metadata.full_name`)
- `needsConfirmation: true` when Supabase requires email confirmation (no session returned)
- `needsConfirmation: false` when auto-confirm is enabled (session returned immediately → redirect to dashboard)

### `signIn(email, password)`

```ts
const { error } = await signIn(email, password);
```

- Calls `supabase.auth.signInWithPassword()`
- Returns friendly error messages:
  - Invalid credentials → "Incorrect email or password. Please try again."
  - Unconfirmed email → "Please confirm your email address before signing in."
  - Other errors → raw Supabase message

### `signOut()`

```ts
await signOut();
// then navigate to '/'
```

Calls `supabase.auth.signOut()`. AuthContext's `onAuthStateChange` listener fires and clears user/session.

### `resetPassword(email)`

```ts
const { error } = await resetPassword(email);
```

Calls `supabase.auth.resetPasswordForEmail(email, { redirectTo: '${origin}/auth/callback?type=recovery' })`

The user receives an email with a link to `/auth/callback?type=recovery`. That page detects the session and redirects to `/course/dashboard`.

---

## Session Lifecycle

On app mount (inside `AuthProvider`):
1. `supabase.auth.getSession()` → initializes `user`, `session`, sets `loading: false`
2. `supabase.auth.onAuthStateChange()` → subscribes to all future auth events (sign-in, sign-out, token refresh, email confirmation)

Cleanup: subscription is unsubscribed on unmount.

**Session persists across browser refresh** via Supabase's localStorage adapter.

---

## Route Protection

### Protected routes (current)

```
/certificate
/course/*        (all sub-routes)
/capstone/*      (all sub-routes)
```

### Public routes

```
/
/login
/signup
/forgot-password
/auth/callback
/onboarding
/diagnostic
```

### How ProtectedRoute works

```tsx
<ProtectedRoute>
  <CourseLayout />  {/* or any protected content */}
</ProtectedRoute>
```

States:
- `loading: true` → full-screen dark spinner (prevents flash of login redirect)
- `!isAuthenticated` → `<Navigate to="/login" state={{ from: location.pathname }} replace />`
- `isAuthenticated` → renders children

### Route structure in routes.tsx

```tsx
function Root() {
  return (
    <AuthProvider>           ← must wrap everything
      <CapstoneProvider>
        <CourseProvider>
          <Outlet />
        </CourseProvider>
      </CapstoneProvider>
    </AuthProvider>
  );
}

// Protected course shell
{
  path: 'course',
  Component: ProtectedCourseLayout,   // = ProtectedRoute > CourseLayout
  children: [ ... all course routes ]
}

// Protected capstone
{ path: 'capstone',          Component: ProtectedCapstone }
{ path: 'capstone/:section', Component: ProtectedCapstone }

// Protected certificate
{ path: 'certificate', element: <ProtectedFullScreen Screen={CertificateScreen} /> }
```

---

## User Data

### User metadata

Full name is stored in Supabase user metadata at signup:
```ts
supabase.auth.signUp({
  email, password,
  options: { data: { full_name: fullName } }
});
```

Read back:
```ts
const fullName = user?.user_metadata?.full_name as string;
const email = user?.email;
```

### Initials (UserProfileMenu)

```ts
const initials = fullName
  ? fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  : email.slice(0, 2).toUpperCase();
```

### Course progress

Course progress is currently stored only in React state (`CourseContext`) — it does not persist to Supabase. Progress resets on page refresh.

**To add persistence:** add a `user_progress` table in Supabase and sync `CourseState` to it on `update()` calls. The `user.id` field is the foreign key.

---

## Supabase Dashboard Configuration

### Required settings

In your Supabase project dashboard → **Authentication → URL Configuration**:

**Site URL:**
```
https://your-production-domain.com
```

**Redirect URLs (allow list):**
```
https://your-production-domain.com/auth/callback
http://localhost:5173/auth/callback
https://*.figma-make.com/auth/callback   (if using Make preview URLs)
```

### Email templates

Supabase sends emails for:
- **Confirm signup** — link points to `auth/callback`
- **Reset password** — link points to `auth/callback?type=recovery`
- **Magic link** — not currently used

Customize email templates in: Supabase Dashboard → Authentication → Email Templates

---

## Auth QA Checklist

| Check | How to test |
|---|---|
| Sign-up works | Create account with new email; check for confirmation email or dashboard redirect |
| Login works | Sign in with valid credentials; should redirect to `/course/dashboard` |
| Logout works | Click "Sign out" in profile menu; should redirect to `/` |
| Protected routes redirect | Visit `/course/dashboard` logged-out; should redirect to `/login` |
| Dashboard opens when logged in | Sign in → should land on `/course/dashboard` |
| Session survives refresh | Sign in → hard-refresh page → should still be logged in |
| Wrong password shows friendly error | Login with wrong password; should see "Incorrect email or password." |
| No service role key exposed | Inspect `src/lib/supabase.ts` — only `publicAnonKey` from `info.tsx` |
| Email confirmation flow | With email confirm enabled, sign up → check email → click link → `/auth/callback` → dashboard |
| Password reset flow | `/forgot-password` → email → link → `/auth/callback?type=recovery` → dashboard |

---

## Extending Auth

### Add OAuth providers (when requested)

1. Enable provider in Supabase Dashboard → Authentication → Providers
2. Add button to `LoginScreen` and `SignUpScreen`:
   ```ts
   await supabase.auth.signInWithOAuth({ provider: 'google' });
   ```
3. Add `https://your-domain.com/auth/callback` to provider's allowed redirects

### Add profile page

Route: `/course/settings` (protected)  
Component: read `user.email`, `user.user_metadata.full_name`  
Updates: `supabase.auth.updateUser({ data: { full_name: newName } })`

### Persist course progress to Supabase

1. Create table: `user_progress(user_id uuid FK, state jsonb, updated_at timestamptz)`
2. On `CourseProvider` mount: fetch progress for `user.id` → hydrate state
3. On every `update()` call: debounce upsert to Supabase
4. Row-level security: `user_id = auth.uid()`
