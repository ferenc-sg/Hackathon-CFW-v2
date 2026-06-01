import type { CompetencySet } from "./self-levelling-types";

// ── General IC competencies (levels IC2–IC5) ────────────────────────────────

export const GENERAL_IC: CompetencySet = {
  jobFamilyName: "General",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    {
      id: "influence",
      name: "Influence",
      fullName: "Influence & Scope",
      description: "How you shape decisions, strategy, and impact beyond your immediate tasks.",
      subdimensions: [
        {
          id: "influence__scope",
          name: "Scope & Team Impact",
          statements: {
            IC2: {
              text: "I work within my immediate team, contributing to shared goals and learning our team's direction.",
              example: "I consistently delivered my sprint tasks and helped a teammate debug an issue in our codebase.",
            },
            IC3: {
              text: "I work across teams occasionally, and my insights influence functional decisions and the team's roadmap.",
              example: "I identified a bottleneck in our release pipeline and proposed a solution that was added to the team roadmap.",
            },
            IC4: {
              text: "I collaborate across departments and seniority levels, leading high-impact projects and owning measurable KPIs.",
              example: "I led a company-wide platform migration, coordinating with 3 teams, and presented outcomes to senior leadership.",
            },
            IC5: {
              text: "I partner with senior leadership to align and advance goals, acting as a multiplier well beyond my direct team.",
              example: "I designed and drove a new platform strategy adopted across all product lines, reducing operational costs by 20%.",
            },
          },
        },
        {
          id: "influence__strategy",
          name: "Strategic Contribution",
          statements: {
            IC2: {
              text: "I understand my team's goals and focus my work on the priorities assigned to me.",
              example: "I aligned my sprint deliverables to our team's quarterly OKRs and flagged any misalignment early.",
            },
            IC3: {
              text: "I contribute ideas that shape team or brand strategy and lead cross-functional coordination.",
              example: "I spotted a gap in our analytics coverage and proposed a solution that was adopted in our next planning cycle.",
            },
            IC4: {
              text: "I actively contribute to strategic decisions, advocate for business choices, and own roadmap items and KPIs.",
              example: "I championed a process improvement that became a company-wide initiative and is now tracked as a department KPI.",
            },
            IC5: {
              text: "I set the strategic direction for my functional area and drive large-scale initiatives that go beyond my direct team.",
              example: "I led a multi-quarter platform modernisation that was the centrepiece of our annual engineering strategy.",
            },
          },
        },
      ],
    },
    {
      id: "autonomy",
      name: "Autonomy",
      fullName: "Autonomy & Self-Direction",
      description: "How independently you work and make decisions.",
      subdimensions: [
        {
          id: "autonomy__independence",
          name: "Independence & Self-Direction",
          statements: {
            IC2: {
              text: "I work on assigned tasks with support from my team, following established guidelines and asking questions when stuck.",
              example: "I delivered my features following the team's agreed development process, with regular check-ins with my lead.",
            },
            IC3: {
              text: "I am self-reliant in my area, completing projects with general direction and seeking guidance only for critical decisions.",
              example: "I independently delivered a new integration feature, asking for input on just one key architectural trade-off.",
            },
            IC4: {
              text: "I work fully independently, make well-reasoned decisions, and proactively improve team and organisational processes.",
              example: "I redesigned our deployment pipeline without being asked, reducing deployment time by 40%.",
            },
            IC5: {
              text: "I am a recognised decision-maker in my area and shape the organisational guidelines and frameworks others follow.",
              example: "I authored our engineering standards guide and drove its adoption across 4 product teams.",
            },
          },
        },
        {
          id: "autonomy__prioritisation",
          name: "Prioritisation & Decision-Making",
          statements: {
            IC2: {
              text: "I follow priorities set by my lead and raise questions when unsure what to work on next.",
              example: "I flagged a potential priority conflict to my manager and we resolved it together in our 1:1.",
            },
            IC3: {
              text: "I prioritise my own tasks effectively, balancing urgency and importance to keep projects on track.",
              example: "I managed three parallel workstreams by creating a shared tracker that helped the team stay aligned.",
            },
            IC4: {
              text: "I help others prioritise and make efficient decisions, proactively removing blockers across the team.",
              example: "I facilitated a prioritisation workshop with product that resulted in a 20% more focused roadmap.",
            },
            IC5: {
              text: "I define priorities aligned with business strategy and influence the direction of the organisation.",
              example: "I led a company-wide prioritisation exercise that aligned 5 teams on a single strategic goal for the quarter.",
            },
          },
        },
      ],
    },
    {
      id: "proficiency",
      name: "Proficiency",
      fullName: "Proficiency & Growth",
      description: "The quality and complexity of your work, and how you grow and help others grow.",
      subdimensions: [
        {
          id: "proficiency__quality",
          name: "Quality & Complexity of Work",
          statements: {
            IC2: {
              text: "I handle small-to-medium tasks confidently, use familiar tools, and seek help when I encounter new problems.",
              example: "I fixed several bugs and built a small component, with my lead's code review providing good learning opportunities.",
            },
            IC3: {
              text: "I deliver high-quality work on moderately complex tasks independently and contribute meaningfully to larger projects.",
              example: "I built and shipped a significant product feature, providing code review feedback for my teammates along the way.",
            },
            IC4: {
              text: "I manage complex, large-scale projects across teams and resolve challenging problems independently.",
              example: "I led the refactoring of our legacy billing system, coordinating across engineering and finance teams over 2 months.",
            },
            IC5: {
              text: "I own the most complex challenges in the organisation and build systems that improve the effectiveness of the whole team.",
              example: "I architected a new event-driven platform that reduced p99 latency from 5 s to 200 ms across all services.",
            },
          },
        },
        {
          id: "proficiency__growth",
          name: "Learning & Knowledge Sharing",
          statements: {
            IC2: {
              text: "I actively seek feedback and ask questions to grow quickly.",
              example: "I set up weekly pairing sessions with a senior colleague specifically to learn from code reviews.",
            },
            IC3: {
              text: "I help onboard new team members, provide constructive feedback, and share knowledge.",
              example: "I paired with our new junior hire three times and created a getting-started guide for the whole team.",
            },
            IC4: {
              text: "I mentor junior colleagues, share deep expertise, and set high standards for the team.",
              example: "I ran quarterly deep-dive sessions for the team and mentored two colleagues toward their next promotion.",
            },
            IC5: {
              text: "I act as a subject-matter expert and thought leader, mentoring across teams and shaping best practices org-wide.",
              example: "I published an internal technical series and was invited to present at the group's engineering summit.",
            },
          },
        },
      ],
    },
    {
      id: "collaboration",
      name: "Collaboration",
      fullName: "Collaboration & Communication",
      description: "How you communicate, build relationships, and contribute to team culture.",
      subdimensions: [
        {
          id: "collaboration__communication",
          name: "Communication & Clarity",
          statements: {
            IC2: {
              text: "I communicate clearly, keep my team updated on task progress, and flag blockers early.",
              example: "I gave a clear status update in standup and raised a blocker the same day it appeared.",
            },
            IC3: {
              text: "I explain complex concepts clearly, advocate for my ideas effectively, and push back when needed.",
              example: "I wrote a technical RFC that convinced the team to adopt a new caching strategy instead of the original approach.",
            },
            IC4: {
              text: "I ensure open communication across all levels and independently manage stakeholder relationships.",
              example: "I ran a cross-team retrospective that resolved a recurring friction point between product and engineering.",
            },
            IC5: {
              text: "I communicate the most complex ideas simply, facilitate collaboration, and proactively surface team-wide concerns.",
              example: "I ran an all-hands that brought clarity to a contentious architectural decision and built genuine consensus.",
            },
          },
        },
        {
          id: "collaboration__culture",
          name: "Relationships & Culture",
          statements: {
            IC2: {
              text: "I align with team values, seek help when blocked, and contribute to a positive team environment.",
              example: "I raised a blocker early rather than struggling alone, which helped the team deliver on time.",
            },
            IC3: {
              text: "I share knowledge, motivate teammates, and lead by example in living the team's values.",
              example: "I organised an informal lunch-and-learn on a new framework and volunteered for our team's inclusion initiative.",
            },
            IC4: {
              text: "I resolve conflicts, embody team values as a role model, and actively foster inclusion.",
              example: "I mediated a disagreement between two colleagues over a technical approach, reaching a solution everyone owned.",
            },
            IC5: {
              text: "I foster a culture of shared success, proactively address team-wide concerns, and drive open communication.",
              example: "I initiated a team health-check process that led to a 15-point improvement in our team NPS over one quarter.",
            },
          },
        },
      ],
    },
    {
      id: "ai",
      name: "AI Application",
      fullName: "AI Application & Enablement",
      description: "How you use AI tools and help others adopt them effectively.",
      subdimensions: [
        {
          id: "ai__workflow",
          name: "Personal AI Workflow",
          statements: {
            IC2: {
              text: "I use AI tools regularly for role-appropriate tasks and I'm developing my sense of when to trust the output.",
              example: "I used an AI assistant to draft a document, then reviewed and improved it before sharing with the team.",
            },
            IC3: {
              text: "I use AI as a genuine part of my workflow with tangible impact — time saved, quality improved, or scope expanded.",
              example: "I automated our weekly report generation with an AI pipeline, saving myself 2 hours every week.",
            },
            IC4: {
              text: "AI is embedded in my work through structured workflows; I evaluate tools rigorously for security and fit before adopting them.",
              example: "I built a custom AI code-review workflow and assessed three tools for security and integration fit before recommending one.",
            },
            IC5: {
              text: "AI is deeply embedded across all aspects of my work; I set the standard for responsible, effective AI use in my function.",
              example: "I designed our team's AI adoption roadmap, evaluated and implemented five tools, and published our learnings internally.",
            },
          },
        },
        {
          id: "ai__enablement",
          name: "Enabling Others with AI",
          statements: {
            IC2: {
              text: "I share occasional AI tips or useful tools with colleagues when I come across something helpful.",
              example: "I shared an AI prompting guide with my team in Slack after it helped me save time on a task.",
            },
            IC3: {
              text: "I help colleagues get started with AI tools and actively share what works in my area.",
              example: "I ran a 30-minute demo of a new AI coding assistant for the team and answered follow-up questions.",
            },
            IC4: {
              text: "I actively support AI adoption across the team — sharing best practices, identifying opportunities, and embedding AI into team processes.",
              example: "I built an internal guide on using AI for pull request descriptions that the whole engineering team now follows.",
            },
            IC5: {
              text: "I build durable internal resources — guides, tooling education, adoption roadmaps — that create lasting AI capability beyond my own practice.",
              example: "I authored our AI usage policy and ran a cross-department workshop that increased active AI tool usage by 60%.",
            },
          },
        },
      ],
    },
  ],
};

