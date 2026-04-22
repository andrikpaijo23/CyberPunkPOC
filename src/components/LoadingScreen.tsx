import { useEffect, useState } from "react";

const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 18 + 6;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 350);
          return 100;
        }
        return next;
      });
    }, 110);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div className="relative z-10 text-center px-6">
        <div className="font-display text-3xl md:text-5xl font-black neon-gradient-text mb-3 animate-glitch">
          INITIALIZING
        </div>
        <div className="font-display text-xs md:text-sm tracking-[0.4em] text-neon-cyan mb-8 neon-text-cyan">
          // BOOTING NEURAL LINK //
        </div>
        <div className="w-72 md:w-96 h-1.5 bg-muted rounded-full overflow-hidden border border-neon-purple/40">
          <div className="h-full transition-all duration-150 ease-out"
            style={{
              width: `${progress}%`,
              background: "var(--gradient-neon)",
              boxShadow: "0 0 15px hsl(var(--neon-pink))",
            }} />
        </div>
        <div className="mt-3 font-mono text-xs text-muted-foreground">
          {Math.floor(progress)}% — decrypting payload...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
