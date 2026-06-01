// Self-levelling competency content — PRD §3 format.
// Each statement is a first-person "I..." declaration with a concrete real-life example.
// Level codes are hidden from the employee during the assessment (anti-bias principle §1.3).

import type { CompetencySet } from "./self-levelling-types";

// ─── General — IC Track ───────────────────────────────────────────────────────

export const GENERAL_IC: CompetencySet = {
  jobFamilyName: "General",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    {
      id: "influence",
      name: "Influence",
      fullName: "Influence & Organisational Impact",
      subdimensions: [
        {
          id: "gen-influence-scope",
          name: "Scope & Impact",
          statements: {
            IC2: {
              text: "I work closely with my immediate team and focus on delivering impact within my own tasks and peer group.",
              example: "I completed my assigned features on time and kept my squad updated on my progress, enabling others to plan their dependent work effectively.",
            },
            IC3: {
              text: "I collaborate across teams when needed, contribute insights to strategy discussions, and lead projects or coordinate cross-functional work.",
              example: "I led the coordination between our product and engineering teams for a feature launch, tracking dependencies and ensuring all stakeholders were aligned on the timeline.",
            },
            IC4: {
              text: "I lead high-impact projects across teams, advocate for business decisions to wider audiences, and own KPIs or roadmap elements.",
              example: "I presented our team's Q3 roadmap trade-offs to senior leadership and successfully argued for prioritising the reliability initiative, backed by churn risk data.",
            },
            IC5: {
              text: "I partner with senior leadership to set functional area strategy and drive strategic impact beyond my direct brand or team.",
              example: "I co-designed the group-wide content strategy with the VP of Marketing and three brand heads, presenting it at the annual leadership offsite and securing buy-in from all brands.",
            },
          },
        },
      ],
    },
    {
      id: "autonomy",
      name: "Autonomy",
      fullName: "Autonomy & Independent Ownership",
      subdimensions: [
        {
          id: "gen-autonomy-ownership",
          name: "Independent Ownership",
          statements: {
            IC2: {
              text: "I work with support from my team, follow established guidelines, and seek guidance on priorities and complex decisions.",
              example: "I checked with my lead before making a decision that would affect other team members' work, and we agreed on the right approach together.",
            },
            IC3: {
              text: "I am self-reliant in my area of expertise, work with general direction, and prioritise tasks effectively with minimal supervision.",
              example: "I managed a migration project end-to-end with just the brief from my manager — breaking it into tasks, setting my own deadlines, and flagging a blocker early enough to resolve it without delays.",
            },
            IC4: {
              text: "I lead projects without formal authority, make well-reasoned decisions independently, and proactively improve team and organisational processes.",
              example: "Without being asked, I identified inefficiency in our deployment pipeline and proposed a solution, then coordinated its implementation across three engineers while my manager was on leave.",
            },
            IC5: {
              text: "I am recognised as a key decision-maker in my area, shape organisational guidelines, and define priorities aligned with business strategy.",
              example: "I defined the framework our department now uses to evaluate build-vs-buy decisions for tooling, which has been adopted by two other teams after I presented it at the engineering all-hands.",
            },
          },
        },
      ],
    },
    {
      id: "proficiency",
      name: "Proficiency",
      fullName: "Proficiency & Expertise",
      subdimensions: [
        {
          id: "gen-proficiency-delivery",
          name: "Expertise & Delivery Quality",
          statements: {
            IC2: {
              text: "I handle small to medium tasks confidently, use familiar tools to solve problems, and actively seek feedback to grow.",
              example: "I completed my first end-to-end implementation of a customer-facing feature and proactively asked for a code review, incorporating all feedback in my next PR.",
            },
            IC3: {
              text: "I deliver high-quality work on complex tasks, lead smaller projects, and assist others with training and feedback.",
              example: "I led a sprint containing three complex bug fixes and a new reporting feature, maintaining quality throughout while unblocking a junior colleague on a tricky database query.",
            },
            IC4: {
              text: "I manage large-scale complex projects across teams, resolve complex issues independently, and mentor juniors while setting high work standards.",
              example: "I led a cross-team migration to a new data pipeline architecture, defined the technical standards, and ran a workshop for junior engineers on the new system.",
            },
            IC5: {
              text: "I own the most complex projects in the organisation, act as a subject matter expert, and mentor and provide feedback across teams.",
              example: "I authored the organisation's AI tooling evaluation framework, reviewed it with three brand leaders, and coached two engineering leads through applying it in their own contexts.",
            },
          },
        },
      ],
    },
    {
      id: "collaboration",
      name: "Collaboration",
      fullName: "Collaboration & Communication",
      subdimensions: [
        {
          id: "gen-collab-comms",
          name: "Communication & Teamwork",
          statements: {
            IC2: {
              text: "I communicate clearly and constructively, keep teammates updated on my progress, and seek help when blocked.",
              example: "When I was stuck on a data issue for more than half a day, I flagged it in our team channel, explained what I'd tried, and unblocked within 30 minutes with a colleague's help.",
            },
            IC3: {
              text: "I explain complex concepts clearly, advocate effectively for my ideas, share knowledge proactively, and set a positive example for team values.",
              example: "I ran an internal knowledge-sharing session on the new analytics platform and prepared documentation that helped three non-technical teammates become self-sufficient.",
            },
            IC4: {
              text: "I ensure open communication across all levels, manage stakeholder relationships independently, and mediate and resolve conflicts.",
              example: "When two functions had conflicting priorities on a joint project, I facilitated a structured alignment session, documented the agreed resolution, and followed up to keep both sides on track.",
            },
            IC5: {
              text: "I communicate the most complex ideas simply and clearly, facilitate broad collaboration, and proactively surface and address team-wide concerns.",
              example: "I designed and facilitated a quarterly planning session across four brands, synthesised competing priorities into a shared roadmap, and presented the consolidated plan to executive leadership.",
            },
          },
        },
      ],
    },
    {
      id: "ai-enablement",
      name: "AI Application & Enablement",
      fullName: "AI Application & Enablement",
      subdimensions: [
        {
          id: "gen-ai-adoption",
          name: "AI Adoption & Impact",
          statements: {
            IC2: {
              text: "I use AI tools regularly for tasks like drafting, research, and summarisation, and I am learning when to trust and question AI outputs.",
              example: "I used an AI writing assistant to draft the first version of our team's documentation, then reviewed and edited it carefully before sharing — saving around two hours while maintaining accuracy.",
            },
            IC3: {
              text: "I use AI as a genuine part of my workflow with tangible impact on time saved or quality improved, and I contribute to my team's AI knowledge.",
              example: "I integrated an AI-assisted code reviewer into our team's GitHub workflow, shared a guide on effective prompting for our codebase, and helped two teammates adopt it.",
            },
            IC4: {
              text: "AI is embedded in how I work through structured workflows or agentic tools, and I actively support AI adoption across my team.",
              example: "I built an internal prompt library for our marketing function, ran a live demo session showing before/after productivity, and facilitated the team's tool evaluation against our data privacy requirements.",
            },
            IC5: {
              text: "AI is deeply embedded across all aspects of my work; I set the standard for AI use in my function and build resources that create durable capability beyond my own practice.",
              example: "I created an AI maturity framework and adoption roadmap for our engineering department, ran cross-functional workshops to embed it, and mentored three senior engineers in leading AI adoption in their teams.",
            },
          },
        },
      ],
    },
  ],
};

// ─── General — M Track ───────────────────────────────────────────────────────

export const GENERAL_M: CompetencySet = {
  jobFamilyName: "General",
  track: "M",
  levels: ["M4", "M5", "M6"],
  themes: [
    {
      id: "influence-m",
      name: "Influence",
      fullName: "Leadership Scope & Business Impact",
      subdimensions: [
        {
          id: "gen-m-influence-scope",
          name: "Leadership Scope & Impact",
          statements: {
            M4: {
              text: "I coordinate a small functional team, cascade strategy clearly, and hold my team accountable for results and contributions to business goals.",
              example: "I translated our department's half-year strategy into sprint goals for my team of three, tracked delivery weekly, and presented our contributions at the end-of-quarter review.",
            },
            M5: {
              text: "I set strategic direction for my department, own team P&L, manage performance, and pursue growth and scaling opportunities.",
              example: "I restructured the team's work streams to align with two new product lines, renegotiated budget to reflect the increased scope, and held individual reviews with all managers to reset expectations.",
            },
            M6: {
              text: "I set the strategic direction and manage overall performance for my organisation, define a compelling vision, and shape strategies with cross-group impact.",
              example: "I led a 12-month transformation of our commercial organisation — defining the vision, presenting it to the board, and driving execution across four brands and 40+ people.",
            },
          },
        },
      ],
    },
    {
      id: "autonomy-m",
      name: "Autonomy",
      fullName: "Decision-Making & Delegation",
      subdimensions: [
        {
          id: "gen-m-autonomy-delegation",
          name: "Decision-Making & Delegation",
          statements: {
            M4: {
              text: "I make project and people decisions, set clear expectations and goals, delegate effectively, and balance operational work with people management.",
              example: "I assigned a complex integration project to an IC3 with fortnightly check-ins, set clear milestones, and stepped in to unblock only when she flagged a vendor issue outside her authority.",
            },
            M5: {
              text: "I independently make people decisions, propose budgets and workforce plans, and allocate resources to meet targets while serving as an impact multiplier.",
              example: "I made the case for hiring two senior engineers using productivity data, secured board approval, and delegated the hiring process to a senior IC with only final approval review from me.",
            },
            M6: {
              text: "I am the independent final decision-maker for my department including headcounts and budgets, and I focus on strategic oversight while delegating execution.",
              example: "I approved the annual headcount plan across three sub-departments after reviewing each manager's proposal and course-correcting one area before it went to the board.",
            },
          },
        },
      ],
    },
    {
      id: "proficiency-m",
      name: "Proficiency",
      fullName: "Leadership & Team Development",
      subdimensions: [
        {
          id: "gen-m-proficiency-leadership",
          name: "Leadership & Team Development",
          statements: {
            M4: {
              text: "I develop my leadership skills, create an inclusive environment, effectively communicate priorities, and support my team's growth and career goals.",
              example: "I ran quarterly development conversations for each of my four reports, created individual growth plans, and advocated for one team member's promotion in the mid-year cycle.",
            },
            M5: {
              text: "I set and own the team roadmap aligned with company strategy, develop other leaders, attract and retain top talent, and lead AI innovation in my area.",
              example: "I defined a 12-month product roadmap, ran a structured hiring campaign that resulted in two strong senior hires, and introduced a leadership coaching programme for two of my managers.",
            },
            M6: {
              text: "I am accountable for multiple roadmaps and strategies, build high-performing teams, develop senior managers, and drive the organisation's AI adoption strategy.",
              example: "I launched a company-wide transformation of our data platform, held managers accountable for quarterly milestones, and personally mentored three senior managers through their first major organisational change.",
            },
          },
        },
      ],
    },
    {
      id: "collaboration-m",
      name: "Collaboration",
      fullName: "Communication & Stakeholder Management",
      subdimensions: [
        {
          id: "gen-m-collab-stakeholders",
          name: "Communication & Stakeholder Management",
          statements: {
            M4: {
              text: "I share information openly, explain management decisions clearly, build cross-group relationships, and deliver clear reports on team progress.",
              example: "I prepared a monthly status report for my department head covering team output, blockers, and upcoming risks, and used it as the basis for a productive 30-minute alignment meeting.",
            },
            M5: {
              text: "I manage difficult leadership situations effectively, communicate impactful changes across the organisation, and proactively build cross-group collaboration.",
              example: "I led the communication strategy for a major restructure, delivered the message in an all-hands, followed up with individual conversations with affected people, and received positive feedback on clarity and transparency.",
            },
            M6: {
              text: "I act as a connector between teams, lead cross-functional communication, and report to the board on key metrics and strategic decisions.",
              example: "I presented our annual strategy and Q4 performance to the board, managing three follow-up questions live, and facilitated a cross-brand alignment on our shared infrastructure roadmap the following week.",
            },
          },
        },
      ],
    },
    {
      id: "ai-enablement-m",
      name: "AI Application & Enablement",
      fullName: "AI Leadership & Adoption",
      subdimensions: [
        {
          id: "gen-m-ai-leadership",
          name: "AI Leadership & Adoption",
          statements: {
            M4: {
              text: "I ensure every team member is actively using appropriate AI tools, remove blockers to adoption, and track the impact of AI on team throughput.",
              example: "I surveyed my team on AI tool usage, identified that two people lacked access, resolved this with IT, and set a team expectation that AI tools should be used in all appropriate workflows.",
            },
            M5: {
              text: "I define the AI adoption roadmap for my department, build AI-augmented workflows as defaults, and develop AI fluency in managers and senior ICs.",
              example: "I worked with a senior IC to design an AI-first onboarding process for new hires, reducing ramp-up time by 30% in the first cohort, and shared the approach in a cross-functional leads meeting.",
            },
            M6: {
              text: "I drive the organisation's AI adoption strategy focused on business impact and competitive positioning, and I set AI fluency standards across the organisation.",
              example: "I presented our AI adoption roadmap to the board, secured investment in two enterprise tools, and defined the AI fluency benchmarks now used in performance reviews across the group.",
            },
          },
        },
      ],
    },
  ],
};

