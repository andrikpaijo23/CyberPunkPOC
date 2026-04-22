import { useEffect, useState } from "react";

interface Particle {
  id: number; left: number; size: number;
  duration: number; delay: number; color: string;
}

const colors = ["hsl(var(--neon-pink))", "hsl(var(--neon-cyan))", "hsl(var(--neon-purple))"];

const CyberBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const arr: Particle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 12,
      delay: Math.random() * 15,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(arr);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 cyber-grid cyber-grid-animated opacity-60" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30 animate-neon-pulse"
        style={{ background: "hsl(var(--neon-purple))" }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30 animate-neon-pulse"
        style={{ background: "hsl(var(--neon-cyan))", animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 animate-neon-pulse"
        style={{ background: "hsl(var(--neon-pink))", animationDelay: "2s" }} />
      {particles.map((p) => (
        <div key={p.id} className="absolute bottom-0 rounded-full animate-float-up"
          style={{
            left: `${p.left}%`, width: `${p.size}px`, height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }} />
      ))}
    </div>
  );
};

export default CyberBackground;
