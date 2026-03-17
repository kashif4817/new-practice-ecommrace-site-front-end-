import { ShoppingCart } from "lucide-react";
import ComingSoonPage from "../components/ComingSoonPage";

export default function OrdersPage() {
  return (
    <ComingSoonPage
      eyebrow="Order Operations"
      title="Orders"
      description="Your order management page will bring together fulfillment, tracking, and customer purchase flow in a clean premium workspace."
      accent="blue"
      Icon={ShoppingCart}
    />
  );
}