// ─── Engineering — IC Track ───────────────────────────────────────────────────

export const ENGINEERING_IC: CompetencySet = {
  jobFamilyName: "Engineering",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    {
      id: "eng-craft",
      name: "Engineering Craft",
      fullName: "Engineering Craft & Code Quality",
      subdimensions: [
        {
          id: "eng-design-arch",
          name: "Software Design & Architecture",
          statements: {
            IC2: {
              text: "I understand basic software design principles and common patterns, and I assist in designing components with guidance.",
              example: "I built a user profile module following our existing MVC pattern, reviewed my schema design with the tech lead, and incorporated feedback on normalisation before implementation.",
            },
            IC3: {
              text: "I independently design moderately complex systems and components, apply design patterns appropriately, and contribute meaningfully to architecture discussions.",
              example: "I designed the data layer for our new reporting feature, proposed a caching strategy to reduce DB load, and presented the trade-offs in our architecture review meeting.",
            },
            IC4: {
              text: "I lead the design of complex, scalable, and secure systems, guide and review architecture for projects and teams, and mentor others in best practices.",
              example: "I led the design of our multi-tenant data isolation architecture, documented the decision record, reviewed three engineers' implementation designs, and ran a security review workshop for the team.",
            },
            IC5: {
              text: "I define the overall system architecture and design strategy, set standards for data models and design across the organisation, and coach engineers in advanced practices.",
              example: "I authored our system design guidelines adopted company-wide, presented the architectural vision for our platform migration to the executive team, and individually coached two senior engineers preparing their own major system designs.",
            },
          },
        },
        {
          id: "eng-software-dev",
          name: "Software Development",
          statements: {
            IC2: {
              text: "I write clean, maintainable code with guidance, work on bugs and small components, and actively learn from code reviews and feedback.",
              example: "I fixed a recurring payment rounding bug, wrote unit tests covering three edge cases I identified, and incorporated all feedback from my code review to improve variable naming and add a missing guard clause.",
            },
            IC3: {
              text: "I write high-quality, efficient, and maintainable code independently, implement features with minimal supervision, and provide constructive feedback in code reviews.",
              example: "I independently implemented an automated email notification system with batching logic, wrote integration tests covering the main failure paths, and found and flagged a potential SQL injection risk in a colleague's PR.",
            },
            IC4: {
              text: "I write and review complex, high-performance code, mentor junior engineers, lead code reviews, and make informed trade-off decisions on technical debt.",
              example: "I led a code review for our checkout flow refactor, caught a concurrency bug in the payment lock mechanism, mentored two engineers on clean code principles, and documented our team's approach to managing legacy endpoints.",
            },
            IC5: {
              text: "I drive the development of coding standards and practices across teams, lead adoption of new languages and frameworks, and define requirements for algorithms and technical quality.",
              example: "I authored our engineering quality handbook, facilitated three working groups to align on standards across brands, led the evaluation of our new backend framework, and conducted a full technical debt audit with recommendations adopted in the annual roadmap.",
            },
          },
        },
      ],
    },
    {
      id: "eng-delivery",
      name: "Delivery & Quality",
      fullName: "Delivery, Infrastructure & Quality",
      subdimensions: [
        {
          id: "eng-infra",
          name: "Infrastructure & Reliability",
          statements: {
            IC2: {
              text: "I understand basic DevOps principles, work with CI/CD pipelines and containerisation tools, and assist in maintaining development environments.",
              example: "I set up a GitHub Actions workflow for automated testing of my feature branch following the team's template, and asked for help when the Docker configuration for the new service was unfamiliar.",
            },
            IC3: {
              text: "I implement and maintain CI/CD pipelines, manage development to production environments with occasional support, and implement infrastructure as code when applicable.",
              example: "I rebuilt our CI pipeline to reduce build times by 40%, added automated deployment to staging, and wrote Terraform configs for the new service's infrastructure following the team's patterns.",
            },
            IC4: {
              text: "I design and maintain complex CI/CD pipelines independently, ensure high reliability and availability of production systems, and lead infrastructure scaling efforts.",
              example: "I led the migration of our monolith to a containerised architecture, designed the Kubernetes deployment strategy, reduced deployment failures by 70%, and ran an incident post-mortem to prevent future infrastructure outages.",
            },
            IC5: {
              text: "I define the DevOps strategy and best practices, lead implementation of advanced infrastructure solutions, and mentor teams in tools and practices.",
              example: "I defined our platform's reliability engineering standards, wrote the incident response playbook now used across brands, led the evaluation of our observability stack, and ran a quarterly SRE learning series for engineers across the group.",
            },
          },
        },
        {
          id: "eng-quality",
          name: "Software Quality & Testing",
          statements: {
            IC2: {
              text: "I write unit and integration tests for my code, participate in code review processes, and join testing and debugging sessions.",
              example: "For every feature I build, I write unit tests covering the happy path and at least one failure case, and I flag test gaps I notice in code reviews.",
            },
            IC3: {
              text: "I develop comprehensive test plans, write extensive tests, conduct code reviews, and use testing frameworks proficiently.",
              example: "I designed the test strategy for our new subscription management module, wrote 80+ tests across unit, integration, and E2E layers, and introduced contract testing to reduce cross-service regression risk.",
            },
            IC4: {
              text: "I define and enforce testing strategies and standards, lead security reviews, and ensure code quality through thorough reviews and automated testing.",
              example: "I led a quality initiative that reduced production bug rate by 60%, introduced DAST into our pipeline, led our first security code review cycle, and established our team's pull-request quality checklist.",
            },
            IC5: {
              text: "I set the overall quality and security standards, lead initiatives to improve software quality and security practices, and drive adoption of new testing methodologies.",
              example: "I defined our organisation-wide quality maturity model, presented it to engineering leadership, and led the rollout of a new automated security scanning tool adopted by six teams within a quarter.",
            },
          },
        },
      ],
    },
    {
      id: "eng-product",
      name: "Product Thinking",
      fullName: "Product Sense & User-Centricity",
      subdimensions: [
        {
          id: "eng-product-sense",
          name: "Product Sense & User-Centricity",
          statements: {
            IC2: {
              text: "I understand basic user requirements and product goals, consider user experience in my designs, and follow product specifications closely.",
              example: "When building a settings page, I read all the relevant user stories, asked the PM to clarify an ambiguous requirement, and checked the implementation against the design spec before marking my PR ready for review.",
            },
            IC3: {
              text: "I collaborate with product managers and designers to refine requirements, incorporate user feedback into iterations, and design features with a focus on usability.",
              example: "I joined two user research sessions, translated feedback about a confusing filter UI into a concrete proposal, and prototyped an improved version that was validated with users before implementation.",
            },
            IC4: {
              text: "I work closely with product managers to define and prioritise features, advocate for the user in all stages, and lead user-centric design and development efforts.",
              example: "I led the technical side of a UX improvement project, partnered with the PM and designer, participated in a user panel, and proposed and implemented a streaming response approach that reduced perceived load time by 50%.",
            },
            IC5: {
              text: "I collaborate with senior leadership to define the technical aspects of product vision, ensure user-centric principles are embedded in architecture, and lead initiatives to integrate advanced feedback mechanisms.",
              example: "I worked with the CPO and CTO to define technical requirements for our new customer portal, embedded accessibility requirements into our design system, and led implementation of a real-time user feedback dashboard used across six product teams.",
            },
          },
        },
      ],
    },
  ],
};

// ─── Product Management — IC Track ───────────────────────────────────────────

