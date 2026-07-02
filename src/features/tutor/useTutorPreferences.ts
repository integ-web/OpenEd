import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../app/providers";
import { tutorPreferencesRepository } from "../../lib/repositories/tutorPreferencesRepository";
import type { ByokPreferences } from "./byokStore";

const fallbackPreferences: ByokPreferences = { provider: "mock", model: "grounded-mock", storageMode: "session" };

export function useTutorPreferences() {
  const { user } = useAuth();
  const userId = user?.id;
  const [preferences, setPreferences] = useState<ByokPreferences>(fallbackPreferences);

  const refresh = useCallback(async () => {
    setPreferences(await tutorPreferencesRepository.read(userId));
  }, [userId]);

  useEffect(() => {
    void refresh();
    window.addEventListener("opened-byok", refresh);
    return () => window.removeEventListener("opened-byok", refresh);
  }, [refresh]);

  return {
    preferences,
    setPreferences,
    savePreferences: useCallback(
      async (next: ByokPreferences) => {
        await tutorPreferencesRepository.save(userId, next);
        setPreferences(next);
      },
      [userId],
    ),
  };
}
