export interface Actor {
  id: string;
  label: string;
  icon: string;
  description: string;
  threatLevel: "low" | "medium" | "high" | "critical";
}

export interface Asset {
  id: string;
  label: string;
  icon: string;
  description: string;
  category: string;
}

export interface CardItem {
  id: string;
  label: string;
  category: SlotKey;
  detail?: string;
}

export type SlotKey =
  | "actor"
  | "access"
  | "capability"
  | "task"
  | "harm"
  | "mitigation"
  | "evaluation";

export interface Pathway {
  id: string;
  slots: Record<SlotKey, CardItem | null>;
}

export interface RiskClassification {
  pathwayId: string;
  domain: string;
  severity: "low" | "medium" | "high" | "critical";
  evidence: string[];
  disclosure: string;
  notes: string;
}

export const ACTORS: Actor[] = [
  {
    id: "benign-novice",
    label: "Benign Novice User",
    icon: "👤",
    description:
      "Non-technical user exploring capabilities without harmful intent. May inadvertently trigger unsafe behaviors.",
    threatLevel: "low",
  },
  {
    id: "malicious-novice",
    label: "Malicious Novice User",
    icon: "⚠️",
    description:
      "User with harmful intent but limited technical expertise. Relies on model to bridge capability gaps.",
    threatLevel: "medium",
  },
  {
    id: "skilled-cyber",
    label: "Skilled Cyber Actor",
    icon: "🎯",
    description:
      "State-sponsored or criminal actor with advanced offensive cyber capabilities seeking AI-enabled uplift.",
    threatLevel: "critical",
  },
  {
    id: "enterprise-employee",
    label: "Enterprise Employee",
    icon: "💼",
    description:
      "Authorized user with legitimate workspace access. Risk of insider misuse or account compromise.",
    threatLevel: "medium",
  },
  {
    id: "researcher",
    label: "Researcher",
    icon: "🔬",
    description:
      "Academic or industry researcher probing capabilities. May extract sensitive capabilities under guise of research.",
    threatLevel: "medium",
  },
  {
    id: "model-developer",
    label: "Model Developer",
    icon: "⚙️",
    description:
      "Internal actor with privileged system access. Highest privilege level; insider threat and supply-chain risk.",
    threatLevel: "high",
  },
  {
    id: "external-auditor",
    label: "External Auditor",
    icon: "📋",
    description:
      "Third-party evaluator with controlled, scoped access for compliance or safety review purposes.",
    threatLevel: "low",
  },
];

export const ASSETS: Asset[] = [
  {
    id: "individual-users",
    label: "Individual Users",
    icon: "👥",
    description: "Direct harm to end users: psychological, financial, physical.",
    category: "People",
  },
  {
    id: "enterprise-systems",
    label: "Enterprise Systems",
    icon: "🏢",
    description:
      "Corporate infrastructure, proprietary data, workflow integrity.",
    category: "Infrastructure",
  },
  {
    id: "public-infrastructure",
    label: "Public Infrastructure",
    icon: "🔌",
    description: "Critical systems: power grids, water, transport, finance.",
    category: "Infrastructure",
  },
  {
    id: "bio-knowledge",
    label: "Sensitive Biological Knowledge",
    icon: "🧬",
    description:
      "Dual-use research, pathogen synthesis routes, select agent data.",
    category: "CBRN",
  },
  {
    id: "election-ecosystem",
    label: "Election Information Ecosystem",
    icon: "🗳️",
    description:
      "Public discourse integrity, voter behavior, electoral system trust.",
    category: "Democracy",
  },
  {
    id: "model-weights",
    label: "Model Weights",
    icon: "⚖️",
    description:
      "Proprietary parameters — exfiltration enables unconstrained deployment.",
    category: "AI System",
  },
  {
    id: "eval-dataset",
    label: "Evaluation Dataset",
    icon: "📊",
    description:
      "Benchmark integrity — contamination invalidates all safety decisions.",
    category: "AI System",
  },
];

