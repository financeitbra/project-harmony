import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App render error details:", {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F172A] px-6 text-center text-white">
          <div className="max-w-md space-y-4 rounded-2xl border border-white/10 bg-[#1E293B]/50 p-8 shadow-2xl backdrop-blur-xl">
            <h1 className="font-display text-2xl font-semibold">Ops! Algo não carregou como esperado</h1>
            <p className="text-sm leading-relaxed text-slate-300">
              Isso pode ser um erro temporário de conexão ou cache. Por favor, tente atualizar a página.
            </p>
            <div className="pt-4">
              <Button 
                onClick={this.handleReload}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8"
              >
                Atualizar agora
              </Button>
            </div>
            <p className="text-[10px] text-slate-500 pt-4">
              Se o erro persistir, limpe o cache do seu navegador ou tente em uma janela anônima.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;