export const PRODUCT_MANAGEMENT_IC: CompetencySet = {
  jobFamilyName: "Product Management",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    {
      id: "pm-execution",
      name: "Product Execution",
      fullName: "Product Execution",
      subdimensions: [
        {
          id: "pm-feature-spec",
          name: "Feature Specification",
          statements: {
            IC2: {
              text: "I gather requirements of basic to medium complexity with guidance, define straightforward functionality, and communicate requirements clearly using templates.",
              example: "I wrote the spec for a CSV export feature by interviewing the CS team, using our standard template, and asking a senior PM to review before sharing with engineering.",
            },
            IC3: {
              text: "I independently gather and refine requirements for moderately complex features, communicate effectively across teams, and produce clear, actionable specification documents.",
              example: "I led the spec process for a billing integration, running three stakeholder interviews, synthesising conflicting requirements, and producing a 12-page spec that engineering used to plan with minimal back-and-forth.",
            },
            IC4: {
              text: "I lead requirements gathering for complex features involving multiple stakeholders, align functionality with strategic objectives, and review and refine specifications to ensure they are comprehensive.",
              example: "I owned the requirements for our enterprise SSO feature, coordinating inputs from security, legal, sales, and three customer stakeholders, and reviewed the spec through two rounds of engineering feedback before finalising.",
            },
            IC5: {
              text: "I oversee the feature specification process for entire product areas, ensure alignment with the product vision, mentor other PMs in best practices, and develop templates and guidelines used across the organisation.",
              example: "I built our PM specification playbook, ran workshops to roll it out across six PMs, and personally oversaw the spec process for our platform's new data API — a strategic initiative involving eight teams.",
            },
          },
        },
        {
          id: "pm-delivery",
          name: "Product Delivery",
          statements: {
            IC2: {
              text: "I work closely with my team to deliver small, well-defined product features, follow established processes, and provide clear status updates.",
              example: "I drove delivery of a simple notification feature by running daily standups with my engineer, flagging a dependency issue early, and keeping the PM and design informed at each milestone.",
            },
            IC3: {
              text: "I manage delivery of more complex features by coordinating with design and engineering, identify and address risks in advance, and communicate timelines consistently.",
              example: "I coordinated delivery of a multi-country tax feature across three engineers and a legal reviewer, caught a data model risk two weeks before launch and resolved it without delaying go-live.",
            },
            IC4: {
              text: "I oversee delivery of major features or initiatives, balance speed with quality, coordinate across multiple teams, and continuously optimise delivery processes.",
              example: "I led delivery of our checkout redesign across a team of five engineers, two designers, and a data analyst, managing vendor dependencies, making a deliberate quality-vs-speed trade-off, and shipping one week ahead of deadline.",
            },
            IC5: {
              text: "I own a product end-to-end and lead delivery strategy for large-scale projects, ensure cross-team alignment, develop delivery frameworks, and act as final escalation point.",
              example: "I led the delivery of our new partner marketplace — a 9-month programme involving 12 engineers across three squads — built the delivery framework, ran weekly steering meetings with leadership, and resolved three critical scope conflicts.",
            },
          },
        },
        {
          id: "pm-qa",
          name: "Quality Assurance",
          statements: {
            IC2: {
              text: "I participate in QA processes by identifying basic quality issues, work with engineering to understand defect impact, and ensure simple features meet quality standards before release.",
              example: "Before each feature launch I go through the acceptance criteria systematically, test on mobile and desktop, and document issues I find with clear reproduction steps for engineering.",
            },
            IC3: {
              text: "I prioritise and resolve quality issues that impact user experience, define acceptance criteria and test plans with engineering, and ensure the delivered product meets functional and business quality standards.",
              example: "For our payment flow release, I wrote a 40-item acceptance criteria document, ran a cross-device test sprint with a dedicated QA engineer, and held the release when I found a data loss bug two days before launch.",
            },
            IC4: {
              text: "I lead quality efforts across complex product features, anticipate quality risks, implement mitigation strategies, and drive continuous improvement in QA processes.",
              example: "I introduced a risk-tiered QA framework that reduced post-launch critical bugs by 45%, led a retrospective on our highest-severity incident, and drove adoption of feature flags to enable gradual rollout.",
            },
            IC5: {
              text: "I define the quality assurance strategy for entire product areas, mentor other PMs in quality standards, and oversee implementation of advanced QA techniques.",
              example: "I authored our quality playbook — including severity definitions, release criteria, and regression protocols — ran a programme to upskill five junior PMs in QA thinking, and led a cross-brand audit of post-launch quality trends.",
            },
          },
        },
      ],
    },
    {
      id: "pm-customer",
      name: "Customer Insight",
      fullName: "Customer Insight",
      subdimensions: [
        {
          id: "pm-data",
          name: "Fluency with Data",
          statements: {
            IC2: {
              text: "I analyse basic data sets with guidance, apply data insights to simple product decisions, and track and report on key metrics in my area.",
              example: "I created a weekly dashboard for our feature adoption metrics using the BI tool, identified a drop in a key action rate, and brought it to my squad's attention with initial hypotheses.",
            },
            IC3: {
              text: "I independently analyse data to generate actionable insights, validate assumptions with data, and make data-driven recommendations aligned with broader product goals.",
              example: "I ran a cohort analysis showing that users who completed onboarding within 7 days had 3× better 90-day retention, which directly influenced our decision to simplify the onboarding flow.",
            },
            IC4: {
              text: "I lead analysis of complex data sets to inform strategic decisions, track key success metrics, use advanced techniques to uncover opportunities, and mentor other PMs in data use.",
              example: "I designed our product's north star metric framework, built the analytics tracking spec, led the A/B test programme, and trained two junior PMs in experiment design and significance testing.",
            },
            IC5: {
              text: "I define the data strategy for the product area, oversee integration of data insights into development, drive use of advanced analytics, and lead initiatives to improve data fluency across the team.",
              example: "I defined our data strategy including our event taxonomy, partnered with the data science team on a predictive churn model, and presented our analytics maturity roadmap to the executive team.",
            },
          },
        },
        {
          id: "pm-voc",
          name: "Voice of the Customer",
          statements: {
            IC2: {
              text: "I collect user feedback through basic methods with senior support, use feedback to make small feature adjustments, and participate in user testing sessions.",
              example: "I conducted my first three customer interviews for a planned feature, wrote up findings, and shared the key themes with the PM and designer to inform our next iteration.",
            },
            IC3: {
              text: "I regularly gather and synthesise user feedback from multiple sources, translate insights into actionable improvements, and advocate for the customer in product discussions.",
              example: "I ran a 20-user feedback programme for our mobile app, synthesised themes into a prioritised insight deck, and used it to successfully argue for deprioritising a feature in favour of a core UX fix.",
            },
            IC4: {
              text: "I lead efforts to deeply understand customer needs, use insights to drive significant product changes, and maintain strong relationships with key user groups.",
              example: "I established a customer advisory board of eight power users, ran quarterly sessions, and have used their input to inform three major feature decisions including our enterprise admin portal.",
            },
            IC5: {
              text: "I define the strategy for incorporating customer feedback, ensure the voice of the customer is central to product vision, and lead large-scale feedback initiatives.",
              example: "I launched a continuous feedback programme across six markets, set up automated NPS and in-app feedback flows, and presented the quarterly customer insight synthesis to the board.",
            },
          },
        },
        {
          id: "pm-ux",
          name: "User Experience Design",
          statements: {
            IC2: {
              text: "I work with the design team to understand UX principles, contribute to user flows for simple features, and follow established UX patterns in my area.",
              example: "For a new settings screen, I created a rough user flow and worked with the designer to refine it, following our design system guidelines throughout.",
            },
            IC3: {
              text: "I collaborate with designers on user-centric UX for complex features, ensure designs align with user needs and business goals, and advocate for UX consistency across the product.",
              example: "I partnered with our UX designer on an onboarding redesign, ran usability testing with five users, and revised the spec based on findings to remove two confusing steps that were causing drop-offs.",
            },
            IC4: {
              text: "I lead UX design development that enhances user satisfaction, work closely with designers to meet high standards, drive UX innovation, and mentor junior PMs and designers.",
              example: "I led the UX strategy for our mobile app redesign, partnered with the design lead, ran a heuristic evaluation, and introduced a user journey mapping practice now used by all PMs on our team.",
            },
            IC5: {
              text: "I define the UX strategy for the product area, oversee UX guidelines and patterns, lead initiatives to elevate overall UX quality, and act as the key advocate for user experience.",
              example: "I defined our product's UX principles and design system governance, chaired the UX council that reviews major design decisions across six product areas, and presented our UX quality roadmap to the CPO.",
            },
          },
        },
      ],
    },
    {
      id: "pm-strategy",
      name: "Product Strategy",
      fullName: "Product Strategy",
      subdimensions: [
        {
          id: "pm-outcomes",
          name: "Business Outcome Ownership",
          statements: {
            IC2: {
              text: "I understand the connection between product features and business outcomes, contribute to small projects with predefined business goals, and track progress with guidance.",
              example: "I tracked our feature's contribution to a conversion metric, reported weekly in our team meeting, and flagged when progress fell behind the target midway through the quarter.",
            },
            IC3: {
              text: "I independently drive product features that contribute to key business outcomes, align prioritisation with goals, and proactively identify opportunities to improve results through product changes.",
              example: "I owned our activation rate OKR for Q2, designed experiments to test three hypotheses, shipped the winning variant, and exceeded the target by 12%.",
            },
            IC4: {
              text: "I own the responsibility for driving significant business outcomes, align the product roadmap with strategic objectives, assess performance against key metrics, and mentor others in outcome ownership.",
              example: "I owned two revenue-driving OKRs for our B2B product, ran a quarterly roadmap review with leadership, reallocated engineering resources when early data showed one initiative underperforming, and coached two junior PMs in outcomes thinking.",
            },
            IC5: {
              text: "I define the business outcome strategy for my product area, ensure cross-team alignment on goals, and mentor senior PMs and cross-functional partners in outcome ownership.",
              example: "I defined our product area's three-year outcome framework, presented it to the board with supporting financials, led the annual strategy review with eight PMs, and conducted individual coaching sessions with each PM on their OKR design.",
            },
          },
        },
        {
          id: "pm-roadmap",
          name: "Product Vision & Roadmapping",
          statements: {
            IC2: {
              text: "I contribute to product planning activities, understand the team's roadmap, and help to size and sequence tasks under direction.",
              example: "I helped prepare the quarterly planning doc by estimating effort for five features, flagging two dependencies, and writing the problem statement section with input from my PM.",
            },
            IC3: {
              text: "I contribute to roadmap development by bringing user insights and data, sequence deliverables coherently, and communicate the roadmap clearly to my team.",
              example: "I built the roadmap for my feature area for the next two quarters, ran it past three stakeholders to incorporate their input, and presented it to engineering in a planning session that resulted in clear sprint commitments.",
            },
            IC4: {
              text: "I develop and own a product roadmap for a significant area, make prioritisation trade-offs, align stakeholders, and adapt the plan based on market and customer signals.",
              example: "I owned the roadmap for our analytics product, ran three-month rolling planning sessions, made a difficult call to delay a high-visibility feature to address stability issues, and presented the rationale to the CEO.",
            },
            IC5: {
              text: "I define the product vision and multi-year roadmap for my area, connect it to company strategy, and align executive stakeholders and cross-functional leaders.",
              example: "I defined a 3-year product vision for our core platform, presented it at the board strategy session, built the annual roadmap with all product leads, and led the quarterly review process with the C-suite.",
            },
          },
        },
        {
          id: "pm-market",
          name: "Market Sensitivity",
          statements: {
            IC2: {
              text: "I am aware of our competitive landscape at a basic level and consider market context when contributing to product discussions.",
              example: "I reviewed our three main competitors' feature announcements in our weekly PM meeting and brought one relevant observation to our next planning session.",
            },
            IC3: {
              text: "I actively monitor market trends, competitor movements, and customer needs to inform feature prioritisation and product positioning.",
              example: "I built a competitor tracking dashboard, identified a gap in our search functionality that two competitors had addressed, and wrote a brief that led to the feature being added to the next quarter's roadmap.",
            },
            IC4: {
              text: "I lead market analysis to inform strategic product decisions, assess competitive positioning, and help the team anticipate market shifts before they impact us.",
              example: "I led a market sizing and competitive analysis for a potential new product line, interviewed five customers and three lost deals, and presented a go/no-go recommendation that was adopted by leadership.",
            },
            IC5: {
              text: "I define the market intelligence strategy for my product area, shape product positioning at a strategic level, and influence company-level decisions based on market understanding.",
              example: "I commissioned and led a comprehensive market study across three regions, co-authored the resulting positioning strategy with the CMO, and used the findings to successfully argue for entering a new segment at the annual strategy session.",
            },
          },
        },
      ],
    },
    {
      id: "pm-people",
      name: "People",
      fullName: "Stakeholder Management & Managing Up",
      subdimensions: [
        {
          id: "pm-stakeholders",
          name: "Stakeholder Management & Managing Up",
          statements: {
            IC2: {
              text: "I communicate clearly with my immediate stakeholders, keep them informed of progress, and escalate when needed.",
              example: "I sent weekly written updates to the CS lead who was a key stakeholder on my feature, and escalated to my PM when a requirement conflict arose that was above my remit.",
            },
            IC3: {
              text: "I manage stakeholder relationships for my feature area, influence decisions with data and reasoning, and manage expectations proactively.",
              example: "I managed the expectations of our VP of Sales who wanted a feature in Q2, presented the technical constraints clearly, proposed an interim solution that satisfied 80% of the need, and got buy-in for the revised plan.",
            },
            IC4: {
              text: "I manage senior stakeholders across functions, build alignment for complex or contested decisions, and manage up to leadership with confidence.",
              example: "I led the stakeholder alignment process for a controversial platform migration, ran individual briefings with the CTO, VP Sales, and three brand leads, and built the consensus needed to proceed with a clear communication plan.",
            },
            IC5: {
              text: "I manage executive-level stakeholder relationships, shape organisational priorities through influence, and mentor other PMs in stakeholder and upward management.",
              example: "I manage the CEO as a key stakeholder on our platform strategy, run monthly briefings, have successfully influenced three major priority decisions, and run quarterly workshops for our PM team on managing executive relationships.",
            },
          },
        },
      ],
    },
  ],
};

