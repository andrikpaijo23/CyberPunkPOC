import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import avatarImg from "@/assets/avatar.jpg";
import CyberBackground from "@/components/CyberBackground";
import NeonCursor from "@/components/NeonCursor";
import LoadingScreen from "@/components/LoadingScreen";
import LinkButton from "@/components/LinkButton";
import { useLinks, useProfile } from "@/lib/storage";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [links] = useLinks();
  const [profile] = useProfile();

  useEffect(() => { document.title = `${profile.name} — Neon Links`; }, [profile.name]);

  const enabledLinks = links.filter((l) => l.enabled);
  const avatar = profile.avatar || avatarImg;

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <NeonCursor />
      <CyberBackground />

      <main className="scanlines min-h-screen flex flex-col items-center px-4 py-10 md:py-16">
        <Link to="/admin" aria-label="Admin"
          className="fixed top-4 right-4 z-20 p-2.5 rounded-full glass hover:border-neon-pink/70 transition-all group">
          <Settings className="w-4 h-4 text-neon-cyan/70 group-hover:text-neon-pink group-hover:rotate-90 transition-all duration-500" />
        </Link>

        <div className="w-full max-w-md relative z-10">
          <header className="flex flex-col items-center text-center mb-8 animate-fade-in-up">
            <div className="avatar-ring mb-5">
              <img src={avatar} alt={profile.name} width={128} height={128}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-background" />
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-black neon-gradient-text mb-2">
              @{profile.name}
            </h1>

            <p className="text-muted-foreground text-sm md:text-base whitespace-pre-line max-w-xs">
              {profile.bio}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-neon-cyan/70">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_hsl(var(--neon-cyan))]" />
              ONLINE · ENCRYPTED
            </div>
          </header>

          <div className="flex flex-col gap-3.5">
            {enabledLinks.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
                No active links yet.
                <Link to="/admin" className="block mt-2 neon-text-pink">Open admin panel →</Link>
              </div>
            ) : (
              enabledLinks.map((link, i) => <LinkButton key={link.id} link={link} index={i} />)
            )}
          </div>

          <footer className="mt-12 text-center">
            <div className="font-display text-xs tracking-[0.3em] text-muted-foreground">
              // POWERED BY NEON.LINK //
            </div>
          </footer>
        </div>
      </main>
    </>
  );
};

export default Index;
