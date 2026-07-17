import { useState, useEffect } from "react";
import { ArrowRight, BarChart3, Brain, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const qlikGreen = "#009845";
const qlikDark = "#1F2A2E";

const QlikPromoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto p-0 border-none bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Lado Esquerdo - Visual Qlik */}
          <div
            className="relative p-6 md:p-8 text-slate-900 md:w-2/5 flex flex-col justify-center overflow-hidden"
            style={{ backgroundColor: "#F1FBF5" }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: qlikGreen }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-24 h-24 -ml-12 -mb-12 rounded-full blur-2xl opacity-10"
              style={{ backgroundColor: qlikGreen }}
            ></div>

            <div className="h-32 md:h-[245px] w-auto mb-6 relative z-10 bg-white/60 rounded p-4 flex items-center justify-start">
              <img
                src="/logos/qlik.svg"
                alt="Qlik Logo"
                className="h-full w-auto object-contain"
              />
            </div>

            <h3 className="text-xl font-bold mb-4 relative z-10 leading-tight" style={{ color: qlikDark }}>
              Do dado bruto à decisão inteligente
            </h3>

            <p className="text-sm text-slate-600 relative z-10">
              A plataforma Qlik entrega pipeline de dados end-to-end, analytics e IA para transformar dados em resultados de negócio.
            </p>
          </div>

          {/* Lado Direito - Conteúdo */}
          <div className="p-6 md:p-8 md:w-3/5 bg-white relative">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-bold text-slate-900 leading-tight flex flex-wrap items-center gap-x-3">
                Descubra a plataforma
                <img
                  src="/logos/qlik.svg"
                  alt="Qlik"
                  className="h-12 md:h-[89.6px] w-auto inline-block object-contain"
                />
                <span className="text-slate-400 font-normal">&</span>
                <span className="text-slate-900">Financeit</span>
              </DialogTitle>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                O que a Qlik entrega para o seu negócio:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Workflow className="h-5 w-5" style={{ color: qlikGreen }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Pipeline de dados end-to-end</p>
                    <p className="text-xs text-slate-500">
                      Ingestão, transformação e entrega automatizada de dados prontos para analytics e IA.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <BarChart3 className="h-5 w-5" style={{ color: qlikGreen }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Analytics associativo</p>
                    <p className="text-xs text-slate-500">
                      Exploração livre dos dados, sem limitações de consultas pré-definidas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Brain className="h-5 w-5" style={{ color: qlikGreen }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">IA e Machine Learning integrados</p>
                    <p className="text-xs text-slate-500">
                      Insights preditivos e automação de decisões direto na plataforma.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Button
                className="w-full text-white font-bold h-11 hover:opacity-90"
                style={{ backgroundColor: qlikGreen }}
                asChild
              >
                <Link to="/qlik" onClick={handleClose}>
                  Conhecer a plataforma Qlik <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <button
                onClick={handleClose}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors text-center"
              >
                Continuar navegando no site
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QlikPromoModal;
