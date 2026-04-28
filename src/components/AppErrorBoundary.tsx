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
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
          <div className="max-w-md space-y-4 rounded-2xl border border-border bg-card p-8 shadow-xl">
            <h1 className="font-display text-2xl font-semibold">O site encontrou um erro ao carregar</h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Atualize a página para carregar a versão mais recente. Se o problema persistir, tente novamente em alguns segundos.
            </p>
            <Button onClick={this.handleReload}>Atualizar página</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;