import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Star,
  Shield,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Field message component
function FieldMessage({ type, message }) {
  if (!message) return null;
  const styles = {
    error: "text-red-500",
    success: "text-emerald-500",
    info: "text-amber-500",
  };
  const icons = {
    error: (
      <svg
        className="w-3 h-3 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    success: (
      <svg
        className="w-3 h-3 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    info: (
      <svg
        className="w-3 h-3 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };
  return (
    <p className={`text-xs flex items-center gap-1 mt-1.5 ${styles[type]}`}>
      {icons[type]}
      {message}
    </p>
  );
}

const testimonials = [
  {
    name: "Sarah M.",
    role: "Premium Member",
    text: "LUXE has completely transformed how I shop. The curation is impeccable.",
    rating: 5,
  },
  {
    name: "James K.",
    role: "VIP Client",
    text: "Unparalleled quality and service. Worth every penny.",
    rating: 5,
  },
  {
    name: "Priya D.",
    role: "Elite Member",
    text: "The exclusive collections are breathtaking. Truly a luxury experience.",
    rating: 5,
  },
];

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const [fieldMessages, setFieldMessages] = useState({
    email: null,
    password: null,
  });
  const setFieldMsg = (field, type, message) =>
    setFieldMessages((prev) => ({ ...prev, [field]: { type, message } }));
  const clearFieldMsg = (field) =>
    setFieldMessages((prev) => ({ ...prev, [field]: null }));

  const navigate = useNavigate();

  const validateEmail = () => {
    if (!email) {
      setFieldMsg("email", "error", "Email address is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldMsg("email", "error", "Enter a valid email address.");
    } else {
      clearFieldMsg("email");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setFieldMsg("password", "error", "Password is required.");
    } else {
      clearFieldMsg("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    if (!email || !password || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return;

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Welcome back! 👋");
        // onLoginSuccess?.();
        navigate("/dashboard");
      } else if (res.status === 500 || res.status === 401) {
        setFieldMsg("email", "error", " ");
        setFieldMsg("password", "error", "Invalid email or password.");
        toast.error(result.message || "Invalid credentials.");
      } else {
        toast.error(
          result.message || "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* ── LEFT panel — decorative (lg+ only) ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex-shrink-0">
        {/* Ambient blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full h-full p-14">
          {/* Top: logo + tagline */}
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                <ShoppingBag
                  className="w-5 h-5 text-stone-900"
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-widest">
                  LUXE
                </h1>
                <p className="text-amber-400/50 text-[8px] tracking-[0.3em] uppercase font-medium">
                  Premium Store
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-8 bg-amber-400/60" />
              <span className="text-amber-400/80 text-xs tracking-[0.25em] uppercase font-medium">
                Est. 2019
              </span>
            </div>
            <h3 className="text-4xl xl:text-5xl font-bold text-white leading-tight tracking-tight">
              Curated luxury,
              <br />
              <span className="text-amber-400">delivered</span> to
              <br />
              your door.
            </h3>
            <p className="mt-5 text-stone-400 text-base leading-relaxed max-w-sm">
              Access thousands of exclusive products handpicked by our team of
              style experts.
            </p>
          </div>

          {/* Middle: stat cards */}
          {/* <div className="flex gap-4">
            {[
              { icon: <Sparkles className="w-4 h-4 text-amber-400" />, value: "12K+", label: "Premium Products" },
              { icon: <Shield className="w-4 h-4 text-amber-400" />, value: "99.8%", label: "Satisfaction Rate" },
              { icon: <Zap className="w-4 h-4 text-amber-400" />, value: "24h", label: "Express Delivery" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/[0.08] transition-colors duration-300"
              >
                <div className="mb-2">{stat.icon}</div>
                <p className="text-white font-bold text-xl">{stat.value}</p>
                <p className="text-stone-400 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div> */}

          {/* Bottom: testimonial */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex gap-0.5 mb-3">
              {Array.from({
                length: testimonials[activeTestimonial].rating,
              }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-stone-300 text-sm leading-relaxed italic">
              "{testimonials[activeTestimonial].text}"
            </p>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-white text-sm font-semibold">
                  {testimonials[activeTestimonial].name}
                </p>
                <p className="text-amber-400/70 text-xs">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeTestimonial
                        ? "w-5 h-2 bg-amber-400"
                        : "w-2 h-2 bg-stone-600 hover:bg-stone-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT panel — form ── */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-16 bg-stone-50 overflow-y-auto">
        <div className="w-full max-w-md py-12">
          {/* Logo — mobile only (lg panel has its own) */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
              <ShoppingBag
                className="w-6 h-6 text-stone-900"
                strokeWidth={2.5}
              />
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
              Welcome back
            </h2>
            <p className="text-stone-500 mt-2 text-sm sm:text-base">
              Sign in to access your exclusive LUXE account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="text-sm font-medium text-stone-700 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                Email Address
              </label>
              <div
                className={`relative rounded-xl border-2 transition-all duration-300 bg-white ${
                  fieldMessages.email?.type === "error"
                    ? "border-red-400 shadow-lg shadow-red-50"
                    : focusedField === "email"
                      ? "border-amber-400 shadow-lg shadow-amber-100"
                      : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldMsg("email");
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => {
                    setFocusedField(null);
                    validateEmail();
                  }}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 bg-transparent text-stone-800 placeholder-stone-300 text-sm outline-none rounded-xl"
                  required
                />
              </div>
              <FieldMessage {...(fieldMessages.email || {})} />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium text-stone-700 flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors hover:underline underline-offset-2"
                >
                  Forgot password?
                </a>
              </div>
              <div
                className={`relative rounded-xl border-2 transition-all duration-300 bg-white ${
                  fieldMessages.password?.type === "error"
                    ? "border-red-400 shadow-lg shadow-red-50"
                    : focusedField === "password"
                      ? "border-amber-400 shadow-lg shadow-amber-100"
                      : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldMsg("password");
                  }}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => {
                    setFocusedField(null);
                    validatePassword();
                  }}
                  placeholder="••••••••••"
                  className="w-full px-4 py-3.5 bg-transparent text-stone-800 placeholder-stone-300 text-sm outline-none rounded-xl pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <FieldMessage {...(fieldMessages.password || {})} />
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 rounded-md border-2 border-stone-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 transition-all duration-200 flex items-center justify-center group-hover:border-amber-400">
                  {rememberMe && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-stone-600">Remember me</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800 text-white rounded-xl font-semibold text-sm tracking-wide hover:from-stone-900 hover:via-stone-950 hover:to-stone-900 transition-all duration-300 shadow-lg shadow-stone-300 hover:shadow-xl hover:shadow-stone-400/50 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer relative overflow-hidden mt-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
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

          {/* Sign up link */}
          <p className="text-center mt-8 text-sm text-stone-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-amber-600 hover:text-amber-700 font-semibold transition-colors hover:underline underline-offset-2 cursor-pointer"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
