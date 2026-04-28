import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("CRITICAL APP ERROR:", error);
    console.error("ERROR INFO:", errorInfo);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F172A] px-6 text-center text-white">
          <div className="max-w-md space-y-4 rounded-2xl border border-white/10 bg-[#1E293B]/50 p-8 shadow-2xl backdrop-blur-xl">
            <h1 className="font-display text-2xl font-semibold text-primary">Conexão Interrompida</h1>
            <p className="text-sm leading-relaxed text-slate-300">
              Ocorreu uma falha inesperada ao carregar este componente. Isso pode ser causado por cache antigo ou instabilidade na rede.
            </p>
            
            <div className="bg-black/20 p-3 rounded text-[10px] text-left font-mono overflow-auto max-h-32 text-slate-400 border border-white/5">
              {this.state.error?.message || "Erro desconhecido"}
            </div>

            <div className="pt-4 space-y-3">
              <Button 
                onClick={() => window.location.reload()}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                Tentar novamente
              </Button>
              <Button 
                onClick={this.handleReload}
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5 text-white"
              >
                Voltar para o Início
              </Button>
            </div>
            
            <p className="text-[10px] text-slate-500 pt-2">
              Dica: Se o erro persistir, tente abrir em uma janela anônima.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;