// ── General M competencies (levels M4–M6) ──────────────────────────────────

export const GENERAL_M: CompetencySet = {
  jobFamilyName: "General",
  track: "M",
  levels: ["M4", "M5", "M6"],
  themes: [
    {
      id: "m_influence",
      name: "Influence",
      fullName: "Influence & Organisational Scope",
      description: "How you shape strategy, accountability, and impact across teams.",
      subdimensions: [
        {
          id: "m_influence__scope",
          name: "Team Scope & Accountability",
          statements: {
            M4: {
              text: "I lead a small functional team, cascade strategy from senior management, and am accountable for my team's results.",
              example: "I coordinated a 3-person team to deliver a quarterly roadmap milestone, managing priorities and clearing blockers.",
            },
            M5: {
              text: "I oversee a major function with several teams or a larger department, setting strategic direction and managing performance.",
              example: "I owned the P&L for our product team of 12 and drove a 20% improvement in delivery velocity over two quarters.",
            },
            M6: {
              text: "I am accountable for an entire brand or major function, setting vision and contributing directly to the group-wide roadmap.",
              example: "I defined our brand's 3-year technology strategy and presented it to the board, securing a major platform investment.",
            },
          },
        },
        {
          id: "m_influence__strategy",
          name: "Strategic Impact",
          statements: {
            M4: {
              text: "I define my team's focus, expectations, and deliverables, owning goal-setting from a 3–6 month perspective.",
              example: "I ran our team's OKR planning cycle and aligned 4 people on a clear, measurable set of quarterly goals.",
            },
            M5: {
              text: "I set strategic direction, pursue growth and scaling opportunities, and guide managers in goal-setting and roadmapping.",
              example: "I initiated a new market expansion plan, aligned 3 managers behind it, and tracked results through a weekly steering cadence.",
            },
            M6: {
              text: "I define and communicate a compelling vision, manage the full strategy process, and plan 2+ years ahead.",
              example: "I led a brand-wide strategic planning process that resulted in a 3-year roadmap approved and funded by the board.",
            },
          },
        },
      ],
    },
    {
      id: "m_autonomy",
      name: "Autonomy",
      fullName: "Autonomy & Decision-Making",
      description: "How you make decisions and delegate within your management scope.",
      subdimensions: [
        {
          id: "m_autonomy__decisions",
          name: "Decision-Making Authority",
          statements: {
            M4: {
              text: "I make project and people decisions within my team, typically consulting senior management for larger or cross-functional calls.",
              example: "I made the call to reprioritise our sprint after a production issue, then communicated the decision to all stakeholders.",
            },
            M5: {
              text: "I independently make people decisions in my department, propose budgets, and take calculated risks.",
              example: "I hired 3 engineers on my own authority and reallocated budget between teams to meet a critical business deadline.",
            },
            M6: {
              text: "I am the final decision-maker for my department — including headcount and budget — and delegate responsibility broadly.",
              example: "I approved a €500 K tooling investment and reorganised my leadership team to support a new business priority.",
            },
          },
        },
        {
          id: "m_autonomy__delegation",
          name: "Delegation & Hands-On Balance",
          statements: {
            M4: {
              text: "I delegate effectively while staying hands-on with key operational responsibilities and setting clear expectations.",
              example: "I delegated project ownership to a senior team member while personally managing the client relationship.",
            },
            M5: {
              text: "I delegate projects based on team readiness and act as an impact multiplier, staying partially hands-on where needed.",
              example: "I delegated three major workstreams to team leads and focused my own time on unblocking cross-team dependencies.",
            },
            M6: {
              text: "I delegate responsibility broadly, focusing on strategic oversight with a deliberately hands-off approach to execution.",
              example: "I meet my four direct-report managers weekly at a strategic level, trusting them fully with day-to-day execution.",
            },
          },
        },
      ],
    },
    {
      id: "m_proficiency",
      name: "Proficiency",
      fullName: "Leadership Proficiency & Delivery",
      description: "How you execute as a manager and develop people.",
      subdimensions: [
        {
          id: "m_proficiency__delivery",
          name: "Delivery & Execution",
          statements: {
            M4: {
              text: "I lead team projects, clear roadblocks, and balance people management with hands-on delivery.",
              example: "I ran our quarterly planning, cleared a critical external dependency, and delivered the team's roadmap on time.",
            },
            M5: {
              text: "I own multiple roadmaps, drive key results for company growth, and understand organisational design.",
              example: "I restructured my team to remove a delivery bottleneck and we shipped 30% more in the following quarter.",
            },
            M6: {
              text: "I am accountable for multiple roadmaps and strategies, with a particular focus on mid-to-long-term (1–3+ years) goals.",
              example: "I set a 3-year technical direction and built the hiring plan required to execute against it.",
            },
          },
        },
        {
          id: "m_proficiency__people",
          name: "People Development & AI Leadership",
          statements: {
            M4: {
              text: "I provide quality feedback, support team members' career growth, and drive AI adoption within my team.",
              example: "I ran monthly career conversations, promoted one team member, and deployed an AI tool that saved the team 5 hours per week.",
            },
            M5: {
              text: "I develop other leaders, attract and retain top talent, and lead AI innovation in my department.",
              example: "I created a leadership development programme and promoted 2 team leads who now manage their own teams.",
            },
            M6: {
              text: "I grow Senior Managers and coaches, bringing profound management experience to the organisation.",
              example: "I run a quarterly leadership off-site and have mentored 3 senior managers who are now heads of their own departments.",
            },
          },
        },
      ],
    },
    {
      id: "m_collaboration",
      name: "Collaboration",
      fullName: "Communication & Stakeholder Management",
      description: "How you communicate and build relationships as a leader.",
      subdimensions: [
        {
          id: "m_collaboration__comms",
          name: "Communication & Reporting",
          statements: {
            M4: {
              text: "I share information transparently, explain management decisions clearly, and build relationships across the group.",
              example: "I wrote a weekly team digest and represented my function in our cross-brand working group.",
            },
            M5: {
              text: "I communicate impactful changes across saas.group, maintain a two-way feedback loop with the board, and lead cross-group initiatives.",
              example: "I presented our results at the quarterly business review and led a cross-brand efficiency initiative that saved €200 K.",
            },
            M6: {
              text: "I act as a connector between saas.group teams, lead cross-functional communication, and report key metrics and decisions to the board.",
              example: "I facilitated a group-wide strategy alignment session and authored the board report on our cross-brand KPIs.",
            },
          },
        },
        {
          id: "m_collaboration__culture",
          name: "Leadership Presence & Culture",
          statements: {
            M4: {
              text: "I create an inclusive environment, focus on team success and wellbeing, and align my team with company culture.",
              example: "I introduced team rituals that improved our team health score by 15 points over one quarter.",
            },
            M5: {
              text: "I manage difficult leadership situations effectively and proactively build cross-group collaboration.",
              example: "I managed a team conflict that had been escalated to me and restructured responsibilities to resolve the root cause.",
            },
            M6: {
              text: "I define the cultural direction for my organisation and model the behaviours I expect of managers and ICs alike.",
              example: "I rolled out a values refresh that involved 200+ people and improved our eNPS by 12 points.",
            },
          },
        },
      ],
    },
    {
      id: "m_ai",
      name: "AI Adoption",
      fullName: "AI Adoption & Organisational Capability",
      description: "How you drive AI adoption and build AI capability in your organisation.",
      subdimensions: [
        {
          id: "m_ai__adoption",
          name: "Team AI Adoption",
          statements: {
            M4: {
              text: "I ensure every team member has access to and is actively using appropriate AI tools, and I track the impact on throughput.",
              example: "I ran an AI tools onboarding session, got every engineer using Copilot, and showed a 15% velocity gain in our next retro.",
            },
            M5: {
              text: "I define the AI adoption roadmap for my department and embed AI-augmented workflows as team defaults.",
              example: "I mandated AI-assisted code reviews across my 4 teams, evaluated 3 tools, and adopted the best fit for security and integration.",
            },
            M6: {
              text: "I drive the organisation's AI adoption strategy, make tooling investment decisions, and set AI fluency standards org-wide.",
              example: "I led a €2 M AI tooling investment decision, set org-wide fluency requirements, and held managers accountable for adoption.",
            },
          },
        },
        {
          id: "m_ai__innovation",
          name: "AI Innovation & Enablement",
          statements: {
            M4: {
              text: "I create space for AI experimentation, track before/after impact, and identify AI-driven efficiency gains at the team level.",
              example: "I ran a one-week AI hackathon; one output became a production tool saving 8 hours per week.",
            },
            M5: {
              text: "I identify where AI can create new capabilities for the department — not just efficiency on existing work — and invest accordingly.",
              example: "I sponsored an AI-driven product recommendation feature that opened a new revenue stream for our brand.",
            },
            M6: {
              text: "I champion AI innovation externally — with customers, partners, and group-level stakeholders — as a competitive differentiator.",
              example: "I presented our AI strategy at a saas.group partner summit and signed a joint AI pilot with a major customer.",
            },
          },
        },
      ],
    },
  ],
};

// ── Engineering IC ────────────────────────────────────────────────────────────

