import React, { createContext, useContext, useState, useCallback } from "react";

export type ReleaseDecision =
  | "broad-release"
  | "restricted-release"
  | "trusted-access"
  | "delayed"
  | "";

export interface Threat {
  id: string;
  domain: string;
  category: string;
  description: string;
  likelihood: "Low" | "Medium" | "High" | "Critical";
  impact: "Low" | "Medium" | "High" | "Severe";
  actor: string;
}

export interface Evaluation {
  id: string;
  name: string;
  category: string;
  method: string;
  finding: string;
  severity: "Pass" | "Caution" | "Concern" | "Critical";
  notes: string;
}

export interface Benchmark {
  id: string;
  suite: string;
  metric: string;
  score: number;
  baseline: number;
  delta: string;
  flag: "green" | "yellow" | "red";
}

export interface EvidenceCard {
  id: string;
  code: string;
  title: string;
  domain: string;
  finding: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  source: string;
  date: string;
}

export interface ThresholdMemo {
  written: boolean;
  acceptableRiskLevel: string;
  redLines: string;
  conditions: string;
  content: string;
}

export interface MitigationItem {
  id: string;
  risk: string;
  mitigation: string;
  owner: string;
  deadline: string;
  status: "Open" | "In Progress" | "Complete";
}

export interface RiskDashboard {
  complete: boolean;
  overallRating: "Low" | "Medium" | "High" | "Critical" | "";
  mitigations: MitigationItem[];
  mitigationPlan: string;
}

export interface ExecutiveReport {
  drafted: boolean;
  executiveSummary: string;
  keyFindings: string;
  recommendation: string;
  caveats: string;
}

export interface PeerReviewItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface CapstoneState {
  currentSection: number;
  threatModel: {
    domains: string[];
    threats: Threat[];
  };
  evaluations: Evaluation[];
  benchmarkPacket: Benchmark[];
  evidenceCards: EvidenceCard[];
  thresholdMemo: ThresholdMemo;
  riskDashboard: RiskDashboard;
  executiveReport: ExecutiveReport;
  recommendation: {
    decision: ReleaseDecision;
    rationale: string;
    uncertaintyNote: string;
    submitted: boolean;
  };
  peerReview: {
    items: PeerReviewItem[];
  };
  completedSections: Set<number>;
}

const PEER_REVIEW_DEFAULTS: PeerReviewItem[] = [
  { id: "pr-1", label: "Threat model covers all stated capability domains", checked: false },
  { id: "pr-2", label: "Evaluation portfolio has ≥6 distinct evaluations", checked: false },
  { id: "pr-3", label: "Benchmark packet includes comparative baselines", checked: false },
  { id: "pr-4", label: "All 12 evidence cards are completed and categorized", checked: false },
  { id: "pr-5", label: "Threshold memo defines measurable red-line criteria", checked: false },
  { id: "pr-6", label: "Risk dashboard shows mitigation ownership and timelines", checked: false },
  { id: "pr-7", label: "Executive report is suitable for non-technical leadership", checked: false },
  { id: "pr-8", label: "Recommendation is grounded in evidence, not assumption", checked: false },
  { id: "pr-9", label: "Residual uncertainty is explicitly acknowledged", checked: false },
  { id: "pr-10", label: "Capability elicitation methods are documented", checked: false },
  { id: "pr-11", label: "Release conditions are specific and verifiable", checked: false },
  { id: "pr-12", label: "Dossier meets professional evaluation lab standards", checked: false },
];

const DOMAIN_OPTIONS = [
  "Weapons & CBRN",
  "Cybersecurity & Offensive Capabilities",
  "Deception & Manipulation",
  "Autonomous Replication",
  "Critical Infrastructure",
  "Disinformation & Influence",
  "Biosecurity",
  "Financial System Risks",
  "Surveillance & Privacy",
  "Dual-Use Research",
];

const initialState: CapstoneState = {
  currentSection: 0,
  threatModel: {
    domains: [],
    threats: [],
  },
  evaluations: [],
  benchmarkPacket: [],
  evidenceCards: [],
  thresholdMemo: {
    written: false,
    acceptableRiskLevel: "",
    redLines: "",
    conditions: "",
    content: "",
  },
  riskDashboard: {
    complete: false,
    overallRating: "",
    mitigations: [],
    mitigationPlan: "",
  },
  executiveReport: {
    drafted: false,
    executiveSummary: "",
    keyFindings: "",
    recommendation: "",
    caveats: "",
  },
  recommendation: {
    decision: "",
    rationale: "",
    uncertaintyNote: "",
    submitted: false,
  },
  peerReview: {
    items: PEER_REVIEW_DEFAULTS,
  },
  completedSections: new Set(),
};