// ─── Product Design — IC Track ────────────────────────────────────────────────

export const PRODUCT_DESIGN_IC: CompetencySet = {
  jobFamilyName: "Product Design",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    {
      id: "design-research",
      name: "Research & Strategy",
      fullName: "Research, Strategy & Data",
      subdimensions: [
        {
          id: "design-user-research",
          name: "User Research",
          statements: {
            IC2: {
              text: "I assist in user research activities with guidance, help recruit participants, and contribute to synthesising basic findings.",
              example: "I helped script a set of usability testing questions, observed three sessions, and wrote up notes that were incorporated into the team's research synthesis.",
            },
            IC3: {
              text: "I independently plan and conduct user research studies, synthesise findings into actionable insights, and present recommendations to the team.",
              example: "I ran a 12-person diary study for our mobile app, synthesised 200+ data points into five key themes, and presented a prioritised insight deck that directly informed the next sprint's design direction.",
            },
            IC4: {
              text: "I lead research strategy for product areas, design mixed-method research programmes, champion research best practices, and translate complex insights into strategic product direction.",
              example: "I built our UX research practice, introduced a continuous discovery programme with monthly user panels, led a 3-month ethnographic study for a new product area, and coached three PMs in using research to inform roadmap decisions.",
            },
            IC5: {
              text: "I define the research vision and methodology for the organisation, advocate for user-centred design at the executive level, and build research capabilities that enable the whole product team.",
              example: "I authored our research operations playbook, established our user research panel of 500+ participants, presented our research insights at board level, and built a research academy that trained 15 colleagues in core research methods.",
            },
          },
        },
        {
          id: "design-vision",
          name: "Vision and Direction",
          statements: {
            IC2: {
              text: "I contribute to shaping the design direction for features under guidance, understand the product vision, and follow established design principles.",
              example: "I reviewed our design system guidelines before starting a new feature and checked my early concepts against the product vision with my design lead before investing in detailed wireframes.",
            },
            IC3: {
              text: "I contribute meaningfully to design vision for my product area, create design concepts that align with strategic goals, and communicate my design rationale clearly.",
              example: "I proposed a new navigation model for our mobile app based on user research, presented two directions with trade-offs to the PM and engineering lead, and built consensus around the chosen approach.",
            },
            IC4: {
              text: "I lead the design vision for significant product areas, align it with business strategy, and influence product direction through a strong point of view on the user experience.",
              example: "I co-authored the design vision for our enterprise product tier, presented it to the CPO and four PMs, and led a two-day design sprint that produced the foundational concepts now driving the roadmap.",
            },
            IC5: {
              text: "I define the design vision for the entire product or platform, set the long-term experience strategy, and influence company-level product decisions through design leadership.",
              example: "I defined our 3-year design vision, presented it to the board alongside the CPO, led the cross-functional alignment on our new design language, and oversaw its rollout across six product teams.",
            },
          },
        },
        {
          id: "design-data",
          name: "Data Literacy",
          statements: {
            IC2: {
              text: "I use quantitative data to validate my design decisions with guidance, understand basic UX metrics, and incorporate data into my design rationale.",
              example: "I looked at funnel data for the screen I was redesigning, identified that users were dropping off at a specific step, and used this to support my recommendation for simplifying that interaction.",
            },
            IC3: {
              text: "I independently analyse UX data to evaluate my designs, set up tracking for new features, and use both qualitative and quantitative signals to guide iterations.",
              example: "I set up click-tracking for our new checkout design, ran a 2-week A/B test, analysed the results, and made three specific UI adjustments based on what the data showed about user confusion points.",
            },
            IC4: {
              text: "I design and lead data collection strategies for major design initiatives, drive evidence-based decision-making, and mentor others in using data to improve their design practice.",
              example: "I built our design measurement framework — defining metrics for usability, engagement, and satisfaction — and ran a quarterly design quality review with my team to close the loop between research findings and shipping decisions.",
            },
            IC5: {
              text: "I define how the organisation uses data to evaluate design quality and user experience, partner with data and product teams to advance our measurement capability, and set standards for evidence-based design.",
              example: "I led the adoption of our experience quality index, trained 10 designers in data-informed design methods, and partnered with the data science team to build a predictive model for UX risk in new features.",
            },
          },
        },
      ],
    },
    {
      id: "design-craft",
      name: "Design Craft",
      fullName: "Design Craft & Systems",
      subdimensions: [
        {
          id: "design-interaction",
          name: "Interaction Design",
          statements: {
            IC2: {
              text: "I create basic interaction patterns for simple features following established guidelines, and I seek feedback on my interaction choices before implementation.",
              example: "I designed the interaction for a simple filter panel, referenced our component library, prototyped two options in Figma, and got feedback from my design lead before presenting to engineering.",
            },
            IC3: {
              text: "I independently design interactions for moderately complex flows, consider edge cases and states thoroughly, and ensure my designs are technically feasible.",
              example: "I designed the full interaction model for our onboarding wizard — all states, transitions, error handling, and edge cases — and ran a design critique that surfaced two improvements before handoff.",
            },
            IC4: {
              text: "I lead interaction design for complex product areas, establish interaction patterns and standards, and evaluate trade-offs between interaction quality and engineering complexity.",
              example: "I defined the interaction model for our drag-and-drop builder feature, ran three rounds of user testing, worked with engineering to understand constraints, and made trade-offs that balanced design quality with feasibility.",
            },
            IC5: {
              text: "I define interaction design standards and principles for the organisation, drive innovation in interaction patterns, and mentor designers in complex interaction design challenges.",
              example: "I authored our interaction design principles, ran an annual interaction review of all major product flows, and introduced an advanced prototyping practice that allows the team to test complex interactions before engineering commitment.",
            },
          },
        },
        {
          id: "design-visual",
          name: "Visual Design",
          statements: {
            IC2: {
              text: "I apply the design system to produce visual designs that are consistent with our brand and product guidelines.",
              example: "I designed three screens for a new reporting feature, used our component library throughout, and ensured colour, typography, and spacing followed our design system tokens exactly.",
            },
            IC3: {
              text: "I produce polished visual designs for complex product areas, extend the design system where needed, and ensure visual consistency across my scope.",
              example: "I designed a new data visualisation component suite, proposed three visual design options, facilitated a team vote, and documented the chosen approach as a new design system extension.",
            },
            IC4: {
              text: "I lead visual design quality across product areas, evolve the design system to serve new requirements, and maintain a high bar for visual execution.",
              example: "I led the visual redesign of our dashboard, created 40+ new component variants, ran a design system audit to identify and retire inconsistent patterns, and presented the new direction at a company all-hands.",
            },
            IC5: {
              text: "I define the visual design language for the product or brand, set standards for visual quality, and lead the evolution of the design system at an organisational level.",
              example: "I authored our brand's digital design language, presented it to leadership, led a 6-month rollout across all product surfaces, and established our design system governance model including a cross-product design review process.",
            },
          },
        },
        {
          id: "design-ia",
          name: "Information Architecture",
          statements: {
            IC2: {
              text: "I apply existing information architecture patterns to my feature designs and flag potential IA conflicts I notice.",
              example: "When designing a new settings section, I mapped it against our existing IA, identified a naming conflict with an existing menu item, and raised it with my design lead before finalising.",
            },
            IC3: {
              text: "I design clear and intuitive information architectures for my product areas, validate them with users, and document them for the team.",
              example: "I designed the IA for our admin portal's expanded navigation, ran card sorting with eight users to validate my groupings, and revised two categories based on the findings before handing to engineering.",
            },
            IC4: {
              text: "I lead IA design for major product areas, establish IA principles and standards, and ensure navigational coherence across the product.",
              example: "I led a comprehensive IA review of our entire product, ran a tree testing study with 30 users, identified 12 navigation issues, and designed a new IA that reduced task completion time by 22% in follow-up testing.",
            },
            IC5: {
              text: "I define the overall IA strategy for the product, ensure IA decisions are made systematically and with user evidence, and set the standard for structural design quality.",
              example: "I led a complete IA redesign of our platform serving four product lines, ran a 200-participant tree test, presented findings to the CPO, and built the IA governance framework used by our team of 12 designers.",
            },
          },
        },
        {
          id: "design-systems",
          name: "Design Systems",
          statements: {
            IC2: {
              text: "I use the design system correctly in my work, report inconsistencies I find, and contribute small additions when asked.",
              example: "While working on a new feature, I noticed our button component lacked a loading state; I reported it in our design system channel with a screenshot and suggested a solution.",
            },
            IC3: {
              text: "I contribute meaningfully to the design system, propose and document new components, and ensure consistency in their application across my team.",
              example: "I built and documented three new form components for the design system, ran a review with two other designers and engineering, and rolled them out with a team briefing and updated usage guidelines.",
            },
            IC4: {
              text: "I lead design system contributions for major areas, drive governance, and ensure the system evolves to serve the team's current needs.",
              example: "I led our design system quarterly review, deprecated 15 inconsistent components, introduced a structured contribution process, and ran a workshop that onboarded four new designers to system-first working.",
            },
            IC5: {
              text: "I define the design system strategy, own its governance and evolution, and build the team's capability to work system-first at scale.",
              example: "I built our design system from scratch in its first year, established the contribution model, onboarded 12 designers and 8 engineers, and led the platform migration that made it a shared source of truth across all product teams.",
            },
          },
        },
      ],
    },
    {
      id: "design-execution",
      name: "Execution & Collaboration",
      fullName: "Facilitation, Coaching & Prototyping",
      subdimensions: [
        {
          id: "design-facilitation",
          name: "Facilitation and Coaching",
          statements: {
            IC2: {
              text: "I participate constructively in design critiques and workshops, and I am beginning to contribute facilitation support under guidance.",
              example: "I helped a senior designer prepare and run a design sprint, took notes, and ran one of the breakout sessions with clear instructions they had prepared.",
            },
            IC3: {
              text: "I facilitate design critiques and workshops for my team, create productive collaboration environments, and provide constructive coaching to peers.",
              example: "I facilitated a two-hour design sprint for our checkout redesign, prepared the agenda, managed time effectively, and helped the team converge on two strong concepts by the end of the session.",
            },
            IC4: {
              text: "I design and facilitate complex workshops and cross-functional alignment sessions, coach junior designers in their craft, and build a culture of collaborative design practice.",
              example: "I designed and ran a 3-day design sprint with eight participants across product, engineering, and marketing, produced actionable output, and now coach two junior designers in facilitation skills through monthly practice sessions.",
            },
            IC5: {
              text: "I lead design culture and capability development across the organisation, design programmes to build design maturity, and establish standards for collaborative design practice.",
              example: "I launched our design community of practice, ran quarterly design leadership workshops for 15 senior practitioners, mentored four design leads, and built the company's design critique framework adopted across all product teams.",
            },
          },
        },
        {
          id: "design-prototyping",
          name: "Prototyping",
          statements: {
            IC2: {
              text: "I create basic prototypes in Figma to communicate my design ideas and gather quick feedback from stakeholders.",
              example: "I built a click-through prototype for a new feature flow and used it to walk engineering through the expected user journey before spec writing.",
            },
            IC3: {
              text: "I create high-fidelity interactive prototypes that effectively communicate complex interactions, and I use them to test my designs with users.",
              example: "I built a fully interactive prototype of our new search experience with 12 states and transitions, used it in five user testing sessions, and iterated three times based on findings before handoff.",
            },
            IC4: {
              text: "I lead prototyping for major features and complex interactions, explore advanced prototyping techniques to test ideas efficiently, and coach others in prototyping for research.",
              example: "I introduced coded prototypes into our team's process for high-risk interactions, built two functional React prototypes that were tested with users before engineering investment, and ran a prototyping workshop for four designers.",
            },
            IC5: {
              text: "I define our prototyping strategy, introduce methods that push the boundaries of what we can test before building, and build organisational capability in advanced prototyping.",
              example: "I established our rapid prototyping lab, introduced hardware prototype testing for a new physical-digital product, and built a mentoring programme that upskilled all designers in at least two prototyping modalities beyond static design tools.",
            },
          },
        },
      ],
    },
  ],
};

