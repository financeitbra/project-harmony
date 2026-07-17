import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Typed wrapper around the beta supabase.auth.oauth namespace.
type OAuthClient = { name?: string; client_name?: string; redirect_uris?: string[] };
type AuthorizationDetails = {
  client?: OAuthClient;
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthApi = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

function oauthApi(): OAuthApi {
  return (supabase.auth as unknown as { oauth: OAuthApi }).oauth;
}

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Parâmetro authorization_id ausente.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      setAccount(sess.session.user.email ?? sess.session.user.id);
      const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const api = oauthApi();
    const { data, error } = approve
      ? await api.approveAuthorization(authorizationId)
      : await api.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("O servidor de autorização não retornou uma URL de redirecionamento.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.client_name ?? details?.client?.name ?? "um aplicativo";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-10">
      <Card className="w-full max-w-lg border-white/10 bg-white/5 text-white backdrop-blur-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Conectar {clientName} à Financeit
          </CardTitle>
          <CardDescription className="text-white/70">
            Isso permite que {clientName} utilize os recursos disponíveis desta conta em seu nome.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {!details && !error && (
            <p className="text-white/60 text-sm">Carregando detalhes da autorização…</p>
          )}

          {details && (
            <>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-2 text-sm">
                <div>
                  <span className="text-white/60">Conta conectada: </span>
                  <span className="font-semibold">{account}</span>
                </div>
                {details.client?.redirect_uris?.[0] && (
                  <div>
                    <span className="text-white/60">Redirecionamento: </span>
                    <span className="font-mono text-xs break-all">
                      {details.client.redirect_uris[0]}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-white/60">Permissões solicitadas: </span>
                  <span>
                    {(details.scopes && details.scopes.length > 0
                      ? details.scopes
                      : ["openid", "email", "profile"]
                    ).join(", ")}
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/50 leading-relaxed">
                Isso não altera as políticas de acesso do backend. Todas as ações continuam sendo executadas
                em seu nome e respeitando as regras de segurança da Financeit.
              </p>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                  disabled={busy}
                  onClick={() => decide(false)}
                >
                  Cancelar conexão
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white font-semibold"
                  disabled={busy}
                  onClick={() => decide(true)}
                >
                  {busy ? "Processando…" : "Aprovar"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
