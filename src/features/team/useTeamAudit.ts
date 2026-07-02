import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../app/providers";
import { teamRepository } from "../../lib/repositories/teamRepository";
import type { AuditEntry } from "./teamStore";

export function useTeamAudit() {
  const { user } = useAuth();
  const userId = user?.id;
  const [audit, setAudit] = useState<AuditEntry[]>([]);

  const refresh = useCallback(async () => {
    setAudit(await teamRepository.listAudit(userId));
  }, [userId]);

  useEffect(() => {
    void refresh();
    window.addEventListener("opened-audit", refresh);
    return () => window.removeEventListener("opened-audit", refresh);
  }, [refresh]);

  return {
    audit,
    addAuditEntry: useCallback(
      async (entry: Omit<AuditEntry, "id" | "createdAt">) => {
        await teamRepository.addAudit(userId, entry);
        await refresh();
      },
      [refresh, userId],
    ),
  };
}
