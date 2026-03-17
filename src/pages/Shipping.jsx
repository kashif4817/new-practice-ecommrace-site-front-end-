import { Truck } from "lucide-react";
import ComingSoonPage from "../components/ComingSoonPage";

export default function ShippingPage() {
  return (
    <ComingSoonPage
      eyebrow="Delivery Workflow"
      title="Shipping"
      description="The shipping workspace will support dispatch, tracking, and fulfillment updates while staying aligned with your current dashboard style."
      accent="blue"
      Icon={Truck}
    />
  );
}
