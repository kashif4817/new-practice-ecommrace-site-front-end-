import { useState } from "react";
import {
  Eye, EyeOff, Mail, Lock, User, Phone, ShoppingBag, ArrowRight,
  CheckCircle2, XCircle, AlertCircle, Sparkles, Star, Shield, Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ── Field message ────────────────────────────────────────────────────────────
function FieldMessage({ type, message }) {
  if (!message) return null;
  const styles = { error: "text-red-500", success: "text-emerald-500", info: "text-amber-500" };
  const icons = {
    error: <XCircle className="w-3 h-3 shrink-0" />,
    success: <CheckCircle2 className="w-3 h-3 shrink-0" />,
    info: <AlertCircle className="w-3 h-3 shrink-0" />,
  };
  return (
    <p className={`text-[11px] flex items-center gap-1 mt-0.5 ${styles[type]}`}>
      {icons[type]}
      {message}
    </p>
  );
}

// ── Decorative panel data ────────────────────────────────────────────────────
const perks = [
  { icon: <Sparkles className="w-4 h-4 text-amber-400" />, title: "Exclusive Access", desc: "Members-only drops and early launches" },
  { icon: <Zap className="w-4 h-4 text-amber-400" />, title: "Express Delivery", desc: "Free same-day shipping on all orders" },
  { icon: <Shield className="w-4 h-4 text-amber-400" />, title: "Buyer Protection", desc: "100% money-back guarantee" },
];

const reviews = [
  { name: "Sarah M.", role: "Premium Member", text: "LUXE has completely transformed how I shop. The curation is impeccable.", rating: 5 },
  { name: "James K.", role: "VIP Client", text: "Unparalleled quality and service. Worth every penny.", rating: 5 },
  { name: "Priya D.", role: "Elite Member", text: "The exclusive collections are breathtaking. Truly a luxury experience.", rating: 5 },
];

// ── Validators ───────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9]{10,15}$/;

function runValidator(field, value, extra = {}) {
  switch (field) {
    case "fullName": {
      const v = value.trim();
      if (!v) return { type: "error", message: "Name is required." };
      if (v.length < 3) return { type: "error", message: "Name must be at least 3 characters." };
      if (v.length > 100) return { type: "error", message: "Name cannot exceed 100 characters." };
      return { type: "success", message: "Looks good!" };
    }
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (!value.trim()) return { type: "error", message: "Phone number is required." };
      if (!PHONE_RE.test(digits)) return { type: "error", message: "Phone must be 10–15 digits." };
      return { type: "success", message: "Valid phone number." };
    }
    case "email": {
      if (!value.trim()) return { type: "error", message: "Email address is required." };
      if (!EMAIL_RE.test(value)) return { type: "error", message: "Invalid email format." };
      return null;
    }
    case "password": {
      if (!value) return { type: "error", message: "Password is required." };
      if (value.length < 6) return { type: "error", message: "Password must be at least 6 characters." };
      return { type: "success", message: "Password looks good!" };
    }
    case "confirmPassword": {
      if (!value) return { type: "error", message: "Please confirm your password." };
      if (value !== extra.password) return { type: "error", message: "Passwords do not match." };
      return { type: "success", message: "Passwords match!" };
    }
    default: return null;
  }
}

