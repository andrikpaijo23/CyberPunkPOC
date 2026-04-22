import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Lock, Delete } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";

// Default admin PIN — ubah di sini
export const ADMIN_PIN = "1234";
const SESSION_KEY = "cyber_admin_auth";

export const isAuthed = () => sessionStorage.getItem(SESSION_KEY) === "1";
export const setAuthed = () => sessionStorage.setItem(SESSION_KEY, "1");
export const logout = () => sessionStorage.removeItem(SESSION_KEY);

const PinLogin = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const submit = (value: string) => {
    if (value === ADMIN_PIN) {
      setAuthed();
      toast.success("Access granted", { description: "Welcome back, operator." });
      onSuccess();
    } else {
      setShake(true);
      toast.error("Access denied", { description: "Invalid PIN code." });
      setTimeout(() => { setShake(false); setPin(""); }, 500);
    }
  };

  const press = (digit: string) => {
    if (pin.length >= 4) return;
    const next = pin + digit;
    setPin(next);
    if (next.length === 4) setTimeout(() => submit(next), 150);
  };

  const back = () => setPin((p) => p.slice(0, -1));

  return (
    <>
      <CyberBackground />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className={`glass rounded-3xl p-8 md:p-10 w-full max-w-sm text-center ${shake ? "animate-glitch" : "animate-fade-in-up"}`}>
          <div className="inline-flex p-4 rounded-2xl bg-neon-pink/10 border border-neon-pink/40 mb-5">
            <Lock className="w-7 h-7 text-neon-pink" />
          </div>
          <h1 className="font-display text-2xl font-black neon-gradient-text mb-1">ADMIN ACCESS</h1>
          <p className="text-xs text-muted-foreground font-mono mb-7">// ENTER 4-DIGIT PIN //</p>

          <div className="flex justify-center gap-3 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  i < pin.length
                    ? "bg-neon-cyan border-neon-cyan shadow-[0_0_15px_hsl(var(--neon-cyan))]"
                    : "border-neon-purple/50"
                }`} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button key={n} onClick={() => press(String(n))}
                className="link-btn rounded-xl py-4 font-display text-xl font-bold">{n}</button>
            ))}
            <button onClick={() => navigate("/")}
              className="rounded-xl py-4 font-mono text-xs text-muted-foreground hover:text-neon-cyan transition-colors">ESC</button>
            <button onClick={() => press("0")}
              className="link-btn rounded-xl py-4 font-display text-xl font-bold">0</button>
            <button onClick={back}
              className="rounded-xl py-4 flex items-center justify-center text-neon-pink hover:bg-neon-pink/10 transition-colors"
              aria-label="Backspace">
              <Delete className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-6 text-[10px] font-mono text-muted-foreground/60">DEFAULT PIN: 1234</p>
        </div>
      </main>
    </>
  );
};

export default PinLogin;
