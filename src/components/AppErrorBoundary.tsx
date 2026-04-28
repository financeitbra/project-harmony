import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./ui/button";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("CRITICAL APP ERROR:", error);
    console.error("ERROR INFO:", errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F172A] px-6 text-center text-white">
          <div className="max-w-2xl space-y-4 rounded-2xl border border-white/10 bg-[#1E293B]/50 p-8 shadow-2xl backdrop-blur-xl">
            <h1 className="font-display text-2xl font-semibold text-primary">Erro de Carregamento</h1>
            <p className="text-sm leading-relaxed text-slate-300">
              Detectamos uma falha técnica. Por favor, veja os detalhes abaixo para nos ajudar a corrigir:
            </p>
            
            <div className="bg-black/40 p-4 rounded text-[11px] text-left font-mono overflow-auto max-h-64 text-red-400 border border-white/10">
              <p className="font-bold mb-2">Mensagem: {this.state.error?.message || "Erro desconhecido"}</p>
              <p className="opacity-70 whitespace-pre-wrap">
                Stack: {this.state.error?.stack}
              </p>
              {this.state.errorInfo && (
                <p className="mt-2 opacity-70 whitespace-pre-wrap">
                  Component Stack: {this.state.errorInfo.componentStack}
                </p>
              )}
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                onClick={() => window.location.reload()}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                Recarregar Página
              </Button>
              <Button 
                onClick={this.handleReload}
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5 text-white"
              >
                Voltar para o Início
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
