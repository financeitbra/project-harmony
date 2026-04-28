import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

console.log("Main.tsx: Application starting...");

// Log window context for debugging blank screen
if (typeof window !== 'undefined') {
  console.log("Window Location:", window.location.href);
  console.log("User Agent:", navigator.userAgent);
}

// Global error handler for uncaught promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
});

// Global error handler for runtime errors
window.onerror = (message, source, lineno, colno, error) => {
  console.error('Global Runtime Error:', { message, source, lineno, colno, error });
  return false;
};

const container = document.getElementById("root");
if (!container) {
  console.error("CRITICAL ERROR: 'root' element not found in DOM");
} else {
  try {
    console.log("Main.tsx: Found root container, initializing React...");
    const root = createRoot(container);
    root.render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    console.log("Main.tsx: React render call completed");
  } catch (error) {
    console.error("CRITICAL ERROR: Failed to render React application:", error);
  }
}
