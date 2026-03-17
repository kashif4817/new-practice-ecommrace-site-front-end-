import { CreditCard } from "lucide-react";
import ComingSoonPage from "../components/ComingSoonPage";

export default function PaymentsPage() {
  return (
    <ComingSoonPage
      eyebrow="Transaction Control"
      title="Payments"
      description="Payment insights, transaction history, and settlement tools will live here once this premium finance section is implemented."
      accent="amber"
      Icon={CreditCard}
    />
  );
}