export const ENGINEERING_IC: CompetencySet = {
  jobFamilyName: "Engineering",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    ...GENERAL_IC.themes,
    {
      id: "eng_design",
      name: "Software Design",
      fullName: "Software Design & Architecture",
      description: "How you design systems, data models, and security approaches.",
      subdimensions: [
        {
          id: "eng_design__systems",
          name: "System Design & Patterns",
          statements: {
            IC2: {
              text: "I understand basic design principles and work with familiar patterns, designing components with guidance from my lead.",
              example: "I designed a small microservice following our team's standard pattern, with a code review from my tech lead.",
            },
            IC3: {
              text: "I design moderately complex systems independently, applying design patterns appropriately to solve real problems.",
              example: "I designed a new payment integration service that handles 3 external APIs with a clean separation of concerns.",
            },
            IC4: {
              text: "I lead the design of complex, scalable, secure systems and guide architecture reviews across teams.",
              example: "I designed a distributed event system for our platform and ran architecture reviews with 3 product teams.",
            },
            IC5: {
              text: "I define our overall system architecture strategy and set data model and design standards across the organisation.",
              example: "I proposed and implemented our domain-driven design strategy, now adopted by all 6 product teams.",
            },
          },
        },
        {
          id: "eng_design__security",
          name: "Data Modelling & Security",
          statements: {
            IC2: {
              text: "I understand basic data model design and implement security best practices based on specifications.",
              example: "I designed a simple users table schema following our data modelling guide and applied input validation.",
            },
            IC3: {
              text: "I design efficient, normalised schemas and implement security best practices with occasional guidance.",
              example: "I redesigned our order data model to normalise 3 tables, reducing average query times by 30%.",
            },
            IC4: {
              text: "I design comprehensive data models for large-scale applications and mentor others in testing and security.",
              example: "I redesigned our multi-tenant data model for GDPR data isolation and mentored two engineers on the approach.",
            },
            IC5: {
              text: "I set standards for data models and define security principles for the organisation, conducting regular audits.",
              example: "I authored our data modelling standards and ran a security audit that identified and fixed 8 critical vulnerabilities.",
            },
          },
        },
      ],
    },
    {
      id: "eng_dev",
      name: "Software Development",
      fullName: "Software Development Practices",
      description: "How you write code, handle technical debt, and manage the codebase ecosystem.",
      subdimensions: [
        {
          id: "eng_dev__code",
          name: "Code Quality & Technical Ownership",
          statements: {
            IC2: {
              text: "I write clean, maintainable code with guidance, typically working on bugs and small independent components.",
              example: "I fixed a collection of UI bugs and built a new form component following our design system.",
            },
            IC3: {
              text: "I write high-quality, efficient code independently and implement features with minimal supervision.",
              example: "I built and shipped our new notification service independently, from design through to production deployment.",
            },
            IC4: {
              text: "I write and review complex, high-performance code, mentor junior engineers, and lead key technical decisions.",
              example: "I re-architected our real-time API to handle 10× load, then documented the patterns for the team.",
            },
            IC5: {
              text: "I drive coding standards across teams, lead highly complex technical projects, and mentor engineers at all levels.",
              example: "I designed our platform SDK now used by 4 external teams and published the engineering manifesto for our division.",
            },
          },
        },
        {
          id: "eng_dev__debt",
          name: "Technical Debt & Ecosystem",
          statements: {
            IC2: {
              text: "I learn to recognise technical debt and seek guidance on how to address it appropriately.",
              example: "I flagged a pattern of duplicated database queries to my lead and we added a refactoring ticket to the backlog.",
            },
            IC3: {
              text: "I identify technical debt during development and contribute to prioritisation discussions.",
              example: "I raised a technical debt sprint proposal that the team accepted, reducing our error rate by 40%.",
            },
            IC4: {
              text: "I make informed decisions about when to incur technical debt and evaluate external libraries and dependencies strategically.",
              example: "I evaluated 3 search libraries, made a build-vs-buy recommendation, and led the 6-week migration project.",
            },
            IC5: {
              text: "I lead the organisation's strategy for managing and reducing technical debt across all teams.",
              example: "I created our technical-debt scoring framework that helped 5 teams prioritise refactoring over 2 quarters.",
            },
          },
        },
      ],
    },
    {
      id: "eng_infra",
      name: "Infrastructure",
      fullName: "Infrastructure & Reliability",
      description: "How you build, maintain, and scale the infrastructure that keeps systems running.",
      subdimensions: [
        {
          id: "eng_infra__cicd",
          name: "CI/CD & Tooling",
          statements: {
            IC2: {
              text: "I understand basic DevOps principles and am familiar with CI/CD pipelines and containerisation basics.",
              example: "I added a new step to our GitHub Actions pipeline to run linting checks on every pull request.",
            },
            IC3: {
              text: "I implement and maintain CI/CD pipelines with minimal guidance and am proficient with Docker and Kubernetes.",
              example: "I migrated our service to a Kubernetes deployment with autoscaling and set up our staging environment.",
            },
            IC4: {
              text: "I design and maintain complex CI/CD workflows independently and lead infrastructure scaling efforts.",
              example: "I redesigned our deployment pipeline with blue-green deployments, reducing deployment risk by 90%.",
            },
            IC5: {
              text: "I define the DevOps strategy and best practices for the organisation.",
              example: "I led our infrastructure modernisation to a multi-cloud setup, training 10 engineers on the new approach.",
            },
          },
        },
        {
          id: "eng_infra__reliability",
          name: "Production Reliability",
          statements: {
            IC2: {
              text: "I assist in maintaining development and test environments and follow runbooks for routine operations.",
              example: "I set up local Docker environments for new team members and wrote the onboarding guide.",
            },
            IC3: {
              text: "I manage development, staging, and production environments, including migrations with occasional support.",
              example: "I coordinated a database migration across all environments and executed the production cutover with zero downtime.",
            },
            IC4: {
              text: "I ensure high reliability and availability of production systems through monitoring, SLOs, and incident management.",
              example: "I led our incident management review and implemented an SLO framework that reduced P1 incidents by 70%.",
            },
            IC5: {
              text: "I ensure the organisation's infrastructure is robust, scalable, and secure at a strategic level.",
              example: "I designed our disaster recovery strategy and ran a full DR test that validated 99.9% uptime capability.",
            },
          },
        },
      ],
    },
    {
      id: "eng_quality",
      name: "Quality & Testing",
      fullName: "Software Quality & Testing",
      description: "How you ensure the quality, correctness, and security of what you build.",
      subdimensions: [
        {
          id: "eng_quality__testing",
          name: "Testing Practices",
          statements: {
            IC2: {
              text: "I write unit and integration tests for my code and participate in testing and debugging sessions.",
              example: "I wrote tests for my new feature components with 85% coverage, catching 3 bugs before the release.",
            },
            IC3: {
              text: "I develop comprehensive test plans, write extensive tests, and conduct code reviews with a quality lens.",
              example: "I wrote a full test suite for our payment module including edge cases and led the code review for the feature.",
            },
            IC4: {
              text: "I define and enforce testing strategies, lead security reviews, and drive automated quality assurance across the team.",
              example: "I introduced contract testing across our microservices, reducing API breakages by 80%.",
            },
            IC5: {
              text: "I set the overall quality and security standards for the organisation and lead initiatives to improve practices across all teams.",
              example: "I launched our quality guild and defined the testing standards now adopted by all 5 engineering teams.",
            },
          },
        },
        {
          id: "eng_quality__review",
          name: "Code Review & Standards",
          statements: {
            IC2: {
              text: "I participate in code review processes using standard tools and leave constructive comments.",
              example: "I reviewed a pull request and left comments on variable naming and missing test coverage.",
            },
            IC3: {
              text: "I conduct thorough code reviews and ensure adherence to quality standards.",
              example: "I reviewed two colleagues' PRs, caught a race condition in one, and improved test coverage in the other.",
            },
            IC4: {
              text: "I lead code reviews, enforce coding standards across the team, and drive measurable quality improvements.",
              example: "I ran code-review training, created our PR checklist, and reduced critical production bugs by 50%.",
            },
            IC5: {
              text: "I drive the development and documentation of coding standards across all teams.",
              example: "I authored our engineering quality manifesto and rolled it out across 4 teams with a clear measurement framework.",
            },
          },
        },
      ],
    },
    {
      id: "eng_product",
      name: "Product Sense",
      fullName: "Product Sense & User-Centricity",
      description: "How you bring a user and product perspective to your engineering work.",
      subdimensions: [
        {
          id: "eng_product__user",
          name: "User Focus in Development",
          statements: {
            IC2: {
              text: "I understand basic user requirements, follow product specs closely, and consider the user experience in my code.",
              example: "I built a form component that matched the design spec and added accessible labels following WCAG guidelines.",
            },
            IC3: {
              text: "I collaborate with product and design to refine requirements and incorporate user feedback into development.",
              example: "I joined user research sessions and proposed two UX improvements that reduced form abandonment by 25%.",
            },
            IC4: {
              text: "I work closely with PMs to define features, advocate for users at every stage, and lead user-centric development efforts.",
              example: "I championed an accessibility audit, ran it with 3 users, and led the engineering effort to fix all critical issues.",
            },
            IC5: {
              text: "I collaborate with senior leadership on the technical vision for user experience and lead large-scale improvement initiatives.",
              example: "I designed our performance budget framework and led a 3-month optimisation project, taking our core web vitals score from 45 to 90.",
            },
          },
        },
        {
          id: "eng_product__collab",
          name: "Product Collaboration",
          statements: {
            IC2: {
              text: "I follow product specifications closely and ask clarifying questions before starting work to avoid misalignment.",
              example: "I asked my PM to clarify acceptance criteria before starting a feature, avoiding a mismatch that would have cost a full sprint.",
            },
            IC3: {
              text: "I participate in user testing and contribute technical insights in product reviews.",
              example: "I observed 3 users struggle with onboarding and proposed a technical solution that simplified the flow significantly.",
            },
            IC4: {
              text: "I participate in client meetings on technical topics and mentor others in user-centric engineering practices.",
              example: "I joined a client call to discuss our API, demonstrated a live prototype, and it became the basis for our next release.",
            },
            IC5: {
              text: "I ensure user-centric principles are embedded in our technical architecture and lead experience improvement at scale.",
              example: "I led our real-user monitoring implementation and used it to drive a 3-month performance improvement sprint.",
            },
          },
        },
      ],
    },
  ],
};

