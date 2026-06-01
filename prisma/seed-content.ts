// v1 content definitions for the seed loader.
//
// NOTE: The PRD requires v1 to reproduce the source spreadsheet exactly (FR9).
// The spreadsheet itself was not provided to this build, so the content below
// is representative and structurally faithful (5 general competencies on both
// tracks; functional competencies per job family with per-level bullet arrays).
// The re-runnable importer (FR17c) + naming-mismatch reconciliation step is the
// mechanism that would load the authoritative spreadsheet content on top of this.

export type LevelBullets = Record<string, string[]>;

export type CompetencyDef = {
  name: string;
  description?: string;
  bullets: LevelBullets; // keyed by level code: IC2..IC5, M4..M6
};

export const IC_CODES = ["IC2", "IC3", "IC4", "IC5"] as const;
export const M_CODES = ["M4", "M5", "M6"] as const;
export const ALL_CODES = [...IC_CODES, ...M_CODES];

// ── General competencies (5, SHARED_BASELINE, both tracks) ──────────────────

export const GENERAL_COMPETENCIES: CompetencyDef[] = [
  {
    name: "Influence",
    description: "How a person creates impact and shapes outcomes around them.",
    bullets: {
      IC2: [
        "Communicates ideas clearly within the immediate team.",
        "Builds credibility by delivering on commitments.",
      ],
      IC3: [
        "Persuades peers with well-reasoned arguments and evidence.",
        "Is sought out for input on team-level decisions.",
      ],
      IC4: [
        "Shapes decisions across adjacent teams and disciplines.",
        "Drives alignment on ambiguous, cross-functional problems.",
      ],
      IC5: [
        "Sets direction that influences the wider organisation.",
        "Recognised as a thought leader whose views move strategy.",
      ],
      M4: [
        "Aligns the team around shared goals and priorities.",
        "Represents the team's perspective to stakeholders.",
      ],
      M5: [
        "Influences strategy across multiple teams and functions.",
        "Builds coalitions to unblock organisation-wide initiatives.",
      ],
      M6: [
        "Shapes company direction and long-term strategic bets.",
        "Influences at board / leadership level across brands.",
      ],
    },
  },
  {
    name: "Autonomy",
    description: "The degree of independence and ownership a person operates with.",
    bullets: {
      IC2: [
        "Completes well-scoped tasks with regular guidance.",
        "Knows when to ask for help and does so promptly.",
      ],
      IC3: [
        "Owns delivery of defined problems with minimal oversight.",
        "Manages own priorities against team goals.",
      ],
      IC4: [
        "Takes end-to-end ownership of ambiguous problems.",
        "Defines the approach as well as the solution.",
      ],
      IC5: [
        "Identifies the problems worth solving, unprompted.",
        "Operates with full independence on org-critical work.",
      ],
      M4: [
        "Runs the team's delivery with little day-to-day direction.",
        "Makes sound calls within the team's mandate.",
      ],
      M5: [
        "Sets the operating model for multiple teams.",
        "Accountable for outcomes without needing direction.",
      ],
      M6: [
        "Defines mandates and decision rights across the org.",
        "Operates autonomously at the strategic horizon.",
      ],
    },
  },
  {
    name: "Proficiency",
    description: "Depth and breadth of craft and domain expertise.",
    bullets: {
      IC2: [
        "Applies core tools and methods of the role correctly.",
        "Produces reliable work on familiar problems.",
      ],
      IC3: [
        "Demonstrates solid command of the discipline.",
        "Handles the full range of typical day-to-day work.",
      ],
      IC4: [
        "Deep expertise; handles the hardest problems in the domain.",
        "Raises the quality bar for the team's craft.",
      ],
      IC5: [
        "Authority in the domain; defines best practice.",
        "Advances the state of the art for the organisation.",
      ],
      M4: [
        "Maintains strong hands-on command of the discipline.",
        "Coaches the team on craft fundamentals.",
      ],
      M5: [
        "Sets craft and quality standards across teams.",
        "Balances depth with breadth across the function.",
      ],
      M6: [
        "Stewards the discipline's standards org-wide.",
        "Shapes how the function evolves its craft.",
      ],
    },
  },
  {
    name: "Collaboration",
    description: "How effectively a person works with and through others.",
    bullets: {
      IC2: [
        "Works well within the immediate team.",
        "Gives and receives feedback constructively.",
      ],
      IC3: [
        "Collaborates smoothly across the team's dependencies.",
        "Proactively shares context and unblocks others.",
      ],
      IC4: [
        "Builds strong cross-functional working relationships.",
        "Improves how teams work together.",
      ],
      IC5: [
        "Fosters a culture of collaboration across the org.",
        "Bridges silos to enable large-scale outcomes.",
      ],
      M4: [
        "Builds a cohesive, psychologically safe team.",
        "Models healthy cross-team collaboration.",
      ],
      M5: [
        "Drives collaboration norms across multiple teams.",
        "Resolves cross-team friction constructively.",
      ],
      M6: [
        "Designs the org for effective collaboration at scale.",
        "Sets the cultural tone for how the company works together.",
      ],
    },
  },
  {
    name: "AI Application & Enablement",
    description:
      "Applying AI tools effectively and enabling others to do the same.",
    bullets: {
      IC2: [
        "Uses approved AI tools to assist day-to-day work.",
        "Understands basic limitations and verifies AI output.",
      ],
      IC3: [
        "Integrates AI into personal workflows to raise output.",
        "Shares useful prompts and patterns with the team.",
      ],
      IC4: [
        "Designs AI-augmented workflows for the team.",
        "Evaluates where AI adds value vs. risk.",
      ],
      IC5: [
        "Pioneers AI practices adopted across the org.",
        "Sets responsible-use standards for the domain.",
      ],
      M4: [
        "Encourages and enables safe AI adoption in the team.",
        "Removes blockers to effective AI use.",
      ],
      M5: [
        "Drives AI enablement strategy across teams.",
        "Builds capability and governance for AI use.",
      ],
      M6: [
        "Shapes the organisation's AI strategy and posture.",
        "Accountable for responsible AI adoption org-wide.",
      ],
    },
  },
];

