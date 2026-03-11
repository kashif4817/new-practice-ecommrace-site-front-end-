import { useState } from "react";
import { Crown, Mail, ArrowRight, ArrowLeft, Sparkles, Shield } from "lucide-react";

export default function ForgotPasswordPage({ onNext, onBack }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => onNext?.(email), 800);
  };

  return (
    <div className="min-h-screen w-full flex bg-stone-50">
      {/* Left Panel */}
      <div className="hidden lg:flex w-[420px] shrink-0 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 flex-col relative overflow-hidden">
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        {/* Amber glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 px-10 pt-10">
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

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-500/20 flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Account<br />Recovery
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed">
            We'll send a secure verification code to your registered email address to help you regain access.
          </p>

          {/* Steps */}
          <div className="mt-10 space-y-4">
            {[
              { step: "01", label: "Enter Email", active: true },
              { step: "02", label: "Verify OTP", active: false },
              { step: "03", label: "Reset Password", active: false },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                  s.active
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-stone-900"
                    : "bg-white/5 text-stone-600"
                }`}>
                  {s.step}
                </div>
                <span className={`text-sm font-medium ${s.active ? "text-amber-400" : "text-stone-600"}`}>
                  {s.label}
                </span>
                {s.active && (
                  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 px-10 pb-10">
          <p className="text-[10px] text-stone-600 tracking-widest uppercase">© 2024 LUXE Premium Store</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-12">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Crown className="w-5 h-5 text-stone-900" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold text-stone-800 tracking-widest">LUXE</span>
        </div>

        <div className="w-full max-w-md">
          {/* Back */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors mb-8 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to login
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs tracking-wider uppercase text-amber-600 font-medium">Password Recovery</span>
            </div>
            <h2 className="text-3xl font-bold text-stone-800 tracking-tight">Forgot password?</h2>
            <p className="text-stone-500 text-sm mt-2">
              No worries. Enter your email and we'll send you a reset code.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className={`relative flex items-center rounded-xl border transition-all duration-200 bg-white ${
                focused
                  ? "border-amber-400 ring-2 ring-amber-100 shadow-sm"
                  : "border-stone-200 hover:border-stone-300"
              }`}>
                <Mail className={`absolute left-4 w-4 h-4 transition-colors ${focused ? "text-amber-500" : "text-stone-400"}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="admin@luxe.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm text-stone-700 placeholder-stone-400 focus:outline-none rounded-xl"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!email || submitted}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md cursor-pointer ${
                submitted
                  ? "bg-emerald-500 text-white shadow-emerald-200"
                  : email
                  ? "bg-gradient-to-r from-stone-800 to-stone-900 text-white hover:from-stone-900 hover:to-stone-950 shadow-stone-300 hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-stone-100 text-stone-400 cursor-not-allowed shadow-none"
              }`}
            >
              {submitted ? (
                <>
                  <span>Code Sent!</span>
                  <div className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                </>
              ) : (
                <>
                  <span>Send Reset Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Info note */}
          <p className="text-xs text-stone-400 text-center mt-6 leading-relaxed">
            Didn't receive the email? Check your spam folder or{" "}
            <button className="text-amber-600 hover:text-amber-700 font-medium cursor-pointer">try again</button>.
          </p>
        </div>
      </div>
    </div>
  );
}