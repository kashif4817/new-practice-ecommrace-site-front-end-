import {
  ArrowRight,
  Clock3,
  Sparkles,
  Zap,
} from "lucide-react";

const accentMap = {
  amber: {
    chip: "text-amber-600",
    badge: "bg-amber-50 text-amber-700 border-amber-200/70",
    iconWrap:
      "bg-gradient-to-br from-amber-400/20 to-amber-600/20 border-amber-200/70",
    icon: "text-amber-600",
    button:
      "text-amber-700 border-amber-200/80 hover:bg-amber-50",
    panel: "from-amber-100/80 via-white to-stone-100",
    glow: "from-amber-300/25 to-transparent",
  },
  emerald: {
    chip: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    iconWrap:
      "bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border-emerald-200/70",
    icon: "text-emerald-600",
    button:
      "text-emerald-700 border-emerald-200/80 hover:bg-emerald-50",
    panel: "from-emerald-100/80 via-white to-stone-100",
    glow: "from-emerald-300/25 to-transparent",
  },
  blue: {
    chip: "text-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200/70",
    iconWrap:
      "bg-gradient-to-br from-blue-400/20 to-blue-600/20 border-blue-200/70",
    icon: "text-blue-600",
    button: "text-blue-700 border-blue-200/80 hover:bg-blue-50",
    panel: "from-blue-100/80 via-white to-stone-100",
    glow: "from-blue-300/25 to-transparent",
  },
  rose: {
    chip: "text-rose-600",
    badge: "bg-rose-50 text-rose-700 border-rose-200/70",
    iconWrap:
      "bg-gradient-to-br from-rose-400/20 to-rose-600/20 border-rose-200/70",
    icon: "text-rose-600",
    button: "text-rose-700 border-rose-200/80 hover:bg-rose-50",
    panel: "from-rose-100/80 via-white to-stone-100",
    glow: "from-rose-300/25 to-transparent",
  },
  violet: {
    chip: "text-violet-600",
    badge: "bg-violet-50 text-violet-700 border-violet-200/70",
    iconWrap:
      "bg-gradient-to-br from-violet-400/20 to-violet-600/20 border-violet-200/70",
    icon: "text-violet-600",
    button:
      "text-violet-700 border-violet-200/80 hover:bg-violet-50",
    panel: "from-violet-100/80 via-white to-stone-100",
    glow: "from-violet-300/25 to-transparent",
  },
};

export default function ComingSoonPage({
  eyebrow,
  title,
  description,
  accent = "amber",
  Icon,
}) {
  const theme = accentMap[accent] || accentMap.amber;

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className={`w-4 h-4 ${theme.chip}`} />
          <span
            className={`text-xs tracking-wider uppercase font-medium ${theme.chip}`}
          >
            {eyebrow}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">
          {title}
        </h1>
        <p className="text-stone-500 text-sm mt-1 max-w-2xl">{description}</p>
      </div>

      <section className="relative overflow-hidden rounded-[28px] border border-stone-200/70 bg-white shadow-sm">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${theme.panel}`}
        />
        <div
          className={`absolute -top-24 -right-16 h-56 w-56 rounded-full bg-gradient-to-br ${theme.glow} blur-3xl`}
        />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_top_right,_#000_0,_transparent_45%)]" />

        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
            <div className="space-y-5">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${theme.badge}`}
              >
                <Clock3 className="w-3.5 h-3.5" />
                Under development
              </div>

              <div
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${theme.iconWrap}`}
              >
                <Icon className={`w-7 h-7 ${theme.icon}`} />
              </div>

              <div>
                <h2 className="text-2xl sm:text-[2rem] font-bold text-stone-900 tracking-tight">
                  This section is coming soon.
                </h2>
                <p className="text-stone-600 mt-3 max-w-2xl leading-7">
                  We are crafting this {title.toLowerCase()} experience to match
                  the premium LUXE dashboard. For now, this area is reserved for
                  future tools, workflows, and polished store management
                  features.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-4 py-3 text-sm text-stone-600 border border-stone-200/80">
                  <Zap className={`w-4 h-4 ${theme.icon}`} />
                  Better controls are on the way
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-4 py-3 text-sm text-stone-600 border border-stone-200/80">
                  <ArrowRight className={`w-4 h-4 ${theme.icon}`} />
                  This page will be implemented in a future update
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-2xl border border-stone-200/70 bg-white/85 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
                  Status
                </p>
                <p className="mt-3 text-lg font-bold text-stone-800">
                  Design in progress
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  Layout and content are being prepared to fit your current
                  dashboard theme.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200/70 bg-white/85 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
                  Experience
                </p>
                <p className="mt-3 text-lg font-bold text-stone-800">
                  Premium LUXE styling
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  Stone surfaces, amber accents, soft cards, and luxury admin
                  polish will carry through here as well.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200/70 bg-white/85 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
                  Next step
                </p>
                <p className="mt-3 text-lg font-bold text-stone-800">
                  Ready for future features
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  This placeholder keeps navigation complete until the full page
                  is built.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