// ── Functional competencies per job family ──────────────────────────────────
// Job families are ordered to mirror the source spreadsheet sheet order (FR9/FR12).

const PROGRESSION: Record<string, (noun: string) => string> = {
  IC2: (n) => `Builds foundational ${n}; works on well-scoped tasks with guidance.`,
  IC3: (n) => `Handles ${n} independently across typical scenarios.`,
  IC4: (n) => `Owns ${n} end-to-end, including ambiguous and complex cases.`,
  IC5: (n) => `Sets the standard for ${n} across the org and mentors others.`,
  M4: (n) => `Ensures the team delivers strong ${n}; coaches on fundamentals.`,
  M5: (n) => `Drives ${n} across multiple teams, aligned to strategy.`,
  M6: (n) => `Shapes the org-wide approach to ${n} and owns the outcomes.`,
};

function genBullets(noun: string, extra?: Partial<LevelBullets>): LevelBullets {
  const out: LevelBullets = {};
  for (const code of ALL_CODES) {
    out[code] = [PROGRESSION[code](noun), ...(extra?.[code] ?? [])];
  }
  return out;
}

function fn(name: string, noun: string, description: string): CompetencyDef {
  return { name, description, bullets: genBullets(noun) };
}

export const JOB_FAMILIES: {
  name: string;
  description: string;
  competencies: CompetencyDef[];
}[] = [
  {
    name: "Engineering",
    description: "Software engineering across product and platform.",
    competencies: [
      fn("Technical Design & Architecture", "technical design and architecture", "Designing robust, scalable solutions."),
      fn("Code Quality & Craft", "code quality and engineering craft", "Writing clean, maintainable, well-tested code."),
      fn("System Operations & Reliability", "operational reliability", "Running systems reliably in production."),
      fn("Technical Breadth", "technical breadth", "Breadth across the stack and adjacent domains."),
    ],
  },
  {
    name: "Product Management",
    description: "Discovery, definition and delivery of product value.",
    competencies: [
      fn("Product Discovery", "product discovery", "Uncovering and validating customer problems."),
      fn("Roadmap & Prioritisation", "roadmapping and prioritisation", "Sequencing work for maximum value."),
      fn("Stakeholder Management", "stakeholder management", "Aligning stakeholders behind the product."),
      fn("Data & Experimentation", "data-informed experimentation", "Using data and experiments to decide."),
    ],
  },
  {
    name: "Product Design",
    description: "Research-led, systems-minded product design.",
    competencies: [
      fn("User Research", "user research", "Generating insight from users."),
      fn("Interaction Design", "interaction design", "Designing usable, accessible flows."),
      fn("Visual & Systems Design", "visual and systems design", "Crafting and scaling the visual system."),
      fn("Design Communication", "design communication", "Communicating and rationalising design."),
    ],
  },
  {
    name: "Customer Support",
    description: "Helping customers succeed and resolving issues.",
    competencies: [
      fn("Customer Communication", "customer communication", "Clear, empathetic customer communication."),
      fn("Problem Resolution", "problem resolution", "Diagnosing and resolving customer issues."),
      fn("Product Knowledge", "product knowledge", "Deep knowledge of the product."),
      fn("Process Improvement", "support process improvement", "Improving support processes and tooling."),
    ],
  },
  {
    name: "Marketing",
    description: "Demand, brand and lifecycle marketing.",
    competencies: [
      fn("Campaign Strategy", "campaign strategy", "Planning effective marketing campaigns."),
      fn("Content & Messaging", "content and messaging", "Crafting compelling content and messaging."),
      fn("Channel Execution", "channel execution", "Executing across marketing channels."),
      fn("Analytics & Attribution", "marketing analytics and attribution", "Measuring and attributing marketing impact."),
    ],
  },
  {
    name: "Sales",
    description: "Pipeline generation through to closing and growth.",
    competencies: [
      fn("Pipeline Management", "pipeline management", "Building and managing a healthy pipeline."),
      fn("Discovery & Qualification", "discovery and qualification", "Qualifying opportunities effectively."),
      fn("Negotiation & Closing", "negotiation and closing", "Negotiating and closing deals."),
      fn("Account Growth", "account growth", "Growing and retaining accounts."),
    ],
  },
  {
    name: "Talent Acquisition",
    description: "Attracting and hiring great people.",
    competencies: [
      fn("Sourcing", "candidate sourcing", "Sourcing strong candidate pipelines."),
      fn("Candidate Assessment", "candidate assessment", "Assessing candidates fairly and accurately."),
      fn("Stakeholder Partnership", "hiring stakeholder partnership", "Partnering with hiring managers."),
      fn("Employer Branding", "employer branding", "Building an attractive employer brand."),
    ],
  },
  {
    name: "Accounting",
    description: "Financial reporting, controls and partnering (WIP).",
    competencies: [
      fn("Financial Reporting", "financial reporting", "Accurate, timely financial reporting."),
      fn("Controls & Compliance", "controls and compliance", "Maintaining controls and compliance."),
      fn("Process & Systems", "finance process and systems", "Running finance processes and systems."),
      fn("Business Partnering", "finance business partnering", "Partnering with the business on finance."),
    ],
  },
];
