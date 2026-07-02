# BYOK QA Checklist V4

## Pass criteria
- AI Coach works in mock mode with no key.
- BYOK setup has provider, model, key, storage mode, and test connection.
- Session-only mode is default.
- Persistent local browser storage requires explicit risk acknowledgement.
- Raw key is never displayed after save.
- Raw key is never logged.
- Raw key is never sent to app backend or analytics.
- One-click delete removes sessionStorage and localStorage key data.
- Error states are visible and human-readable.
- User can switch back to mock mode.

## Fail criteria
- Backend receives the learner key.
- Console logs expose the key.
- Key appears in URL or browser history.
- Persistent storage is enabled by default.
- UI implies localStorage is secure.
- Coach is unusable without a key.
