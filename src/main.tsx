import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Remove tokens (#access_token=..., #error=..., ?code=...) que ficam expostos
// na URL após redirects de auth. Mantém o restante do path/query intactos.
if (typeof window !== "undefined") {
  const { hash, search, pathname } = window.location;
  const hasAuthHash = /(?:access_token|refresh_token|provider_token|error_description)=/.test(hash);
  const params = new URLSearchParams(search);
  const hasAuthQuery = params.has("code") || params.has("access_token") || params.has("refresh_token");

  if (hasAuthHash || hasAuthQuery) {
    if (hasAuthQuery) {
      ["code", "access_token", "refresh_token", "error", "error_description"].forEach((k) =>
        params.delete(k)
      );
    }
    const cleanSearch = params.toString();
    window.history.replaceState({}, document.title, `${pathname}${cleanSearch ? `?${cleanSearch}` : ""}`);
  }
}

createRoot(document.getElementById("root")!).render(<App />);
