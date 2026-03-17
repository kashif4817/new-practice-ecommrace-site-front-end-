import { useState, useRef, useEffect, useContext } from "react";
import {
  Crown,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [resendTimer, setResendTimer] = useState(10);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  console.log("hello");
  const navigate = useNavigate();

  // ── Resend countdown ──────────────────────────────m────────────────
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const maskEmail = (email) => {
    if (!email) return "";
    const [local, domain] = email.split("@");
    const visible = local.slice(0, 3); // first 3 chars
    const masked = visible + "*".repeat(local.length - 3); // rest → stars
    return `${masked}@${domain}`;
  };

  const handleResend = async () => {
    setResending(true);
    setOtp(["", "", "", "", "", ""]);
    setError(false);
    setTimeout(() => {
      setResending(false);
      setResendTimer(10);
      inputRefs.current[0]?.focus();
    }, 1000);

    const email = sessionStorage.getItem("resetEmail");
    console.log(email);
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/forget-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const result = await res.json();
      console.log(result.data.email);
      if (res.ok) {
        sessionStorage.setItem("resetEmail", result.data.email);
        toast.success("An email has been send");
        return;
      }
      setError(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value, idx) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[idx] = value;

    setOtp(newOtp);

    if (value && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pasted)) return;

    const newOtp = pasted.split("");
    const filled = [...otp];

    for (let i = 0; i < newOtp.length; i++) {
      filled[i] = newOtp[i];
    }

    setOtp(filled);

    const nextIndex = Math.min(newOtp.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const collect = otp.join("");
    try {
      const res = await fetch("http://localhost:3000/api/auth/verify-otp-forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // credentials: "include",
        body: JSON.stringify({ otp: collect }),
      });

      const result = await res.json();
      if (res.ok) {
        navigate("/reset-password");
        toast.success("OTP verified");
        return;
      }
      setError(result.message);
      // setemailError(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  const formatTimer = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen w-full flex bg-stone-50 overflow-hidden">
      {/* ===== LEFT PANEL ===== */}
      <div className="hidden lg:flex w-[400px] shrink-0 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 flex-col relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 px-10 pt-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Crown className="w-6 h-6 text-stone-900" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-widest">
                LUXE
              </h1>
              <p className="text-amber-400/60 text-[8px] tracking-[0.3em] uppercase font-medium">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 py-8 overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-500/20 flex items-center justify-center mb-6 shrink-0">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-4 shrink-0">
            Secure
            <br />
            Verification
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed shrink-0">
            A 6-digit code has been dispatched to your inbox. This code expires
            in 2 minutes.
          </p>

          <div className="mt-10 space-y-4 shrink-0">
            {[
              { step: "01", label: "Enter Email", done: true },
              { step: "02", label: "Verify OTP", active: true },
              { step: "03", label: "Reset Password", active: false },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                    s.done
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : s.active
                        ? "bg-gradient-to-br from-amber-400 to-amber-600 text-stone-900"
                        : "bg-white/5 text-stone-600"
                  }`}
                >
                  {s.done ? "✓" : s.step}
                </div>
                <span
                  className={`text-sm font-medium ${
                    s.done
                      ? "text-emerald-400"
                      : s.active
                        ? "text-amber-400"
                        : "text-stone-600"
                  }`}
                >
                  {s.label}
                </span>
                {s.active && (
                  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 px-10 pb-8 shrink-0">
          <p className="text-[10px] text-stone-600 tracking-widest uppercase">
            © 2024 LUXE Premium Store
          </p>
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-14 py-8 overflow-y-auto">
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
            <Crown className="w-5 h-5 text-stone-900" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold text-stone-800 tracking-widest">
            LUXE
          </span>
        </div>

        <div className="w-full max-w-[420px]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors mb-8 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          <div className="mb-7">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs tracking-wider uppercase text-amber-600 font-medium">
                Step 2 of 3
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 tracking-tight">
              Check your email
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-amber-600 tracking-wide">
                {maskEmail(sessionStorage.getItem("resetEmail"))}
              </span>
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-3">
              Verification Code
            </label>

            {/* ── 6 OTP boxes ── */}
            <div className="flex gap-2 sm:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  className={`flex-1 min-w-0 aspect-square text-center text-lg sm:text-xl font-bold rounded-xl border-2 transition-all duration-200 focus:outline-none bg-white
                    ${
                      error
                        ? "border-red-400 bg-red-50 text-red-600"
                        : digit
                          ? "border-amber-400 text-stone-800"
                          : "border-stone-200 text-stone-800 focus:border-amber-400"
                    }`}
                />
              ))}
            </div>

            {error && (
              <p className="text-xs text-red-500 mt-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                Invalid code. Please try again or request a new one.
                <span>{error}</span>
              </p>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={otp.some((d) => !d)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md cursor-pointer
              bg-gradient-to-r from-amber-400 to-amber-600 text-stone-900
              hover:shadow-amber-200 hover:shadow-lg
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Verify Code
          </button>

          {/* ── Resend timer (only logic kept) ── */}
          <div className="mt-5 text-center">
            {resendTimer > 0 ? (
              <p className="text-sm text-stone-400">
                Resend code in{" "}
                <span className="text-amber-600 font-semibold tabular-nums">
                  {formatTimer(resendTimer)}
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                className="flex items-center gap-2 mx-auto text-sm text-amber-600 hover:text-amber-700 font-medium cursor-pointer disabled:opacity-50 transition-colors"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`}
                />
                {resending ? "Sending..." : "Resend code"}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .shake { animation: shake 0.4s ease; }
      `}</style>
    </div>
  );
}
