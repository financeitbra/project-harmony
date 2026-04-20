import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "financeit_cookie_consent_v1";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const handleConsent = (value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, ts: Date.now() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur-md md:bottom-6 md:left-6 md:right-auto md:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent md:flex">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-sm font-semibold text-foreground md:text-base">
            Sua privacidade é importante
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground md:text-sm">
            Utilizamos apenas armazenamento local essencial para registrar a sua preferência de consentimento e garantir o funcionamento adequado do site, em conformidade com a LGPD. Não usamos cookies de rastreamento, analytics ou publicidade. Você pode alterar sua escolha a qualquer momento.{" "}
            <Link to="/politica-privacidade" className="font-medium text-accent underline-offset-2 hover:underline">
              Saiba mais
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={() => handleConsent("accepted")}>
              Aceitar
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleConsent("rejected")}>
              Recusar
            </Button>
          </div>
        </div>
        <button
          onClick={() => handleConsent("rejected")}
          aria-label="Fechar aviso de cookies"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
