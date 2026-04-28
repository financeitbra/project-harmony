import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "../hooks/use-toast";
import { logAction } from "../lib/audit";
import logoFinanceit from "../assets/logo-financeit.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password 
      });
      
      if (error) throw error;

      if (data.user) {
        // Run audit logging in background
        void logAction("login_success", { email: email.trim() });

        // Force a brief delay to ensure session is stored in localStorage
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get fresh profile data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('password_updated_at, role')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Login profile check error:", profileError);
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const needsPasswordReset = !profile?.password_updated_at || new Date(profile.password_updated_at) < thirtyDaysAgo;

        if (needsPasswordReset) {
          toast({
            title: "Atualização de segurança",
            description: "Por favor, defina uma nova senha para sua segurança.",
          });
          navigate("/reset-password");
        } else {
          toast({
            title: "Acesso autorizado",
            description: "Bem-vindo à plataforma Financeit.",
          });
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      console.error("Login attempt failed:", error.message);
      void logAction("login_failure", { email: email.trim(), error: error.message });
      
      toast({
        variant: "destructive",
        title: "Falha na autenticação",
        description: "Verifique seu e-mail e senha e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4 relative overflow-hidden">
      {/* Background visual enhancements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      
      <Card className="w-full max-w-md border-white/5 bg-[#1E293B]/80 backdrop-blur-2xl shadow-2xl relative z-10 text-white">
        <CardHeader className="space-y-4 pt-8">
          <div className="flex justify-center">
            <Link to="/">
              <img src={logoFinanceit} alt="Financeit" className="h-14 w-auto" />
            </Link>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold tracking-tight">Área Restrita</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Identifique-se para acessar o painel
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-300">E-mail Corporativo</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@financeit.com.br"
                className="bg-slate-900/50 border-white/10 text-white focus:ring-primary/40 focus:border-primary/40 transition-all h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" title="Sua senha de acesso" className="text-slate-300">Senha</Label>
                <Link to="/contato" className="text-xs text-primary hover:text-cyan-400 transition-colors">
                  Precisa de ajuda?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="bg-slate-900/50 border-white/10 text-white focus:ring-primary/40 focus:border-primary/40 transition-all h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-6 pb-8 pt-2">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 h-12 transition-all text-base" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Autenticando...</span>
                </div>
              ) : "Acessar Plataforma"}
            </Button>
            <div className="text-center space-y-3">
              <p className="text-[11px] text-slate-500 max-w-[300px] mx-auto leading-relaxed">
                Este sistema é para uso exclusivo de colaboradores autorizados. O acesso não autorizado é proibido.
              </p>
              <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors block underline-offset-4 hover:underline">
                Voltar para o portal público
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
