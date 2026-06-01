import { PageHeader } from "@/components/PageHeader";
import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export default function LevelingPage() {
  return (
    <div>
      <PageHeader
        title="Leveling"
        subtitle="Module 3 — Levelling Flow: self-assessment, manager review, level finalisation"
      />
      <div className="p-8">
        <ModulePlaceholder
          module="Module 3 — Levelling Flow"
          description="The end-to-end levelling process: a team member self-assesses against their resolved competency set, their manager reviews, and a level is finalised — writing an assessed level back to the User Profile and an immutable record to Levelling history."
          reads="Reads competency definitions from the Framework Library via resolveCompetencies(jobFamilyId, brandId)."
          writes="Writes assessed competency levels, the finalised Level, and a LevellingHistoryRecord to the User Profile."
          steps={[
            "Self-assessment — rate yourself per competency against level expectations",
            "Manager review — manager rates and compares",
            "Alignment conversation — reconcile differences",
            "Finalisation — set the level, record history, generate development plan",
          ]}
        />
      </div>
    </div>
  );
}
