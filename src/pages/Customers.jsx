import { Users } from "lucide-react";
import ComingSoonPage from "../components/ComingSoonPage";

export default function CustomersPage() {
  return (
    <ComingSoonPage
      eyebrow="Client Relationships"
      title="Customers"
      description="This area will help you understand customer activity, build stronger relationships, and manage buyer information with clarity."
      accent="rose"
      Icon={Users}
    />
  );
}
