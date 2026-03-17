import { ShoppingBag } from "lucide-react";
import ComingSoonPage from "../components/ComingSoonPage";

export default function ProductsPage() {
  return (
    <ComingSoonPage
      eyebrow="Catalog Management"
      title="Products"
      description="This space will be used to organize your luxury catalog, manage inventory, and present product details with better control."
      accent="emerald"
      Icon={ShoppingBag}
    />
  );
}
