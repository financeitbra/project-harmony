import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-right"
      expand={false}
      richColors={false}
      closeButton
      toastOptions={{
        duration: 4000,
        classNames: {
          toast:
            "group toast pointer-events-auto relative flex w-full max-w-sm items-center gap-3 overflow-hidden rounded-xl border border-border/60 bg-background/95 px-4 py-3 text-sm text-foreground shadow-[0_8px_30px_-6px_rgba(0,0,0,0.18)] backdrop-blur-md",
          title: "text-sm font-semibold leading-tight",
          description: "text-xs text-muted-foreground leading-snug mt-0.5",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs group-[.toast]:font-medium",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs",
          closeButton:
            "group-[.toast]:!bg-transparent group-[.toast]:!border-0 group-[.toast]:!text-muted-foreground hover:group-[.toast]:!text-foreground",
          success:
            "group-[.toaster]:!border-emerald-200 group-[.toaster]:!bg-emerald-50/95 group-[.toaster]:!text-emerald-900 dark:group-[.toaster]:!border-emerald-900/40 dark:group-[.toaster]:!bg-emerald-950/80 dark:group-[.toaster]:!text-emerald-100 [&_[data-icon]]:!text-emerald-600 dark:[&_[data-icon]]:!text-emerald-400",
          error:
            "group-[.toaster]:!border-rose-200 group-[.toaster]:!bg-rose-50/95 group-[.toaster]:!text-rose-900 dark:group-[.toaster]:!border-rose-900/40 dark:group-[.toaster]:!bg-rose-950/80 dark:group-[.toaster]:!text-rose-100 [&_[data-icon]]:!text-rose-600 dark:[&_[data-icon]]:!text-rose-400",
          info:
            "group-[.toaster]:!border-sky-200 group-[.toaster]:!bg-sky-50/95 group-[.toaster]:!text-sky-900 dark:group-[.toaster]:!border-sky-900/40 dark:group-[.toaster]:!bg-sky-950/80 dark:group-[.toaster]:!text-sky-100 [&_[data-icon]]:!text-sky-600 dark:[&_[data-icon]]:!text-sky-400",
          warning:
            "group-[.toaster]:!border-amber-200 group-[.toaster]:!bg-amber-50/95 group-[.toaster]:!text-amber-900 dark:group-[.toaster]:!border-amber-900/40 dark:group-[.toaster]:!bg-amber-950/80 dark:group-[.toaster]:!text-amber-100 [&_[data-icon]]:!text-amber-600 dark:[&_[data-icon]]:!text-amber-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };

