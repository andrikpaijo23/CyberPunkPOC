import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2, Save, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { LinkItem } from "@/lib/storage";

interface Props {
  link: LinkItem;
  onUpdate: (l: LinkItem) => void;
  onDelete: (id: string) => void;
}

const SortableLinkRow = ({ link, onUpdate, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(link);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.85 : 1,
  };

  const save = () => { onUpdate(draft); setEditing(false); };

  return (
    <div ref={setNodeRef} style={style}
      className={`glass rounded-2xl p-3 md:p-4 flex items-center gap-2 md:gap-3 ${
        isDragging ? "border-neon-pink shadow-[0_0_30px_hsl(var(--neon-pink)/0.5)]" : ""
      }`}>
      <button {...attributes} {...listeners}
        className="touch-none p-1.5 text-neon-purple/70 hover:text-neon-pink cursor-grab active:cursor-grabbing"
        aria-label="Drag to reorder">
        <GripVertical className="w-5 h-5" />
      </button>

      {editing ? (
        <div className="flex-1 grid grid-cols-[auto_1fr] md:grid-cols-[60px_1fr_2fr] gap-2 items-center">
          <Input value={draft.emoji} onChange={(e) => setDraft({ ...draft, emoji: e.target.value })}
            className="text-center text-xl bg-input border-neon-purple/40" maxLength={4} />
          <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            placeholder="Title" className="bg-input border-neon-purple/40" />
          <Input value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })}
            placeholder="https://..." className="bg-input border-neon-purple/40 col-span-2 md:col-span-1" />
        </div>
      ) : (
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <span className="text-2xl flex-shrink-0">{link.emoji}</span>
          <div className="min-w-0 flex-1">
            <div className="font-display font-semibold truncate">{link.title}</div>
            <div className="text-xs text-muted-foreground truncate font-mono">{link.url}</div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
        {editing ? (
          <>
            <Button size="icon" variant="ghost" onClick={save} className="text-neon-cyan hover:bg-neon-cyan/10">
              <Save className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost"
              onClick={() => { setDraft(link); setEditing(false); }}
              className="text-muted-foreground">
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Switch checked={link.enabled}
              onCheckedChange={(v) => onUpdate({ ...link, enabled: v })}
              className="data-[state=checked]:bg-neon-cyan" />
            <Button size="icon" variant="ghost" onClick={() => setEditing(true)}
              className="text-neon-purple hover:bg-neon-purple/10">
              <Pencil className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => onDelete(link.id)}
              className="text-destructive hover:bg-destructive/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SortableLinkRow;
