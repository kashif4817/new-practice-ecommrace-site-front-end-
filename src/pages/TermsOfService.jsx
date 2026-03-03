// TermsOfService.jsx
import {
  Crown,
  ChevronRight,
  Shield,
  Scale,
  FileText,
  Clock,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TermsOfService() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-stone-50/80 text-stone-800">
      {/* Header - consistent with dashboard style */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Crown className="w-5 h-5 text-stone-900" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-800 tracking-widest">
                LUXE
              </h1>
              <p className="text-amber-600/70 text-[10px] tracking-[0.25em] uppercase">
                Premium Store
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1.5 transition-colors"
          >
            Back  <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-white rounded-2xl border border-stone-200/60 shadow-xl shadow-stone-200/30 overflow-hidden">
          {/* Hero section */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-950 px-8 py-12 text-center border-b border-white/5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 mb-6 shadow-lg shadow-amber-500/30">
              <Scale className="w-8 h-8 text-stone-900" strokeWidth={2} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Last updated: March 1, 2026
            </p>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12 prose prose-stone max-w-none prose-headings:text-stone-800 prose-a:text-amber-600 hover:prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline">
            <p className="text-stone-600 leading-relaxed mb-8">
              Welcome to LUXE Premium Store. These Terms of Service ("Terms")
              govern your access to and use of our website, services, and any
              related content (collectively, the "Service"), operated by LUXE.
            </p>

            <h2 className="text-2xl font-bold text-stone-800 mt-10 mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-amber-500" /> 1. Acceptance of
              Terms
            </h2>
            <p>
              By accessing or using the Service, you agree to be bound by these
              Terms. If you do not agree, please do not use the Service.
            </p>

            <h2 className="text-2xl font-bold text-stone-800 mt-10 mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-amber-500" /> 2. Use of the
              Service
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-600">
              <li>
                You must be at least 18 years old or have legal guardian
                consent.
              </li>
              <li>
                You agree not to misuse the Service (fraud, spam, scraping,
                etc.).
              </li>
              <li>
                We reserve the right to terminate accounts for violations.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-stone-800 mt-10 mb-4 flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-500" /> 3. Orders & Payments
            </h2>
            <p>
              All orders are subject to availability and acceptance. Prices are
              in USD and exclude taxes/shipping unless stated. We use secure
              payment processors.
            </p>

            <h2 className="text-2xl font-bold text-stone-800 mt-10 mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-500" /> 4. Limitation
              of Liability
            </h2>
            <p className="text-stone-600">
              To the fullest extent permitted by law, LUXE shall not be liable
              for indirect, incidental, special, consequential, or punitive
              damages.
            </p>

            <div className="mt-12 pt-8 border-t border-stone-100 text-center">
              <p className="text-sm text-stone-500">
                Questions? Contact us at{" "}
                <a
                  href="mailto:support@luxe.com"
                  className="text-amber-600 hover:text-amber-700"
                >
                  support@luxe.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200/60 bg-white/50 px-4 py-6 text-center text-sm text-stone-500">
        © 2026 LUXE Premium Store. All rights reserved.
      </footer>
    </div>
  );
}
