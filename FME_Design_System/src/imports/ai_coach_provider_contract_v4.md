# AI Coach Provider Contract V4

## Unified request shape

```ts
export interface CoachRequest {
  provider: AIProvider;
  model: string;
  apiKey: string;
  endpoint?: string;
  lessonId: string;
  lessonTitle: string;
  mode: 'explain' | 'quiz' | 'diagram' | 'artifact_help' | 'capstone_connection' | 'source_recommendation' | 'free_chat';
  userMessage: string;
  lessonContext: {
    objective: string;
    transcriptSummary: string;
    keyIdeas: string[];
    artifactType: string;
    safetyNotes?: string[];
  };
}
```

## Provider adapter pattern

Create one adapter per provider:
- `OpenAIProviderAdapter`
- `AnthropicProviderAdapter`
- `GoogleProviderAdapter`
- `OpenRouterProviderAdapter`
- `OllamaProviderAdapter`
- `CustomEndpointAdapter`

Each adapter returns:

```ts
export interface CoachResponse {
  text: string;
  suggestedNextPrompts?: string[];
  diagramSpec?: {
    title: string;
    nodes: string[];
    edges: [string, string][];
  };
  safetyNote?: string;
}
```

## Required safety system behavior
- Keep cyber, bio, persuasion, and autonomy examples de-risked.
- Help with evaluation design, not operational harmful instructions.
- When a learner asks for unsafe details, redirect to safe benchmark design, threat modeling, or evidence handling.
- Do not send learner API keys or secrets as lesson context.

## Mock mode
When no key exists, return prewritten local responses for:
- Explain this simply.
- Show me a diagram.
- Quiz me.
- Help me fill artifact.
- Connect this to capstone.
