import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const SolutionCard = ({ icon: Icon, title, description, className }: SolutionCardProps) => {
  return (
    <div
      className={cn(
        "group relative rounded-lg border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-md",
        className
      )}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
};

export default SolutionCard;
