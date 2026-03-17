import { useContext, useMemo, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";

const securityTips = [
  "Use at least 8 characters for a stronger password.",
  "Avoid reusing a password from another website or app.",
  "Store your credentials securely and rotate them when needed.",
];

export default function SettingsPage() {
  const { user } = useContext(UserContext);
  const [current, setCurrent] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [currentError, setCurrentError] = useState("");

  const [newPw, setNewPw] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [newPwError, setNewPwError] = useState("");

  const [confirm, setConfirm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmError, setConfirmError] = useState("");

  const [focused, setFocused] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = useMemo(() => {
    if (!newPw) {
      return {
        label: "Waiting for input",
        width: "w-0",
        tone: "bg-stone-200",
        text: "text-stone-400",
      };
    }

    let score = 0;
    if (newPw.length >= 8) score += 1;
    if (/[A-Z]/.test(newPw)) score += 1;
    if (/[0-9]/.test(newPw)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPw)) score += 1;

    if (score <= 1) {
      return {
        label: "Weak password",
        width: "w-1/4",
        tone: "bg-red-400",
        text: "text-red-500",
      };
    }

    if (score <= 3) {
      return {
        label: "Good progress",
        width: "w-2/3",
        tone: "bg-amber-400",
        text: "text-amber-600",
      };
    }

    return {
      label: "Strong password",
      width: "w-full",
      tone: "bg-emerald-500",
      text: "text-emerald-600",
    };
  }, [newPw]);

  const validateForm = () => {
    let isValid = true;

    setCurrentError("");
    setNewPwError("");
    setConfirmError("");

    if (!current) {
      setCurrentError("Current password is required.");
      isValid = false;
    }

    if (!newPw) {
      setNewPwError("New password is required.");
      isValid = false;
    } else if (newPw.length < 6) {
      setNewPwError("Password must be at least 6 characters.");
      isValid = false;
    }

    if (!confirm) {
      setConfirmError("Please confirm your new password.");
      isValid = false;
    } else if (newPw !== confirm) {
      setConfirmError("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const res = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: current,
          newPassword: newPw,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setCurrentError(result.message || "Unable to update password.");
        return;
      }

      setCurrent("");
      setNewPw("");
      setConfirm("");
      setCurrentError("");
      setNewPwError("");
      setConfirmError("");
      toast.success("Password updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating your password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-2xl border bg-white/90 pl-12 pr-14 py-3.5 text-sm text-stone-700 placeholder-stone-400 transition-all outline-none ${
      focused === field
        ? "border-amber-400 ring-4 ring-amber-100"
        : "border-stone-200 hover:border-stone-300"
    }`;

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-amber-600">
              Security Settings
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-800 sm:text-3xl">
            Account Settings
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-stone-500">
            A cleaner password management experience with stronger visual
            hierarchy and account context.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-600 shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          Security center
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="relative overflow-hidden rounded-[30px] border border-stone-200/70 bg-white shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.2),_transparent_35%)]" />

          <div className="relative space-y-6 p-6 text-white sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-900 shadow-lg shadow-amber-500/30">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-amber-300">
                  LUXE Protection
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Keep your admin access secure
                </h2>
              </div>
            </div>

            <p className="max-w-xl text-sm leading-7 text-stone-300">
              Manage your password from a space that feels as polished as the
              rest of the dashboard. The new layout gives users clearer feedback
              and a stronger premium look.
            </p>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <UserRound className="h-4 w-4 text-amber-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
                      Account Holder
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-white">
                      {user?.full_name || "Admin user"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <Mail className="h-4 w-4 text-amber-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
                      Contact Email
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-white">
                      {user?.email || "admin@luxe.com"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-400/15 bg-amber-400/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                Password Guidance
              </p>
              <div className="mt-4 space-y-3">
                {securityTips.map((tip) => (
                  <div key={tip} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <p className="text-sm leading-6 text-stone-200">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-stone-200/70 bg-white shadow-sm">
          <div className="border-b border-stone-100 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-800">
                  Change Password
                </h2>
                <p className="text-sm text-stone-500">
                  Update your credentials with immediate validation feedback.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
            <div className="rounded-2xl border border-stone-200/70 bg-stone-50/80 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                    Strength Indicator
                  </p>
                  <p className={`mt-2 text-sm font-semibold ${passwordStrength.text}`}>
                    {passwordStrength.label}
                  </p>
                </div>
                <div className="w-32 rounded-full bg-stone-200 h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${passwordStrength.width} ${passwordStrength.tone}`}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    onFocus={() => setFocused("current")}
                    onBlur={() => setFocused(null)}
                    placeholder="Enter your current password"
                    className={inputClass("current")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-stone-600 cursor-pointer"
                  >
                    {showCurrent ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {currentError && (
                  <p className="mt-2 text-sm text-red-600">{currentError}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                  New Password
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    onFocus={() => setFocused("new")}
                    onBlur={() => setFocused(null)}
                    placeholder="Create a new secure password"
                    className={inputClass("new")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-stone-600 cursor-pointer"
                  >
                    {showNew ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {newPwError && (
                  <p className="mt-2 text-sm text-red-600">{newPwError}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    onFocus={() => setFocused("confirm")}
                    onBlur={() => setFocused(null)}
                    placeholder="Re-enter your new password"
                    className={inputClass("confirm")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-stone-600 cursor-pointer"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {confirmError && (
                  <p className="mt-2 text-sm text-red-600">{confirmError}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-stone-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm text-stone-500">
                For security, you may be asked to sign in again after updating
                your password.
              </p>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-stone-900 to-stone-800 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-stone-300 transition-all hover:-translate-y-0.5 hover:from-stone-950 hover:to-stone-900 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
              >
                <Lock className="h-4 w-4" />
                {isSubmitting ? "Updating..." : "Update Password"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
