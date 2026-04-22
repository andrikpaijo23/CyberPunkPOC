import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "sonner";
import { Plus, LogOut, Eye, ArrowLeft } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import NeonCursor from "@/components/NeonCursor";
import PinLogin, { isAuthed, logout } from "@/components/PinLogin";
import SortableLinkRow from "@/components/SortableLinkRow";
import { useLinks, useProfile, type LinkItem } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Admin = () => {
  const [authed, setAuth] = useState(isAuthed());
  const [links, setLinks] = useLinks();
  const [profile, setProfile] = useProfile();
  const [newLink, setNewLink] = useState({ emoji: "🔗", title: "", url: "" });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (!authed) return <PinLogin onSuccess={() => setAuth(true)} />;

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const oldIdx = links.findIndex((l) => l.id === active.id);
      const newIdx = links.findIndex((l) => l.id === over.id);
      setLinks(arrayMove(links, oldIdx, newIdx));
      toast.success("Order updated");
    }
  };

  const updateLink = (updated: LinkItem) => {
    setLinks(links.map((l) => (l.id === updated.id ? updated : l)));
    toast.success("Link saved");
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
    toast.success("Link deleted");
  };

  const addLink = () => {
    if (!newLink.title.trim() || !newLink.url.trim()) {
      toast.error("Title and URL are required"); return;
    }
    const item: LinkItem = {
      id: crypto.randomUUID(),
      emoji: newLink.emoji || "🔗",
      title: newLink.title.trim(),
      url: newLink.url.trim(),
      enabled: true,
    };
    setLinks([...links, item]);
    setNewLink({ emoji: "🔗", title: "", url: "" });
    toast.success("Link added", { description: item.title });
  };

  const handleLogout = () => { logout(); setAuth(false); toast("Logged out"); };

  return (
    <>
      <NeonCursor />
      <CyberBackground />

      <main className="min-h-screen px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8 animate-fade-in-up">
            <div>
              <Link to="/" className="inline-flex items-center gap-1 text-xs font-mono text-neon-cyan/70 hover:text-neon-cyan mb-2">
                <ArrowLeft className="w-3 h-3" /> back to public
              </Link>
              <h1 className="font-display text-3xl md:text-4xl font-black neon-gradient-text">
                CONTROL DECK
              </h1>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                // changes auto-save to your device //
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/">
                <Button variant="ghost" size="icon"
                  className="border border-neon-cyan/40 hover:border-neon-cyan hover:bg-neon-cyan/10"
                  aria-label="Preview">
                  <Eye className="w-4 h-4 text-neon-cyan" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout}
                className="border border-neon-pink/40 hover:border-neon-pink hover:bg-neon-pink/10"
                aria-label="Logout">
                <LogOut className="w-4 h-4 text-neon-pink" />
              </Button>
            </div>
          </div>

          <section className="glass rounded-2xl p-5 md:p-6 mb-6 animate-fade-in-up">
            <h2 className="font-display text-lg font-bold text-neon-cyan mb-4">◆ PROFILE</h2>
            <div className="grid gap-4">
              <div>
                <Label className="text-xs font-mono text-muted-foreground">USERNAME</Label>
                <Input value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="bg-input border-neon-purple/40 mt-1 font-display" />
              </div>
              <div>
                <Label className="text-xs font-mono text-muted-foreground">BIO</Label>
                <Textarea value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={2} className="bg-input border-neon-purple/40 mt-1 resize-none" />
              </div>
              <div>
                <Label className="text-xs font-mono text-muted-foreground">AVATAR URL (optional)</Label>
                <Input value={profile.avatar}
                  onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                  placeholder="https://... (leave empty for default)"
                  className="bg-input border-neon-purple/40 mt-1 font-mono text-sm" />
              </div>
            </div>
          </section>

          <section className="glass rounded-2xl p-5 md:p-6 mb-6 animate-fade-in-up">
            <h2 className="font-display text-lg font-bold text-neon-pink mb-4">◆ ADD NEW LINK</h2>
            <div className="grid gap-3 md:grid-cols-[80px_1fr_1fr_auto]">
              <Input value={newLink.emoji}
                onChange={(e) => setNewLink({ ...newLink, emoji: e.target.value })}
                placeholder="🔗" maxLength={4}
                className="bg-input border-neon-purple/40 text-center text-xl" />
              <Input value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                placeholder="Title" className="bg-input border-neon-purple/40" />
              <Input value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                placeholder="https://..."
                className="bg-input border-neon-purple/40"
                onKeyDown={(e) => e.key === "Enter" && addLink()} />
              <Button onClick={addLink}
                className="bg-neon-pink/20 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-background hover:shadow-[0_0_20px_hsl(var(--neon-pink))] transition-all">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </section>

          <section className="animate-fade-in-up">
            <h2 className="font-display text-lg font-bold text-neon-purple mb-4 flex items-center justify-between">
              <span>◆ YOUR LINKS ({links.length})</span>
              <span className="text-[10px] font-mono text-muted-foreground">drag to reorder</span>
            </h2>

            {links.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
                No links yet. Add your first one above.
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                  <div className="flex flex-col gap-3">
                    {links.map((link) => (
                      <SortableLinkRow key={link.id} link={link}
                        onUpdate={updateLink} onDelete={deleteLink} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Admin;
