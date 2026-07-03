import { getBrowserKey, groundedTutorReply, type ByokPreferences } from "./byokStore";

type Message = { role: "learner" | "tutor"; text: string };

export async function askRealTutor(
  prompt: string,
  lessonTitle: string,
  sources: string[],
  history: Message[],
  preferences: ByokPreferences
): Promise<string> {
  if (preferences.provider === "mock") {
    return groundedTutorReply(prompt, lessonTitle, sources);
  }

  const key = getBrowserKey();
  if (!key) {
    throw new Error("No API key configured for BYOK Tutor.");
  }

  const systemPrompt = `You are the OpenEd BYOK Tutor. You are helping a learner with the lesson "${lessonTitle}". 
Your answers should be pedagogical, guiding the learner to the answer rather than giving it directly.
Base your guidance strictly on the following sources if relevant:
${sources.map((s, i) => `[${i + 1}] ${s}`).join("\n")}
If the learner asks something unrelated to the lesson or evaluation, politely steer them back.
`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.map(m => ({ role: m.role === "tutor" ? "assistant" : "user", content: m.text })),
    { role: "user", content: prompt }
  ];

  try {
    switch (preferences.provider) {
      case "openai":
        return await callOpenAI(key, preferences.model, messages);
      case "anthropic":
        return await callAnthropic(key, preferences.model, messages);
      case "gemini":
        return await callGemini(key, preferences.model, messages);
      case "openrouter":
        return await callOpenRouter(key, preferences.model, messages);
      default:
        throw new Error("Unknown provider: " + preferences.provider);
    }
  } catch (err: any) {
    console.error("BYOK Tutor API Error:", err);
    return `Sorry, there was an error communicating with the ${preferences.provider} API: ${err.message}`;
  }
}

async function callOpenAI(key: string, model: string, messages: any[]): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI API error: ${res.statusText}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

async function callAnthropic(key: string, model: string, messages: any[]): Promise<string> {
  const systemMessage = messages.find(m => m.role === "system")?.content || "";
  const filteredMessages = messages.filter(m => m.role !== "system");
  
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model,
      system: systemMessage,
      messages: filteredMessages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`Anthropic API error: ${res.statusText}`);
  const data = await res.json();
  return data.content[0].text;
}

async function callGemini(key: string, model: string, messages: any[]): Promise<string> {
  const systemMessage = messages.find(m => m.role === "system")?.content || "";
  const filteredMessages = messages.filter(m => m.role !== "system").map(m => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }]
  }));

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemMessage }] },
      contents: filteredMessages,
      generationConfig: { temperature: 0.7 }
    }),
  });
  if (!res.ok) throw new Error(`Gemini API error: ${res.statusText}`);
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

async function callOpenRouter(key: string, model: string, messages: any[]): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`OpenRouter API error: ${res.statusText}`);
  const data = await res.json();
  return data.choices[0].message.content;
}