// ── Product Management IC ─────────────────────────────────────────────────────

export const PRODUCT_MANAGEMENT_IC: CompetencySet = {
  jobFamilyName: "Product Management",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    ...GENERAL_IC.themes,
    {
      id: "pm_execution",
      name: "Product Execution",
      fullName: "Product Execution",
      description: "How you specify, deliver, and ensure the quality of product features.",
      subdimensions: [
        {
          id: "pm_execution__spec",
          name: "Feature Specification",
          statements: {
            IC2: {
              text: "I write clear, well-scoped specs for small to medium features with guidance from my PM lead.",
              example: "I wrote the spec for a new filter feature on our search page, incorporating feedback from design and engineering.",
            },
            IC3: {
              text: "I independently write comprehensive specs for complex features, including edge cases, metrics, and acceptance criteria.",
              example: "I specified our new onboarding flow end-to-end, including failure states, A/B test plan, and success metrics.",
            },
            IC4: {
              text: "I define specifications for large, cross-team initiatives and set standards for how my team writes requirements.",
              example: "I created our product requirements template and led the spec process for a platform-wide API redesign affecting 5 teams.",
            },
            IC5: {
              text: "I shape the product definition process across the organisation, raising the bar for how requirements are discovered, articulated, and validated.",
              example: "I introduced a Jobs-to-Be-Done framework across the product function, improving feature adoption rates by 40%.",
            },
          },
        },
        {
          id: "pm_execution__delivery",
          name: "Product Delivery",
          statements: {
            IC2: {
              text: "I support delivery by tracking progress, removing small blockers, and keeping stakeholders updated.",
              example: "I tracked our sprint delivery in Jira, flagged a blocked ticket early, and updated the team in standup.",
            },
            IC3: {
              text: "I drive the delivery of significant features end-to-end, coordinating across engineering, design, and QA.",
              example: "I managed the delivery of our new reporting module, running the weekly delivery sync and clearing blockers with 3 teams.",
            },
            IC4: {
              text: "I lead delivery of large, complex, cross-team programmes from discovery through to launch and iteration.",
              example: "I delivered a new self-serve onboarding flow across 4 teams that increased free-trial conversion by 18%.",
            },
            IC5: {
              text: "I set delivery standards for the whole product organisation, creating durable systems that improve how we ship.",
              example: "I introduced our launch readiness framework, reducing critical post-launch bugs by 60% across all product teams.",
            },
          },
        },
      ],
    },
    {
      id: "pm_customer",
      name: "Customer Insight",
      fullName: "Customer Insight & Data",
      description: "How you use data and customer feedback to make great decisions.",
      subdimensions: [
        {
          id: "pm_customer__data",
          name: "Data Fluency",
          statements: {
            IC2: {
              text: "I use product analytics tools to answer defined questions and support my decisions with data.",
              example: "I pulled funnel conversion data from Mixpanel to support a prioritisation argument in our planning session.",
            },
            IC3: {
              text: "I define metrics for my features, instrument them correctly, and use data to iterate and improve outcomes.",
              example: "I set up our new feature's event tracking, ran a post-launch analysis, and made 3 data-driven improvements.",
            },
            IC4: {
              text: "I own the measurement strategy for my product area, design experiments, and use data to drive strategic direction.",
              example: "I designed and ran an A/B test across 100,000 users, presenting findings that changed our pricing model.",
            },
            IC5: {
              text: "I define the data and measurement culture for the product function and identify new strategic insights from data at scale.",
              example: "I built our product analytics capability from scratch, including a self-serve dashboard used by 15 PMs across the group.",
            },
          },
        },
        {
          id: "pm_customer__voc",
          name: "Voice of the Customer",
          statements: {
            IC2: {
              text: "I participate in customer interviews and synthesise feedback into clear insights for the team.",
              example: "I ran 5 customer interviews for a new feature and summarised key themes in a research readout.",
            },
            IC3: {
              text: "I conduct user research independently, synthesise insights, and translate them into clear product decisions.",
              example: "I ran a discovery sprint with 8 customers that revealed a critical unmet need, leading to a reprioritised roadmap.",
            },
            IC4: {
              text: "I build systematic feedback loops and lead qualitative and quantitative research across my product area.",
              example: "I established our quarterly customer advisory board and used insights to define our next 6-month roadmap direction.",
            },
            IC5: {
              text: "I shape the customer research strategy for the product organisation and connect customer insights to company-level strategy.",
              example: "I designed our continuous discovery programme that now generates weekly customer insights for 5 product teams.",
            },
          },
        },
      ],
    },
    {
      id: "pm_strategy",
      name: "Product Strategy",
      fullName: "Product Strategy & Vision",
      description: "How you shape the direction and business outcomes of your product.",
      subdimensions: [
        {
          id: "pm_strategy__roadmap",
          name: "Vision & Roadmapping",
          statements: {
            IC2: {
              text: "I contribute ideas to our roadmap planning and help prioritise features using frameworks like RICE or ICE.",
              example: "I scored 10 features using our prioritisation framework in preparation for the quarterly planning session.",
            },
            IC3: {
              text: "I own the roadmap for a significant product area and justify priorities clearly to stakeholders.",
              example: "I built and presented the 6-month roadmap for our integrations area, getting alignment from 4 stakeholders.",
            },
            IC4: {
              text: "I own and communicate a compelling product vision, connecting roadmap to company strategy and business outcomes.",
              example: "I wrote our product vision for the next 2 years and got it endorsed by the CPO, shaping our annual planning.",
            },
            IC5: {
              text: "I set the long-term product direction for the organisation and influence company strategy through the product lens.",
              example: "I defined our platform strategy that unlocked a new enterprise segment and contributed to doubling ARR.",
            },
          },
        },
        {
          id: "pm_strategy__market",
          name: "Market Sensitivity & Business Outcomes",
          statements: {
            IC2: {
              text: "I understand our market positioning and the key business metrics my product area affects.",
              example: "I researched 3 competitors and shared a comparison summary with my team to inform a feature decision.",
            },
            IC3: {
              text: "I monitor the competitive landscape and tie product decisions to specific business outcomes.",
              example: "I noticed a competitor launch that overlapped with our roadmap and proposed a 2-week pivot that protected our positioning.",
            },
            IC4: {
              text: "I anticipate market shifts and build them proactively into our product strategy and roadmap.",
              example: "I identified an emerging customer segment 6 months before it became mainstream and got our product ready ahead of competitors.",
            },
            IC5: {
              text: "I define the market positioning strategy for the organisation and lead initiatives that create durable competitive advantage.",
              example: "I led our market expansion into a new vertical, defining positioning, pricing, and go-to-market from scratch.",
            },
          },
        },
      ],
    },
    {
      id: "pm_people",
      name: "Stakeholder Management",
      fullName: "Stakeholder Management & Influence",
      description: "How you manage up, across, and with external partners to get things done.",
      subdimensions: [
        {
          id: "pm_people__stakeholders",
          name: "Managing Up & Across",
          statements: {
            IC2: {
              text: "I communicate progress clearly to my direct stakeholders and flag risks early.",
              example: "I gave a weekly status update to my PM lead and flagged a scope risk 2 weeks before it became a problem.",
            },
            IC3: {
              text: "I manage multiple stakeholders effectively, aligning different perspectives and driving decisions.",
              example: "I ran a cross-functional alignment session with Engineering, Design, and Sales that unblocked a stalled feature.",
            },
            IC4: {
              text: "I lead complex stakeholder situations, navigate conflicting priorities, and build executive trust through transparent communication.",
              example: "I managed a difficult conversation with our CEO about a delayed launch, proposed a revised plan, and maintained confidence.",
            },
            IC5: {
              text: "I build and manage relationships at the board and executive level, shaping company priorities through product strategy.",
              example: "I presented our product strategy directly to the board, leading to a €2 M investment in our roadmap.",
            },
          },
        },
      ],
    },
  ],
};

// ── Product Design IC ─────────────────────────────────────────────────────────