// ─── Customer Support — IC Track ─────────────────────────────────────────────

export const CUSTOMER_SUPPORT_IC: CompetencySet = {
  jobFamilyName: "Customer Support",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    {
      id: "cs-excellence",
      name: "Customer Excellence",
      fullName: "Customer Excellence",
      subdimensions: [
        {
          id: "cs-knowledge",
          name: "Knowledge & Expertise",
          statements: {
            IC2: {
              text: "I have a solid foundational understanding of our products and processes, and I continue to build my knowledge with support from colleagues and documentation.",
              example: "When a customer asked about a billing edge case I hadn't seen before, I found the answer in our knowledge base, verified it with a senior colleague, and provided a clear response.",
            },
            IC3: {
              text: "I have deep product and process knowledge that allows me to resolve the majority of issues independently, and I contribute to maintaining and improving our internal documentation.",
              example: "I resolved a complex data export issue for an enterprise customer by combining product knowledge with a workaround I developed, then documented the solution in our knowledge base to save time for future cases.",
            },
            IC4: {
              text: "I am a recognised expert across multiple product areas, handle the most complex cases, and lead knowledge-sharing initiatives that raise the team's capability.",
              example: "I became the go-to expert for our analytics module, resolved 12 escalated cases in Q3, identified a recurring confusion pattern, and ran a training session for five colleagues covering the top 10 complex scenarios.",
            },
            IC5: {
              text: "I define the knowledge strategy for the support function, build our collective expertise systematically, and partner with product teams to reduce support needs through better product design.",
              example: "I built our expert knowledge programme, created 30+ advanced guides covering our most complex product areas, and partnered with the product team to add in-app contextual help that reduced a specific ticket type by 40%.",
            },
          },
        },
        {
          id: "cs-resolution",
          name: "Delivery / Issue Resolution",
          statements: {
            IC2: {
              text: "I resolve straightforward customer issues accurately and on time, follow established processes, and escalate appropriately when cases are beyond my current knowledge.",
              example: "I handled 40 tickets last week with 100% first-response SLA adherence, escalated two cases to Tier 2 with full context included, and received positive feedback on three responses.",
            },
            IC3: {
              text: "I resolve complex issues independently, manage multiple open cases effectively, and identify patterns in recurring problems to flag to the team.",
              example: "I managed a complex account migration issue across three teams, kept the customer informed at each step, resolved it within the SLA, and flagged the underlying data sync bug to engineering with a clear reproduction case.",
            },
            IC4: {
              text: "I lead the resolution of the team's most difficult cases, coordinate multi-team escalations effectively, and drive improvements to our resolution processes.",
              example: "I managed our first major enterprise incident response, coordinated engineering, account management, and legal, communicated transparently with the customer, and led the post-incident review that resulted in process improvements now used by the whole team.",
            },
            IC5: {
              text: "I define our issue resolution strategy, build processes that improve speed and quality at scale, and partner cross-functionally to address root causes of customer issues.",
              example: "I redesigned our escalation playbook, introduced SLA tiers based on account value, reduced average resolution time by 30%, and led a cross-functional programme to address the top five root causes of escalations.",
            },
          },
        },
        {
          id: "cs-collaboration",
          name: "Cross-functional Collaboration",
          statements: {
            IC2: {
              text: "I collaborate constructively with my immediate team, share relevant information proactively, and contribute positively to our team culture.",
              example: "I shared a useful product workaround I discovered with my team during standup, and the team added it to our knowledge base the same day.",
            },
            IC3: {
              text: "I work effectively across teams to resolve complex customer issues, communicate clearly with technical and non-technical stakeholders, and contribute to cross-functional initiatives.",
              example: "I partnered with an engineer to investigate a data issue affecting six accounts, clearly articulated the customer impact, and joined the technical call to ensure the engineer had the context needed to prioritise correctly.",
            },
            IC4: {
              text: "I build strong cross-functional relationships to improve the customer experience, drive joint initiatives between support and product or engineering, and mentor junior team members.",
              example: "I established a monthly sync between support and product, built a shared prioritisation view of customer-reported issues, and mentored two junior colleagues in cross-team communication and escalation.",
            },
            IC5: {
              text: "I represent the voice of the customer at an organisational level, drive cross-functional alignment on customer experience strategy, and build a collaborative culture between support and product teams.",
              example: "I partnered with the CPO to launch a customer experience council, presented support insights at quarterly business reviews, and drove a company-wide initiative that improved our NPS score by 18 points over 12 months.",
            },
          },
        },
      ],
    },
  ],
};

// ─── Marketing — IC Track ────────────────────────────────────────────────────

export const MARKETING_IC: CompetencySet = {
  jobFamilyName: "Marketing",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    {
      id: "mkt-strategy",
      name: "Strategy & Market",
      fullName: "Marketing Strategy & Business Integration",
      subdimensions: [
        {
          id: "mkt-strategy-biz",
          name: "Marketing Strategy & Business Integration",
          statements: {
            IC2: {
              text: "I understand our marketing strategy and business goals at a foundational level, and I contribute to executing defined marketing activities within my area.",
              example: "I implemented our Q3 email campaign following the brief provided, tracked open and click rates against targets, and shared results in our weekly team meeting.",
            },
            IC3: {
              text: "I contribute to marketing strategy development, align my channel activities with business objectives, and bring data-driven insights to planning discussions.",
              example: "I presented an analysis of our content performance at our quarterly strategy review, identified a gap in our mid-funnel nurture, and proposed a new email sequence that drove a 15% increase in trial conversions.",
            },
            IC4: {
              text: "I contribute to strategic marketing planning at a department level, align marketing investments with business outcomes, and lead significant marketing programmes from strategy through execution.",
              example: "I owned our product launch strategy for a new enterprise tier, coordinated activities across three channels, presented the plan to the CMO, and achieved 125% of our pipeline target in the first quarter.",
            },
            IC5: {
              text: "I define the marketing strategy for my area, integrate it seamlessly with the broader business strategy, and influence executive decisions about marketing investment and direction.",
              example: "I co-authored our 3-year marketing strategy with the CMO, presented it to the board, and led the cross-brand alignment that unified our go-to-market approach across five portfolio companies.",
            },
          },
        },
      ],
    },
    {
      id: "mkt-growth",
      name: "Growth & Demand",
      fullName: "Lead Generation, Acquisition & Content",
      subdimensions: [
        {
          id: "mkt-lead-gen",
          name: "Lead Generation & Funnel Optimisation",
          statements: {
            IC2: {
              text: "I execute lead generation activities within defined programmes, track results against targets, and support optimisation efforts under guidance.",
              example: "I managed our weekly email sends, A/B tested two subject line variations, tracked open rates and CTR, and reported findings to help inform the next campaign's approach.",
            },
            IC3: {
              text: "I independently manage lead generation programmes, identify funnel bottlenecks, and implement and measure optimisations that improve conversion rates.",
              example: "I identified that our demo request form was losing 40% of visitors on the company size field, ran an experiment removing it, and improved form completion rate by 28%.",
            },
            IC4: {
              text: "I lead funnel strategy and optimisation across channels, set targets, design experiments at scale, and drive significant improvements to lead quality and volume.",
              example: "I redesigned our lead scoring model using six-month conversion data, implemented tiered nurture tracks by segment, and improved SQL-to-opportunity conversion by 22% in two quarters.",
            },
            IC5: {
              text: "I define our demand generation strategy, build the programmes and capabilities that scale lead generation, and set the standard for funnel performance across the marketing organisation.",
              example: "I built our demand generation function from scratch, hired a team of four, defined our ICP-based targeting model, and grew monthly inbound pipeline from zero to €2M in 18 months.",
            },
          },
        },
        {
          id: "mkt-channels",
          name: "Acquisition & Growth Channels",
          statements: {
            IC2: {
              text: "I execute campaigns across one or two acquisition channels, follow established playbooks, and report on performance against defined KPIs.",
              example: "I ran our Google Ads campaigns following our standard setup guide, monitored daily performance, paused underperforming keywords, and reported weekly to the senior marketer.",
            },
            IC3: {
              text: "I manage multiple acquisition channels independently, optimise performance across channels, and identify new channel opportunities based on data.",
              example: "I managed our paid social and SEM programmes simultaneously, identified an opportunity in LinkedIn for our B2B segment, ran a pilot that achieved a 30% lower CPL than our existing channels, and proposed a budget reallocation.",
            },
            IC4: {
              text: "I lead our acquisition strategy across multiple channels, allocate budget to maximise ROI, build new channel capabilities, and mentor junior marketers in channel management.",
              example: "I led our multi-channel acquisition strategy across five channels, built a media mix model to guide budget allocation, launched and scaled a new affiliate programme, and mentored two marketers in data-driven optimisation.",
            },
            IC5: {
              text: "I define our channel strategy and portfolio, build scalable acquisition capabilities, and lead the team's development of channel expertise.",
              example: "I defined our channel investment strategy for the next three years, built a centre of excellence for paid acquisition, and led the evaluation and onboarding of three new channel partnerships that now drive 25% of our pipeline.",
            },
          },
        },
        {
          id: "mkt-content",
          name: "Content, SEO & Demand Engine",
          statements: {
            IC2: {
              text: "I create on-brand content for defined briefs, follow our SEO guidelines, and contribute to the content calendar under direction.",
              example: "I wrote three blog posts following our SEO brief templates, optimised them using our standard keyword research tool, and delivered them on schedule with all meta information included.",
            },
            IC3: {
              text: "I independently manage content programmes, conduct keyword and audience research, optimise content for search and engagement, and build assets that support our demand generation strategy.",
              example: "I built our organic search programme from a standing start, conducted competitor keyword analysis, wrote 20+ optimised articles in six months, and grew our organic sessions by 60%.",
            },
            IC4: {
              text: "I lead our content and SEO strategy, build a content team or programme, set standards for quality and performance, and integrate content into our broader demand generation engine.",
              example: "I defined our content strategy, built an editorial calendar covering eight content types, led a team of two content managers, and grew our content's contribution to pipeline from 5% to 22% over 12 months.",
            },
            IC5: {
              text: "I define the content and organic strategy for our marketing function, integrate it into our overall demand engine, and build the expertise and processes that make content a competitive advantage.",
              example: "I authored our content-first marketing strategy, presented it to the CMO and CEO, built a content operation serving six brands, and established our editorial governance model that reduced time-to-publish by 40%.",
            },
          },
        },
      ],
    },
    {
      id: "mkt-analytics",
      name: "Analytics & Operations",
      fullName: "Analytics, Attribution & Marketing Operations",
      subdimensions: [
        {
          id: "mkt-analytics-attr",
          name: "Analytics, Attribution & SaaS Metrics",
          statements: {
            IC2: {
              text: "I track and report on basic marketing metrics, understand our primary KPIs, and use dashboards to monitor campaign performance.",
              example: "I built a weekly performance dashboard for our email channel showing open rate, CTR, and unsubscribe rate, and presented it in our team meeting each week.",
            },
            IC3: {
              text: "I independently analyse marketing performance data, build attribution models for my channels, and use SaaS metrics to guide my decision-making.",
              example: "I built a first-touch attribution model for our inbound channels, identified that organic search was generating 40% of MQLs but receiving only 10% of our budget, and made the case for reallocation.",
            },
            IC4: {
              text: "I lead marketing analytics for the team, design our attribution framework, drive data-driven decision-making, and mentor others in performance analysis.",
              example: "I implemented our multi-touch attribution model, built a quarterly business review template connecting marketing spend to pipeline and revenue, and trained four marketers in SQL basics to make them more self-sufficient with data.",
            },
            IC5: {
              text: "I define our marketing analytics and measurement strategy, integrate marketing data into company reporting, and build the analytics capability that enables evidence-based decisions at all levels.",
              example: "I led the implementation of our marketing data warehouse, defined our attribution philosophy and implemented it across all channels, and partnered with the CFO to build the marketing ROI model used in annual budget planning.",
            },
          },
        },
        {
          id: "mkt-automation",
          name: "Marketing Automation, AI & Operations",
          statements: {
            IC2: {
              text: "I use our marketing automation tools to execute campaigns, follow established workflows, and flag issues to the team for resolution.",
              example: "I set up automated email sequences in our CRM following the playbook, tested delivery and link tracking before launch, and reported a workflow issue to our marketing ops colleague when I noticed a data sync problem.",
            },
            IC3: {
              text: "I independently configure and optimise marketing automation workflows, integrate AI tools into my work, and contribute to improving our marketing operations.",
              example: "I redesigned our lead nurture automation from 3 to 7 personalised tracks based on behaviour, integrated an AI copywriting tool that saved 4 hours per campaign cycle, and documented the new workflow for the team.",
            },
            IC4: {
              text: "I lead marketing automation and operations for the team, evaluate and adopt AI and automation tools strategically, and build the systems that make our marketing scalable.",
              example: "I built our marketing operations stack from CRM to attribution, introduced AI-powered content personalisation that improved click-through by 35%, and created the onboarding programme for all marketing tools.",
            },
            IC5: {
              text: "I define our marketing technology and automation strategy, drive AI adoption across the marketing function, and build the technical and process foundations that enable our marketing to scale.",
              example: "I authored our three-year martech roadmap, led the evaluation and implementation of our new marketing platform, introduced our AI-first content production model, and set the AI fluency standards for the marketing organisation.",
            },
          },
        },
      ],
    },
  ],
};