interface CapstoneContextType {
  state: CapstoneState;
  setCurrentSection: (n: number) => void;
  addThreatDomain: (domain: string) => void;
  removeThreatDomain: (domain: string) => void;
  addThreat: (threat: Threat) => void;
  removeThreat: (id: string) => void;
  addEvaluation: (ev: Evaluation) => void;
  removeEvaluation: (id: string) => void;
  addBenchmark: (b: Benchmark) => void;
  removeBenchmark: (id: string) => void;
  addEvidenceCard: (card: EvidenceCard) => void;
  removeEvidenceCard: (id: string) => void;
  updateThresholdMemo: (memo: Partial<ThresholdMemo>) => void;
  updateRiskDashboard: (dash: Partial<RiskDashboard>) => void;
  addMitigation: (m: MitigationItem) => void;
  removeMitigation: (id: string) => void;
  updateMitigationStatus: (id: string, status: MitigationItem["status"]) => void;
  updateExecutiveReport: (report: Partial<ExecutiveReport>) => void;
  updateRecommendation: (rec: Partial<CapstoneState["recommendation"]>) => void;
  togglePeerReviewItem: (id: string) => void;
  markSectionComplete: (n: number) => void;
  DOMAIN_OPTIONS: string[];
  qualityGates: {
    hasMinRiskDomains: boolean;
    hasMinEvidenceCards: boolean;
    hasUncertaintyNote: boolean;
    hasMitigationPlan: boolean;
    hasBenchmarkPacket: boolean;
    canExportReport: boolean;
    canSubmitRecommendation: boolean;
    canCompleteDashboard: boolean;
    canCompleteCapstone: boolean;
  };
  progressPercent: number;
}

const CapstoneContext = createContext<CapstoneContextType | null>(null);

