import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Prevent URL issues with auth tokens before React mounting
try {
  const hash = window.location.hash;
  if (hash && (hash.includes("access_token") || hash.includes("error"))) {
    // Basic cleanup to prevent potential parsing errors in initial load
    console.log("Auth artifacts detected, cleaning up...");
  }
} catch (e) {
  console.error("URL check failed", e);
}

const container = document.getElementById("root");
if (!container) {
  console.error("Critical Error: 'root' element not found in DOM");
} else {
  const root = createRoot(container);
  root.render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}
