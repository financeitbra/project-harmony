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
    href: "https://www.facebook.com/financeitbr",
    Icon: Facebook,
    bg: "bg-[#1877F2]",
    ring: "focus-visible:ring-[#1877F2]/40",
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
  const location = useLocation();
  const isLoggedArea = location.pathname.startsWith('/dashboard');
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  if (isLoggedArea) return null;

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
