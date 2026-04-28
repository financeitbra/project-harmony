import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

console.log("Main.tsx: Application starting...");

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
  }
}
