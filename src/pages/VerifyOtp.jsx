import { useState, useRef, useEffect } from "react";
import { Crown, ArrowLeft, Sparkles, RefreshCw, ShieldCheck } from "lucide-react";

export default function VerifyOtpPage({ email = "admin@luxe.com", onNext, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(120);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const updated = [...otp];
    updated[idx] = val;
    setOtp(updated);
    setError(false);
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
    if (updated.every((d) => d !== "") && val) {
      setTimeout(() => handleVerify(updated), 100);
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(""));
      inputRefs.current[5]?.focus();
      setTimeout(() => handleVerify(paste.split("")), 100);
    }
  };

  const handleVerify = (digits = otp) => {
    if (digits.join("") === "123456" || digits.every((d) => d !== "")) {
      setVerified(true);
      setTimeout(() => onNext?.(), 900);
    } else {
      setError(true);
    }
  };

  const handleResend = () => {
    setResending(true);
    setOtp(["", "", "", "", "", ""]);
    setError(false);
    setTimeout(() => {
      setResending(false);
      setResendTimer(120);
      inputRefs.current[0]?.focus();
    }, 1000);
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1***$3");
  const formatTimer = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

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
              <h1 className="text-lg font-bold text-white tracking-widest">LUXE</h1>
              <p className="text-amber-400/60 text-[8px] tracking-[0.3em] uppercase font-medium">Admin Panel</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 py-8 overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-500/20 flex items-center justify-center mb-6 shrink-0">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-4 shrink-0">
            Secure<br />Verification
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed shrink-0">
            A 6-digit code has been dispatched to your inbox. This code expires in 10 minutes.
          </p>

          <div className="mt-10 space-y-4 shrink-0">
            {[
              { step: "01", label: "Enter Email", done: true },
              { step: "02", label: "Verify OTP", active: true },
              { step: "03", label: "Reset Password", active: false },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                  s.done
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : s.active
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-stone-900"
                    : "bg-white/5 text-stone-600"
                }`}>
                  {s.done ? "✓" : s.step}
                </div>
                <span className={`text-sm font-medium ${
                  s.done ? "text-emerald-400" : s.active ? "text-amber-400" : "text-stone-600"
                }`}>
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
          <p className="text-[10px] text-stone-600 tracking-widest uppercase">© 2024 LUXE Premium Store</p>
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-14 py-8 overflow-y-auto">
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
            <Crown className="w-5 h-5 text-stone-900" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold text-stone-800 tracking-widest">LUXE</span>
        </div>

        <div className="w-full max-w-[420px]">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors mb-8 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          <div className="mb-7">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs tracking-wider uppercase text-amber-600 font-medium">Step 2 of 3</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 tracking-tight">Check your email</h2>
            <p className="text-stone-500 text-sm mt-2">
              We sent a 6-digit code to{" "}
              <span className="text-stone-700 font-semibold">{maskedEmail}</span>
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-3">
              Verification Code
            </label>
            <div className="flex gap-2 sm:gap-3" onPaste={handlePaste}>
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
                  className={`flex-1 min-w-0 aspect-square text-center text-lg sm:text-xl font-bold rounded-xl border-2 transition-all duration-200 focus:outline-none bg-white ${
                    verified
                      ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                      : error
                      ? "border-red-300 bg-red-50 text-red-600"
                      : digit
                      ? "border-amber-400 bg-amber-50/50 text-stone-800"
                      : "border-stone-200 text-stone-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  } ${error ? "shake" : ""}`}
                />
              ))}
            </div>

            {error && (
              <p className="text-xs text-red-500 mt-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                Invalid code. Please try again or request a new one.
              </p>
            )}
            {verified && (
              <p className="text-xs text-emerald-600 mt-3 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                Verified! Redirecting...
              </p>
            )}
          </div>

          <button
            onClick={() => handleVerify()}
            disabled={otp.some((d) => !d) || verified}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md cursor-pointer ${
              verified
                ? "bg-emerald-500 text-white shadow-emerald-200"
                : otp.every((d) => d)
                ? "bg-gradient-to-r from-stone-800 to-stone-900 text-white hover:from-stone-900 hover:to-stone-950 shadow-stone-300 hover:shadow-lg hover:-translate-y-0.5"
                : "bg-stone-100 text-stone-400 cursor-not-allowed shadow-none"
            }`}
          >
            {verified ? "Verified ✓" : "Verify Code"}
          </button>

          <div className="mt-5 text-center">
            {resendTimer > 0 ? (
              <p className="text-sm text-stone-400">
                Resend code in{" "}
                <span className="text-amber-600 font-semibold tabular-nums">{formatTimer(resendTimer)}</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                className="flex items-center gap-2 mx-auto text-sm text-amber-600 hover:text-amber-700 font-medium cursor-pointer disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
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