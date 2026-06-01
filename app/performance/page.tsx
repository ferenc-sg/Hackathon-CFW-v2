import { PageHeader } from "@/components/PageHeader";
import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export default function PerformancePage() {
  return (
    <div>
      <PageHeader
        title="Performance assessment"
        subtitle="Performance ratings & review cycles"
      />
      <div className="p-8">
        <ModulePlaceholder
          module="Performance assessment"
          description="Performance ratings and review-cycle management. Out of scope for v1 (targeted for a future version alongside the CultureAmp integration, Q4 2026 horizon)."
          reads="Will read the framework and assessed levels from the Library and User Profile."
          writes="Will record performance ratings against review cycles."
          steps={[
            "Define review cycles",
            "Collect performance ratings",
            "Calibrate across teams",
            "Surface outcomes on the user profile",
          ]}
        />
      </div>
    </div>
  );
}
