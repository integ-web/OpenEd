import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase, supabaseConfigured } from "../../lib/supabase/client";
import { sanitizeRedirectTarget } from "../../shared/utils/authRedirects";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    async function finishCallback() {
      const next = sanitizeRedirectTarget(params.get("next"));
      if (supabaseConfigured) {
        await supabase.auth.getSession();
      }
      navigate(next, { replace: true });
    }

    void finishCallback();
  }, [navigate, params]);

  return (
    <section className="page-card narrow">
      <p className="eyebrow">Auth</p>
      <h1>Finishing sign in.</h1>
    </section>
  );
}
