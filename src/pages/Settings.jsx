import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, Settings } from "lucide-react";

export default function SettingsPage() {
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState(null);
  

  const handleSubmit = () => {
    // add your logic here
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-4 h-4 text-amber-500" />
          <span className="text-xs tracking-wider uppercase text-amber-600 font-medium">
            Settings
          </span>
        </div>
        <h2 className="text-2xl font-bold text-stone-800">Change Password</h2>
        <p className="text-stone-500 text-sm mt-1">
          Update your password to keep your account secure.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden max-w-xl">
        {/* Card Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-100 bg-stone-50/60">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-200/60 flex items-center justify-center">
            <Lock className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-700">
              Password Settings
            </p>
            <p className="text-xs text-stone-400">Last updated 30 days ago</p>
          </div>
        </div>

        {/* Fields */}
        <div className="px-6 py-6 space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
              Current Password
            </label>
            <div
              className={`relative flex items-center rounded-xl border-2 bg-white transition-all duration-200 ${
                focused === "current"
                  ? "border-amber-400 ring-2 ring-amber-100"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <Lock
                className={`absolute left-4 w-4 h-4 transition-colors ${focused === "current" ? "text-amber-500" : "text-stone-400"}`}
              />
              <input
                type={showCurrent ? "text" : "password"}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                onFocus={() => setFocused("current")}
                onBlur={() => setFocused(null)}
                placeholder="Enter current password"
                className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-stone-700 placeholder-stone-400 focus:outline-none"
                required
              />
              <button
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-stone-100" />
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
              New Password
            </span>
            <div className="flex-1 h-px bg-stone-100" />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
              New Password
            </label>
            <div
              className={`relative flex items-center rounded-xl border-2 bg-white transition-all duration-200 ${
                focused === "new"
                  ? "border-amber-400 ring-2 ring-amber-100"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <ShieldCheck
                className={`absolute left-4 w-4 h-4 transition-colors ${focused === "new" ? "text-amber-500" : "text-stone-400"}`}
              />
              <input
                type={showNew ? "text" : "password"}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                onFocus={() => setFocused("new")}
                onBlur={() => setFocused(null)}
                placeholder="Enter new password"
                className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-stone-700 placeholder-stone-400 focus:outline-none"
                required

              />
              <button
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
              Confirm New Password
            </label>
            <div
              className={`relative flex items-center rounded-xl border-2 bg-white transition-all duration-200 ${
                focused === "confirm"
                  ? "border-amber-400 ring-2 ring-amber-100"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <Lock
                className={`absolute left-4 w-4 h-4 transition-colors ${focused === "confirm" ? "text-amber-500" : "text-stone-400"}`}
              />
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onFocus={() => setFocused("confirm")}
                onBlur={() => setFocused(null)}
                placeholder="Re-enter new password"
                className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-stone-700 placeholder-stone-400 focus:outline-none"
                required
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
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-stone-100 bg-stone-50/40">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-stone-800 to-stone-900 text-white hover:from-stone-900 hover:to-stone-950 transition-all shadow-md shadow-stone-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            Update Password
          </button>
        </div>
      </div>

      {/* Security note */}
      <p className="text-xs text-stone-400 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
        For security, you'll be asked to log in again after changing your
        password.
      </p>
    </div>
  );
}
