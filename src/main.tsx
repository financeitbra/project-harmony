import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Immediate URL cleanup for auth artifacts
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

// Critical: Run URL cleanup BEFORE app mounting
stripAuthArtifactsFromUrl();

const container = document.getElementById("root");
if (!container) {
  throw new Error("Target container 'root' not found");
}

const root = createRoot(container);
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