// ─── Sales — IC Track ────────────────────────────────────────────────────────

export const SALES_IC: CompetencySet = {
  jobFamilyName: "Sales",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    {
      id: "sales-pipeline",
      name: "Prospecting & Pipeline",
      fullName: "Prospecting, Pipeline & Sales Strategy",
      subdimensions: [
        {
          id: "sales-prospecting",
          name: "Prospecting and Lead Generation",
          statements: {
            IC2: {
              text: "I execute outbound prospecting activities following established playbooks, build my pipeline within my assigned territory, and track my activity metrics.",
              example: "I completed 50 outbound sequences last month following our standard cadence, generated 8 new meetings, and maintained my activity log in CRM as required.",
            },
            IC3: {
              text: "I independently build a strong and qualified pipeline through targeted prospecting, iterate on my approach based on what's working, and exceed my meeting booking targets.",
              example: "I identified a new vertical showing strong intent signals, built a targeted sequence for it, achieved a 12% reply rate vs. team average of 7%, and booked 15 qualified meetings in the quarter.",
            },
            IC4: {
              text: "I develop and refine our prospecting strategy for my market segment, coach junior reps in prospecting skills, and build pipeline at a scale that supports team targets.",
              example: "I rebuilt our prospecting approach for the enterprise segment, introduced intent data signals, trained three SDRs on the new methodology, and increased enterprise pipeline by 40% in two quarters.",
            },
            IC5: {
              text: "I define our sales prospecting and lead generation strategy, build the systems and playbooks that scale our pipeline creation, and develop the team's prospecting capability.",
              example: "I designed our outbound motion from scratch for a new market entry, built the ICP, the messaging framework, and the playbooks, and trained a team of four SDRs — achieving 150% of our pipeline target in the first quarter.",
            },
          },
        },
        {
          id: "sales-funnel",
          name: "Sales Strategy and Funnel Management",
          statements: {
            IC2: {
              text: "I manage my individual pipeline in our CRM, follow the defined sales process, and move opportunities through the funnel with support from my manager.",
              example: "I keep all my opportunities up-to-date in Salesforce, use our standard qualification framework, and discuss my key deals in our weekly pipeline review.",
            },
            IC3: {
              text: "I independently manage a complex pipeline, qualify opportunities rigorously, accurately forecast my business, and adapt my sales approach to improve win rates.",
              example: "I maintained 95% forecast accuracy over two consecutive quarters, identified a pattern in lost deals related to a pricing objection, and developed a new response that helped me win the next three similar deals.",
            },
            IC4: {
              text: "I lead pipeline strategy for my segment, drive forecast accuracy, identify systemic gaps in our funnel, and implement improvements that lift team win rates.",
              example: "I led a funnel analysis that found we were losing 60% of deals at the technical validation stage, redesigned our demo process, implemented a new technical win strategy, and improved stage-to-close conversion by 18%.",
            },
            IC5: {
              text: "I define the sales strategy and go-to-market approach for my area, build the systems that give leadership visibility into pipeline health, and align sales execution with company strategy.",
              example: "I designed our enterprise sales motion, built the forecast model used in board reporting, and led the quarterly business review process that aligned our sales team's activities with company revenue targets.",
            },
          },
        },
      ],
    },
    {
      id: "sales-relationship",
      name: "Customer & Relationship",
      fullName: "Interpersonal Skills, Relationship Building & Negotiation",
      subdimensions: [
        {
          id: "sales-interpersonal",
          name: "Interpersonal Skills",
          statements: {
            IC2: {
              text: "I build positive rapport with prospects and customers, communicate clearly, and represent our company professionally in all interactions.",
              example: "I received positive feedback from a prospect after our initial call, with their note that I had listened well and communicated our product's benefits clearly and without jargon.",
            },
            IC3: {
              text: "I build genuine relationships with buyers across the buying committee, read the room effectively, and adapt my communication style to different stakeholders.",
              example: "During a complex deal, I managed relationships with four stakeholders simultaneously — adapting my approach from highly technical with the CTO to ROI-focused with the CFO — and successfully navigated competing concerns.",
            },
            IC4: {
              text: "I build deep relationships with executive buyers, handle difficult conversations with composure, and leverage my interpersonal skills to win complex, long-cycle deals.",
              example: "I rebuilt a stalled enterprise deal by having a candid conversation with the VP of Operations about their concerns, addressing them directly, and ultimately closing the deal six months after it had been written off.",
            },
            IC5: {
              text: "I set the standard for executive relationship management in our team, coach others in advanced interpersonal selling skills, and use relationship capital strategically to advance business goals.",
              example: "I manage C-level relationships at our top 10 accounts, run our executive engagement programme, and have mentored three AEs in executive communication skills — all three of whom subsequently closed their first seven-figure deals.",
            },
          },
        },
        {
          id: "sales-relationship-building",
          name: "Relationship Building",
          statements: {
            IC2: {
              text: "I build new relationships with potential customers through consistent outreach and follow-up, and I maintain positive relationships with existing contacts.",
              example: "I followed up with every prospect within 24 hours of their request, sent personalised notes after each call, and maintained a 90%+ response rate in my follow-up sequences.",
            },
            IC3: {
              text: "I develop multi-threaded relationships within accounts, build a reliable referral network, and retain and grow existing customer relationships.",
              example: "I expanded our footprint in a key account by building relationships with three additional stakeholders, which led to an upsell conversation and a 35% expansion of the contract.",
            },
            IC4: {
              text: "I build and leverage strategic relationships with industry partners, customers, and influencers to create business value and pipeline for my team.",
              example: "I developed a partnership with a complementary vendor that generated 8 qualified referrals in two quarters and co-presented with their team at an industry event that built our brand in the enterprise segment.",
            },
            IC5: {
              text: "I define our relationship strategy for key accounts and strategic partners, build relationships at the highest level, and use these relationships to create sustainable competitive advantage.",
              example: "I built our strategic accounts programme, personally manage relationships with our 5 largest accounts, and leveraged one CEO relationship to open doors for our expansion into a new geography.",
            },
          },
        },
        {
          id: "sales-negotiation",
          name: "Negotiation and Influence",
          statements: {
            IC2: {
              text: "I handle basic negotiation situations using our standard playbook, know our discount policies, and escalate complex negotiation situations to my manager.",
              example: "When a prospect asked for a discount, I followed our playbook — explored the reason, offered annual billing as an alternative, and escalated to my manager when they pushed for more than I was authorised to offer.",
            },
            IC3: {
              text: "I independently manage commercial negotiations, create and defend value effectively, and close deals at or above target margins.",
              example: "I closed a €150K deal without any discount by reframing the ROI conversation around our customer's specific cost reduction goal, making price a secondary concern.",
            },
            IC4: {
              text: "I lead complex negotiations involving multiple decision-makers and procurement processes, mentor junior reps in negotiation skills, and consistently protect margins.",
              example: "I led a six-month enterprise negotiation with procurement, legal, and the executive team, maintained our price point through three rounds of redlining, and closed a €600K deal at list price.",
            },
            IC5: {
              text: "I define our negotiation strategy and principles, build our team's negotiation capability, and personally lead the most strategically important commercial negotiations.",
              example: "I designed our enterprise negotiation playbook, ran quarterly negotiation skills workshops for the team, and personally led the negotiation for our largest-ever contract — a €2M multi-year agreement.",
            },
          },
        },
      ],
    },
    {
      id: "sales-domain",
      name: "Domain & Resilience",
      fullName: "Product Knowledge, Business Acumen & Resilience",
      subdimensions: [
        {
          id: "sales-product-knowledge",
          name: "Product and Industry Knowledge",
          statements: {
            IC2: {
              text: "I am building my knowledge of our product and the industries we serve, and I can handle standard product questions confidently.",
              example: "I completed our product certification programme, shadowed two technical demos by senior reps, and handled my first solo demo this quarter with positive feedback from the prospect.",
            },
            IC3: {
              text: "I have deep product knowledge and solid understanding of our target industries, and I use this knowledge to connect our solution to specific customer challenges.",
              example: "I used my knowledge of e-commerce workflows to identify a specific inventory management pain point during discovery, mapped it to three of our features, and used this connection to differentiate us from our main competitor.",
            },
            IC4: {
              text: "I am recognised as a product and industry expert by both customers and internal teams, contribute to product feedback, and help develop sales enablement materials.",
              example: "I became our team's go-to resource for technical questions in our fintech vertical, contributed to three product specification discussions, and wrote our fintech use case guide now used by all AEs in that segment.",
            },
            IC5: {
              text: "I define our team's knowledge standards, build enablement programmes that develop expertise across the team, and represent our domain expertise externally at industry events.",
              example: "I built our sales knowledge academy, created learning paths by role and segment, and represented our company at two industry conferences as a speaker — generating 15 qualified leads and strengthening our brand in the market.",
            },
          },
        },
        {
          id: "sales-biz-acumen",
          name: "Business Acumen",
          statements: {
            IC2: {
              text: "I understand the basic business context of my prospects, connect our solution to fundamental business problems, and learn our industry's key metrics and terminology.",
              example: "Before each discovery call, I research the prospect's company, understand their business model, and prepare questions that show I understand their commercial context.",
            },
            IC3: {
              text: "I connect our solution to measurable business outcomes, understand my customers' business models, and build financially grounded business cases for our solution.",
              example: "I built a bespoke ROI model for a manufacturing prospect, quantified the cost of their current process in their own terms, and presented a three-year payback analysis that was the deciding factor in their purchase decision.",
            },
            IC4: {
              text: "I lead strategic business discussions with senior buyers, understand complex organisational dynamics, and develop sophisticated business cases for enterprise decisions.",
              example: "I developed a total cost of ownership analysis for an enterprise prospect comparing our solution against their build-in-house alternative, presented it to their CFO and board committee, and used it to close a deal that had stalled for six months.",
            },
            IC5: {
              text: "I develop our team's commercial acumen, define frameworks for business case development, and represent our company's business value at the highest levels.",
              example: "I created our enterprise value framework, trained the team in business case methodology, and was invited to present our ROI approach at a customer executive forum that has since become an annual event.",
            },
          },
        },
        {
          id: "sales-grit",
          name: "Grit and Resilience",
          statements: {
            IC2: {
              text: "I maintain a positive, proactive attitude through the challenges of sales, seek support when needed, and consistently show up with energy for my work.",
              example: "After a difficult month where three deals fell through, I reviewed what I could learn from each, discussed the patterns with my manager, and hit my activity targets the following month without losing enthusiasm.",
            },
            IC3: {
              text: "I maintain performance through adversity, learn constructively from setbacks, and demonstrate sustained drive and self-motivation quarter after quarter.",
              example: "After losing our biggest deal of the year in Q2, I conducted a thorough lost deal analysis, adjusted my qualification approach, and closed my strongest Q3 in three years.",
            },
            IC4: {
              text: "I model resilience for my team, help others recover from setbacks, and maintain strategic focus and performance even under sustained pressure.",
              example: "During a difficult market period where team morale was low, I ran a team retrospective on our wins and learnings, rebuilt energy through a focused sprint planning session, and helped three reps reset their approach and recover their pipelines.",
            },
            IC5: {
              text: "I set the resilience culture for our sales organisation, lead teams through major commercial challenges, and build the psychological safety that enables everyone to take calculated risks.",
              example: "When we missed our revenue target two quarters in a row, I led a strategic review, communicated the plan transparently to the board, supported individual team members through difficult conversations, and led us to 108% attainment the following quarter.",
            },
          },
        },
        {
          id: "sales-problem-solving",
          name: "Problem Solving and Critical Thinking",
          statements: {
            IC2: {
              text: "I solve straightforward customer problems using available resources, follow logical troubleshooting approaches, and escalate appropriately when needed.",
              example: "A prospect raised a concern about data security that wasn't covered in my standard materials; I escalated to our solutions engineer, got the answer within the day, and closed the deal the following week.",
            },
            IC3: {
              text: "I independently identify and resolve complex sales challenges, think critically about deal situations, and adapt creatively to overcome obstacles.",
              example: "I identified that our main competitor had a significant price advantage in one segment; I developed a total value argument that repositioned cost as a secondary factor and used it to win three deals in a row.",
            },
            IC4: {
              text: "I lead the problem-solving effort on complex, multi-stakeholder deals, design creative solutions to commercial challenges, and develop team capability in critical thinking.",
              example: "I led the solution design for a complex deal where the customer needed a non-standard commercial structure; I coordinated legal, finance, and product to design a proposal that met their needs and closed a €1.2M deal.",
            },
            IC5: {
              text: "I solve our organisation's most complex commercial and strategic challenges, develop frameworks for systematic problem-solving, and build our team's critical thinking capability.",
              example: "I designed our deal review framework for complex opportunities, trained the leadership team in its use, and applied it to rescue three previously written-off enterprise opportunities — two of which we ultimately won.",
            },
          },
        },
      ],
    },
  ],
};

