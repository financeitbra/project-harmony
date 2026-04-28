import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

console.log("Main.tsx: Application starting at", new Date().toISOString());

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
    if (container) {
      container.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#0F172A;color:white;text-align:center;font-family:sans-serif;padding:20px;">
          <h1>Erro de Carregamento</h1>
          <p>Ocorreu uma falha ao iniciar a aplicação.</p>
          <pre style="background:rgba(0,0,0,0.5);padding:10px;border-radius:5px;font-size:12px;max-width:100%;overflow:auto;">${error instanceof Error ? error.message : String(error)}</pre>
          <button onclick="window.location.reload()" style="margin-top:20px;padding:10px 20px;background:#3B82F6;color:white;border:none;border-radius:5px;cursor:pointer;">Recarregar</button>
        </div>
      `;
    }
  }
}
