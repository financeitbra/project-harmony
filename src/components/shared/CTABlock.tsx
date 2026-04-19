import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTABlockProps {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
}

const CTABlock = ({
  title,
  description,
  buttonLabel = "Fale Conosco",
  buttonHref = "/contato",
}: CTABlockProps) => {
  return (
    <section className="bg-navy-gradient py-20">
      <div className="container text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/70 md:text-lg">
          {description}
        </p>
        <div className="mt-8">
          <Button size="lg" variant="secondary" asChild>
            <Link to={buttonHref} className="gap-2">
              {buttonLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABlock;
