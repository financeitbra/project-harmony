import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Benefit {
  icon: ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface InfoPageLayoutProps {
  title: string;
  subtitle: string;
  heroDescription: string;
  ctaText: string;
  ctaHref: string;
  benefits: Benefit[];
  steps: Step[];
  finalCtaTitle: string;
  finalCtaDescription: string;
  finalCtaText: string;
  finalCtaHref: string;
  accentColor: "orange" | "blue";
}

const InfoPageLayout = ({
  title,
  subtitle,
  heroDescription,
  ctaText,
  ctaHref,
  benefits,
  steps,
  finalCtaTitle,
  finalCtaDescription,
  finalCtaText,
  finalCtaHref,
  accentColor,
}: InfoPageLayoutProps) => {
  const isOrange = accentColor === "orange";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/40 py-20 lg:py-28">
        <div className="container max-w-5xl">
          <div className="text-center space-y-6">
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
            <p className="text-base text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {heroDescription}
            </p>
            <div className="pt-4">
              <Button size="lg" asChild>
                <Link to={ctaHref}>
                  {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-center text-foreground mb-12">
            Benefícios
          </h2>
          <div className={`grid gap-8 ${benefits.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {benefits.map((b, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                    isOrange
                      ? "bg-orange-accent/10 text-orange-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {b.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-secondary/30">
        <div className="container max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-center text-foreground mb-12">
            Como Funciona
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={i} className="text-center space-y-4">
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-primary-foreground ${
                    isOrange ? "bg-primary" : "bg-orange-accent"
                  }`}
                >
                  {s.number}
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className={`py-20 ${
          isOrange
            ? "bg-gradient-to-r from-primary to-primary/80"
            : "bg-gradient-to-r from-orange-accent to-orange-accent/80"
        }`}
      >
        <div className="container max-w-3xl text-center space-y-6">
          <h2 className="font-display text-3xl font-bold text-primary-foreground">
            {finalCtaTitle}
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            {finalCtaDescription}
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
          >
            <Link to={finalCtaHref}>
              {finalCtaText} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default InfoPageLayout;
