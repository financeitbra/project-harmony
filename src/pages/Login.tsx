import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { logAction } from "@/lib/audit";
import logoFinanceit from "@/assets/logo-financeit.png";

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
          .select('password_reset_required, role')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Login profile check error:", profileError);
        }

        const needsPasswordReset = profile?.password_reset_required;

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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-[440px] relative z-10">
        <div className="flex flex-col items-center mb-10">
          <Link to="/" className="mb-6 hover:scale-105 transition-transform duration-300">
            <img src={logoFinanceit} alt="Financeit" className="h-16 w-auto brightness-0 invert" />
          </Link>
          <div className="h-1 w-12 bg-primary rounded-full" />
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white overflow-hidden rounded-3xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          <CardHeader className="space-y-2 pt-10 pb-6 text-center">
            <CardTitle className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Bem-vindo
            </CardTitle>
            <CardDescription className="text-slate-400 font-medium">
              Acesse sua conta estratégica FinanceIT
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-5 px-8">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  E-mail Corporativo
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemplo@financeit.com.br"
                    className="bg-white/5 border-white/10 text-white focus:bg-white/10 focus:ring-primary/40 focus:border-primary/40 transition-all h-14 rounded-2xl pl-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" title="Sua senha de acesso" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Senha de Acesso
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white focus:bg-white/10 focus:ring-primary/40 focus:border-primary/40 transition-all h-14 rounded-2xl pl-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded border border-white/20 bg-white/5" />
                  <span className="text-xs text-slate-400 font-medium">Lembrar-me</span>
                </div>
                <Link to="/contato" className="text-xs text-primary font-bold hover:underline underline-offset-4">
                  Esqueci a senha
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-8 pb-10 pt-4 px-8">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white font-black shadow-[0_10px_20px_rgba(var(--primary),0.3)] h-14 rounded-2xl transition-all text-base group" 
                type="submit" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Autenticando...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Acessar Plataforma
                  </span>
                )}
              </Button>

              <div className="text-center space-y-4">
                <p className="text-[10px] text-slate-500 max-w-[280px] mx-auto leading-relaxed font-medium">
                  ACESSO RESTRITO A COLABORADORES.
                  O MONITORAMENTO É ATIVO E CONSTANTE.
                </p>
                <Link to="/" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-all font-bold group">
                  <div className="w-5 h-px bg-slate-700 group-hover:w-8 transition-all" />
                  Voltar ao Portal Público
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center mt-8 text-slate-600 text-[10px] font-bold tracking-widest uppercase">
          © {new Date().getFullYear()} FinanceIT Intelligence System
        </p>
      </div>
    </div>
  );
}
