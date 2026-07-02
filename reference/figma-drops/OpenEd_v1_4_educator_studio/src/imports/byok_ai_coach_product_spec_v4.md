# BYOK AI Coach Product Spec V4

## Product reason
The AI Coach should be useful without making the course expensive to operate. Bring Your Own Key lets learners connect their own model provider while the course remains free/low-cost.

## Scope
Implement BYOK for the lesson AI Coach panel only. This is not a general account system.

## Core UX

### Entry states
1. No key
   - Coach shows mock/local guidance.
   - CTA: `Connect your own AI key`.

2. Setup modal
   - Provider selector: OpenAI, Anthropic, Google, OpenRouter, Local/Ollama-compatible, Custom endpoint.
   - Model selector.
   - API key input.
   - Storage choice:
     - Session only — recommended.
     - Save in this browser — optional.
   - Risk acknowledgement checkbox for persistent storage.
   - Test connection.

3. Connected
   - Show provider, model, masked key, storage mode.
   - Buttons: Change model, Forget key, Test again.

4. Error
   - Invalid key.
   - Provider request failed.
   - Rate limit.
   - Model not available.
   - Browser blocked storage.

5. Mock mode
   - Works without key using prewritten responses and prompt suggestions.

## Key storage rules
- Session mode: memory variable or sessionStorage; cleared when session ends.
- Persistent mode: localStorage only after explicit confirmation.
- Store under namespaced keys: `fel_byok_provider`, `fel_byok_model`, `fel_byok_key`.
- Do not send keys to telemetry.
- Do not include keys in console logs.
- Do not include keys in error messages.
- Do not sync across devices.

## User-facing copy
Use calm honest copy:

`Your key stays in this browser. We do not store it on our servers. Browser storage is convenient, but it is not a secure vault. Use a restricted or disposable learning key, monitor usage, and delete it when finished.`

## Coach features after BYOK
- Explain lesson simply.
- Generate a text-based diagram.
- Quiz me.
- Help fill artifact fields.
- Connect lesson to capstone.
- Suggest next source.

## Out of scope
- Server proxy.
- Course-paid AI usage.
- Team key management.
- Secure enterprise secret vault.
- Real Gemini Live-style voice unless separately implemented.
