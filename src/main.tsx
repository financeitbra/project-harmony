import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { supabase } from "./integrations/supabase/client";

// Remove tokens (#access_token=..., #error=..., ?code=...) que ficam expostos
// na URL após redirects de OAuth/magic-link. Mantém path/query/hash legítimos intactos.
function stripAuthArtifactsFromUrl() {
  if (typeof window === "undefined") return;
  const { hash, search, pathname } = window.location;

  const authHashKeys = /(?:access_token|refresh_token|provider_token|expires_in|expires_at|token_type|error_description|error_code|error=)/;
  const hasAuthHash = hash && authHashKeys.test(hash);

  const params = new URLSearchParams(search);
  const authQueryKeys = ["code", "access_token", "refresh_token", "error", "error_description", "error_code", "provider_token"];
  const hasAuthQuery = authQueryKeys.some((k) => params.has(k));

  if (!hasAuthHash && !hasAuthQuery) return;

  if (hasAuthQuery) authQueryKeys.forEach((k) => params.delete(k));
  const cleanSearch = params.toString();
  const newUrl = `${pathname}${cleanSearch ? `?${cleanSearch}` : ""}`;
  window.history.replaceState({}, document.title, newUrl);
}

if (typeof window !== "undefined") {
  // Limpeza imediata (caso o Supabase já tenha processado)
  stripAuthArtifactsFromUrl();

  // Limpeza após o Supabase processar o hash e estabelecer a sessão
  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") {
      stripAuthArtifactsFromUrl();
    }
  });

  // Fallback: tenta limpar nos próximos ticks caso o detectSessionInUrl rode depois
  setTimeout(stripAuthArtifactsFromUrl, 0);
  setTimeout(stripAuthArtifactsFromUrl, 500);
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
