import { useEffect, useState } from "react";

const NeonCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);

    let raf: number;
    const animate = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [pos.x, pos.y]);

  if (window.matchMedia?.("(pointer: coarse)").matches) return null;

  return (
    <>
      <div className="neon-cursor hidden md:block"
        style={{ left: pos.x - 10, top: pos.y - 10, opacity: visible ? 1 : 0 }} />
      <div className="hidden md:block fixed pointer-events-none rounded-full"
        style={{
          left: trail.x - 20, top: trail.y - 20, width: 40, height: 40,
          border: "1px solid hsl(var(--neon-cyan) / 0.5)",
          boxShadow: "0 0 15px hsl(var(--neon-cyan) / 0.4)",
          zIndex: 9998,
          opacity: visible ? 0.6 : 0,
          transition: "opacity 0.3s",
        }} />
    </>
  );
};

export default NeonCursor;