// ─── Talent Acquisition — IC Track ───────────────────────────────────────────

export const TALENT_ACQUISITION_IC: CompetencySet = {
  jobFamilyName: "Talent Acquisition",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    {
      id: "ta-hiring",
      name: "Hiring Excellence",
      fullName: "Hiring Process & Candidate Experience",
      subdimensions: [
        {
          id: "ta-process",
          name: "End-to-End Hiring Process Ownership",
          statements: {
            IC2: {
              text: "I manage the administrative steps of the hiring process under guidance, coordinate interviews efficiently, and support candidates through each stage.",
              example: "I coordinated the interview schedule for three roles simultaneously, sent timely communications to all candidates, and ensured every interviewer had the interview guide and candidate pack the day before.",
            },
            IC3: {
              text: "I independently manage the full hiring process for my assigned roles, ensure a consistent candidate experience, and meet time-to-hire targets.",
              example: "I ran the full hiring process for five roles across two brands in Q2, achieved an average time-to-hire of 28 days vs. 45-day target, and received positive feedback from four out of five candidates in post-process surveys.",
            },
            IC4: {
              text: "I lead hiring processes for critical or complex roles, design process improvements, and ensure hiring quality across multiple concurrent programmes.",
              example: "I redesigned our executive hiring process, introduced structured assessment panels, reduced mis-hire risk by implementing a 90-day check-in programme, and managed four C-level searches simultaneously.",
            },
            IC5: {
              text: "I define our hiring process standards and quality framework, oversee hiring across the organisation, and build the TA capability that enables scale.",
              example: "I built our TA operating model from the ground up, defined our hiring playbook, established quality metrics for every stage, and scaled our team from 2 to 8 recruiters while maintaining quality and speed.",
            },
          },
        },
        {
          id: "ta-candidate-experience",
          name: "Candidate Management and Candidate Experience",
          statements: {
            IC2: {
              text: "I communicate clearly and promptly with candidates, follow our candidate care standards, and handle straightforward candidate situations independently.",
              example: "I sent all candidates personalised updates within 48 hours of each decision, handled one difficult rejection call with empathy using our feedback framework, and received positive Glassdoor feedback from a candidate who wasn't selected.",
            },
            IC3: {
              text: "I deliver an excellent candidate experience throughout the hiring journey, handle complex or sensitive situations thoughtfully, and contribute to improving our candidate care practices.",
              example: "I managed a delicate situation where our preferred candidate had a competing offer, negotiated sensitively, maintained the relationship, and ultimately closed the candidate. I then wrote up the approach as a playbook for the team.",
            },
            IC4: {
              text: "I lead candidate experience strategy, design touchpoints that differentiate us as an employer, and use candidate feedback to systematically improve our process.",
              example: "I introduced a candidate NPS programme, achieved a 4.6/5 average across 120 candidates in 6 months, identified our weakest touchpoint — decision timelines — and led a process change that improved that score by 0.8 points.",
            },
            IC5: {
              text: "I define our employer experience philosophy, build the practices that make us a destination employer, and ensure candidate experience is a strategic advantage in talent acquisition.",
              example: "I led the design of our candidate experience programme, partnered with marketing on our employer brand, presented the strategy to the board, and achieved Top 10 employer recognition in two of our key talent markets.",
            },
          },
        },
      ],
    },
    {
      id: "ta-partnering",
      name: "Business Partnering",
      fullName: "TA Business Partnering & Operational Excellence",
      subdimensions: [
        {
          id: "ta-bp",
          name: "TA Business Partnering and Hiring Manager Advisory",
          statements: {
            IC2: {
              text: "I support hiring managers with clear communication, keep them informed on role progress, and learn to manage expectations constructively.",
              example: "I ran weekly status meetings with my two hiring managers, set expectations on typical timelines, and flagged early when one role was taking longer due to market conditions.",
            },
            IC3: {
              text: "I advise hiring managers on talent strategy, challenge them constructively when needed, and ensure they have what they need to make great hiring decisions.",
              example: "I pushed back on a hiring manager's requirement to have a candidate with experience in an obscure tool, explained the market impact, and proposed an alternative skills-based assessment that led to a hire who has been outstanding.",
            },
            IC4: {
              text: "I lead TA business partnerships across my assigned area, advise senior leaders on talent strategy, and influence the quality of hiring decisions at the top of the house.",
              example: "I established a formal TA business partner relationship with three Brand GMs, ran quarterly talent strategy sessions, and challenged and changed two poor hiring decisions through data and market evidence.",
            },
            IC5: {
              text: "I define our TA business partner model, build the relationships and credibility that give TA strategic influence, and partner with the executive team on workforce planning.",
              example: "I built our TA business partner function, established regular touchpoints with all C-level stakeholders, and used talent market data to successfully argue for a compensation band review that enabled us to close three critical hires we had been losing.",
            },
          },
        },
        {
          id: "ta-ops",
          name: "TA Operational Excellence",
          statements: {
            IC2: {
              text: "I follow our TA processes accurately, maintain clean data in our ATS, and contribute to an organised and efficient team workflow.",
              example: "I keep every candidate and role record in Greenhouse updated within 24 hours of any action, flag data quality issues I notice, and contribute to our weekly process audit.",
            },
            IC3: {
              text: "I identify inefficiencies in our TA operations, propose and implement improvements, and contribute to building a scalable and high-quality TA function.",
              example: "I noticed our referral conversion rate was low despite high volume; I proposed a structured referral programme with a dedicated onboarding journey, ran it for a quarter, and improved conversion by 40%.",
            },
            IC4: {
              text: "I lead TA operational improvements, build the systems and processes that enable quality and speed at scale, and drive data discipline across the team.",
              example: "I led the implementation of our new ATS, defined our data taxonomy, built our reporting suite, ran the change management programme with the team, and achieved full adoption within 6 weeks.",
            },
            IC5: {
              text: "I define our TA operations strategy, set quality and efficiency standards, and build the infrastructure that enables our TA function to scale with the business.",
              example: "I built our TA operations function, implemented our tech stack including ATS, sourcing, and assessments, defined our data and reporting standards, and built an operations team that now supports 200+ hires per year.",
            },
          },
        },
      ],
    },
    {
      id: "ta-insights",
      name: "Insights & Channels",
      fullName: "Data Insights & Candidate Channels",
      subdimensions: [
        {
          id: "ta-data",
          name: "Data-Driven Insights and Reporting",
          statements: {
            IC2: {
              text: "I track basic hiring metrics, produce standard reports using our BI tools, and use data to keep stakeholders informed on role status.",
              example: "I produce a weekly pipeline report for my hiring managers showing applications by stage, time in stage, and any bottlenecks, and I highlight any concerns proactively.",
            },
            IC3: {
              text: "I independently analyse hiring data, identify trends and bottlenecks, and use insights to recommend process improvements to my team and hiring managers.",
              example: "I analysed our offer decline data over 12 months, identified that 60% of declines cited compensation as the reason, and used this data to make the case for a salary band review in three critical roles.",
            },
            IC4: {
              text: "I build and own our TA reporting capability, design dashboards that give leadership meaningful visibility, and use data to drive strategic talent decisions.",
              example: "I built our TA performance dashboard used in executive QBRs, including quality, speed, and cost metrics, and used the data to successfully argue for two additional recruiter headcounts based on hiring velocity trends.",
            },
            IC5: {
              text: "I define our talent analytics strategy, ensure TA data is integrated into company reporting, and use talent market intelligence to inform business decisions.",
              example: "I built our talent intelligence capability, partnered with the people analytics team to integrate TA data into our HR dashboard, and presented a talent market analysis to the board that influenced our location strategy for the next three years.",
            },
          },
        },
        {
          id: "ta-channels",
          name: "Candidate Channels Management",
          statements: {
            IC2: {
              text: "I post roles to our standard channels, monitor basic performance metrics, and escalate when channels are underperforming.",
              example: "I post all new roles on our agreed channels within 24 hours of opening, track application volume by source weekly, and flagged last quarter that LinkedIn was generating twice the volume of Indeed for our technical roles.",
            },
            IC3: {
              text: "I independently manage and optimise our sourcing channels, evaluate new channel opportunities, and adapt our sourcing approach based on performance data.",
              example: "I identified that our passive sourcing through LinkedIn Recruiter was generating 40% of our hires but receiving only 10% of our time, restructured my weekly routines, and improved passive hire rate by 25% in one quarter.",
            },
            IC4: {
              text: "I develop our channel strategy for my talent segment, build new sourcing capabilities, and coach the team in channel optimisation.",
              example: "I built our engineering talent sourcing strategy, introduced GitHub and Stack Overflow as active sourcing channels, created a community engagement approach, and trained three junior recruiters in technical sourcing.",
            },
            IC5: {
              text: "I define our overall channel strategy, invest in building proprietary talent communities, and ensure our sourcing capability is a competitive advantage.",
              example: "I built our talent community programme with 2,000+ opted-in prospects, introduced an ambassador programme with 15 employee advocates, and reduced our dependency on paid job boards from 70% to 30% of hires over 18 months.",
            },
          },
        },
      ],
    },
  ],
};

