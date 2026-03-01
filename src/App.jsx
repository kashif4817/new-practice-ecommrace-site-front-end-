import { useState } from "react";
import {
  Star,
  Sparkles,
  Crown,
  Gift,
  ShieldCheck,
  Truck,
  HeartHandshake,
} from "lucide-react";

// import LoginPage from "./pages/LoginPage";
// import SignUpPage from "./pages/SignUpPage";
// import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignupPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { Route, Router, Routes } from "react-router-dom";
import NotFound from './pages/NotFound.jsx'

export default function App() {
  // const [currentPage, setCurrentPage] = useState("login");

  // // If dashboard, render it full-screen (it has its own layout)
  // if (currentPage === "dashboard") {
  //   return <DashboardPage onLogout={() => setCurrentPage("login")} />;
  // }

  // const isSignUp = currentPage === "signup";

  // const handleLoginSuccess = () => setCurrentPage("dashboard");
  // const handleSignUpSuccess = () => setCurrentPage("dashboard");

  return (
    // <div className="min-h-screen w-full flex font-sans bg-stone-50">
    //   {/* ===== LEFT BRANDING PANEL ===== */}
    //   <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 flex-col justify-between p-12 xl:p-16">
    //     {/* Decorative pattern */}
    //     <div
    //       className="absolute inset-0 opacity-[0.03]"
    //       style={{
    //         backgroundImage:
    //           "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    //       }}
    //     />

    //     {/* Floating golden orbs */}
    //     <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
    //     <div className="absolute bottom-32 left-10 w-56 h-56 bg-amber-400/8 rounded-full blur-3xl" />
    //     <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-amber-300/5 rounded-full blur-2xl" />

    //     {/* Top - Logo */}
    //     <div className="relative z-10">
    //       <div className="flex items-center gap-3">
    //         <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
    //           <Crown className="w-7 h-7 text-stone-900" strokeWidth={2.5} />
    //         </div>
    //         <div>
    //           <h1 className="text-2xl font-bold text-white tracking-widest">
    //             LUXE
    //           </h1>
    //           <p className="text-amber-400/70 text-[10px] tracking-[0.35em] uppercase font-medium">
    //             Premium Store
    //           </p>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Center - Hero Text (dynamic based on page) */}
    //     <div className="relative z-10 space-y-8">
    //       <div className="space-y-4">
    //         <div className="flex items-center gap-2 text-amber-400/80">
    //           <Sparkles className="w-4 h-4" />
    //           <span className="text-xs tracking-[0.3em] uppercase font-medium">
    //             {isSignUp ? "Join the Club" : "Welcome Back"}
    //           </span>
    //         </div>
    //         <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
    //           {isSignUp ? (
    //             <>
    //               Begin Your
    //               <br />
    //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
    //                 Premium
    //               </span>{" "}
    //               Journey
    //               <br />
    //               Today
    //             </>
    //           ) : (
    //             <>
    //               Discover a World
    //               <br />
    //               of{" "}
    //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
    //                 Luxury
    //               </span>{" "}
    //               &amp;
    //               <br />
    //               Elegance
    //             </>
    //           )}
    //         </h2>
    //         <p className="text-stone-400 text-base xl:text-lg max-w-md leading-relaxed">
    //           {isSignUp
    //             ? "Create your account and get instant access to exclusive collections, early releases, and members-only perks tailored for you."
    //             : "Sign in to access exclusive collections, personalised recommendations, and members-only offers crafted just for you."}
    //         </p>
    //       </div>

    //       {/* Feature pills / Member benefits */}
    //       {isSignUp ? (
    //         <div className="grid grid-cols-2 gap-3 max-w-md">
    //           {[
    //             { icon: Gift, label: "Welcome Gift", desc: "10% off first order" },
    //             { icon: Truck, label: "Free Shipping", desc: "On orders over $50" },
    //             { icon: ShieldCheck, label: "VIP Access", desc: "Early product drops" },
    //             { icon: HeartHandshake, label: "Rewards", desc: "Earn points on every buy" },
    //           ].map((item) => (
    //             <div
    //               key={item.label}
    //               className="flex items-start gap-3 p-3 rounded-xl border border-amber-500/15 bg-amber-500/5 backdrop-blur-sm"
    //             >
    //               <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
    //                 <item.icon className="w-4 h-4 text-amber-400" />
    //               </div>
    //               <div>
    //                 <p className="text-amber-200 text-sm font-medium">{item.label}</p>
    //                 <p className="text-stone-500 text-xs">{item.desc}</p>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       ) : (
    //         <div className="flex flex-wrap gap-3">
    //           {[
    //             "Free Shipping",
    //             "Exclusive Deals",
    //             "Premium Quality",
    //             "24/7 Support",
    //           ].map((feature) => (
    //             <span
    //               key={feature}
    //               className="px-4 py-2 rounded-full border border-amber-500/20 text-amber-300/80 text-xs tracking-wider uppercase bg-amber-500/5 backdrop-blur-sm"
    //             >
    //               {feature}
    //             </span>
    //           ))}
    //         </div>
    //       )}
    //     </div>

    //     {/* Bottom - Testimonial / Stats */}
    //     <div className="relative z-10">
    //       {isSignUp ? (
    //         <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-md">
    //           <div className="flex items-center gap-6">
    //             <div className="text-center">
    //               <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
    //                 50K+
    //               </p>
    //               <p className="text-stone-500 text-xs mt-0.5">Members</p>
    //             </div>
    //             <div className="w-px h-10 bg-white/10" />
    //             <div className="text-center">
    //               <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
    //                 4.9★
    //               </p>
    //               <p className="text-stone-500 text-xs mt-0.5">Rating</p>
    //             </div>
    //             <div className="w-px h-10 bg-white/10" />
    //             <div className="text-center">
    //               <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
    //                 200+
    //               </p>
    //               <p className="text-stone-500 text-xs mt-0.5">Brands</p>
    //             </div>
    //             <div className="w-px h-10 bg-white/10" />
    //             <div className="text-center">
    //               <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-500">
    //                 24/7
    //               </p>
    //               <p className="text-stone-500 text-xs mt-0.5">Support</p>
    //             </div>
    //           </div>
    //           <div className="mt-4 pt-4 border-t border-white/10">
    //             <div className="flex items-center gap-2">
    //               <div className="flex -space-x-2">
    //                 {["AK", "MJ", "RS", "TL"].map((initials, i) => (
    //                   <div
    //                     key={initials}
    //                     className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-900 text-[10px] font-bold border-2 border-stone-800"
    //                     style={{ zIndex: 4 - i }}
    //                   >
    //                     {initials}
    //                   </div>
    //                 ))}
    //               </div>
    //               <p className="text-stone-400 text-xs">
    //                 Join <span className="text-amber-400 font-medium">2,847</span> people who signed up this week
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-md">
    //           <div className="flex gap-1 mb-3">
    //             {[...Array(5)].map((_, i) => (
    //               <Star
    //                 key={i}
    //                 className="w-4 h-4 fill-amber-400 text-amber-400"
    //               />
    //             ))}
    //           </div>
    //           <p className="text-stone-300 text-sm leading-relaxed italic">
    //             "The quality of products and the shopping experience is
    //             unmatched. LUXE has become my go-to for everything premium."
    //           </p>
    //           <div className="flex items-center gap-3 mt-4">
    //             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-900 font-bold text-sm">
    //               AK
    //             </div>
    //             <div>
    //               <p className="text-white text-sm font-medium">
    //                 Amelia Kingston
    //               </p>
    //               <p className="text-stone-500 text-xs">Verified Buyer</p>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   {/* ===== RIGHT FORM PANEL ===== */}
    //   <div className={`w-full lg:w-[48%] flex items-center justify-center relative ${isSignUp ? "p-6 sm:p-8 md:p-12" : "p-6 sm:p-10 md:p-16"}`}>
    //     {/* Subtle background decoration */}
    //     <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    //     <div className="absolute bottom-0 left-0 w-72 h-72 bg-stone-200/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

    //     {/* Scrollable container for signup (since it has more fields) */}
    //     <div className={`w-full flex items-center justify-center ${isSignUp ? "max-h-full overflow-y-auto py-4" : ""}`}>
    //       {currentPage === "login" ? (
    //         <LoginPage
    //           onSwitchToSignUp={() => setCurrentPage("signup")}
    //           onLoginSuccess={handleLoginSuccess}
    //         />
    //       ) : (
    //         <SignUpPage
    //           onSwitchToLogin={() => setCurrentPage("login")}
    //           onSignUpSuccess={handleSignUpSuccess}
    //         />
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div >
      {/* <Router> */}
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    // <div>
    //   <h1 class="text-3xl font-bold underline">
    //     Hello world!
    //   </h1>
    // </div>

  );
}
