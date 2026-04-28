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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      await logAction("login_success", { email });

      // Check for first access / password rotation
      const { data: profile } = await supabase
        .from('profiles')
        .select('password_updated_at')
        .eq('id', data.user.id)
        .single();

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      if (!profile?.password_updated_at || new Date(profile.password_updated_at) < thirtyDaysAgo) {
        toast({
          title: "Atualização obrigatória",
          description: "Sua senha expirou ou é um acesso temporário. Por favor, altere-a.",
        });
        navigate("/reset-password");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      await logAction("login_failure", { email, error: error.message });
      toast({
        variant: "destructive",
        title: "Erro ao entrar",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4 relative overflow-hidden">
      {/* Background gradients to match site identity */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      
      <Card className="w-full max-w-md border-border/40 bg-background/85 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="space-y-4 pt-8">
          <div className="flex justify-center">
            <Link to="/">
              <img src={logoFinanceit} alt="Financeit" className="h-16 w-auto" />
            </Link>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold tracking-tight">Acesso à Plataforma</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para continuar
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@financeit.com.br"
                className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link to="/forgot-password" title="Esqueceu a senha?" className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-6 pb-8">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 h-11 transition-all" type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
                Acesso restrito a colaboradores e clientes autorizados. Todas as atividades são monitoradas.
              </p>
              <Link to="/" className="text-xs text-primary hover:underline block pt-2">
                Voltar para o site
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
