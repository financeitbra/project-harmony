import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  History, 
  Search,
  Filter,
  Calendar
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  metadata: any;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    setLoading(true);
    try {
      // Joining with profiles to get the user name
      const { data, error } = await supabase
        .from("audit_logs")
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setLogs(data || []);
    } catch (error: any) {
      console.error("Fetch logs error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao buscar logs",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold">Histórico de Atividades</h3>
          <p className="text-xs text-slate-500">Acompanhe as ações realizadas no sistema.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por ação ou usuário..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-bold">Usuário</TableHead>
              <TableHead className="font-bold">Ação</TableHead>
              <TableHead className="font-bold">Data/Hora</TableHead>
              <TableHead className="font-bold">Detalhes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8">Carregando logs...</TableCell></TableRow>
            ) : filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-400 italic">
                  {searchTerm ? "Nenhum resultado encontrado." : "Nenhum log registrado ainda."}
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{log.profiles?.full_name || "Sistema"}</span>
                      <span className="text-[10px] text-slate-500">{log.profiles?.email || "-"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-700">
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(log.created_at).toLocaleString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell className="text-[10px] text-slate-400 font-mono truncate max-w-[200px]">
                    {JSON.stringify(log.metadata)}
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
