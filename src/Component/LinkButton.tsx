import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import type { LinkItem } from "@/lib/storage";

interface Props { link: LinkItem; index: number; }

const LinkButton = ({ link, index }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(link.url);
      setCopied(true);
      toast.success("Link copied to clipboard", { description: link.url });
      setTimeout(() => setCopied(false), 1800);
    } catch { toast.error("Failed to copy"); }
  };

  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer"
      className="link-btn group flex items-center gap-3 w-full px-4 py-4 md:py-5 rounded-2xl text-foreground animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}>
      <span className="text-2xl md:text-3xl flex-shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-6">
        {link.emoji}
      </span>
      <span className="flex-1 text-left font-display font-semibold tracking-wide text-base md:text-lg truncate">
        {link.title}
      </span>
      <button onClick={handleCopy} aria-label="Copy link"
        className="p-2 rounded-lg bg-background/40 hover:bg-neon-cyan/20 border border-neon-cyan/30 hover:border-neon-cyan transition-all flex-shrink-0">
        {copied ? <Check className="w-4 h-4 text-neon-cyan" /> : <Copy className="w-4 h-4 text-neon-cyan/80" />}
      </button>
      <ExternalLink className="w-4 h-4 text-neon-pink/70 group-hover:text-neon-pink flex-shrink-0 transition-colors" />
    </a>
  );
};

export default LinkButton;
