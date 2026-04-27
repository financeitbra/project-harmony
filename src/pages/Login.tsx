import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { logAction } from "@/lib/audit";

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

      // await logAction("login_success", { email });

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
      // await logAction("login_failure", { email, error: error.message });
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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-primary/20 shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4 text-primary font-bold text-2xl">
            Financeit
          </div>
          <CardTitle className="text-2xl text-center">Área do Cliente & Colaborador</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar a plataforma
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@financeit.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link to="/forgot-password" title="Esqueceu a senha?" className="text-xs text-primary hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full bg-[#db23e7] hover:bg-[#c11ecb]" type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Acesso restrito. Todas as atividades são monitoradas.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
