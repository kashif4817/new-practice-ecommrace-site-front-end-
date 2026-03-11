import { useState, useEffect } from "react";
import { Crown, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const floatingItems = [
  { icon: "⌚", label: "Watches", delay: "0s",   x: "10%", y: "20%" },
  { icon: "👜", label: "Bags",    delay: "0.5s", x: "80%", y: "15%" },
  { icon: "💎", label: "Jewelry", delay: "1s",   x: "75%", y: "70%" },
  { icon: "🕶️", label: "Eyewear", delay: "1.5s", x: "15%", y: "72%" },
  { icon: "🧣", label: "Apparel", delay: "0.8s", x: "88%", y: "42%" },
  { icon: "🎁", label: "Gifts",   delay: "0.3s", x: "5%",  y: "45%" },
];

export default function NotFoundPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const digitStyle = {
    WebkitTextStroke: "2px #e7e5e4",
    textShadow: "0 8px 32px rgba(0,0,0,0.06)",
  };

  return (
    <div className="bg-stone-50 flex flex-col overflow-hidden relative" style={{ width: "100vw", height: "100vh" }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-12px) rotate(3deg); }
          66%       { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%,100% { transform: scale(1);    opacity: 0.4;  }
          50%     { transform: scale(1.08); opacity: 0.15; }
        }
        .float-item    { animation: float       4s ease-in-out infinite; }
        .fade-slide-up { animation: fadeSlideUp 0.7s ease forwards; }
        .scale-in      { animation: scaleIn     0.5s ease forwards; }
        .shimmer-text  {
          background: linear-gradient(90deg, #78716c 0%, #d97706 30%, #f59e0b 50%, #d97706 70%, #78716c 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .spin-slow  { animation: spin-slow  20s linear     infinite; }
        .pulse-ring { animation: pulse-ring  3s ease-in-out infinite; }
      `}</style>

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2378716c' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0zm40 0h-1v40h1zM0 0v1h40V0zm0 40v-1h40v1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      />

      {/* Ambient blobs */}
      <div
        className="absolute top-0 left-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #f59e0b 0%, transparent 70%)",
          transform: `translate(calc(-50% + ${mousePos.x * 0.5}px), calc(0px + ${mousePos.y * 0.3}px))`,
          transition: "transform 0.3s ease",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #d97706 0%, transparent 70%)" }}
      />

      {/* Floating product icons */}
      {floatingItems.map((item, i) => (
        <div
          key={i}
          className="absolute hidden lg:flex flex-col items-center gap-1 pointer-events-none select-none"
          style={{ left: item.x, top: item.y }}
        >
          <div className="float-item w-14 h-14 bg-white rounded-2xl border border-stone-200/80 shadow-md flex items-center justify-center text-2xl" style={{ animationDelay: item.delay }}>
            {item.icon}
          </div>
          <span className="text-[10px] text-stone-400 font-medium tracking-wider uppercase">{item.label}</span>
        </div>
      ))}

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 border-b border-stone-200/60 bg-white/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Crown className="w-6 h-6 text-stone-900" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-stone-800 tracking-widest">LUXE</h1>
            <p className="text-amber-600/60 text-[8px] tracking-[0.3em] uppercase font-medium">Admin Panel</p>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 bg-white text-stone-600 text-sm font-medium hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Go Back</span>
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">

        {/* 404 visual */}
        <div className="relative mb-10 scale-in" style={{ opacity: mounted ? 1 : 0 }}>
          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pulse-ring w-80 h-80 rounded-full border border-amber-400/30" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pulse-ring w-96 h-96 rounded-full border border-amber-400/15" style={{ animationDelay: "1s" }} />
          </div>

          {/* Spinning dashed ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="spin-slow w-64 h-64 rounded-full" style={{ border: "1px dashed rgba(217,119,6,0.2)" }} />
          </div>

          {/* 4  0  4 */}
          <div className="relative flex items-center justify-center gap-0 sm:gap-2">

            {/* 4 */}
            <span
              className="text-[120px] sm:text-[160px] lg:text-[200px] font-black leading-none text-stone-100 select-none"
              style={digitStyle}
            >
              4
            </span>

            {/* 0 — same size/style as the 4s */}
            <span
              className="text-[120px] sm:text-[160px] lg:text-[200px] font-black leading-none select-none"
              style={{
                ...digitStyle,
                // give the 0 a subtle amber tint so it feels intentional, not identical-flat
                WebkitTextStroke: "2px #d97706",
                color: "transparent",
              }}
            >
              0
            </span>

            {/* 4 */}
            <span
              className="text-[120px] sm:text-[160px] lg:text-[200px] font-black leading-none text-stone-100 select-none"
              style={digitStyle}
            >
              4
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center max-w-lg mb-12 fade-slide-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-amber-400/50" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-semibold">Page not found</span>
            <div className="h-px w-8 bg-amber-400/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-3">
            Lost in the <span className="shimmer-text">Luxury</span>
          </h2>
          <p className="text-stone-500 text-base leading-relaxed">
            The page you're looking for has been moved, deleted, or never existed.
            Let us guide you back to something exceptional.
          </p>
        </div>

      </main>

      {/* Footer — Links use React Router */}
      <footer className="relative z-10 border-t border-stone-200/60 bg-white/50 px-6 sm:px-10 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
          <p>&copy; 2024 LUXE Premium Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-stone-600 transition-colors">Privacy</Link>
            <Link to="/terms"   className="hover:text-stone-600 transition-colors">Terms</Link>
            <Link to="/support" className="hover:text-stone-600 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}