export const PRODUCT_DESIGN_IC: CompetencySet = {
  jobFamilyName: "Product Design",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    ...GENERAL_IC.themes,
    {
      id: "design_research",
      name: "User Research",
      fullName: "User Research & Vision",
      description: "How you discover user needs and shape the design direction.",
      subdimensions: [
        {
          id: "design_research__research",
          name: "User Research",
          statements: {
            IC2: {
              text: "I assist in user research sessions, take notes, and synthesise basic findings.",
              example: "I took notes in 5 usability tests and summarised key pain points for the team.",
            },
            IC3: {
              text: "I plan and run user research independently, translating insights into clear design decisions.",
              example: "I ran a usability study on our checkout flow and identified 3 critical friction points that shaped the next sprint.",
            },
            IC4: {
              text: "I lead research programmes across a product area, using mixed methods to build deep user understanding.",
              example: "I designed a longitudinal study tracking 20 users over 3 months, surfacing insights that drove a major feature pivot.",
            },
            IC5: {
              text: "I define the research strategy for the design organisation and connect user insight to company-level decisions.",
              example: "I established our continuous discovery programme, with weekly user insights shared across the entire product organisation.",
            },
          },
        },
        {
          id: "design_research__vision",
          name: "Vision & Direction",
          statements: {
            IC2: {
              text: "I contribute to design explorations and support the team in shaping the product vision.",
              example: "I created 3 concept sketches for a new feature that the team used as starting points for the design sprint.",
            },
            IC3: {
              text: "I develop clear design visions for features and articulate how they connect to user needs and business goals.",
              example: "I created a design vision deck for our redesigned dashboard that got stakeholder buy-in in the first review.",
            },
            IC4: {
              text: "I set the design direction for a major product area and align stakeholders around a compelling long-term vision.",
              example: "I defined the 18-month design direction for our mobile app, aligning 3 squads and the CPO around a cohesive experience.",
            },
            IC5: {
              text: "I shape the product's design vision at the highest level and ensure consistency across the entire user experience.",
              example: "I created and published our product experience principles that all 8 designers now use as their decision-making framework.",
            },
          },
        },
      ],
    },
    {
      id: "design_craft",
      name: "Design Craft",
      fullName: "Interaction & Visual Design",
      description: "The craft behind the interfaces and experiences you create.",
      subdimensions: [
        {
          id: "design_craft__interaction",
          name: "Interaction Design",
          statements: {
            IC2: {
              text: "I design clear, functional interactions for well-defined problems, following our design patterns.",
              example: "I designed the interaction model for a new settings panel, following our component library and interaction guidelines.",
            },
            IC3: {
              text: "I design complex, multi-step interactions independently that are intuitive and reduce cognitive load for users.",
              example: "I designed the entire interaction model for our wizard-based onboarding flow, reducing completion time by 30%.",
            },
            IC4: {
              text: "I lead interaction design for large, complex product areas and define patterns that the whole team can reuse.",
              example: "I designed our drag-and-drop editor interaction model, which became the standard for all 4 editor views in the product.",
            },
            IC5: {
              text: "I define the interaction design principles and standards for the organisation, shaping how all products feel to use.",
              example: "I authored our interaction design language, adopted across 3 product lines and cited in our investor pitch.",
            },
          },
        },
        {
          id: "design_craft__visual",
          name: "Visual Design",
          statements: {
            IC2: {
              text: "I create visually clean, consistent designs that follow the design system and brand guidelines.",
              example: "I designed a new empty-state screen using our design system tokens, matching the existing visual language precisely.",
            },
            IC3: {
              text: "I produce polished, high-quality visual designs that balance aesthetics with usability.",
              example: "I redesigned our dashboard cards, improving visual hierarchy and receiving strong positive feedback in user testing.",
            },
            IC4: {
              text: "I set the visual quality bar for my product area and evolve the design language as the product grows.",
              example: "I led a visual refresh of our marketing site, establishing updated typography and colour use adopted across the product.",
            },
            IC5: {
              text: "I define the visual design direction for the organisation and ensure visual excellence at scale.",
              example: "I led a full brand expression refresh in the product, coordinating 5 designers over 4 months.",
            },
          },
        },
      ],
    },
    {
      id: "design_systems",
      name: "Design Systems",
      fullName: "Design Systems & Information Architecture",
      description: "How you build scalable design foundations and structure information.",
      subdimensions: [
        {
          id: "design_systems__systems",
          name: "Design Systems",
          statements: {
            IC2: {
              text: "I use the design system correctly and flag inconsistencies I notice in the product.",
              example: "I used our component library to build a new screen and raised a Jira ticket for an inconsistent button style I noticed.",
            },
            IC3: {
              text: "I contribute new components to the design system and document how they should be used.",
              example: "I designed and documented our new date-picker component, which is now used across 6 different flows.",
            },
            IC4: {
              text: "I govern the design system for my product area, ensuring components are reusable, accessible, and well-documented.",
              example: "I led a design system audit, reduced our component count by 30%, and improved accessibility scores across the board.",
            },
            IC5: {
              text: "I define the design system strategy for the organisation and ensure it scales effectively across products and teams.",
              example: "I architected our cross-product design system adopted by 3 brands, reducing design inconsistency by 70%.",
            },
          },
        },
        {
          id: "design_systems__ia",
          name: "Information Architecture",
          statements: {
            IC2: {
              text: "I organise information logically within screens, following established navigation patterns.",
              example: "I restructured a settings page to follow our IA guidelines, improving findability in a quick usability check.",
            },
            IC3: {
              text: "I design information architectures for features and validate them with users through card sorting and tree testing.",
              example: "I ran a card-sorting exercise with 10 users to redesign our navigation structure, reducing time-to-find by 25%.",
            },
            IC4: {
              text: "I lead information architecture decisions for a whole product area, ensuring consistency and scalability as features grow.",
              example: "I restructured the IA for our entire settings product, reducing support tickets about 'where to find X' by 45%.",
            },
            IC5: {
              text: "I define the information architecture principles for the organisation and ensure structural consistency across all products.",
              example: "I led a cross-product IA alignment project that created a shared taxonomy adopted by 5 product teams.",
            },
          },
        },
      ],
    },
    {
      id: "design_execution",
      name: "Execution & Facilitation",
      fullName: "Prototyping, Facilitation & Data",
      description: "How you bring designs to life, run workshops, and use data.",
      subdimensions: [
        {
          id: "design_execution__proto",
          name: "Prototyping",
          statements: {
            IC2: {
              text: "I create basic click-through prototypes to communicate my designs to stakeholders and for user testing.",
              example: "I built a Figma prototype for a new settings flow and used it in a usability test with 3 internal users.",
            },
            IC3: {
              text: "I build high-fidelity, interactive prototypes that accurately represent complex interactions for testing and sign-off.",
              example: "I built a full interactive prototype of our checkout redesign that the engineering team used as the handoff specification.",
            },
            IC4: {
              text: "I prototype at multiple fidelity levels strategically and use prototypes to validate complex technical and design tradeoffs.",
              example: "I built a functional prototype of our drag-and-drop editor to validate technical feasibility before committing to the design.",
            },
            IC5: {
              text: "I use advanced prototyping to validate strategic bets and demonstrate design value to senior leadership and investors.",
              example: "I created an animated vision prototype that secured €500 K in investment for a new product area.",
            },
          },
        },
        {
          id: "design_execution__data",
          name: "Data Literacy",
          statements: {
            IC2: {
              text: "I use quantitative data to evaluate my designs and support decisions in reviews.",
              example: "I used Hotjar click maps to validate that users were finding the CTAs I redesigned more easily.",
            },
            IC3: {
              text: "I define metrics for my designs, analyse results, and iterate based on quantitative evidence.",
              example: "I defined the success metrics for our new onboarding flow and used funnel data to make 3 post-launch improvements.",
            },
            IC4: {
              text: "I own the measurement strategy for my design area and use data to drive design direction and prioritisation.",
              example: "I built a design metrics dashboard tracking UX quality across 5 product areas, used in quarterly planning.",
            },
            IC5: {
              text: "I define the data strategy for the design organisation and use data to shape the product's long-term direction.",
              example: "I led a company-wide UX benchmarking initiative that became the basis for our 18-month product quality roadmap.",
            },
          },
        },
      ],
    },
  ],
};

// ── Customer Support IC ───────────────────────────────────────────────────────

export const CUSTOMER_SUPPORT_IC: CompetencySet = {
  jobFamilyName: "Customer Support",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    ...GENERAL_IC.themes,
    {
      id: "cs_knowledge",
      name: "Knowledge & Expertise",
      fullName: "Product Knowledge & Issue Resolution",
      description: "How deeply you understand the product and resolve customer issues.",
      subdimensions: [
        {
          id: "cs_knowledge__product",
          name: "Product Knowledge",
          statements: {
            IC2: {
              text: "I have a solid foundation of product knowledge and resolve common customer questions independently.",
              example: "I handled 40+ tickets per week for our core features, resolving 85% without escalation.",
            },
            IC3: {
              text: "I have deep product knowledge across multiple areas and can diagnose complex issues quickly.",
              example: "I diagnosed a tricky integration failure by combining product knowledge with API log analysis, resolving it in under 30 minutes.",
            },
            IC4: {
              text: "I am a product expert, resolving the most complex edge cases and contributing to the product team's roadmap with insights from support.",
              example: "I identified a recurring issue pattern, documented it, and the product team shipped a fix that reduced our ticket volume by 20%.",
            },
            IC5: {
              text: "I define knowledge management strategy for the support team and act as the primary product expert for escalations.",
              example: "I built our support knowledge base from scratch, now used by 10 support agents and reducing average handle time by 35%.",
            },
          },
        },
        {
          id: "cs_knowledge__resolution",
          name: "Issue Resolution & Escalation",
          statements: {
            IC2: {
              text: "I follow established escalation paths and resolve issues within my scope, handing off appropriately when needed.",
              example: "I resolved a billing query following our standard process and escalated a technical edge case to the right engineer.",
            },
            IC3: {
              text: "I resolve complex issues end-to-end, coordinating across teams when needed, and I keep customers informed throughout.",
              example: "I managed a complex data migration issue for a key customer, coordinating with Engineering and Account Management to resolve it.",
            },
            IC4: {
              text: "I handle the most critical escalations and drive systemic improvements that prevent recurring issues.",
              example: "I managed a P0 incident affecting 50 enterprise customers, coordinating the response and running the post-mortem.",
            },
            IC5: {
              text: "I define the escalation and resolution strategy for the support organisation and ensure systemic improvements from every major incident.",
              example: "I redesigned our escalation framework, reducing average time-to-resolution for P1 issues by 60%.",
            },
          },
        },
      ],
    },
    {
      id: "cs_experience",
      name: "Customer Experience",
      fullName: "Customer Experience & Process Improvement",
      description: "How you deliver exceptional experiences and improve the way support works.",
      subdimensions: [
        {
          id: "cs_experience__satisfaction",
          name: "Customer Communication & Satisfaction",
          statements: {
            IC2: {
              text: "I communicate with customers clearly and empathetically, maintaining professionalism in all interactions.",
              example: "I received consistent 4.8/5 CSAT scores across my first 200 tickets by focusing on clear, empathetic replies.",
            },
            IC3: {
              text: "I handle difficult customer situations with confidence and turn negative experiences into positive ones.",
              example: "I de-escalated a frustrated enterprise customer by acknowledging their impact, proposing a workaround, and agreeing a follow-up plan.",
            },
            IC4: {
              text: "I drive customer satisfaction metrics across the team and lead difficult executive-level conversations on behalf of the company.",
              example: "I led a quarterly business review with our top 5 customers and used feedback to drive 3 product improvements.",
            },
            IC5: {
              text: "I define the customer experience vision for the support function and ensure it aligns with our company's brand and values.",
              example: "I wrote our customer experience manifesto and ran training that improved team CSAT from 4.2 to 4.7 over one quarter.",
            },
          },
        },
        {
          id: "cs_experience__process",
          name: "Process Improvement",
          statements: {
            IC2: {
              text: "I follow team processes and flag inefficiencies I notice in my daily work.",
              example: "I noticed that we were re-explaining the same setup steps in 20% of tickets and suggested adding a help article link to our template.",
            },
            IC3: {
              text: "I proactively improve support processes, create documentation, and reduce ticket volume through self-serve improvements.",
              example: "I wrote 12 help centre articles that reduced inbound tickets on our new feature by 30%.",
            },
            IC4: {
              text: "I own the process improvement roadmap for my support area, using data to identify and prioritise the highest-impact changes.",
              example: "I analysed 6 months of ticket data, identified the top 5 ticket drivers, and led a cross-functional initiative to address each.",
            },
            IC5: {
              text: "I define the operational excellence strategy for the support organisation and lead the transformation of how support scales.",
              example: "I implemented a tiered support model and AI-assisted triage that scaled our team capacity by 50% without new hires.",
            },
          },
        },
      ],
    },
    {
      id: "cs_collab",
      name: "Collaboration",
      fullName: "Cross-Team Collaboration",
      description: "How you work with product, engineering, and other teams to improve outcomes.",
      subdimensions: [
        {
          id: "cs_collab__cross",
          name: "Cross-Functional Impact",
          statements: {
            IC2: {
              text: "I share customer feedback with the product team and participate in cross-team meetings.",
              example: "I flagged 5 recurring bugs to Engineering in our weekly sync and tracked their resolution.",
            },
            IC3: {
              text: "I build strong relationships with product and engineering, representing the voice of the customer proactively.",
              example: "I joined the product team's sprint reviews for 2 months to ensure customer insights shaped the roadmap.",
            },
            IC4: {
              text: "I am a strategic partner to product and engineering, using support data to influence product direction.",
              example: "I built a monthly customer pain-point report that is now a standing agenda item in product planning.",
            },
            IC5: {
              text: "I set the strategy for how the support function partners with other teams and ensures customer voice is central to company decision-making.",
              example: "I established the Support Partner programme, embedding support specialists in 3 product squads.",
            },
          },
        },
      ],
    },
  ],
};

