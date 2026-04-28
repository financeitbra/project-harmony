import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import AdminUserManagement from "../components/admin/AdminUserManagement";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function getProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/login");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          toast({
            variant: "destructive",
            title: "Erro ao carregar perfil",
            description: error.message,
          });
        } else {
          setProfile(data);
        }
      } catch (err: any) {
        console.error("Dashboard profile error:", err);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo, {profile?.full_name || profile?.email || "Usuário"}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>Sair</Button>
      </div>

      <div className="grid gap-6">
        {profile?.role === 'admin' ? (
          <Card>
            <CardHeader>
              <CardTitle>Painel Administrativo</CardTitle>
              <CardDescription>Gerencie os colaboradores da plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users">
                <TabsList className="mb-4">
                  <TabsTrigger value="users">Colaboradores</TabsTrigger>
                  <TabsTrigger value="logs">Logs de Auditoria</TabsTrigger>
                </TabsList>
                <TabsContent value="users">
                  <AdminUserManagement />
                </TabsContent>
                <TabsContent value="logs">
                  <p className="text-sm text-muted-foreground">Os logs de auditoria serão exibidos aqui.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Área do Colaborador</CardTitle>
              <CardDescription>
                Você está logado como: {profile?.role === 'internal' ? 'Colaborador Interno' : 'Colaborador PR'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Conteúdo específico para {profile?.role === 'internal' ? 'Interno' : 'PR'} em desenvolvimento.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
