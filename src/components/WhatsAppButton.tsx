import { MessageCircle, Linkedin, Instagram, Facebook } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";

const WHATSAPP_NUMBER = "5511914696503";
const DEFAULT_MESSAGE =
  "Que bom que nos chamou! Deixe aqui um breve descritivo sobre o assunto que quer falar e brevemente entraremos em contato.";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/financeit-tecnologia",
    Icon: Linkedin,
    bg: "bg-[#0A66C2]",
    ring: "focus-visible:ring-[#0A66C2]/40",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/financeitbr",
    Icon: Instagram,
    bg: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    ring: "focus-visible:ring-[#DD2A7B]/40",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/financeit",
    Icon: Facebook,
    bg: "bg-[#1877F2]",
    ring: "focus-visible:ring-[#1877F2]/40",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@financeit_tech",
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.55a8.16 8.16 0 0 0 4.77 1.52V6.62a4.85 4.85 0 0 1-1.84.07Z" />
      </svg>
    ),
    bg: "bg-black",
    ring: "focus-visible:ring-white/40",
  },
];

const copyToClipboard = async (value: string) => {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const success = document.execCommand("copy");
  document.body.removeChild(textarea);
  return success;
};

const WhatsAppButton = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isEmbeddedPreview = typeof window !== "undefined" && window.self !== window.top;

    if (isEmbeddedPreview) {
      e.preventDefault();

      let copied = false;
      try {
        copied = await copyToClipboard(href);
      } catch {
        copied = false;
      }

      toast({
        title: copied ? "Link do WhatsApp copiado" : "WhatsApp bloqueado no preview",
        description: copied
          ? "O preview bloqueia sites externos em iframe. Cole o link em uma nova aba para testar."
          : "O preview bloqueia a abertura do WhatsApp em iframe. Teste no site publicado ou abra o link manualmente em uma nova aba.",
      });

      return;
    }

    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 md:gap-3">
      {SOCIAL_LINKS.map(({ label, href: socialHref, Icon, bg, ring }) => (
        <a
          key={label}
          href={socialHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`flex h-8 w-8 items-center justify-center rounded-full ${bg} text-white shadow-md shadow-black/20 transition-all hover:scale-110 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 ${ring} md:h-9 md:w-9`}
        >
          <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
        </a>
      ))}

      <a
        href={href}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 md:h-16 md:w-16"
      >
        <MessageCircle className="h-7 w-7 md:h-8 md:w-8" fill="currentColor" strokeWidth={0} />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
