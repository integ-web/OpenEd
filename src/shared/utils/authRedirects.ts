export function sanitizeRedirectTarget(target: unknown, fallback = "/learn") {
  if (typeof target !== "string") return fallback;
  if (!target.startsWith("/") || target.startsWith("//")) return fallback;
  return target;
}