export function CapstoneProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CapstoneState>(initialState);

  const setCurrentSection = useCallback((n: number) => {
    setState((s) => ({ ...s, currentSection: n }));
  }, []);

  const addThreatDomain = useCallback((domain: string) => {
    setState((s) => ({
      ...s,
      threatModel: {
        ...s.threatModel,
        domains: s.threatModel.domains.includes(domain)
          ? s.threatModel.domains
          : [...s.threatModel.domains, domain],
      },
    }));
  }, []);

  const removeThreatDomain = useCallback((domain: string) => {
    setState((s) => ({
      ...s,
      threatModel: {
        ...s.threatModel,
        domains: s.threatModel.domains.filter((d) => d !== domain),
      },
    }));
  }, []);

  const addThreat = useCallback((threat: Threat) => {
    setState((s) => ({
      ...s,
      threatModel: {
        ...s.threatModel,
        threats: [...s.threatModel.threats, threat],
      },
    }));
  }, []);

  const removeThreat = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      threatModel: {
        ...s.threatModel,
        threats: s.threatModel.threats.filter((t) => t.id !== id),
      },
    }));
  }, []);

  const addEvaluation = useCallback((ev: Evaluation) => {
    setState((s) => ({ ...s, evaluations: [...s.evaluations, ev] }));
  }, []);

  const removeEvaluation = useCallback((id: string) => {
    setState((s) => ({ ...s, evaluations: s.evaluations.filter((e) => e.id !== id) }));
  }, []);

  const addBenchmark = useCallback((b: Benchmark) => {
    setState((s) => ({ ...s, benchmarkPacket: [...s.benchmarkPacket, b] }));
  }, []);

  const removeBenchmark = useCallback((id: string) => {
    setState((s) => ({ ...s, benchmarkPacket: s.benchmarkPacket.filter((b) => b.id !== id) }));
  }, []);

  const addEvidenceCard = useCallback((card: EvidenceCard) => {
    setState((s) => ({ ...s, evidenceCards: [...s.evidenceCards, card] }));
  }, []);

  const removeEvidenceCard = useCallback((id: string) => {
    setState((s) => ({ ...s, evidenceCards: s.evidenceCards.filter((c) => c.id !== id) }));
  }, []);

  const updateThresholdMemo = useCallback((memo: Partial<ThresholdMemo>) => {
    setState((s) => ({ ...s, thresholdMemo: { ...s.thresholdMemo, ...memo } }));
  }, []);

  const updateRiskDashboard = useCallback((dash: Partial<RiskDashboard>) => {
    setState((s) => ({ ...s, riskDashboard: { ...s.riskDashboard, ...dash } }));
  }, []);

  const addMitigation = useCallback((m: MitigationItem) => {
    setState((s) => ({
      ...s,
      riskDashboard: {
        ...s.riskDashboard,
        mitigations: [...s.riskDashboard.mitigations, m],
      },
    }));
  }, []);

  const removeMitigation = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      riskDashboard: {
        ...s.riskDashboard,
        mitigations: s.riskDashboard.mitigations.filter((m) => m.id !== id),
      },
    }));
  }, []);

  const updateMitigationStatus = useCallback((id: string, status: MitigationItem["status"]) => {
    setState((s) => ({
      ...s,
      riskDashboard: {
        ...s.riskDashboard,
        mitigations: s.riskDashboard.mitigations.map((m) =>
          m.id === id ? { ...m, status } : m
        ),
      },
    }));
  }, []);

  const updateExecutiveReport = useCallback((report: Partial<ExecutiveReport>) => {
    setState((s) => ({ ...s, executiveReport: { ...s.executiveReport, ...report } }));
  }, []);

  const updateRecommendation = useCallback(
    (rec: Partial<CapstoneState["recommendation"]>) => {
      setState((s) => ({ ...s, recommendation: { ...s.recommendation, ...rec } }));
    },
    []
  );

  const togglePeerReviewItem = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      peerReview: {
        items: s.peerReview.items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        ),
      },
    }));
  }, []);

  const markSectionComplete = useCallback((n: number) => {
    setState((s) => {
      const next = new Set(s.completedSections);
      next.add(n);
      return { ...s, completedSections: next };
    });
  }, []);

  const qualityGates = {
    hasMinRiskDomains: state.threatModel.domains.length >= 3,
    hasMinEvidenceCards: state.evidenceCards.length >= 12,
    hasBenchmarkPacket: state.benchmarkPacket.length >= 1,
    hasUncertaintyNote: state.recommendation.uncertaintyNote.trim().length > 20,
    hasMitigationPlan: state.riskDashboard.mitigations.length >= 1 && state.riskDashboard.mitigationPlan.trim().length > 0,
    get canExportReport() { return this.hasMinEvidenceCards; },
    get canSubmitRecommendation() { return this.hasUncertaintyNote; },
    get canCompleteDashboard() { return this.hasMitigationPlan; },
    get canCompleteCapstone() { return this.hasMinRiskDomains; },
  };

  const totalCheckpoints = 8;
  let passedCheckpoints = 0;
  if (state.threatModel.domains.length >= 3) passedCheckpoints++;
  if (state.evaluations.length >= 6) passedCheckpoints++;
  if (state.benchmarkPacket.length >= 3) passedCheckpoints++;
  if (state.evidenceCards.length >= 12) passedCheckpoints++;
  if (state.thresholdMemo.written) passedCheckpoints++;
  if (state.riskDashboard.complete) passedCheckpoints++;
  if (state.executiveReport.drafted) passedCheckpoints++;
  if (state.recommendation.submitted) passedCheckpoints++;
  const progressPercent = Math.round((passedCheckpoints / totalCheckpoints) * 100);

  return (
    <CapstoneContext.Provider
      value={{
        state,
        setCurrentSection,
        addThreatDomain,
        removeThreatDomain,
        addThreat,
        removeThreat,
        addEvaluation,
        removeEvaluation,
        addBenchmark,
        removeBenchmark,
        addEvidenceCard,
        removeEvidenceCard,
        updateThresholdMemo,
        updateRiskDashboard,
        addMitigation,
        removeMitigation,
        updateMitigationStatus,
        updateExecutiveReport,
        updateRecommendation,
        togglePeerReviewItem,
        markSectionComplete,
        DOMAIN_OPTIONS,
        qualityGates,
        progressPercent,
      }}
    >
      {children}
    </CapstoneContext.Provider>
  );
}

export function useCapstone() {
  const ctx = useContext(CapstoneContext);
  if (!ctx) throw new Error("useCapstone must be used within CapstoneProvider");
  return ctx;
}
