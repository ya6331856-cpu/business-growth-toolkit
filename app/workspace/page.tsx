import type { Metadata } from "next";
import BusinessWorkspace from "@/components/BusinessWorkspace";

export const metadata: Metadata = {
  title: "Business Workspace for Service Pros",
  description: "Track customer jobs, job values and work progress in a simple browser-based workspace for service businesses.",
  alternates: { canonical: "/workspace/" }
};

export default function WorkspacePage() {
  return <BusinessWorkspace />;
}
