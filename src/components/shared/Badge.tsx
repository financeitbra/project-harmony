import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "orange";
  className?: string;
}

const Badge = ({ children, variant = "default", className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-secondary text-secondary-foreground",
        variant === "accent" && "bg-accent/10 text-accent",
        variant === "orange" && "bg-orange-accent/10 text-orange-accent",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
