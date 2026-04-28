import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Client {
  id: string;
  name: string;
  reporting_period_type: string;
  start_day_of_month: number;
}

interface TimeEntry {
  id: string;
  activity_description: string;
  start_time: string;
  end_time: string;
  is_extra_hours: boolean;
  client_id: string;
}

export default function Timesheet() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { toast } = useToast();

  // Form state
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [isExtra, setIsExtra] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedClientId) {
      fetchEntries();
    }
  }, [selectedClientId, currentMonth]);

  const fetchClients = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // First try to fetch clients linked to the user
      const { data: linkedClients, error: linkError } = await supabase
        .from("user_clients")
        .select("client_id")
        .eq("user_id", user.id);
      
      if (linkError) throw linkError;

      const clientIds = linkedClients?.map(lc => lc.client_id) || [];
      
      // If no clients are explicitly linked, and it's an admin, we might want to show all
      // But based on the current logic, we respect the user_clients link for everyone.
      // Let's fetch the actual client details for the linked IDs
      if (clientIds.length > 0) {
        const { data: clientData, error: clientError } = await supabase
          .from("clients")
          .select("*")
          .in("id", clientIds);
        
        if (clientError) throw clientError;
        setClients(clientData || []);
        if (clientData && clientData.length > 0) {
          setSelectedClientId(clientData[0].id);
        }
      } else {
        // Check if user is admin - admins might expect to see all if none linked
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();
        
        if (profile?.role === 'admin') {
          const { data: allClients, error: allErr } = await supabase
            .from("clients")
            .select("*");
          
          if (allErr) throw allErr;
          setClients(allClients || []);
          if (allClients && allClients.length > 0) {
            setSelectedClientId(allClients[0].id);
          }
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar clientes",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEntries = async () => {
    if (!selectedClientId) return;

    try {
      const client = clients.find(c => c.id === selectedClientId);
      let start, end;

      if (client?.reporting_period_type === 'custom' && client?.start_day_of_month) {
        // Custom period: from start_day of current month to (start_day - 1) of next month
        const startDay = client.start_day_of_month;
        const currentYear = currentMonth.getFullYear();
        const currentMonthIdx = currentMonth.getMonth();
        
        start = new Date(currentYear, currentMonthIdx, startDay);
        // If the date is in the future for this month, maybe the user means the previous period?
        // Actually, usually "April 2026" with start_day 21 means March 21 to April 20.
        // Let's adjust to match common business logic: the period ending in the selected month.
        end = new Date(currentYear, currentMonthIdx, startDay - 1, 23, 59, 59);
        start = new Date(currentYear, currentMonthIdx - 1, startDay);
      } else {
        // Default: calendar month
        start = startOfMonth(currentMonth);
        end = endOfMonth(currentMonth);
      }

      const { data, error } = await supabase
        .from("time_entries")
        .select("*")
        .eq("client_id", selectedClientId)
        .gte("start_time", start.toISOString())
        .lte("start_time", end.toISOString())
        .order("start_time", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar lançamentos",
        description: error.message,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const startDateTime = new Date(`${date}T${startTime}:00`).toISOString();
      const endDateTime = new Date(`${date}T${endTime}:00`).toISOString();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase.from("time_entries").insert({
        user_id: user.id,
        client_id: selectedClientId,
        activity_description: description,
        start_time: startDateTime,
        end_time: endDateTime,
        is_extra_hours: isExtra
      });

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Horas lançadas com sucesso.",
      });

      setDescription("");
      fetchEntries();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao lançar horas",
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("time_entries").delete().eq("id", id);
      if (error) throw error;
      setEntries(entries.filter(e => e.id !== id));
      toast({ title: "Lançamento removido" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro ao remover", description: error.message });
    }
  };

  const calculateTotalHours = (entriesToSum: TimeEntry[]) => {
    return entriesToSum.reduce((acc, entry) => {
      const start = new Date(entry.start_time).getTime();
      const end = new Date(entry.end_time).getTime();
      return acc + (end - start);
    }, 0) / (1000 * 60 * 60);
  };

  const totalNormal = calculateTotalHours(entries.filter(e => !e.is_extra_hours));
  const totalExtra = calculateTotalHours(entries.filter(e => e.is_extra_hours));

  if (loading) return <div className="p-8 text-center">Carregando Timesheet...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Lançamento Form */}
        <Card className="flex-1 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> Novo Lançamento
            </CardTitle>
            <CardDescription>Registre suas atividades diárias</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Cliente / Projeto</Label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                    {clients.length === 0 && (
                      <SelectItem value="none" disabled>Nenhum cliente vinculado</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Descrição da Atividade</Label>
                <Input 
                  placeholder="O que você fez?" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <input 
                    type="checkbox" 
                    id="extra" 
                    checked={isExtra}
                    onChange={(e) => setIsExtra(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="extra" className="cursor-pointer">Hora Extra</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Início</Label>
                  <Input 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fim</Label>
                  <Input 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={submitting || !selectedClientId}>
                {submitting ? "Lançando..." : "Lançar Horas"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <div className="w-full md:w-80 space-y-4">
          <Card className="bg-slate-900 text-white border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Resumo do Período</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-3xl font-black">{(totalNormal + totalExtra).toFixed(1)}h</p>
                <p className="text-xs text-slate-400">Total de horas no mês</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <p className="text-xl font-bold text-blue-400">{totalNormal.toFixed(1)}h</p>
                  <p className="text-[10px] uppercase text-slate-500 font-bold">Normais</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-amber-400">{totalExtra.toFixed(1)}h</p>
                  <p className="text-[10px] uppercase text-slate-500 font-bold">Extras</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
             <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Período Selecionado</p>
                <p className="text-sm font-bold text-slate-900 capitalize">
                  {(() => {
                    const client = clients.find(c => c.id === selectedClientId);
                    if (client?.reporting_period_type === 'custom' && client?.start_day_of_month) {
                      const startDay = client.start_day_of_month;
                      const currentYear = currentMonth.getFullYear();
                      const currentMonthIdx = currentMonth.getMonth();
                      const start = new Date(currentYear, currentMonthIdx - 1, startDay);
                      const end = new Date(currentYear, currentMonthIdx, startDay - 1);
                      return `${format(start, 'dd/MM')} a ${format(end, 'dd/MM/yyyy')}`;
                    }
                    return format(currentMonth, 'MMMM yyyy', { locale: ptBR });
                  })()}
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Entry History */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50">
          <div>
            <CardTitle className="text-lg font-bold">Histórico de Lançamentos</CardTitle>
            <CardDescription>Acompanhe suas horas registradas</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {entries.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Clock className="w-12 h-12 text-slate-200 mx-auto" />
              <p className="text-slate-500 text-sm">Nenhum lançamento encontrado para este período.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-bold text-slate-600">Data</th>
                    <th className="px-6 py-3 font-bold text-slate-600">Atividade</th>
                    <th className="px-6 py-3 font-bold text-slate-600 text-center">Início/Fim</th>
                    <th className="px-6 py-3 font-bold text-slate-600 text-center">Tipo</th>
                    <th className="px-6 py-3 font-bold text-slate-600 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {format(new Date(entry.start_time), 'dd/MM/yyyy')}
                      </td>
                      <td className="px-6 py-4 text-slate-600 max-w-md truncate">
                        {entry.activity_description}
                      </td>
                      <td className="px-6 py-4 text-center text-slate-500 font-mono text-xs">
                        {format(new Date(entry.start_time), 'HH:mm')} - {format(new Date(entry.end_time), 'HH:mm')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          entry.is_extra_hours 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {entry.is_extra_hours ? 'Extra' : 'Normal'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-slate-400 hover:text-destructive"
                          onClick={() => handleDelete(entry.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
