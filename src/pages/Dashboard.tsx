import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminUserManagement from "@/components/admin/AdminUserManagement";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    async function getProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          if (isMounted) navigate("/login");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Profile fetch error:", error);
          if (isMounted) {
            toast({
              variant: "destructive",
              title: "Erro ao carregar perfil",
              description: "Não foi possível carregar os dados do seu perfil.",
            });
          }
        } else if (data) {
          if (isMounted) setProfile(data);
        } else {
          // Profile doesn't exist yet, which might happen if RLS is strict or creation failed
          console.warn("No profile found for user:", session.user.id);
        }
      } catch (err: any) {
        console.error("Dashboard profile catch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    getProfile();

    return () => {
      isMounted = false;
    };
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F172A] text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mb-4" />
        <p className="text-sm font-medium animate-pulse">Carregando seus dados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Painel de Controle</h1>
            <p className="text-slate-500 text-sm mt-1">
              Olá, <span className="font-semibold text-slate-700">{profile?.full_name || profile?.email || "Usuário"}</span>. Bem-vindo de volta!
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-slate-600 border-slate-200 hover:bg-slate-50">
            Sair da conta
          </Button>
        </div>

        <div className="grid gap-6">
          {profile?.role === 'admin' ? (
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-xl">Gestão Administrativa</CardTitle>
                <CardDescription>Configure e gerencie o acesso de novos colaboradores</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="users" className="w-full">
                  <TabsList className="mb-6 bg-slate-100/50">
                    <TabsTrigger value="users">Colaboradores</TabsTrigger>
                    <TabsTrigger value="logs">Logs do Sistema</TabsTrigger>
                  </TabsList>
                  <TabsContent value="users" className="mt-0">
                    <AdminUserManagement />
                  </TabsContent>
                  <TabsContent value="logs" className="mt-0">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <p className="text-slate-400 text-sm italic">
                        Os registros de atividade serão exibidos aqui em breve.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Área do Colaborador</CardTitle>
                <CardDescription>
                  Você possui privilégios de: <span className="font-semibold text-primary">{profile?.role === 'internal' ? 'Colaborador Interno' : 'Colaborador PR'}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-12 text-center">
                <div className="max-w-sm mx-auto">
                  <p className="text-slate-500 leading-relaxed italic">
                    Este espaço está sendo customizado de acordo com o seu perfil de acesso. Em breve, as ferramentas específicas estarão disponíveis aqui.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
