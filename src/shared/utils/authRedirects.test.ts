import { describe, expect, it } from "vitest";
import { sanitizeRedirectTarget } from "./authRedirects";

describe("sanitizeRedirectTarget", () => {
  it("allows same-origin app paths", () => {
    expect(sanitizeRedirectTarget("/learn")).toBe("/learn");
    expect(sanitizeRedirectTarget("/learn?next=lesson")).toBe("/learn?next=lesson");
  });

  it("rejects protocol-relative and external targets", () => {
    expect(sanitizeRedirectTarget("//evil.example")).toBe("/learn");
    expect(sanitizeRedirectTarget("https://evil.example")).toBe("/learn");
    expect(sanitizeRedirectTarget(undefined)).toBe("/learn");
  });
});
