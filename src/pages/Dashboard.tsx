import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Settings, 
  History, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Bell,
  ShieldCheck,
  Globe,
  UserCircle,
  Menu,
  X
} from "lucide-react";
import AdminUserManagement from "@/components/admin/AdminUserManagement";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 text-slate-900">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mb-4" />
        <p className="text-sm font-medium animate-pulse">Carregando seus dados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Sidebar/Navigation */}
      <nav className="bg-slate-900 text-white w-full border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">FinanceIT</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Projetos
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Relatórios
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-medium">{profile?.full_name || profile?.email}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                {profile?.role === 'admin' ? 'Administrador' : profile?.role === 'internal' ? 'Colaborador Interno' : 'Colaborador PR'}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-primary font-bold shadow-inner">
              {profile?.full_name?.charAt(0) || profile?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair" className="hidden sm:flex text-slate-400 hover:text-white hover:bg-slate-800 rounded-full">
                <LogOut className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-300">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4 space-y-2 animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800 mb-2">
               <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-primary font-bold">
                {profile?.full_name?.charAt(0) || profile?.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none">{profile?.full_name || "Usuário"}</p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-black">
                  {profile?.role === 'admin' ? 'Administrador' : profile?.role === 'internal' ? 'Colaborador Interno' : 'Colaborador PR'}
                </p>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 py-3">
              <LayoutDashboard className="w-4 h-4 mr-3" /> Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 py-3">
              <Briefcase className="w-4 h-4 mr-3" /> Projetos
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 py-3">
              <FileText className="w-4 h-4 mr-3" /> Relatórios
            </Button>
            <div className="pt-4 mt-2 border-t border-slate-800">
              <Button variant="destructive" className="w-full justify-start py-3" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-3" /> Sair da conta
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-4 max-w-7xl">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Painel de Controle</h2>
            <p className="text-slate-500 mt-1">Bem-vindo à sua área de trabalho estratégica.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-600">Sistema Online</span>
            </div>
          </div>
        </header>

        <div className="grid gap-8">
          {profile?.role === 'admin' ? (
            <>
              {/* Quick Stats for Admin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Colaboradores", value: "12", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Projetos Ativos", value: "08", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50" },
                  { label: "Pendências", value: "03", icon: Bell, color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "Segurança", value: "100%", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((stat, i) => (
                  <Card key={i} className="border-slate-200 shadow-sm hover:shadow-md transition-all cursor-default group">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-slate-200 shadow-xl overflow-hidden rounded-2xl">
                <Tabs defaultValue="users" className="w-full">
                  <div className="bg-white border-b border-slate-100 px-6 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 pb-4">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <Settings className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">Gerenciamento</CardTitle>
                        <CardDescription className="text-xs">Controle de acessos e auditoria</CardDescription>
                      </div>
                    </div>
                    <TabsList className="bg-slate-100/80 p-1 rounded-xl mb-4 h-auto">
                      <TabsTrigger value="users" className="rounded-lg py-2 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Users className="w-4 h-4 mr-2" /> Colaboradores
                      </TabsTrigger>
                      <TabsTrigger value="logs" className="rounded-lg py-2 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <History className="w-4 h-4 mr-2" /> Auditoria
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <CardContent className="p-6">
                    <TabsContent value="users" className="mt-0 focus-visible:outline-none">
                      <AdminUserManagement />
                    </TabsContent>
                    <TabsContent value="logs" className="mt-0 focus-visible:outline-none">
                      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="p-4 bg-slate-50 rounded-full">
                          <History className="w-10 h-10 text-slate-300" />
                        </div>
                        <div className="max-w-xs">
                          <p className="text-slate-900 font-bold">Logs de Atividade</p>
                          <p className="text-slate-500 text-sm mt-1">Os registros de acesso e alterações serão exibidos aqui em breve.</p>
                        </div>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            </>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Side Info */}
              <div className="space-y-6">
                <Card className="border-slate-200 shadow-lg overflow-hidden rounded-2xl">
                  <div className="h-24 bg-gradient-to-r from-slate-900 to-slate-800" />
                  <CardContent className="relative px-6 pb-6">
                    <div className="absolute -top-12 left-6">
                      <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-xl">
                        <div className="w-full h-full rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                          {profile?.role === 'internal' ? (
                            <ShieldCheck className="w-10 h-10 text-blue-600" />
                          ) : (
                            <Globe className="w-10 h-10 text-emerald-600" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="pt-16">
                      <h3 className="text-xl font-black text-slate-900">{profile?.full_name || "Colaborador"}</h3>
                      <p className="text-slate-500 text-sm font-medium">{profile?.email}</p>
                      
                      <div className="mt-6 flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          profile?.role === 'internal' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {profile?.role === 'internal' ? 'Colaborador Interno' : 'Colaborador PR'}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                          Ativo
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Bell className="w-4 h-4 text-primary" /> Notificações
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "Bem-vindo", desc: "Acesso liberado à plataforma FinanceIT.", time: "Agora" },
                        { title: "Segurança", desc: "Mantenha seus dados sempre atualizados.", time: "1d" }
                      ].map((n, i) => (
                        <div key={i} className="flex gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                          <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">{n.title}</p>
                            <p className="text-[11px] text-slate-500 leading-tight">{n.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* User Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-slate-200 shadow-xl rounded-2xl overflow-hidden min-h-[400px] flex flex-col bg-white">
                  <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-black text-slate-900">Seu Workspace</CardTitle>
                      <CardDescription className="text-xs">Acessos e ferramentas específicas</CardDescription>
                    </div>
                    <LayoutDashboard className="w-6 h-6 text-slate-200" />
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center animate-pulse">
                        <FileText className="w-10 h-10 text-slate-200" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                        <Settings className="w-4 h-4 text-white animate-spin-slow" />
                      </div>
                    </div>
                    
                    <div className="max-w-md">
                      <p className="text-lg font-bold text-slate-900">Módulos em Preparação</p>
                      <p className="text-slate-500 mt-2 leading-relaxed">
                        Estamos customizando seu ambiente com base no seu perfil de <span className="text-primary font-bold">
                        {profile?.role === 'internal' ? 'Colaborador Interno' : 'Parceiro PR'}</span>. 
                        Em breve, dashboards e documentos estarão disponíveis.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm pt-4">
                      <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50">
                        Ver Documentação
                      </Button>
                      <Button className="rounded-xl shadow-lg shadow-primary/20">
                        Abrir Perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 bg-white mt-auto">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} FinanceIT. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-400 hover:text-primary transition-colors">Termos</a>
            <a href="#" className="text-xs text-slate-400 hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="text-xs text-slate-400 hover:text-primary transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
