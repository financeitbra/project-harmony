import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Plus, 
  Settings, 
  Trash2, 
  Building2, 
  Users,
  Calendar,
  ChevronRight,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: string;
  name: string;
  reporting_period_type: string;
  start_day_of_month: number;
}

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export default function AdminClientManagement() {
  const [clients, setClients] = useState<Client[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const { toast } = useToast();

  // New Client State
  const [newName, setNewName] = useState("");
  const [newPeriod, setNewPeriod] = useState("monthly");
  const [newStartDay, setNewStartDay] = useState("1");
  const [submitting, setSubmitting] = useState(false);

  // Assignment State
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [clientsRes, profilesRes] = await Promise.all([
        supabase.from("clients").select("*").order("name"),
        supabase.from("profiles").select("*").in("role", ["internal", "pr"])
      ]);

      if (clientsRes.error) throw clientsRes.error;
      if (profilesRes.error) throw profilesRes.error;

      setClients(clientsRes.data || []);
      setProfiles(profilesRes.data || []);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro ao carregar dados", description: error.message });
    } finally {
      setLoading(false);
    }
  }

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("clients").insert({
        name: newName,
        reporting_period_type: newPeriod,
        start_day_of_month: parseInt(newStartDay)
      });
      if (error) throw error;
      toast({ title: "Cliente criado com sucesso" });
      setIsDialogOpen(false);
      setNewName("");
      fetchData();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro ao criar", description: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAssignUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAssigning(true);
    try {
      const { error } = await supabase.from("user_clients").insert({
        client_id: selectedClientId,
        user_id: selectedUserId
      });
      if (error) throw error;
      toast({ title: "Colaborador vinculado com sucesso" });
      setIsAssignDialogOpen(false);
      setSelectedUserId("");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro ao vincular", description: "Este colaborador já pode estar vinculado a este cliente." });
    } finally {
      setAssigning(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este cliente? Todos os lançamentos vinculados serão removidos.")) return;
    try {
      const { error } = await supabase.from("clients").delete().eq("id", id);
      if (error) throw error;
      setClients(clients.filter(c => c.id !== id));
      toast({ title: "Cliente removido" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro ao remover", description: error.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold">Gestão de Clientes e Períodos</h3>
          <p className="text-xs text-slate-500">Configure os clientes para os quais os colaboradores lançarão horas.</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" /> Vincular Colaborador
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Vincular a Cliente</DialogTitle>
                <DialogDescription>Permita que um colaborador lance horas para um cliente específico.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAssignUser} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Selecione o Cliente</Label>
                  <Select value={selectedClientId} onValueChange={setSelectedClientId} required>
                    <SelectTrigger><SelectValue placeholder="Escolha um cliente" /></SelectTrigger>
                    <SelectContent>
                      {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Selecione o Colaborador</Label>
                  <Select value={selectedUserId} onValueChange={setSelectedUserId} required>
                    <SelectTrigger><SelectValue placeholder="Escolha um colaborador" /></SelectTrigger>
                    <SelectContent>
                      {profiles.map(p => <SelectItem key={p.id} value={p.id}>{p.full_name} ({p.email})</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter><Button type="submit" disabled={assigning || !selectedClientId || !selectedUserId}>Vincular</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Cliente</DialogTitle>
                <DialogDescription>Configure um novo cliente e seu período de fechamento.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateClient} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cname">Nome do Cliente</Label>
                  <Input id="cname" value={newName} onChange={(e) => setNewName(e.target.value)} required placeholder="Ex: FinanceIT" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo de Período</Label>
                    <Select value={newPeriod} onValueChange={setNewPeriod}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Mensal</SelectItem>
                        <SelectItem value="biweekly">Quinzenal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Dia de Início</Label>
                    <Input type="number" min="1" max="31" value={newStartDay} onChange={(e) => setNewStartDay(e.target.value)} />
                  </div>
                </div>
                <DialogFooter><Button type="submit" disabled={submitting}>Criar Cliente</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-bold">Cliente</TableHead>
              <TableHead className="font-bold">Fechamento</TableHead>
              <TableHead className="font-bold">Dia Início</TableHead>
              <TableHead className="text-right font-bold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8">Carregando...</TableCell></TableRow>
            ) : clients.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-400 italic">Nenhum cliente cadastrado.</TableCell></TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> {client.name}
                  </TableCell>
                  <TableCell className="capitalize text-slate-600">
                    {client.reporting_period_type === 'monthly' ? 'Mensal' : 'Quinzenal'}
                  </TableCell>
                  <TableCell className="text-slate-600">{client.start_day_of_month}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-destructive" onClick={() => handleDeleteClient(client.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