// ── Marketing IC ──────────────────────────────────────────────────────────────

export const MARKETING_IC: CompetencySet = {
  jobFamilyName: "Marketing",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    ...GENERAL_IC.themes,
    {
      id: "mkt_strategy",
      name: "Marketing Strategy",
      fullName: "Marketing Strategy & Business Integration",
      description: "How you connect marketing activities to business strategy and outcomes.",
      subdimensions: [
        {
          id: "mkt_strategy__strategy",
          name: "Strategic Thinking",
          statements: {
            IC2: {
              text: "I understand our marketing strategy and execute campaigns within the established plan.",
              example: "I executed our email nurture campaign following the strategy document, hitting all campaign milestones on time.",
            },
            IC3: {
              text: "I contribute to marketing strategy, identifying opportunities and proposing initiatives backed by data.",
              example: "I identified a gap in our mid-funnel content and proposed a webinar series that generated 200 MQLs.",
            },
            IC4: {
              text: "I lead the strategy for significant marketing programmes and tie them to measurable business outcomes.",
              example: "I defined our ABM strategy for the enterprise segment, leading to a 30% increase in enterprise pipeline.",
            },
            IC5: {
              text: "I shape the marketing strategy for the organisation, connecting brand and demand to long-term business growth.",
              example: "I built our multi-year marketing plan that was approved by the board and became the foundation for our €3 M marketing budget.",
            },
          },
        },
        {
          id: "mkt_strategy__metrics",
          name: "Business Metrics & Attribution",
          statements: {
            IC2: {
              text: "I track the key metrics for my campaigns and report on performance regularly.",
              example: "I reported weekly on our paid campaign CTR, CPL, and conversion rates in our marketing standup.",
            },
            IC3: {
              text: "I own the measurement framework for my channel or programme and optimise based on full-funnel attribution.",
              example: "I set up multi-touch attribution in our CRM and used it to reallocate 20% of budget from low-performing channels.",
            },
            IC4: {
              text: "I define the measurement strategy for my marketing area and drive decisions based on ROI and business impact.",
              example: "I built our marketing ROI model and used it to secure a 40% budget increase for our highest-performing channels.",
            },
            IC5: {
              text: "I set the analytics and attribution strategy for the marketing organisation, connecting marketing investment to company-level financial outcomes.",
              example: "I introduced our closed-loop reporting system, enabling the board to see the direct revenue contribution of each marketing pound.",
            },
          },
        },
      ],
    },
    {
      id: "mkt_demand",
      name: "Demand Generation",
      fullName: "Lead Generation & Growth Channels",
      description: "How you generate and grow pipeline through demand and acquisition programmes.",
      subdimensions: [
        {
          id: "mkt_demand__funnel",
          name: "Lead Generation & Funnel Optimisation",
          statements: {
            IC2: {
              text: "I execute lead-generation campaigns across established channels and hit agreed volume targets.",
              example: "I ran our monthly webinar campaign and hit our 150-MQL target for the third consecutive month.",
            },
            IC3: {
              text: "I optimise the full funnel independently, identifying conversion drop-offs and running experiments to address them.",
              example: "I identified a 40% drop-off on our trial sign-up page, A/B tested 3 variants, and improved conversion by 18%.",
            },
            IC4: {
              text: "I own the lead-generation strategy for my segment and drive pipeline efficiency across the funnel.",
              example: "I redesigned our enterprise demand-gen programme, increasing MQL-to-SQL conversion from 12% to 22% in one quarter.",
            },
            IC5: {
              text: "I define the demand generation strategy for the organisation and build scalable systems that drive predictable pipeline growth.",
              example: "I built our demand generation playbook, covering all ICP segments and channels, adopted by 4 regional marketing teams.",
            },
          },
        },
        {
          id: "mkt_demand__channels",
          name: "Acquisition & Growth Channels",
          statements: {
            IC2: {
              text: "I execute campaigns across 1–2 channels I know well and report on their performance.",
              example: "I managed our LinkedIn ads account, running 3 campaigns per month with consistent ROAS reporting.",
            },
            IC3: {
              text: "I manage multiple acquisition channels, test new ones, and allocate spend to maximise ROI.",
              example: "I added Quora as a new channel, tested it for 6 weeks, and scaled it after validating a 3× ROAS.",
            },
            IC4: {
              text: "I own the acquisition channel mix across my segment, making strategic investment decisions based on blended CAC and LTV.",
              example: "I restructured our paid media mix to increase investment in high-LTV channels, improving blended CAC by 25%.",
            },
            IC5: {
              text: "I define the channel strategy for the marketing organisation and identify new growth vectors that others then execute.",
              example: "I identified and validated a new partner-led acquisition channel that now contributes 20% of new business pipeline.",
            },
          },
        },
      ],
    },
    {
      id: "mkt_content",
      name: "Content & SEO",
      fullName: "Content, SEO & Demand Engine",
      description: "How you create content and build organic channels that generate demand.",
      subdimensions: [
        {
          id: "mkt_content__content",
          name: "Content Strategy & Creation",
          statements: {
            IC2: {
              text: "I produce high-quality content assets following our messaging framework and content calendar.",
              example: "I wrote 4 blog posts per month following our style guide, with each consistently exceeding our 500-view benchmark.",
            },
            IC3: {
              text: "I own the content strategy for a programme or channel, creating content that drives measurable business outcomes.",
              example: "I built a thought leadership programme that grew our LinkedIn following by 60% and generated 50 inbound leads per month.",
            },
            IC4: {
              text: "I define the content strategy for my product area or market and build content engines that scale.",
              example: "I built a content programme targeting our ICP that became our top MQL-generating channel within 6 months.",
            },
            IC5: {
              text: "I set the content and editorial strategy for the organisation, positioning the company as an authoritative voice in our market.",
              example: "I launched our annual industry report that generated 2,000 media mentions and 500 enterprise MQLs in its first week.",
            },
          },
        },
      ],
    },
    {
      id: "mkt_automation",
      name: "Marketing Ops & AI",
      fullName: "Marketing Automation, AI & Operations",
      description: "How you use automation, AI, and operational excellence to scale marketing.",
      subdimensions: [
        {
          id: "mkt_automation__automation",
          name: "Marketing Automation & AI",
          statements: {
            IC2: {
              text: "I use our marketing automation tools effectively and follow established workflows.",
              example: "I set up email nurture sequences in HubSpot following our automation playbook for 3 new content campaigns.",
            },
            IC3: {
              text: "I design and build marketing automation workflows independently, using AI to improve content quality and efficiency.",
              example: "I built a multi-step lead scoring and nurture workflow that improved lead-to-opportunity conversion by 15%.",
            },
            IC4: {
              text: "I own the marketing automation strategy, integrate AI tools into our workflows, and drive efficiency improvements across the team.",
              example: "I integrated an AI content assistant into our content process, reducing production time by 40% while maintaining quality.",
            },
            IC5: {
              text: "I define the marketing technology and automation strategy for the organisation, building scalable systems that give us a competitive advantage.",
              example: "I designed our AI-powered personalisation engine, delivering 1:1 content experiences that increased email revenue by 35%.",
            },
          },
        },
      ],
    },
  ],
};

// ── Sales IC ───────────────────────────────────────────────────────────────────

