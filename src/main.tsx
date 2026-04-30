import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

console.log("Main.tsx: Application starting at", new Date().toISOString());

const container = document.getElementById("root");

if (!container) {
  console.error("CRITICAL ERROR: 'root' element not found in DOM");
} else {
  // Add an absolute fallback to avoid white screen if React fails silently
  const fallbackTimeout = setTimeout(() => {
    // Check if anything meaningful was rendered
    const isBlank = !container.innerHTML || 
                    container.innerHTML.trim() === "" || 
                    container.innerHTML === "<!--?-->" ||
                    (container.firstElementChild && container.firstElementChild.innerHTML === "");
    
    if (isBlank) {
      console.warn("Hydration fallback triggered: React took too long to render or rendered empty");
      container.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#0F172A;color:white;text-align:center;font-family:sans-serif;padding:20px;">
          <h1 style="color:#21A8B8;">Financeit</h1>
          <p>A aplicação está demorando para responder.</p>
          <button onclick="window.location.reload()" style="margin-top:20px;padding:12px 24px;background:#21A8B8;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;">Recarregar Página</button>
          <p style="margin-top:40px;font-size:12px;opacity:0.5;">Se o problema persistir, tente limpar o cache do navegador ou abrir em modo anônimo.</p>
        </div>
      `;
    }
  }, 3500);

  try {
    const root = createRoot(container);
    root.render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    // Clear timeout if we managed to render something (though React render is async, 
    // this script finishes quickly, so the timeout will handle the check later)
  } catch (error) {
    clearTimeout(fallbackTimeout);
    console.error("CRITICAL ERROR: Failed to render React application:", error);
    container.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#0F172A;color:white;text-align:center;font-family:sans-serif;padding:20px;">
        <h1>Erro de Carregamento</h1>
        <p>Ocorreu uma falha ao iniciar a aplicação.</p>
        <pre style="background:rgba(0,0,0,0.5);padding:10px;border-radius:5px;font-size:12px;max-width:100%;overflow:auto;text-align:left;">${error instanceof Error ? error.message : String(error)}</pre>
        <button onclick="window.location.reload()" style="margin-top:20px;padding:10px 20px;background:#3B82F6;color:white;border:none;border-radius:5px;cursor:pointer;">Recarregar</button>
      </div>
    `;
  }
}
