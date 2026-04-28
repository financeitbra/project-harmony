import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

console.log("Main.tsx: Application starting at", new Date().toISOString());
window.addEventListener('error', (event) => {
  console.error('GLOBAL ERROR DETECTED:', event.error);
  const rootEl = document.getElementById("root");
  if (rootEl && rootEl.innerHTML.length < 50) {
    rootEl.innerHTML = `<div style="padding: 20px; background: #900; color: white;">Global Error: ${event.message}</div>`;
  }
});


const container = document.getElementById("root");
if (!container) {
  console.error("CRITICAL ERROR: 'root' element not found in DOM");
} else {
  try {
    const root = createRoot(container);
    root.render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
  } catch (error) {
    console.error("CRITICAL ERROR: Failed to render React application:", error);
    // Fallback UI in case React completely fails to mount
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#0F172A;color:white;text-align:center;font-family:sans-serif;">
          <h1>Erro Crítico de Carregamento</h1>
          <p>Ocorreu uma falha ao iniciar a aplicação. Por favor, tente recarregar.</p>
          <button onclick="window.location.reload()" style="padding:10px 20px;background:#3B82F6;color:white;border:none;border-radius:5px;cursor:pointer;">Recarregar</button>
        </div>
      `;
    }
  }
}
