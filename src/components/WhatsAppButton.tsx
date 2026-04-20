import { MessageCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const WHATSAPP_NUMBER = "5511914696503";
const DEFAULT_MESSAGE = "Que bom que nos chamou! Brevemente entraremos em contato.";

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
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 md:h-16 md:w-16"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" fill="currentColor" strokeWidth={0} />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
    </a>
  );
};

export default WhatsAppButton;
