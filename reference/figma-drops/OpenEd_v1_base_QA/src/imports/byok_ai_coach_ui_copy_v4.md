# BYOK AI Coach UI Copy V4

## Setup card
Title: Connect your own AI key
Body: Use your own provider key to power the AI Coach. The course will not pay for model calls and will not store your key on our servers.

Primary CTA: Connect key
Secondary CTA: Continue in mock mode

## Storage choice
Recommended: Session only
Description: Keeps the key for this browser session. It is cleared when the session ends.

Optional: Save in this browser
Description: Stores the key in this browser so you do not have to re-enter it. This is convenient, but not a secure vault.

Required checkbox for persistent mode:
I understand this key is stored in my browser and may be accessible to browser extensions, shared-device users, or injected scripts. I will use a restricted or disposable learning key.

## Connected state
Connected to {provider} · {model}
Key: {maskedKey}
Storage: {sessionOnly/localBrowserStorage}

Buttons:
- Test connection
- Change model
- Forget this key

## Error states
Invalid key: The provider rejected this key. Check the key and try again.
Rate limit: The provider says this key is rate-limited. Try a different model or wait before retrying.
Storage blocked: Your browser blocked local storage. Use session-only mode.
Network error: The provider request failed. Mock mode is still available.

## Delete confirmation
Title: Forget this key?
Body: This removes the key from this browser. You can reconnect later.
CTA: Forget key
Cancel: Keep key
