import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

export default function LoginPage({ onSwitchToSignUp, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess?.();
    }, 1500);
  };

  return (

    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-stone-50">
      <div className="w-full max-w-md relative z-10">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
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
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
            Sign In
          </h2>
          <p className="text-stone-500 mt-2 text-sm sm:text-base">
            Welcome back! Please enter your credentials.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              Email Address
            </label>
            <div className={`relative rounded-xl border-2 transition-all duration-300 ${focusedField === "email" ? "border-amber-400 shadow-lg shadow-amber-100" : "border-stone-200 hover:border-stone-300"} bg-white`}>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 bg-transparent text-stone-800 placeholder-stone-300 text-sm outline-none rounded-xl"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="login-password" className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              Password
            </label>
            <div className={`relative rounded-xl border-2 transition-all duration-300 ${focusedField === "password" ? "border-amber-400 shadow-lg shadow-amber-100" : "border-stone-200 hover:border-stone-300"} bg-white`}>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="••••••••••"
                className="w-full px-4 py-3.5 bg-transparent text-stone-800 placeholder-stone-300 text-sm outline-none rounded-xl pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 rounded-md border-2 border-stone-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 transition-all duration-200 flex items-center justify-center group-hover:border-amber-400">
                  {rememberMe && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-stone-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors hover:underline underline-offset-2">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800 text-white rounded-xl font-semibold text-sm tracking-wide hover:from-stone-900 hover:via-stone-950 hover:to-stone-900 transition-all duration-300 shadow-lg shadow-stone-300 hover:shadow-xl hover:shadow-stone-400/50 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing In...
              </div>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Sign In to Your Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Sign Up */}
        <p className="text-center mt-8 text-sm text-stone-500">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignUp}
            className="text-amber-600 hover:text-amber-700 font-semibold transition-colors hover:underline underline-offset-2 cursor-pointer"
          >
            Create Account
          </button>
        </p>

        {/* Trust badges */}
        <div className="mt-10 pt-8 border-t border-stone-100">
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