export const PATHWAY_CARDS: CardItem[] = [
  // Access
  { id: "access-api", label: "Direct API Access", category: "access", detail: "Authenticated REST/SDK endpoint" },
  { id: "access-enterprise", label: "Enterprise Workspace", category: "access", detail: "SSO-integrated workspace with tool plugins" },
  { id: "access-public", label: "Public Web Interface", category: "access", detail: "Chat UI available to all users" },
  { id: "access-internal", label: "Internal System Access", category: "access", detail: "Internal deployment with elevated privileges" },
  { id: "access-research", label: "Research API Tier", category: "access", detail: "Rate-limited research access program" },
  { id: "access-plugin", label: "Plugin / Supply Chain", category: "access", detail: "Third-party integration or plugin ecosystem" },
  { id: "access-stolen", label: "Stolen Credentials", category: "access", detail: "Account takeover via phishing or credential theft" },

  // Capability
  { id: "cap-browse", label: "Web Browsing", category: "capability", detail: "Real-time internet access and retrieval" },
  { id: "cap-code", label: "Code Execution", category: "capability", detail: "Python, Bash sandbox with filesystem access" },
  { id: "cap-api", label: "External API Calls", category: "capability", detail: "Authenticated calls to third-party services" },
  { id: "cap-workspace", label: "Workspace Control", category: "capability", detail: "Email, calendar, docs, communications" },
  { id: "cap-reasoning", label: "Multi-step Reasoning", category: "capability", detail: "Long-horizon planning across complex tasks" },
  { id: "cap-memory", label: "Persistent Memory", category: "capability", detail: "Cross-session context retention" },
  { id: "cap-multimodal", label: "Multimodal Processing", category: "capability", detail: "Vision, document parsing, audio" },

  // Task
  { id: "task-exfil", label: "Exfiltrate Sensitive Data", category: "task", detail: "Extract and transmit confidential information" },
  { id: "task-malware", label: "Generate Exploit Code", category: "task", detail: "Write functional malware or vulnerability PoC" },
  { id: "task-social", label: "Automate Social Engineering", category: "task", detail: "Craft and send targeted phishing at scale" },
  { id: "task-bio", label: "Synthesize CBRN Information", category: "task", detail: "Aggregate dual-use biological/chemical data" },
  { id: "task-disinfo", label: "Generate Disinformation", category: "task", detail: "Produce coordinated false narratives" },
  { id: "task-probe", label: "Probe Authentication Systems", category: "task", detail: "Test and map authentication weaknesses" },
  { id: "task-contaminate", label: "Contaminate Eval Data", category: "task", detail: "Inject data to corrupt benchmark results" },
  { id: "task-impersonate", label: "Impersonate Authorized Users", category: "task", detail: "Forge communications from legitimate accounts" },

  // Harm
  { id: "harm-breach", label: "Data Breach", category: "harm", detail: "Unauthorized disclosure of sensitive data" },
  { id: "harm-infra", label: "Infrastructure Disruption", category: "harm", detail: "Service outage or critical system failure" },
  { id: "harm-bio", label: "Biological Weapon Uplift", category: "harm", detail: "Enabled or accelerated WMD development" },
  { id: "harm-disinfo", label: "Disinformation Campaign", category: "harm", detail: "Degraded public epistemics at scale" },
  { id: "harm-election", label: "Election Interference", category: "harm", detail: "Undermined democratic process integrity" },
  { id: "harm-safety", label: "Corrupted Safety Evaluations", category: "harm", detail: "Unsafe model deployed due to invalid benchmarks" },
  { id: "harm-physical", label: "Physical Harm Facilitation", category: "harm", detail: "Enabled real-world violence or injury" },
  { id: "harm-economic", label: "Economic Sabotage", category: "harm", detail: "Financial system manipulation or theft" },

  // Mitigation
  { id: "mit-policy", label: "Usage Policy / ToS", category: "mitigation", detail: "Contractual restrictions on prohibited uses" },
  { id: "mit-filter", label: "Content Filtering + RLHF", category: "mitigation", detail: "Output classifiers and refusal training" },
  { id: "mit-rate", label: "Rate Limiting", category: "mitigation", detail: "Query-per-minute and cost-based throttling" },
  { id: "mit-sandbox", label: "Sandboxed Execution", category: "mitigation", detail: "Isolated runtime with network/filesystem limits" },
  { id: "mit-audit", label: "Audit Logging", category: "mitigation", detail: "Full conversation and action provenance records" },
  { id: "mit-human", label: "Human-in-the-Loop Review", category: "mitigation", detail: "Manual approval gates for sensitive operations" },
  { id: "mit-access", label: "Access Tier Controls", category: "mitigation", detail: "Privileged capabilities gated by verification" },
  { id: "mit-monitor", label: "Real-time Monitoring", category: "mitigation", detail: "Behavioral anomaly detection on live traffic" },

  // Evaluation
  { id: "eval-redteam", label: "Red Team Testing", category: "evaluation", detail: "Adversarial elicitation by trained human red teamers" },
  { id: "eval-benchmark", label: "Capability Benchmark", category: "evaluation", detail: "Standardized automated capability measurement" },
  { id: "eval-uplift", label: "Human Uplift Study", category: "evaluation", detail: "Controlled measurement of model-enabled capability gain" },
  { id: "eval-monitor", label: "Deployment Monitoring", category: "evaluation", detail: "Longitudinal behavioral tracking post-release" },
  { id: "eval-sme", label: "SME Review", category: "evaluation", detail: "Domain expert assessment of dual-use risk" },
  { id: "eval-adversarial", label: "Adversarial Probing", category: "evaluation", detail: "Automated jailbreak and prompt injection testing" },
  { id: "eval-audit", label: "Formal Independent Audit", category: "evaluation", detail: "Structured third-party evaluation with audit trail" },
];