// ─── Accounting — IC Track ───────────────────────────────────────────────────

export const ACCOUNTING_IC: CompetencySet = {
  jobFamilyName: "Accounting",
  track: "IC",
  levels: ["IC2", "IC3", "IC4", "IC5"],
  themes: [
    {
      id: "acc-compliance",
      name: "Compliance & Standards",
      fullName: "Accounting Standards, Compliance & Internal Controls",
      subdimensions: [
        {
          id: "acc-standards",
          name: "Accounting Standards & Compliance",
          statements: {
            IC2: {
              text: "I apply accounting standards correctly to my assigned tasks, follow our compliance processes, and escalate when I encounter situations outside my current knowledge.",
              example: "When preparing journal entries for a new expense type, I referenced our accounting policy, confirmed the correct treatment with my senior, and documented my reasoning in the workpaper.",
            },
            IC3: {
              text: "I independently apply relevant accounting standards to moderately complex transactions, stay current with regulatory changes, and contribute to compliance reviews.",
              example: "I researched the IFRS 15 treatment for a new subscription product offering, prepared the accounting memo, shared it with the Finance Controller, and incorporated their feedback before implementation.",
            },
            IC4: {
              text: "I lead technical accounting assessments for complex or novel transactions, maintain our accounting policy documentation, and advise the team on standards application.",
              example: "I led the technical assessment of a complex acquisition including purchase price allocation, determined the IFRS treatment, reviewed the work with external auditors, and trained two junior accountants on the framework.",
            },
            IC5: {
              text: "I define our accounting policy framework, lead our response to new standards, and represent the company in technical accounting discussions with auditors and regulators.",
              example: "I led our IFRS 16 implementation programme, authored our policy documentation, coordinated with the audit committee, and ran the technical training programme for all 12 finance team members.",
            },
          },
        },
        {
          id: "acc-audit-controls",
          name: "Audit & Internal Controls",
          statements: {
            IC2: {
              text: "I prepare audit-ready workpapers, follow our internal control processes, and support the audit team with requested documentation.",
              example: "During the last audit cycle, I prepared 15 workpapers, responded to all auditor queries within the agreed timeframe, and flagged one control exception I identified during my review.",
            },
            IC3: {
              text: "I manage the audit relationship for my areas, identify and remediate control weaknesses, and contribute to designing effective internal controls.",
              example: "I independently managed the revenue audit for the first time, coordinated evidence requests across three teams, identified a documentation gap in our contract review process, and proposed a remediation that was implemented before the audit closed.",
            },
            IC4: {
              text: "I lead our audit process for major areas, design controls that address key financial risks, and drive continuous improvement in our control environment.",
              example: "I led our first SOC 2 Type II preparation for the finance function, designed 25 new controls, coordinated the 6-month audit, and achieved a clean opinion with zero exceptions.",
            },
            IC5: {
              text: "I define our internal control framework, lead our relationship with external auditors, and drive a culture of control consciousness across the finance function.",
              example: "I defined our enterprise risk management framework for finance, led the board audit committee's annual control assessment, and implemented a quarterly control monitoring programme that has maintained a clean audit record for three consecutive years.",
            },
          },
        },
      ],
    },
    {
      id: "acc-operations",
      name: "Core Operations",
      fullName: "Core Accounting Operations & Revenue",
      subdimensions: [
        {
          id: "acc-core-ops",
          name: "Core Accounting Operations",
          statements: {
            IC2: {
              text: "I accurately complete assigned accounting tasks — including journal entries, reconciliations, and close activities — on time and with attention to detail.",
              example: "I completed all assigned month-end journal entries and three balance sheet reconciliations within the close deadline, with no corrections required after review.",
            },
            IC3: {
              text: "I manage complex accounting processes independently, drive continuous improvement in close quality and timeliness, and support junior team members.",
              example: "I reduced our month-end close timeline by two days by redesigning our intercompany reconciliation workflow, documenting the new process, and training two junior accountants on the updated approach.",
            },
            IC4: {
              text: "I lead major accounting processes, ensure quality and timeliness across the team, and drive systemic improvements that increase accuracy and efficiency.",
              example: "I led the implementation of our automated bank reconciliation process, reduced manual effort by 60%, managed the testing and go-live, and trained the team on the new workflow.",
            },
            IC5: {
              text: "I define our accounting operations standards, build the processes and controls that ensure financial integrity at scale, and lead transformation of our core operations.",
              example: "I built our accounting operations function from scratch across three entities, implemented our close management tool, defined quality standards, and scaled from a 15-day to an 8-day close within 12 months.",
            },
          },
        },
        {
          id: "acc-revenue",
          name: "Revenue Recognition & Billing",
          statements: {
            IC2: {
              text: "I apply our revenue recognition policies to standard transactions, process billing accurately, and escalate any transactions that appear outside normal patterns.",
              example: "I processed all monthly subscription billings, applied our standard rev rec policy to three new customer contracts, and escalated one bundled contract to my senior when I wasn't sure how to allocate the components.",
            },
            IC3: {
              text: "I independently manage revenue recognition for moderately complex arrangements, identify rev rec risks, and ensure billing accuracy across my portfolio.",
              example: "I managed revenue recognition for 45 enterprise contracts including variable consideration arrangements, identified two contracts with incorrect rev rec treatment, corrected them, and proposed updated guidance to prevent recurrence.",
            },
            IC4: {
              text: "I lead revenue accounting for complex arrangements, advise commercial teams on rev rec implications of deal structures, and ensure compliance with IFRS 15 across the business.",
              example: "I became our rev rec technical expert, reviewed all multi-element arrangements before contract signing, restructured two deals to optimise revenue timing, and led our annual revenue accounting training for the sales team.",
            },
            IC5: {
              text: "I define our revenue recognition policy, ensure compliance across all entities and products, and represent our revenue accounting position to auditors, the board, and regulators.",
              example: "I led our IFRS 15 adoption for six entities across three countries, authored our global revenue policy, presented our accounting positions to the audit committee, and maintained a clean revenue audit for two consecutive years.",
            },
          },
        },
      ],
    },
    {
      id: "acc-reporting",
      name: "Reporting & Systems",
      fullName: "Financial Reporting, Consolidation & Systems",
      subdimensions: [
        {
          id: "acc-reporting",
          name: "Financial Reporting & Group Consolidation",
          statements: {
            IC2: {
              text: "I prepare standard financial reports accurately and on time, follow our reporting templates, and support the group consolidation process.",
              example: "I prepared the monthly management accounts pack for one entity, completed the consolidation workpapers for my assigned entities, and met all internal deadlines.",
            },
            IC3: {
              text: "I independently manage financial reporting for my scope, ensure data quality, and contribute meaningful analysis that helps leadership understand financial performance.",
              example: "I produced the quarterly management accounts with variance analysis, identified a significant FX impact that had been previously undetected, and prepared a clear executive summary that prompted a hedging discussion with the CFO.",
            },
            IC4: {
              text: "I lead our financial reporting process, develop reporting frameworks that improve decision-making, and manage the consolidation of multiple entities.",
              example: "I redesigned our management reporting pack, introduced a rolling forecast model, led the consolidation of five entities, and reduced board pack preparation time from 3 days to 1.5 days.",
            },
            IC5: {
              text: "I define our financial reporting strategy, ensure compliance with disclosure requirements, and lead the development of reporting capabilities that serve all stakeholders.",
              example: "I built our group consolidation capability for 12 entities, defined our reporting standards, led our first statutory group audit, and implemented the board reporting framework now used across all brands.",
            },
          },
        },
        {
          id: "acc-systems",
          name: "Systems, Tools & Process Improvement",
          statements: {
            IC2: {
              text: "I use our accounting systems accurately, follow defined workflows, and flag system issues or inefficiencies I notice to the team.",
              example: "I noticed that our expense coding process required three manual steps that could be eliminated; I raised it in our team meeting, and it was picked up as a process improvement initiative.",
            },
            IC3: {
              text: "I identify and drive process improvements in our systems and workflows, implement solutions within my scope, and document changes for the team.",
              example: "I identified that our accruals process was taking 6 hours monthly due to manual data extraction; I built a query that reduced this to 30 minutes, documented it, and trained my two colleagues.",
            },
            IC4: {
              text: "I lead system and process improvement initiatives, evaluate new tools, drive adoption, and build the operational efficiency of our finance function.",
              example: "I led the implementation of our new expense management system, defined the requirements, managed the vendor relationship, ran the change programme, and achieved 90% adoption within the first month.",
            },
            IC5: {
              text: "I define our finance systems and technology strategy, build the digital capability of our finance function, and drive the transformation to a more automated and data-driven operation.",
              example: "I led our finance transformation programme, implemented our new ERP system across six entities, defined our systems roadmap, and built an internal finance technology team that now supports 50+ users.",
            },
          },
        },
      ],
    },
  ],
};

// ─── Lookup helpers ───────────────────────────────────────────────────────────

const FAMILY_CONTENT: Record<string, { IC?: CompetencySet }> = {
  Engineering: { IC: ENGINEERING_IC },
  "Product Management": { IC: PRODUCT_MANAGEMENT_IC },
  "Product Design": { IC: PRODUCT_DESIGN_IC },
  "Customer Support": { IC: CUSTOMER_SUPPORT_IC },
  Marketing: { IC: MARKETING_IC },
  Sales: { IC: SALES_IC },
  "Talent Acquisition": { IC: TALENT_ACQUISITION_IC },
  Accounting: { IC: ACCOUNTING_IC },
};

export function getCompetencySet(
  jobFamilyName: string | null | undefined,
  track: "IC" | "M"
): CompetencySet | null {
  if (track === "M") return GENERAL_M;
  if (!jobFamilyName) return GENERAL_IC;
  return FAMILY_CONTENT[jobFamilyName]?.IC ?? GENERAL_IC;
}