export const SALES_IC: CompetencySet = {
  jobFamilyName: "Sales",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    ...GENERAL_IC.themes,
    {
      id: "sales_pipeline",
      name: "Pipeline Management",
      fullName: "Prospecting & Pipeline Management",
      description: "How you generate leads, manage your funnel, and drive revenue.",
      subdimensions: [
        {
          id: "sales_pipeline__prospecting",
          name: "Prospecting & Lead Generation",
          statements: {
            IC2: {
              text: "I prospect consistently using established methods and hit my weekly outreach targets.",
              example: "I sent 50 personalised outbound messages per week using our proven sequence and booked 6 discovery calls.",
            },
            IC3: {
              text: "I use multi-channel prospecting strategies to consistently fill my pipeline and meet my quota.",
              example: "I combined LinkedIn, email, and warm referrals to build a pipeline 3× my quarterly target.",
            },
            IC4: {
              text: "I develop prospecting strategies for my territory or segment and coach peers on what works.",
              example: "I created a new ICP definition for our mid-market segment and built a prospecting playbook now used by the whole team.",
            },
            IC5: {
              text: "I define the prospecting strategy for the sales organisation and identify new market segments and channels.",
              example: "I identified a new vertical with 5× LTV potential, validated it with 20 discovery calls, and built the go-to-market motion.",
            },
          },
        },
        {
          id: "sales_pipeline__funnel",
          name: "Sales Strategy & Funnel Management",
          statements: {
            IC2: {
              text: "I manage my pipeline in our CRM accurately and progress deals through the standard sales stages.",
              example: "I kept my Salesforce pipeline updated daily and advanced 3 deals from discovery to proposal stage in one week.",
            },
            IC3: {
              text: "I manage a complex pipeline across multiple deal stages, using data to prioritise my time on the highest-value opportunities.",
              example: "I identified my top 10 stalled deals using pipeline data, re-engaged 6, and closed 3 of them that quarter.",
            },
            IC4: {
              text: "I drive pipeline velocity and forecast with accuracy, and I develop strategies to improve win rates in my segment.",
              example: "I improved my close rate from 18% to 27% by implementing a structured discovery framework and sharing it with the team.",
            },
            IC5: {
              text: "I define the sales methodology and pipeline management standards for the organisation.",
              example: "I introduced our MEDDPICC qualification framework and trained 15 AEs, improving team win rate by 12% in two quarters.",
            },
          },
        },
      ],
    },
    {
      id: "sales_relationships",
      name: "Relationships",
      fullName: "Relationship Building & Interpersonal Skills",
      description: "How you build trust with customers and create long-term relationships.",
      subdimensions: [
        {
          id: "sales_relationships__building",
          name: "Relationship Building",
          statements: {
            IC2: {
              text: "I build professional relationships with my contacts and maintain regular check-ins with my accounts.",
              example: "I scheduled quarterly business reviews with my top 10 accounts and maintained a 90% response rate to check-in emails.",
            },
            IC3: {
              text: "I build deep, multi-threaded relationships with key stakeholders in my accounts and drive high renewal and expansion rates.",
              example: "I expanded an account from €20K to €80K ARR by building relationships with 3 additional stakeholders over 6 months.",
            },
            IC4: {
              text: "I manage executive-level relationships in strategic accounts and am seen as a trusted advisor.",
              example: "I become the go-to contact for the CTO at our largest account, leading to a 3-year contract renewal and a €200K upsell.",
            },
            IC5: {
              text: "I build and manage relationships at the board and C-suite level, creating strategic partnerships that go beyond individual deals.",
              example: "I established a strategic partnership with a global SI that became our #1 referral source and added €2M to pipeline.",
            },
          },
        },
        {
          id: "sales_relationships__interpersonal",
          name: "Interpersonal Skills & Resilience",
          statements: {
            IC2: {
              text: "I maintain a positive, professional attitude and recover quickly from rejection.",
              example: "I turned down a 'no' into a future opportunity by asking what would need to change, and closed the deal 3 months later.",
            },
            IC3: {
              text: "I adapt my communication style to different personalities and buying styles to build rapport effectively.",
              example: "I shifted from a ROI-focused pitch to a strategic vision pitch for a more visionary buyer and closed a €50K deal.",
            },
            IC4: {
              text: "I navigate complex group dynamics in enterprise deals and build consensus among multiple stakeholders.",
              example: "I managed a buying committee of 7, running separate discovery sessions and building a champion network that pushed the deal through.",
            },
            IC5: {
              text: "I set the standard for customer relationships across the sales organisation and coach others on executive engagement.",
              example: "I created our executive engagement playbook and trained 12 AEs on strategic selling at the board level.",
            },
          },
        },
      ],
    },
    {
      id: "sales_expertise",
      name: "Product & Market Knowledge",
      fullName: "Product, Industry & Business Acumen",
      description: "How deeply you understand the product, market, and customer's business.",
      subdimensions: [
        {
          id: "sales_expertise__product",
          name: "Product & Industry Knowledge",
          statements: {
            IC2: {
              text: "I have solid product knowledge across core use cases and can articulate our value proposition confidently.",
              example: "I ran a product demo for a prospect without support and answered all technical questions from notes.",
            },
            IC3: {
              text: "I have deep product and industry knowledge and use it to connect our solution to specific customer pain points.",
              example: "I used deep knowledge of e-commerce operations to position our product as a revenue-enabler, not just a tool, closing a €75K deal.",
            },
            IC4: {
              text: "I am the product and industry expert in my team, advising on complex deals and contributing to product roadmap discussions.",
              example: "I joined a deal review with the CPO and CTO on our side, led the technical discussion, and closed a €300K enterprise contract.",
            },
            IC5: {
              text: "I am an industry thought leader whose expertise shapes our positioning, competitive strategy, and product roadmap.",
              example: "I spoke at an industry conference and the talk generated 30 inbound leads and a partnership discussion with a major player.",
            },
          },
        },
        {
          id: "sales_expertise__negotiation",
          name: "Negotiation & Problem Solving",
          statements: {
            IC2: {
              text: "I negotiate standard terms confidently, using our standard playbook and escalating non-standard requests appropriately.",
              example: "I handled a pricing objection using our discount approval framework and closed the deal at 95% of list price.",
            },
            IC3: {
              text: "I negotiate complex commercial and legal terms, finding creative solutions that work for both sides.",
              example: "I structured a phased deal to overcome a budget constraint, protecting ARR and getting the customer live 2 months sooner.",
            },
            IC4: {
              text: "I lead negotiations for strategic deals and solve complex commercial problems that require cross-functional input.",
              example: "I led a €500K renewal negotiation, worked with Legal and Finance to create a custom commercial structure, and retained the account.",
            },
            IC5: {
              text: "I define the commercial framework and negotiation strategy for the sales organisation.",
              example: "I created our strategic pricing playbook and enterprise deal framework, improving margin on large deals by 15%.",
            },
          },
        },
      ],
    },
  ],
};

// ── Talent Acquisition IC ─────────────────────────────────────────────────────

export const TALENT_ACQUISITION_IC: CompetencySet = {
  jobFamilyName: "Talent Acquisition",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    ...GENERAL_IC.themes,
    {
      id: "ta_hiring",
      name: "Hiring Process",
      fullName: "End-to-End Hiring & Candidate Experience",
      description: "How you own the hiring process from job brief to offer accepted.",
      subdimensions: [
        {
          id: "ta_hiring__process",
          name: "End-to-End Hiring Process",
          statements: {
            IC2: {
              text: "I manage the full hiring cycle for defined roles, following our standard process and hitting time-to-fill targets.",
              example: "I sourced, screened, and coordinated the hiring process for 3 roles per month, hitting our 6-week time-to-fill target.",
            },
            IC3: {
              text: "I own complex hiring projects end-to-end, adapting the process to the role's needs and delivering high-quality shortlists.",
              example: "I ran a 10-week search for a VP Engineering role, sourcing candidates proactively and presenting a shortlist of 5 finalists.",
            },
            IC4: {
              text: "I lead hiring for multiple critical or senior roles simultaneously, improving quality and velocity across the funnel.",
              example: "I hired 12 engineers in one quarter across 3 brands by optimising our sourcing strategy and reducing interview-to-offer time by 30%.",
            },
            IC5: {
              text: "I define and continuously improve the hiring methodology for the organisation, setting the standard for how we attract and select talent.",
              example: "I redesigned our hiring process, introducing structured interviewing that improved offer acceptance rates from 70% to 88%.",
            },
          },
        },
        {
          id: "ta_hiring__experience",
          name: "Candidate Management & Experience",
          statements: {
            IC2: {
              text: "I keep candidates informed throughout the process and provide a professional, respectful experience.",
              example: "I maintained a 48-hour response SLA for all candidates and received consistent positive feedback in our post-process surveys.",
            },
            IC3: {
              text: "I actively build candidate relationships, turning silver-medal candidates into future hires or referrals.",
              example: "I nurtured a rejected finalist who later referred 3 strong hires and joined us 6 months later for a new opening.",
            },
            IC4: {
              text: "I design the candidate experience for critical roles and drive improvements across the whole TA team.",
              example: "I mapped our candidate journey, identified 4 friction points, and reduced candidate drop-off during the process by 25%.",
            },
            IC5: {
              text: "I define the candidate experience strategy for the organisation and ensure it reflects our employer brand and values.",
              example: "I led a full candidate experience overhaul, earning us a place on the 'Best Places to Interview' list in our market.",
            },
          },
        },
      ],
    },
    {
      id: "ta_partnering",
      name: "Business Partnering",
      fullName: "TA Business Partnering & Hiring Manager Advisory",
      description: "How you partner with the business and advise hiring managers.",
      subdimensions: [
        {
          id: "ta_partnering__hm",
          name: "Hiring Manager Advisory",
          statements: {
            IC2: {
              text: "I work effectively with hiring managers, briefing them on process and setting clear expectations.",
              example: "I ran an intake meeting for a new role, agreed the job brief, interview panel, and timeline with the hiring manager.",
            },
            IC3: {
              text: "I advise hiring managers on best practices, challenge unrealistic expectations, and keep hiring on track.",
              example: "I convinced a hiring manager to broaden the candidate profile, leading to a higher-quality hire in half the time.",
            },
            IC4: {
              text: "I am a trusted advisor to senior leaders, shaping how they think about talent needs and team design.",
              example: "I partnered with a CTO to redesign an engineering team structure ahead of a hiring round, improving the team's long-term capability.",
            },
            IC5: {
              text: "I shape the talent strategy for the organisation, advising the leadership team and board on workforce planning.",
              example: "I presented our 3-year workforce plan to the board, connecting hiring needs to our product roadmap and financial forecasts.",
            },
          },
        },
        {
          id: "ta_partnering__strategy",
          name: "TA Operational Excellence & Data",
          statements: {
            IC2: {
              text: "I keep our ATS accurate and use standard reports to track my open roles.",
              example: "I maintained 100% data hygiene in Lever for my roles and used the pipeline report to flag stalled candidates each week.",
            },
            IC3: {
              text: "I use TA data to identify bottlenecks in my hiring funnel and make evidence-based improvements.",
              example: "I spotted a 50% drop-off at our technical test stage, ran an analysis, and simplified the test — improving pass rates by 20%.",
            },
            IC4: {
              text: "I own the TA metrics framework for my team and use data to drive hiring strategy and process improvements.",
              example: "I built our TA dashboard tracking source quality, pipeline velocity, and DEI data — now used in monthly leadership reviews.",
            },
            IC5: {
              text: "I define the data and operational strategy for the TA function, building systems that enable the organisation to scale hiring efficiently.",
              example: "I implemented a TA operating model with defined SLAs, reporting standards, and automation that scaled us from 50 to 200 hires per year.",
            },
          },
        },
      ],
    },
    {
      id: "ta_channels",
      name: "Candidate Channels",
      fullName: "Candidate Channels Management",
      description: "How you manage and optimise sourcing channels to build talent pipelines.",
      subdimensions: [
        {
          id: "ta_channels__sourcing",
          name: "Sourcing & Channel Management",
          statements: {
            IC2: {
              text: "I use established sourcing channels effectively and build basic talent pipelines for my roles.",
              example: "I used LinkedIn Recruiter and our ATS database to source 40 candidates per role, identifying 8 strong profiles per search.",
            },
            IC3: {
              text: "I build talent communities and use creative sourcing strategies to find passive candidates others miss.",
              example: "I built a network of 200 engineering candidates through GitHub, conferences, and community events for a hard-to-fill role.",
            },
            IC4: {
              text: "I define the sourcing strategy for my hiring area and optimise our channel mix based on quality and cost data.",
              example: "I restructured our sourcing budget, shifting 30% from job boards to referrals and direct sourcing, reducing CPH by 40%.",
            },
            IC5: {
              text: "I define the employer branding and candidate channel strategy for the organisation, building a talent pipeline that future-proofs our growth.",
              example: "I built our employer brand strategy from scratch, including our presence on LinkedIn, Glassdoor, and 4 niche communities, generating 3× more inbound applications.",
            },
          },
        },
      ],
    },
  ],
};

