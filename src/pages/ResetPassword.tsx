import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { logAction } from "@/lib/audit";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ variant: "destructive", title: "Erro", description: "As senhas não coincidem." });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('profiles').update({ 
          password_reset_required: false,
          password_updated_at: new Date().toISOString() 
        }).eq('id', user.id);
        
        await logAction("password_change_success");
      }

      toast({ title: "Sucesso", description: "Senha atualizada com sucesso!" });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 relative overflow-hidden">
      {/* Background visual enhancements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      
      <Card className="w-full max-w-md border-white/5 bg-[#1E293B]/80 backdrop-blur-2xl shadow-2xl relative z-10 text-white">
        <CardHeader className="space-y-4 pt-8">
          <CardTitle className="text-2xl text-center font-bold tracking-tight">Atualizar Senha</CardTitle>
          <CardDescription className="text-center text-slate-400">
            Por favor, defina sua senha definitiva para o primeiro acesso.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleReset}>
          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="password" title="Defina sua nova senha" className="text-slate-300">Nova Senha</Label>
              <Input
                id="password"
                type="password"
                className="bg-slate-900/50 border-white/10 text-white focus:ring-primary/40 focus:border-primary/40 transition-all h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" title="Confirme a nova senha digitada" className="text-slate-300">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                className="bg-slate-900/50 border-white/10 text-white focus:ring-primary/40 focus:border-primary/40 transition-all h-11"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="pb-8 pt-4">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 h-12 transition-all text-base" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Salvando...</span>
                </div>
              ) : "Atualizar Senha"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
