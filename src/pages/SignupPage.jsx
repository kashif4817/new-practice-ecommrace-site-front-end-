import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function SignUpPage({ onSwitchToLogin, onSignUpSuccess }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  // Password strength
  const getPasswordStrength = () => {
    if (password.length === 0) return { level: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-400" };
    if (score === 2) return { level: 2, label: "Fair", color: "bg-amber-400" };
    if (score === 3) return { level: 3, label: "Good", color: "bg-emerald-400" };
    return { level: 4, label: "Strong", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignUpSuccess?.();
    }, 1500);
  };

  return (
   <div className="min-h-screen w-full flex items-center justify-center px-4 bg-stone-50">
      <div className="w-full max-w-md relative z-10">
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center gap-3 mb-8">
        <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
          <ShoppingBag className="w-6 h-6 text-stone-900" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-stone-800 tracking-widest">
            LUXE
          </h1>
          <p className="text-amber-600/60 text-[9px] tracking-[0.3em] uppercase font-medium">
            Premium Store
          </p>
        </div>
      </div>

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
          Create Account
        </h2>
        <p className="text-stone-500 mt-2 text-sm sm:text-base">
          Join LUXE today and unlock exclusive benefits.
        </p>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm font-medium hover:bg-stone-50 hover:border-stone-300 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm font-medium hover:bg-stone-50 hover:border-stone-300 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
        <span className="text-stone-400 text-xs tracking-wider uppercase font-medium">
          or register with email
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-stone-400" />
            Full Name
          </label>
          <div className={`relative rounded-xl border-2 transition-all duration-300 ${focusedField === "fullName" ? "border-amber-400 shadow-lg shadow-amber-100" : "border-stone-200 hover:border-stone-300"} bg-white`}>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onFocus={() => setFocusedField("fullName")}
              onBlur={() => setFocusedField(null)}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-transparent text-stone-800 placeholder-stone-300 text-sm outline-none rounded-xl"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-stone-400" />
            Phone Number
          </label>
          <div className={`relative rounded-xl border-2 transition-all duration-300 ${focusedField === "phone" ? "border-amber-400 shadow-lg shadow-amber-100" : "border-stone-200 hover:border-stone-300"} bg-white`}>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 bg-transparent text-stone-800 placeholder-stone-300 text-sm outline-none rounded-xl"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="signup-email" className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-stone-400" />
            Email Address
          </label>
          <div className={`relative rounded-xl border-2 transition-all duration-300 ${focusedField === "email" ? "border-amber-400 shadow-lg shadow-amber-100" : "border-stone-200 hover:border-stone-300"} bg-white`}>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-transparent text-stone-800 placeholder-stone-300 text-sm outline-none rounded-xl"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="signup-password" className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            Password
          </label>
          <div className={`relative rounded-xl border-2 transition-all duration-300 ${focusedField === "password" ? "border-amber-400 shadow-lg shadow-amber-100" : "border-stone-200 hover:border-stone-300"} bg-white`}>
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              placeholder="Create a strong password"
              className="w-full px-4 py-3 bg-transparent text-stone-800 placeholder-stone-300 text-sm outline-none rounded-xl pr-12"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors p-1 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Strength Meter */}
          {password.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${bar <= strength.level ? strength.color : "bg-stone-200"
                      }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-xs font-medium ${strength.level <= 1 ? "text-red-500" :
                    strength.level === 2 ? "text-amber-500" :
                      "text-emerald-500"
                  }`}>
                  {strength.label}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  <span className={`text-[10px] ${password.length >= 8 ? "text-emerald-500" : "text-stone-400"}`}>
                    8+ chars
                  </span>
                  <span className={`text-[10px] ${/[A-Z]/.test(password) ? "text-emerald-500" : "text-stone-400"}`}>
                    Uppercase
                  </span>
                  <span className={`text-[10px] ${/[0-9]/.test(password) ? "text-emerald-500" : "text-stone-400"}`}>
                    Number
                  </span>
                  <span className={`text-[10px] ${/[^A-Za-z0-9]/.test(password) ? "text-emerald-500" : "text-stone-400"}`}>
                    Symbol
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            Confirm Password
          </label>
          <div className={`relative rounded-xl border-2 transition-all duration-300 ${passwordsMismatch
              ? "border-red-400 shadow-lg shadow-red-100"
              : passwordsMatch
                ? "border-emerald-400 shadow-lg shadow-emerald-100"
                : focusedField === "confirmPassword"
                  ? "border-amber-400 shadow-lg shadow-amber-100"
                  : "border-stone-200 hover:border-stone-300"
            } bg-white`}>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField(null)}
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 bg-transparent text-stone-800 placeholder-stone-300 text-sm outline-none rounded-xl pr-20"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {passwordsMatch && (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              )}
              {passwordsMismatch && (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-stone-400 hover:text-stone-600 transition-colors p-1 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {passwordsMismatch && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              Passwords do not match
            </p>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="sr-only peer"
                required
              />
              <div className="w-5 h-5 rounded-md border-2 border-stone-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 transition-all duration-200 flex items-center justify-center group-hover:border-amber-400 shrink-0">
                {agreeTerms && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-stone-500 leading-snug">
              I agree to the{" "}
              <a href="#" className="text-amber-600 hover:text-amber-700 font-medium hover:underline underline-offset-2">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-amber-600 hover:text-amber-700 font-medium hover:underline underline-offset-2">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || passwordsMismatch || !agreeTerms}
          className="w-full py-4 bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800 text-white rounded-xl font-semibold text-sm tracking-wide hover:from-stone-900 hover:via-stone-950 hover:to-stone-900 transition-all duration-300 shadow-lg shadow-stone-300 hover:shadow-xl hover:shadow-stone-400/50 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating Account...
            </div>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              Create Your Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Sign In */}
      <p className="text-center mt-6 text-sm text-stone-500">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="text-amber-600 hover:text-amber-700 font-semibold transition-colors hover:underline underline-offset-2 cursor-pointer"
        >
          Sign In
        </button>
      </p>

      {/* Trust badges */}
      <div className="mt-8 pt-6 border-t border-stone-100">
        <div className="flex items-center justify-center gap-6 text-stone-300">
          <div className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-[10px] tracking-wider uppercase">Secure</span>
          </div>
          <div className="w-px h-8 bg-stone-200" />
          <div className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="text-[10px] tracking-wider uppercase">Encrypted</span>
          </div>
          <div className="w-px h-8 bg-stone-200" />
          <div className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <span className="text-[10px] tracking-wider uppercase">Trusted</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