// ── Accounting IC ─────────────────────────────────────────────────────────────

export const ACCOUNTING_IC: CompetencySet = {
  jobFamilyName: "Accounting",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    ...GENERAL_IC.themes,
    {
      id: "acc_standards",
      name: "Standards & Compliance",
      fullName: "Accounting Standards & Core Operations",
      description: "How you apply accounting standards and manage core accounting operations.",
      subdimensions: [
        {
          id: "acc_standards__compliance",
          name: "Accounting Standards & Compliance",
          statements: {
            IC2: {
              text: "I apply accounting standards correctly in my daily work and follow established compliance procedures.",
              example: "I prepared monthly journal entries in accordance with IFRS, with all entries reviewed and approved without material corrections.",
            },
            IC3: {
              text: "I apply accounting standards to complex transactions independently and flag compliance risks proactively.",
              example: "I identified a lease that needed to be recognised under IFRS 16, prepared the initial measurement, and documented the rationale.",
            },
            IC4: {
              text: "I lead the application of accounting standards across my area and provide technical guidance to the team.",
              example: "I authored our revenue recognition policy under IFRS 15, trained the team, and led the external audit discussion on the topic.",
            },
            IC5: {
              text: "I define the accounting standards and technical accounting policy for the organisation.",
              example: "I led our IFRS conversion project, covering 5 entities across 4 countries, on time and with a clean audit opinion.",
            },
          },
        },
        {
          id: "acc_standards__operations",
          name: "Core Accounting Operations",
          statements: {
            IC2: {
              text: "I handle routine accounting tasks accurately and meet monthly close deadlines consistently.",
              example: "I completed my assigned close tasks — AP accruals, bank reconciliations, and prepayment schedules — before the deadline every month.",
            },
            IC3: {
              text: "I manage a significant area of the month-end close independently, ensuring accuracy and timely completion.",
              example: "I owned the full month-end close for our SaaS entity, including all reconciliations, and delivered to the group in 3 days.",
            },
            IC4: {
              text: "I lead the month-end close process for multiple entities, improving speed and quality through process enhancements.",
              example: "I reduced our group close from 12 days to 7 by implementing parallel workstreams and automated reconciliation templates.",
            },
            IC5: {
              text: "I define the accounting operating model for the organisation and ensure it scales effectively as the business grows.",
              example: "I designed our shared-service centre model, centralising accounting operations for 8 entities and saving €400K in annual costs.",
            },
          },
        },
      ],
    },
    {
      id: "acc_reporting",
      name: "Reporting & Revenue",
      fullName: "Financial Reporting & Revenue Recognition",
      description: "How you handle financial reporting, group consolidation, and revenue accounting.",
      subdimensions: [
        {
          id: "acc_reporting__revenue",
          name: "Revenue Recognition & Billing",
          statements: {
            IC2: {
              text: "I process revenue transactions correctly and reconcile billing data to the general ledger.",
              example: "I reconciled our monthly subscription billing file to the GL with no unexplained variances for 6 consecutive months.",
            },
            IC3: {
              text: "I manage the revenue recognition process for complex contract types and ensure accurate billing for key customers.",
              example: "I resolved a complex multi-element arrangement under IFRS 15, documenting the SSP allocation and gaining auditor agreement.",
            },
            IC4: {
              text: "I own the revenue accounting process, including complex arrangements, and lead improvements to revenue controls.",
              example: "I rebuilt our revenue waterfall model and automated the monthly recognition run, reducing risk and saving 3 days per close.",
            },
            IC5: {
              text: "I define the revenue accounting strategy and policy for the organisation, including for new business models.",
              example: "I defined our revenue accounting policy for our new marketplace model, navigating IFRS 15 principal/agent considerations and documenting the position for the board.",
            },
          },
        },
        {
          id: "acc_reporting__reporting",
          name: "Financial Reporting & Group Consolidation",
          statements: {
            IC2: {
              text: "I prepare sections of the financial statements accurately and support the group consolidation process.",
              example: "I prepared the notes to the financial statements for fixed assets and provided intercompany reconciliation data for the group pack.",
            },
            IC3: {
              text: "I prepare complete financial statements for an entity and contribute substantively to the group consolidation.",
              example: "I prepared the statutory accounts for our UK entity, managing the audit and filing process end-to-end.",
            },
            IC4: {
              text: "I own the group consolidation and financial reporting process and lead the relationship with external auditors.",
              example: "I managed our group close and the multi-entity consolidation across 6 entities, delivering clean audited accounts 2 weeks early.",
            },
            IC5: {
              text: "I define the group financial reporting strategy and drive improvements in how the board and investors receive financial information.",
              example: "I redesigned our board reporting pack, introducing forward-looking metrics and scenario analysis that improved the quality of board decisions.",
            },
          },
        },
      ],
    },
    {
      id: "acc_controls",
      name: "Controls & Systems",
      fullName: "Audit, Internal Controls & Systems",
      description: "How you design and maintain the control environment and improve accounting systems.",
      subdimensions: [
        {
          id: "acc_controls__audit",
          name: "Audit & Internal Controls",
          statements: {
            IC2: {
              text: "I support audit requests promptly and follow our internal control procedures.",
              example: "I provided 50+ audit samples within the agreed SLA and maintained all required control documentation.",
            },
            IC3: {
              text: "I manage audit deliverables independently and identify gaps in our control framework.",
              example: "I led our interim audit across AR and revenue, delivered all requests on time, and identified and fixed 2 control gaps.",
            },
            IC4: {
              text: "I lead the external audit process and own the internal controls framework for my accounting area.",
              example: "I managed our year-end audit for 3 entities, delivered a clean opinion, and designed a new SOX controls matrix for the group.",
            },
            IC5: {
              text: "I define the control environment and internal audit strategy for the organisation.",
              example: "I designed our risk-based internal controls framework, implemented it across 10 entities, and presented the findings to the audit committee.",
            },
          },
        },
        {
          id: "acc_controls__systems",
          name: "Systems, Tools & Process Improvement",
          statements: {
            IC2: {
              text: "I use our accounting systems accurately and suggest small improvements to repetitive tasks.",
              example: "I created an Excel macro that automated our AP ageing report, saving 2 hours per month.",
            },
            IC3: {
              text: "I improve accounting processes using automation and better use of existing systems.",
              example: "I automated our intercompany reconciliation in NetSuite, reducing the manual process from 4 hours to 15 minutes per month.",
            },
            IC4: {
              text: "I lead systems improvement projects, owning the accounting function's use of technology.",
              example: "I led the implementation of our expense management system across 5 entities, achieving 95% compliance in the first month.",
            },
            IC5: {
              text: "I define the accounting technology strategy and lead major system implementations for the organisation.",
              example: "I led the migration to our new ERP system for the group, coordinating 12 workstreams and achieving a clean go-live with zero data loss.",
            },
          },
        },
      ],
    },
  ],
};

// ── Lookup function ────────────────────────────────────────────────────────────

export function getCompetencySet(
  jobFamilyName: string | null | undefined,
  track: "IC" | "M"
): CompetencySet | null {
  if (track === "M") return GENERAL_M;

  switch (jobFamilyName) {
    case "Engineering":
      return ENGINEERING_IC;
    case "Product Management":
      return PRODUCT_MANAGEMENT_IC;
    case "Product Design":
      return PRODUCT_DESIGN_IC;
    case "Customer Support":
      return CUSTOMER_SUPPORT_IC;
    case "Marketing":
      return MARKETING_IC;
    case "Sales":
      return SALES_IC;
    case "Talent Acquisition":
      return TALENT_ACQUISITION_IC;
    case "Accounting":
      return ACCOUNTING_IC;
    default:
      return jobFamilyName ? GENERAL_IC : null;
  }
}
