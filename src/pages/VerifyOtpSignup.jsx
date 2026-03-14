import { useState, useRef, useEffect } from "react";
import { ShoppingBag, RefreshCw, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [resendTimer, setResendTimer] = useState(10);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const maskEmail = (email) => {
    if (!email) return "";
    const [local, domain] = email.split("@");
    const visible = local.slice(0, 3);
    const masked = visible + "*".repeat(local.length - 3);
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

    console.log("ready to call api");
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/otp-sent-signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.toLowerCase().trim() }),
        },
      );
      const result = await res.json();
      console.log(result.data.email);
      if (res.ok) {
        toast.success("An Otp has been send");
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
    if (value && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;
    const newOtp = pasted.split("");
    const filled = [...otp];
    for (let i = 0; i < newOtp.length; i++) filled[i] = newOtp[i];
    setOtp(filled);
    inputRefs.current[Math.min(newOtp.length, 5)]?.focus();
  };

  const signupData = JSON.parse(sessionStorage.getItem("signupData"));
  const email = signupData.email;

  const handleVerify = async () => {
    const collect = otp.join("");
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/verify-otp-signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: collect, email }),
        },
      );
      const result = await res.json();
      if (res.ok) {
        sessionStorage.removeItem("signupData");

        
        navigate("/");
        toast.success("OTP verified & registration complete");
        return;
      }

      setError(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  const formatTimer = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-stone-50 px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
            <ShoppingBag className="w-5 h-5 text-stone-900" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base font-bold text-stone-800 tracking-widest leading-none">
              LUXE
            </h1>
            <p className="text-amber-600/60 text-[8px] tracking-[0.3em] uppercase font-medium">
              Premium Store
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          {/* Heading */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-200">
              <ShoppingBag className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <h2 className="text-2xl font-bold text-stone-800 mb-2">
              Check Your Email
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed">
              We sent a 6-digit verification code to
            </p>
            <p className="text-amber-600 font-semibold text-sm mt-1">
              {maskEmail(email)}
            </p>
          </div>

          {/* OTP inputs */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3 text-center">
              Enter Verification Code
            </label>
            <div className="flex justify-center gap-2">
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
                  style={{ width: "44px", height: "52px" }}
                  className={`text-center text-xl font-bold rounded-xl border-2 transition-all duration-200 focus:outline-none bg-white
                    ${
                      error
                        ? "border-red-400 bg-red-50 text-red-600"
                        : digit
                          ? "border-amber-400 bg-amber-50 text-stone-800"
                          : "border-stone-200 text-stone-800 focus:border-amber-400 focus:shadow-lg focus:shadow-amber-100"
                    }`}
                />
              ))}
            </div>

            {error && (
              <p className="text-xs text-red-500 mt-3 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {error || "Invalid code. Please try again."}
              </p>
            )}
          </div>

          {/* Verify button */}
          <button
            onClick={handleVerify}
            disabled={otp.some((d) => !d)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-stone-800 to-stone-900 text-white text-sm font-semibold hover:from-stone-900 hover:to-stone-950 transition-all shadow-md shadow-stone-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify Email
          </button>

          {/* Resend */}
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
                className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium cursor-pointer disabled:opacity-50 transition-colors"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`}
                />
                {resending ? "Sending…" : "Resend Code"}
              </button>
            )}
          </div>
        </div>

        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 mx-auto mt-6 text-sm text-stone-400 hover:text-stone-600 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Go Back
        </button>
      </div>
    </div>
  );
}
