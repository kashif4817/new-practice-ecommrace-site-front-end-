import { useState } from "react";
import {
  Crown,
  ArrowLeft,
  Sparkles,
  Eye,
  EyeOff,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const rules = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One number", test: (p) => /\d/.test(p) },
  { label: "One special character", test: (p) => /[^a-zA-Z0-9]/.test(p) },
];

function getStrength(password) {
  const passed = rules.filter((r) => r.test(password)).length;
  if (passed === 0) return { score: 0, label: "", color: "" };
  if (passed === 1) return { score: 1, label: "Weak", color: "bg-red-400" };
  if (passed === 2) return { score: 2, label: "Fair", color: "bg-amber-400" };
  if (passed === 3) return { score: 3, label: "Good", color: "bg-blue-400" };
  return { score: 4, label: "Strong", color: "bg-emerald-500" };
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [error, setError] = useState("");

  const strength = getStrength(password);
  const allRulesPassed = rules.every((r) => r.test(password));
  const passwordsMatch = password === confirm && confirm.length > 0;
  const canSubmit = passwordsMatch;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const email = sessionStorage.getItem("resetEmail");
    console.log("email from reset password", email);

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/update-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const result = await res.json();
      if (res.ok) {
        setSubmitted(true);
        toast.success("Password updated successfully");
        return;
      }
      setError(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-stone-50 px-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-3">
            Password Reset!
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-8">
            Your password has been successfully updated. You can now sign in
            with your new credentials.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-stone-800 to-stone-900 text-white text-sm font-semibold hover:from-stone-900 hover:to-stone-950 transition-all shadow-md shadow-stone-300 cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-stone-50">
      {/* Left Panel */}
      <div className="hidden lg:flex w-[420px] shrink-0 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 flex-col relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 px-10 pt-10">
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

        <div className="relative z-10 flex-1 flex flex-col justify-center px-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-500/20 flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            New
            <br />
            Password
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed">
            Create a strong, unique password to keep your LUXE admin account
            secure.
          </p>

          {/* Password tips */}
          <div className="mt-10 bg-white/5 border border-white/8 rounded-2xl p-5 space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-4">
              Password Tips
            </p>
            {rules.map((rule) => (
              <div key={rule.label} className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                    rule.test(password)
                      ? "bg-emerald-500/20 border border-emerald-500/40"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  {rule.test(password) && (
                    <span className="text-emerald-400 text-[8px]">✓</span>
                  )}
                </div>
                <span
                  className={`text-xs transition-colors ${rule.test(password) ? "text-emerald-400" : "text-stone-600"}`}
                >
                  {rule.label}
                </span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="mt-8 space-y-4">
            {[
              { step: "01", label: "Enter Email", done: true },
              { step: "02", label: "Verify OTP", done: true },
              { step: "03", label: "Reset Password", active: true },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
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

        <div className="relative z-10 px-10 pb-10">
          <p className="text-[10px] text-stone-600 tracking-widest uppercase">
            © 2024 LUXE Premium Store
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-12">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
            <Crown className="w-5 h-5 text-stone-900" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold text-stone-800 tracking-widest">
            LUXE
          </span>
        </div>

        <div className="w-full max-w-md">
          <button
            onClick={() => navigate("-1")}
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors mb-8 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs tracking-wider uppercase text-amber-600 font-medium">
                Final Step
              </span>
            </div>
            <h2 className="text-3xl font-bold text-stone-800 tracking-tight">
              Reset password
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              Create a new secure password for your account.
            </p>
          </div>

          <div className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
                New Password
              </label>
              <div
                className={`relative flex items-center rounded-xl border-2 transition-all duration-200 bg-white ${
                  focusedField === "password"
                    ? "border-amber-400 ring-2 ring-amber-100"
                    : allRulesPassed
                      ? "border-emerald-300"
                      : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <Lock
                  className={`absolute left-4 w-4 h-4 transition-colors ${focusedField === "password" ? "text-amber-500" : "text-stone-400"}`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter new password"
                  className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-stone-700 placeholder-stone-400 focus:outline-none"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              {/* Strength bar */}
              {password.length > 0 && (
                <div className="mt-3">
                  <div className="flex gap-1 mb-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                          i <= strength.score ? strength.color : "bg-stone-100"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs font-medium ${
                      strength.score === 4
                        ? "text-emerald-600"
                        : strength.score === 3
                          ? "text-blue-600"
                          : strength.score === 2
                            ? "text-amber-600"
                            : "text-red-500"
                    }`}
                  >
                    {strength.label} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <div
                className={`relative flex items-center rounded-xl border-2 transition-all duration-200 bg-white ${
                  focusedField === "confirm"
                    ? "border-amber-400 ring-2 ring-amber-100"
                    : passwordsMatch
                      ? "border-emerald-300"
                      : confirm.length > 0
                        ? "border-red-300"
                        : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <Lock
                  className={`absolute left-4 w-4 h-4 transition-colors ${focusedField === "confirm" ? "text-amber-500" : "text-stone-400"}`}
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Confirm new password"
                  className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-stone-700 placeholder-stone-400 focus:outline-none"
                />
                <button
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {confirm.length > 0 && (
                <p
                  className={`text-xs mt-2 ${passwordsMatch ? "text-emerald-600" : "text-red-500"}`}
                >
                  {passwordsMatch
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md cursor-pointer mt-2 ${
                canSubmit
                  ? "bg-gradient-to-r from-stone-800 to-stone-900 text-white hover:from-stone-900 hover:to-stone-950 shadow-stone-300 hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-stone-100 text-stone-400 cursor-not-allowed shadow-none"
              }`}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
