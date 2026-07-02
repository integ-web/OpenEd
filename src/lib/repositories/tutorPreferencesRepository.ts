import type { ByokPreferences } from "../../features/tutor/byokStore";
import { supabase, supabaseConfigured } from "../supabase/client";
import { readLocal, writeLocal } from "./localFallback";

const eventName = "opened-byok";
const fallbackPreferences: ByokPreferences = { provider: "mock", model: "grounded-mock", storageMode: "session" };

export const tutorPreferencesRepository = {
  async read(userId: string | undefined): Promise<ByokPreferences> {
    if (!supabaseConfigured || !userId) {
      return readLocal("tutor", userId, "preferences", fallbackPreferences);
    }

    const { data } = await supabase
      .from("byok_preferences_without_keys")
      .select("provider,model,storage_mode")
      .eq("user_id", userId)
      .maybeSingle();

    return data
      ? { provider: data.provider, model: data.model ?? "grounded-mock", storageMode: data.storage_mode }
      : fallbackPreferences;
  },

  async save(userId: string | undefined, preferences: ByokPreferences) {
    if (supabaseConfigured && userId) {
      await supabase.from("byok_preferences_without_keys").upsert({
        user_id: userId,
        provider: preferences.provider,
        model: preferences.model,
        storage_mode: preferences.storageMode,
      });
    }

    writeLocal("tutor", userId, "preferences", preferences, eventName);
  },
};
