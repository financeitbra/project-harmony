import { useState, useEffect } from "react";
import { X, ArrowRight, ShieldCheck, Zap, Database, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const denodoRed = "#E03127";
const denodoDark = "#2D2D2D";

const DenodoPromoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenDenodoModal");
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);


  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenDenodoModal", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 border-none bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Lado Esquerdo - Visual Denodo */}
          <div 
            className="relative p-8 text-slate-900 md:w-2/5 flex flex-col justify-center overflow-hidden"
            style={{ backgroundColor: "#F8F8FD" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-3xl opacity-20" style={{ backgroundColor: denodoRed }}></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 -ml-12 -mb-12 rounded-full blur-2xl opacity-10" style={{ backgroundColor: denodoRed }}></div>
            
            <div className="h-10 w-auto mb-6 relative z-10 bg-slate-100 rounded p-2 flex items-center justify-center">
              <img 
                src="/logos/denodo.png" 
                alt="Denodo Logo" 
                className="h-full w-auto"
              />
            </div>

            
            <h3 className="text-xl font-bold mb-4 relative z-10 leading-tight">
              Acelerando a Inteligência no Mercado Financeiro
            </h3>
            
            <p className="text-sm text-slate-600 relative z-10">
              A Logical Data Management permite acesso a dados em tempo real para conformidade, gestão de risco e visão 360 do cliente.
            </p>
          </div>

          {/* Lado Direito - Conteúdo e Dores */}
          <div className="p-8 md:w-3/5 bg-white relative">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 leading-tight flex flex-wrap items-center gap-x-3">
                Resolva os desafios de dados com a <img src="/logos/denodo.png" alt="Denodo" className="h-[89.6px] w-auto inline-block object-contain" /> <span className="text-slate-400 font-normal">&</span> <span className="text-slate-900">Financeit</span>
              </DialogTitle>



            </DialogHeader>

            <div className="mt-6 space-y-4">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Dores que resolvemos no Setor Financeiro:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <ShieldCheck className="h-5 w-5" style={{ color: denodoRed }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Conformidade e LGPD</p>
                    <p className="text-xs text-slate-500">Governança centralizada e mascaramento dinâmico sem replicar dados sensíveis.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Zap className="h-5 w-5" style={{ color: denodoRed }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Visão 360 do Cliente</p>
                    <p className="text-xs text-slate-500">Integração ágil de sistemas legados, CRM e open banking para ofertas personalizadas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Database className="h-5 w-5" style={{ color: denodoRed }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Gestão de Risco em Tempo Real</p>
                    <p className="text-xs text-slate-500">Acesse dados distribuídos instantaneamente para análises de crédito e fraudes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Button 
                className="w-full text-white font-bold h-11"
                style={{ backgroundColor: denodoRed }}
                asChild
              >
                <Link to="/denodo" onClick={handleClose}>
                  Ver solução completa <ArrowRight className="ml-2 h-4 w-4" />
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

export default DenodoPromoModal;