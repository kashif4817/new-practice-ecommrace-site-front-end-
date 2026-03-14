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

import { Route, Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/Login.jsx";
import SignUpPage from "./pages/Signup.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import ForgotPasswordPage from "./pages/forgotPassword.jsx";
import ResetPasswordPage from "./pages/resetPassword.jsx";
import SettingsPage from "./pages/Settings.jsx";
import DashboardLayout from "./layouts/Dashboardlayout.jsx";
import VerifyOtpForgotPage from "./pages/VerifyOtpForgot.jsx";
import VerifyOtpSignupPage from "./pages/VerifyOtpSignup.jsx";
// import VerifyOtpForgotPage from "./pages/VerifyOtpForgot.jsx";
// import VerifyOtpSignupPage from "./pages/VerifyOtpSignup.jsx";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        {/* <Route path="/verify-otp-forgot" element={<VerifyOtpForgotPage />} /> */}
        {/* <Route path="/verify-otp-signup" element={<VerifyOtpSignupPage />} /> */}
        {/* <Route path="/verify-otp-forgot" element={<VerifyOtpForgotPage />} /> */}
        <Route path="/verify-otp-forgot" element={<VerifyOtpForgotPage />} />
        <Route path="/verify-otp-signup" element={<VerifyOtpSignupPage />} />

        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}