// ── Component ────────────────────────────────────────────────────────────────
export default function SignUpPage({ onSignUpSuccess }) {
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
  const [activeReview, setActiveReview] = useState(0);

  const [fieldMessages, setFieldMessages] = useState({
    fullName: null, phone: null, email: null, password: null, confirmPassword: null,
  });

  const setFieldMsg = (field, type, message) =>
    setFieldMessages((prev) => ({ ...prev, [field]: { type, message } }));
  const clearFieldMsg = (field) =>
    setFieldMessages((prev) => ({ ...prev, [field]: null }));
  const applyMsg = (field, result) => {
    if (result) setFieldMessages((prev) => ({ ...prev, [field]: result }));
  };

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (!password.length) return { level: 0, label: "", color: "" };
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

  const handleEmailBlur = async () => {
    setFocusedField(null);
    const frontendResult = runValidator("email", email);
    if (frontendResult) { applyMsg("email", frontendResult); return; }
    setFieldMsg("email", "info", "Checking availability…");
    try {
      const res = await fetch("http://localhost:3000/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      const result = await res.json();
      if (res.ok && result.available !== false) {
        setFieldMsg("email", "success", "Email is available!");
      } else {
        setFieldMsg("email", "error", result.message || "This email is already registered.");
      }
    } catch {
      setFieldMsg("email", "info", "Could not verify email. You can still continue.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = {
      fullName: runValidator("fullName", fullName),
      phone: runValidator("phone", phone),
      email: runValidator("email", email),
      password: runValidator("password", password),
      confirmPassword: runValidator("confirmPassword", confirmPassword, { password }),
    };
    setFieldMessages(results);
    if (Object.values(results).some((r) => r?.type === "error") || passwordsMismatch || !agreeTerms) return;

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, phone, email, password }),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("Account created! Welcome to LUXE 🎉");
        onSignUpSuccess?.();
        navigate("/");
      } else if (res.status === 409) {
        const msg = result.message || "Email or phone already exists.";
        msg.toLowerCase().includes("phone")
          ? setFieldMsg("phone", "error", "This phone number is already registered.")
          : setFieldMsg("email", "error", "This email is already registered.");
        toast.error(msg);
      } else if (res.status === 400 && result.errors) {
        Object.entries(result.errors).forEach(([field, msg]) => {
          setFieldMsg(field === "name" ? "fullName" : field, "error", msg);
        });
        toast.error("Please fix the errors below.");
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const borderClass = (field) => {
    if (focusedField === field) return "border-amber-400 shadow-md shadow-amber-100";
    if (fieldMessages[field]?.type === "error") return "border-red-400 shadow-md shadow-red-100";
    if (fieldMessages[field]?.type === "success") return "border-emerald-400 shadow-md shadow-emerald-100";
    return "border-stone-200 hover:border-stone-300";
  };

  // Shared input class — slimmer padding
  const inputCls = "w-full px-3 py-2 bg-transparent text-stone-800 placeholder-stone-300 text-sm outline-none rounded-xl";

  return (
    <div className="h-screen w-screen flex overflow-hidden">

      {/* ── LEFT — form ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 bg-stone-50 overflow-hidden">
        <div className="w-full max-w-md mx-auto">

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md shadow-amber-500/20">
              <ShoppingBag className="w-4.5 h-4.5 text-stone-900" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-base font-bold text-stone-800 tracking-widest leading-none">LUXE</h1>
              <p className="text-amber-600/60 text-[8px] tracking-[0.3em] uppercase font-medium">Premium Store</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-stone-800 tracking-tight">Create Account</h2>
            <p className="text-stone-500 mt-0.5 text-xs">Join LUXE today and unlock exclusive benefits.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">

            {/* Row 1: Name + Phone */}
            <div className="grid grid-cols-2 gap-3">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="text-xs font-medium text-stone-600 flex items-center gap-1 mb-1">
                  <User className="w-3 h-3 text-stone-400" /> Full Name
                </label>
                <div className={`rounded-xl border-2 transition-all duration-300 bg-white ${borderClass("fullName")}`}>
                  <input id="fullName" type="text" value={fullName}
                    onChange={(e) => { setFullName(e.target.value); clearFieldMsg("fullName"); }}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => { setFocusedField(null); applyMsg("fullName", runValidator("fullName", fullName)); }}
                    placeholder="John Doe" className={inputCls} required />
                </div>
                <FieldMessage {...(fieldMessages.fullName || {})} />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="text-xs font-medium text-stone-600 flex items-center gap-1 mb-1">
                  <Phone className="w-3 h-3 text-stone-400" /> Phone
                </label>
                <div className={`rounded-xl border-2 transition-all duration-300 bg-white ${borderClass("phone")}`}>
                  <input id="phone" type="tel" value={phone}
                    onChange={(e) => { setPhone(e.target.value); clearFieldMsg("phone"); }}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => { setFocusedField(null); applyMsg("phone", runValidator("phone", phone)); }}
                    placeholder="03001234567" className={inputCls} required />
                </div>
                <FieldMessage {...(fieldMessages.phone || {})} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="text-xs font-medium text-stone-600 flex items-center gap-1 mb-1">
                <Mail className="w-3 h-3 text-stone-400" /> Email Address
              </label>
              <div className={`rounded-xl border-2 transition-all duration-300 bg-white ${borderClass("email")}`}>
                <input id="signup-email" type="email" value={email}
                  onChange={(e) => { setEmail(e.target.value); clearFieldMsg("email"); }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={handleEmailBlur}
                  placeholder="you@example.com" className={inputCls} required />
              </div>
              <FieldMessage {...(fieldMessages.email || {})} />
            </div>

            {/* Row 2: Password + Confirm */}
            <div className="grid grid-cols-2 gap-3">
              {/* Password */}
              <div>
                <label htmlFor="signup-password" className="text-xs font-medium text-stone-600 flex items-center gap-1 mb-1">
                  <Lock className="w-3 h-3 text-stone-400" /> Password
                </label>
                <div className={`relative rounded-xl border-2 transition-all duration-300 bg-white ${borderClass("password")}`}>
                  <input id="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearFieldMsg("password"); }}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => { setFocusedField(null); applyMsg("password", runValidator("password", password)); }}
                    placeholder="Min. 6 chars" className={`${inputCls} pr-8`} required minLength={6} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Mini strength bar */}
                {password.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4].map((bar) => (
                      <div key={bar} className={`h-1 flex-1 rounded-full transition-all duration-500 ${bar <= strength.level ? strength.color : "bg-stone-200"}`} />
                    ))}
                  </div>
                )}
                <FieldMessage {...(fieldMessages.password || {})} />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="text-xs font-medium text-stone-600 flex items-center gap-1 mb-1">
                  <Lock className="w-3 h-3 text-stone-400" /> Confirm
                </label>
                <div className={`relative rounded-xl border-2 transition-all duration-300 bg-white ${
                  passwordsMismatch ? "border-red-400 shadow-md shadow-red-100"
                    : passwordsMatch ? "border-emerald-400 shadow-md shadow-emerald-100"
                    : focusedField === "confirmPassword" ? "border-amber-400 shadow-md shadow-amber-100"
                    : "border-stone-200 hover:border-stone-300"
                }`}>
                  <input id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); clearFieldMsg("confirmPassword"); }}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => { setFocusedField(null); applyMsg("confirmPassword", runValidator("confirmPassword", confirmPassword, { password })); }}
                    placeholder="Re-enter" className={`${inputCls} pr-14`} required />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                    {passwordsMatch && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    {passwordsMismatch && <XCircle className="w-3.5 h-3.5 text-red-400" />}
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-stone-400 hover:text-stone-600 cursor-pointer">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {fieldMessages.confirmPassword ? (
                  <FieldMessage {...fieldMessages.confirmPassword} />
                ) : passwordsMismatch ? (
                  <p className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                    <AlertCircle className="w-3 h-3" /> Passwords do not match
                  </p>
                ) : null}
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-center gap-2 cursor-pointer group pt-0.5">
              <div className="relative shrink-0">
                <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="sr-only peer" required />
                <div className="w-4 h-4 rounded border-2 border-stone-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 transition-all duration-200 flex items-center justify-center group-hover:border-amber-400">
                  {agreeTerms && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-stone-500">
                I agree to the{" "}
                <button type="button" onClick={() => navigate("/terms")} className="text-amber-600 hover:text-amber-700 font-medium hover:underline underline-offset-2 cursor-pointer bg-transparent border-none p-0">Terms</button>
                {" "}and{" "}
                <button type="button" onClick={() => navigate("/privacy")} className="text-amber-600 hover:text-amber-700 font-medium hover:underline underline-offset-2 cursor-pointer bg-transparent border-none p-0">Privacy Policy</button>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || passwordsMismatch || !agreeTerms}
              className="w-full py-3 bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800 text-white rounded-xl font-semibold text-sm tracking-wide hover:from-stone-900 hover:via-stone-950 hover:to-stone-900 transition-all duration-300 shadow-lg shadow-stone-300 hover:shadow-xl hover:shadow-stone-400/50 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

          <p className="text-center mt-3 text-xs text-stone-500">
            Already have an account?{" "}
            <button onClick={() => navigate("/")} className="text-amber-600 hover:text-amber-700 font-semibold transition-colors hover:underline underline-offset-2 cursor-pointer">
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* ── RIGHT — decorative (lg+ only) ───────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[48%] relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex-shrink-0">

        <div className="absolute top-[-80px] right-[-80px] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-80 h-80 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between w-full h-full p-12 xl:p-14">

          {/* Top */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-8 bg-amber-400/60" />
              <span className="text-amber-400/80 text-xs tracking-[0.25em] uppercase font-medium">Why join LUXE?</span>
            </div>
            <h3 className="text-4xl xl:text-5xl font-bold text-white leading-tight tracking-tight">
              Shop smarter,<br />
              live <span className="text-amber-400">better</span>.
            </h3>
            <p className="mt-3 text-stone-400 text-sm leading-relaxed max-w-sm">
              Become a member and get access to a world of premium products, curated just for you.
            </p>
          </div>

          {/* Perks */}
          <div className="space-y-2.5">
            {perks.map((perk) => (
              <div key={perk.title} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm hover:bg-white/[0.08] transition-colors duration-300">
                <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                  {perk.icon}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">{perk.title}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          {/* <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: reviews[activeReview].rating }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-stone-300 text-sm leading-relaxed italic">"{reviews[activeReview].text}"</p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-white text-sm font-semibold">{reviews[activeReview].name}</p>
                <p className="text-amber-400/70 text-xs">{reviews[activeReview].role}</p>
              </div>
              <div className="flex gap-1.5">
                {reviews.map((_, i) => (
                  <button key={i} onClick={() => setActiveReview(i)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${i === activeReview ? "w-5 h-2 bg-amber-400" : "w-2 h-2 bg-stone-600 hover:bg-stone-500"}`}
                  />
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}