import { BarChart3 } from "lucide-react";
import ComingSoonPage from "../components/ComingSoonPage";

export default function AnalyticsPage() {
  return (
    <ComingSoonPage
      eyebrow="Performance Insights"
      title="Analytics"
      description="This page will surface elegant reports, store trends, and decision-ready metrics tailored to your luxury ecommerce dashboard."
      accent="violet"
      Icon={BarChart3}
    />
  );
}
