import { useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  MessageSquare,
  Compass,
  Lightbulb,
  ShieldCheck,
  Users,
  Database,
  FileText,
  BarChart3,
  Cpu,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  CheckCircle2,
  Eye,
  Zap,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { emailService } from "@/services/api";
import { z } from "zod";

/* ─── Validation ─── */
const contatoSchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório").max(100),
  empresa: z.string().trim().min(1, "Empresa é obrigatória").max(100),
  cargo: z.string().trim().min(1, "Cargo é obrigatório").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
  tema: z.string().trim().min(1, "Selecione um tema"),
  mensagem: z.string().trim().min(1, "Mensagem é obrigatória").max(2000),
});

type ContatoForm = z.infer<typeof contatoSchema>;

/* ───────────────────────────── 1. Hero ───────────────────────────── */
const ContatoHero = () => (
  <section className="relative overflow-hidden bg-navy-gradient">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
    <div className="absolute inset-0">
      <div className="absolute left-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech/[0.06] to-transparent" />
      <div className="absolute left-[55%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-tech/[0.04] to-transparent" />
      <div className="absolute left-0 top-[45%] h-px w-full bg-gradient-to-r from-transparent via-cyan-tech/[0.05] to-transparent" />
      <div className="absolute right-[12%] top-[25%] h-[350px] w-[350px] rounded-full bg-cyan-tech/[0.04] blur-[120px]" />
      <div className="absolute left-[8%] bottom-[15%] h-[200px] w-[200px] rounded-full bg-petrol/10 blur-[80px]" />
    </div>

    <div className="container relative z-10 py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
          <span className="text-xs font-medium tracking-wide text-accent">Contato</span>
        </div>

        <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          Quando o desafio é relevante, a conversa também{" "}
          <span className="text-gradient">precisa ser.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
          A Financeit está pronta para apoiar sua empresa com inteligência de negócio, tecnologia, talentos, dados, governança, IA e soluções especializadas.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/50 md:text-base">
          Se sua organização precisa contratar melhor, acelerar entregas, estruturar operações, evoluir com IA ou fortalecer áreas críticas do negócio, este é o ponto de partida para uma conversa mais clara, objetiva e estratégica.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <a href="#formulario">
              Fale com a Financeit
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/15 hover:border-primary-foreground/50"
            asChild
          >
            <a href="#formulario">
              Apresente seu desafio
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: MessageSquare, text: "Atendimento consultivo" },
            { icon: Compass, text: "Conversa orientada a contexto" },
            { icon: Lightbulb, text: "Clareza para próximos passos" },
            { icon: ShieldCheck, text: "Estrutura para apoiar evolução" },
          ].map((item) => (
            <div key={item.text} className="flex flex-col items-center gap-2 rounded-lg border border-accent/15 bg-accent/5 px-4 py-5">
              <item.icon className="h-5 w-5 text-accent" />
              <span className="text-center text-xs font-medium leading-snug text-primary-foreground/70">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ──── 2. Como podemos ajudar ──── */
const ComoPodemos = () => {
  const blocos = [
    { icon: Users, title: "Talentos e capacidade de entrega", desc: "Para empresas que precisam contratar, alocar profissionais ou estruturar squads com mais aderência." },
    { icon: Database, title: "Dados, governança e prontidão para IA", desc: "Para organizações que precisam construir base confiável para evoluir com inteligência artificial." },
    { icon: FileText, title: "Soluções fiscais com Avalara", desc: "Para operações que precisam ampliar automação, compliance e preparo para adaptação tributária." },
    { icon: BarChart3, title: "Gestão de orçamento e resultado com PPOV", desc: "Para lideranças que precisam de mais integração, consistência e uma única fonte da verdade." },
    { icon: Cpu, title: "Tecnologia e estrutura operacional", desc: "Para empresas que precisam transformar prioridade de negócio em capacidade real de execução." },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
            A conversa pode começar por diferentes frentes.{" "}
            <span className="text-accent">O importante é começar com clareza.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            A Financeit apoia empresas em diferentes momentos de evolução. Seja para contratar melhor, estruturar execução, organizar dados, avançar com IA ou fortalecer áreas críticas da operação, nossa abordagem parte do contexto real do negócio.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blocos.map((b) => (
            <div
              key={b.title}
              className="group rounded-xl border border-border bg-card p-7 transition-all hover:border-accent/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
                <b.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ──── 3. Escolha o tipo de contato + 4. Formulário ──── */
const temas = [
  "Quero falar sobre talentos e contratação",
  "Quero falar sobre dados, governança e IA",
  "Quero falar sobre soluções fiscais",
  "Quero falar sobre orçamento e resultado",
  "Quero falar sobre tecnologia e execução",
  "Quero apresentar outro desafio",
];

const FormularioContato = () => {
  const { toast } = useToast();
  const [selectedTema, setSelectedTema] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof ContatoForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ContatoForm>({
    nome: "",
    empresa: "",
    cargo: "",
    email: "",
    telefone: "",
    tema: "",
    mensagem: "",
  });

  const handleTemaSelect = (tema: string) => {
    setSelectedTema(tema);
    setFormData((prev) => ({ ...prev, tema }));
    setErrors((prev) => ({ ...prev, tema: undefined }));
  };

  const handleChange = (field: keyof ContatoForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contatoSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContatoForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContatoForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const composedMessage = [
        `Empresa: ${formData.empresa}`,
        `Cargo: ${formData.cargo}`,
        `Telefone: ${formData.telefone}`,
        `Tema: ${formData.tema}`,
        "",
        formData.mensagem,
      ].join("\n");

      await emailService.sendContact({
        name: formData.nome,
        email: formData.email,
        message: composedMessage,
      });

      setIsSuccess(true);
      setFormData({ nome: "", empresa: "", cargo: "", email: "", telefone: "", tema: "", mensagem: "" });
      setSelectedTema("");
      toast({
        title: "Mensagem enviada com sucesso",
        description: "A Financeit recebeu sua mensagem e retornará em breve.",
      });
    } catch (err) {
      console.error("Submit error:", err);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente em alguns instantes. Sua mensagem não foi perdida.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="formulario" className="section-padding bg-secondary/30">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-accent/20 bg-card p-12 text-center shadow-sm md:p-16">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
                <CheckCircle2 className="h-8 w-8 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Mensagem recebida com sucesso.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                A Financeit analisará o contexto informado e retornará com o direcionamento mais aderente ao seu desafio.
              </p>
              <Button
                className="mt-8"
                variant="outline"
                onClick={() => setIsSuccess(false)}
              >
                Enviar nova mensagem
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="section-padding bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Seção 3 — Escolha o tipo */}
          <div className="mb-16 text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
              Nem todo contato nasce da{" "}
              <span className="text-accent">mesma necessidade.</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Selecione a frente que mais se aproxima do seu contexto para direcionar melhor a conversa.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {temas.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTemaSelect(t)}
                  disabled={isSubmitting}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                    selectedTema === t
                      ? "border-accent bg-accent text-accent-foreground shadow-md"
                      : "border-border bg-card text-card-foreground hover:border-accent/30 hover:shadow-sm"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Seção 4 — Formulário */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12">
            <div className="mb-10 text-center">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Conte um pouco sobre o contexto da sua empresa.
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Com algumas informações iniciais, conseguimos direcionar a conversa com mais precisão e tornar o próximo passo mais produtivo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" placeholder="Seu nome completo" value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} disabled={isSubmitting} />
                  {errors.nome && <p className="text-xs text-destructive">{errors.nome}</p>}
                </div>
                {/* Empresa */}
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input id="empresa" placeholder="Nome da empresa" value={formData.empresa} onChange={(e) => handleChange("empresa", e.target.value)} disabled={isSubmitting} />
                  {errors.empresa && <p className="text-xs text-destructive">{errors.empresa}</p>}
                </div>
                {/* Cargo */}
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" placeholder="Seu cargo atual" value={formData.cargo} onChange={(e) => handleChange("cargo", e.target.value)} disabled={isSubmitting} />
                  {errors.cargo && <p className="text-xs text-destructive">{errors.cargo}</p>}
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail corporativo</Label>
                  <Input id="email" type="email" placeholder="seu@empresa.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} disabled={isSubmitting} />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
                {/* Telefone */}
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(00) 00000-0000" value={formData.telefone} onChange={(e) => handleChange("telefone", e.target.value)} disabled={isSubmitting} />
                  {errors.telefone && <p className="text-xs text-destructive">{errors.telefone}</p>}
                </div>
                {/* Tema (hidden, selected above) */}
                <div className="space-y-2">
                  <Label>Tema de interesse</Label>
                  <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 text-sm text-muted-foreground">
                    {selectedTema || "Selecione acima"}
                  </div>
                  {errors.tema && <p className="text-xs text-destructive">{errors.tema}</p>}
                </div>
              </div>

              {/* Mensagem */}
              <div className="space-y-2">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  placeholder="Descreva brevemente o contexto ou desafio da sua empresa..."
                  rows={5}
                  value={formData.mensagem}
                  onChange={(e) => handleChange("mensagem", e.target.value)}
                  disabled={isSubmitting}
                />
                {errors.mensagem && <p className="text-xs text-destructive">{errors.mensagem}</p>}
              </div>

              <div className="flex justify-center pt-2">
                <Button type="submit" size="lg" className="gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar mensagem
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ──── 5. O que acontece depois ──── */
const OQueAcontece = () => (
  <section className="px-6 pt-6 pb-16 md:px-12 lg:px-20 lg:pt-8 lg:pb-20">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
          Clareza sobre o próximo passo também faz parte da{" "}
          <span className="text-accent">experiência.</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Após o envio da mensagem, a Financeit analisa o contexto informado e direciona o contato de forma mais aderente ao desafio apresentado. O objetivo é tornar a próxima conversa mais útil, mais objetiva e mais conectada à realidade da sua empresa.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-3">
        {[
          { step: "01", icon: Eye, label: "Leitura inicial do contexto" },
          { step: "02", icon: Target, label: "Direcionamento da demanda" },
          { step: "03", icon: Zap, label: "Retorno com o próximo passo adequado" },
        ].map((item) => (
          <div key={item.step} className="group flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-7 text-center transition-all hover:border-accent/20 hover:shadow-sm">
            <span className={`text-xs font-bold uppercase tracking-widest ${item.step === '01' ? 'text-orange-accent' : 'text-accent'}`}>{item.step}</span>
            <div className={`flex h-12 w-12 items-center justify-center rounded-full border ${item.step === '01' ? 'border-orange-accent/20 bg-orange-accent/10' : 'border-accent/20 bg-accent/10'}`}>
              <item.icon className={`h-5 w-5 ${item.step === '01' ? 'text-orange-accent' : 'text-accent'}`} />
            </div>
            <span className="text-sm font-semibold text-card-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ──── 6. Outras formas de contato ──── */
const OutrasFormas = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Se preferir, você também pode falar com a Financeit por{" "}
          <span className="text-accent">outros caminhos.</span>
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl gap-4 md:grid-cols-2">
        {/* E-mail */}
        <a href="mailto:comercial@financeit.com.br" className="flex items-start gap-4 rounded-xl border border-orange-accent/15 bg-card p-6 transition-all hover:border-accent/20 hover:shadow-sm">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-orange-accent/20 bg-orange-accent/10">
            <Mail className="h-5 w-5 text-orange-accent" />
          </div>
          <div>
            <span className="text-sm font-semibold text-card-foreground">E-mail institucional</span>
            <p className="mt-1 text-sm text-muted-foreground">comercial@financeit.com.br</p>
          </div>
        </a>

        {/* Telefone */}
        <a href="tel:+5511914696503" className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/20 hover:shadow-sm">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
            <Phone className="h-5 w-5 text-accent" />
          </div>
          <div>
            <span className="text-sm font-semibold text-card-foreground">Telefone / WhatsApp</span>
            <p className="mt-1 text-sm text-muted-foreground">(11) 91469-6503</p>
          </div>
        </a>

        {/* Endereço */}
        <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/20 hover:shadow-sm">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
            <MapPin className="h-5 w-5 text-accent" />
          </div>
          <div>
            <span className="text-sm font-semibold text-card-foreground">Base institucional</span>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Avenida Paulista, 1636 — 15º Andar, Sala 04<br />
              Bela Vista, São Paulo – SP<br />
              <span className="text-xs text-muted-foreground/70">CEP 01310-200</span>
            </p>
          </div>
        </div>

        {/* LinkedIn */}
        <a href="https://www.linkedin.com/company/financeit-tecnologia" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/20 hover:shadow-sm">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
            <Linkedin className="h-5 w-5 text-accent" />
          </div>
          <div>
            <span className="text-sm font-semibold text-card-foreground">Financeit no LinkedIn</span>
            <p className="mt-1 text-sm text-muted-foreground">LinkedIn institucional ↗</p>
          </div>
        </a>
      </div>
    </div>
  </section>
);

/* ──── 7. Confiança institucional ──── */
const ConfiancaInstitucional = () => (
  <section className="section-padding">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl lg:text-4xl">
          A conversa certa começa quando existe contexto, estrutura e{" "}
          <span className="text-accent">capacidade de entrega.</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          A Financeit atua conectando talentos, tecnologia, dados, governança e execução para apoiar empresas em desafios que exigem mais clareza, consistência e capacidade real de evolução.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Lightbulb, label: "Inteligência de negócio aplicada" },
          { icon: Database, label: "Estrutura para evolução com IA" },
          { icon: Cpu, label: "Soluções conectadas ao negócio real" },
          { icon: MessageSquare, label: "Abordagem consultiva e executiva" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-accent/20 hover:shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
              <item.icon className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-semibold text-card-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ──── 8. CTA final ──── */
const ContatoCTAFinal = () => (
  <section className="relative overflow-hidden bg-navy-gradient">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-tech/[0.04] blur-[150px]" />
    </div>

    <div className="container relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
          Se o desafio da sua empresa pede mais clareza, estrutura e capacidade de execução,{" "}
          <span className="text-gradient">a conversa pode começar agora.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
          A Financeit está pronta para entender o seu contexto, avaliar o ponto de partida e construir uma direção mais consistente para o próximo passo.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <a href="#formulario">
              Fale com a Financeit
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/15 hover:border-primary-foreground/50"
            asChild
          >
            <a href="#formulario">
              Apresente seu desafio
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

/* ──────────────── Page ──────────────── */
const ContatoPage = () => (
  <>
    <ContatoHero />
    <ComoPodemos />
    <FormularioContato />
    <OQueAcontece />
    <OutrasFormas />
    <ConfiancaInstitucional />
    <ContatoCTAFinal />
  </>
);

export default ContatoPage;