export const SLOT_CONFIG: { key: SlotKey; label: string; color: string; description: string }[] = [
  { key: "actor", label: "Actor", color: "#7c3aed", description: "Who initiates the threat?" },
  { key: "access", label: "Access", color: "#2563eb", description: "How do they reach the model?" },
  { key: "capability", label: "Capability", color: "#0891b2", description: "Which model feature is leveraged?" },
  { key: "task", label: "Task", color: "#d97706", description: "What does the actor direct the model to do?" },
  { key: "harm", label: "Real-world Harm", color: "#dc2626", description: "What is the downstream impact?" },
  { key: "mitigation", label: "Mitigation", color: "#059669", description: "What currently prevents this?" },
  { key: "evaluation", label: "Evaluation Needed", color: "#7c3aed", description: "What evidence should we gather?" },
];

export const DOMAINS = ["cyber", "bio", "persuasion", "autonomy", "tool-use", "deception", "other"];
export const SEVERITIES: { value: string; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "#22c55e" },
  { value: "medium", label: "Medium", color: "#f59e0b" },
  { value: "high", label: "High", color: "#f97316" },
  { value: "critical", label: "Critical", color: "#ef4444" },
];
export const EVIDENCE_TYPES = ["benchmark", "red-team", "human-uplift", "monitoring", "sme-review"];
export const DISCLOSURE_TIERS = ["public", "partner", "restricted", "internal"];

export const EXPERT_PATHWAYS: { id: string; title: string; domain: string; severity: "critical" | "high"; slots: Record<SlotKey, string>; rationale: string; gaps: string[] }[] = [
  {
    id: "exp-1",
    title: "APT Lateral Movement via Code Execution",
    domain: "cyber",
    severity: "critical",
    slots: {
      actor: "Skilled Cyber Actor",
      access: "Enterprise Workspace",
      capability: "Code Execution",
      task: "Generate Exploit Code",
      harm: "Infrastructure Disruption",
      mitigation: "Sandboxed Execution + Audit Logging",
      evaluation: "Red Team Testing",
    },
    rationale:
      "A sophisticated attacker with enterprise access can direct Aster-3's code execution to synthesize multi-stage attack chains that bypass signature-based defenses. The key uplift is operationalization speed: what took weeks takes hours. Sandboxing reduces but does not eliminate risk if network egress is permitted.",
    gaps: [
      "Current sandbox configuration not verified against egress constraints",
      "No benchmark exists for attack-chain synthesis speed vs. baseline",
      "Monitoring thresholds not tuned for low-and-slow exfiltration patterns",
    ],
  },
  {
    id: "exp-2",
    title: "CBRN Synthesis Information Aggregation",
    domain: "bio",
    severity: "critical",
    slots: {
      actor: "Malicious Novice User",
      access: "Public Web Interface",
      capability: "Web Browsing",
      task: "Synthesize CBRN Information",
      harm: "Biological Weapon Uplift",
      mitigation: "Content Filtering + RLHF",
      evaluation: "Human Uplift Study",
    },
    rationale:
      "Even non-technical actors gain meaningful uplift when Aster-3 aggregates, contextualizes, and operationalizes dispersed dual-use scientific literature. Multi-step indirect queries evade refusal classifiers trained on direct requests. The web-browsing capability dramatically expands the model's effective knowledge base beyond its training cutoff.",
    gaps: [
      "Human uplift study has not been conducted for indirect multi-step bio queries",
      "Refusal classifier evaluated only on direct requests, not multi-hop aggregation",
      "No SME review of browsing behavior on preprint servers and grey literature",
    ],
  },
  {
    id: "exp-3",
    title: "Evaluation Dataset Contamination (Insider)",
    domain: "deception",
    severity: "high",
    slots: {
      actor: "Model Developer",
      access: "Internal System Access",
      capability: "Code Execution",
      task: "Contaminate Eval Data",
      harm: "Corrupted Safety Evaluations",
      mitigation: "Access Tier Controls",
      evaluation: "Formal Independent Audit",
    },
    rationale:
      "An under-scrutinized insider threat: a developer with pipeline access can subtly shift benchmark distributions, creating apparent safety improvements that don't reflect real capability changes. This is especially dangerous because contamination can be deniable and the harm (unsafe model deployment) is delayed and indirect.",
    gaps: [
      "No separation of duties between model trainers and evaluation pipeline owners",
      "Audit log coverage for internal eval dataset access is incomplete",
      "No independent verification of benchmark test set integrity before release decisions",
    ],
  },
];
