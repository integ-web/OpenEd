import type { AuditEntry } from "../../features/team/teamStore";
import { supabase, supabaseConfigured } from "../supabase/client";
import { readLocalArray, writeLocal } from "./localFallback";

const eventName = "opened-audit";
const seedAudit: AuditEntry[] = [
  {
    id: "audit-fme",
    actor: "team@opened.ai",
    action: "course.published",
    target: "FME demo preview",
    note: "Seed preview approved for local development.",
    createdAt: new Date().toISOString(),
  },
];

export const teamRepository = {
  async listAudit(userId: string | undefined): Promise<AuditEntry[]> {
    if (!supabaseConfigured || !userId) {
      return readLocalArray("team", userId, "audit", seedAudit);
    }

    const { data } = await supabase
      .from("platform_audit_log")
      .select("id,action,target_table,target_id,note,created_at")
      .order("created_at", { ascending: false });
    if (!data) return readLocalArray("team", userId, "audit", seedAudit);
    return data.map((entry) => ({
      id: entry.id,
      actor: userId,
      action: entry.action,
      target: entry.target_table,
      note: entry.note,
      createdAt: entry.created_at,
    }));
  },

  async addAudit(userId: string | undefined, entry: Omit<AuditEntry, "id" | "createdAt">) {
    const nextEntry = { ...entry, id: `audit-${Date.now()}`, createdAt: new Date().toISOString() };
    if (supabaseConfigured && userId) {
      await supabase.from("platform_audit_log").insert({
        actor_id: userId,
        action: entry.action,
        target_table: entry.target,
        note: entry.note,
      });
    }

    const next = [nextEntry, ...(await this.listAudit(userId))];
    writeLocal("team", userId, "audit", next, eventName);
  },
};
