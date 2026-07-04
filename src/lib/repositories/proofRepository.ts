import { getArtifactForLesson, getRubricForArtifact } from "../../data/fme";
import type { ArtifactSubmission, PortfolioProofItem } from "../../features/proof/proofStore";
import { supabase, supabaseConfigured } from "../supabase/client";
import { readLocalArray, writeLocal } from "./localFallback";

const eventName = "opened-proof";

export const proofRules = {
  fme: {
    requiredAcceptedArtifacts: 2,
    minAverageRubricScore: 0.75,
  },
};

export const proofRepository = {
  async listSubmissions(userId: string | undefined): Promise<ArtifactSubmission[]> {
    if (!supabaseConfigured || !userId) {
      return readLocalArray("proof", userId, "submissions", []);
    }

    const { data } = await supabase
      .from("artifact_submissions")
      .select("id,body,status,updated_at,template_id")
      .order("updated_at", { ascending: false });
    const serverRows = data as Array<{
      id: string;
      body: string;
      status: ArtifactSubmission["status"];
      updated_at: string;
      template_id: string;
    }>;
    if (!serverRows) return readLocalArray<ArtifactSubmission>("proof", userId, "submissions", []);
    return readLocalArray<ArtifactSubmission>("proof", userId, "submissions", []).map((submission) => {
      const server = serverRows.find((row) => String(row.id) === submission.id);
      return server
        ? { ...submission, body: server.body, status: server.status, updatedAt: server.updated_at }
        : submission;
    });
  },

  async listPortfolio(userId: string | undefined): Promise<PortfolioProofItem[]> {
    return readLocalArray<PortfolioProofItem>("proof", userId, "portfolio", []);
  },

  async submit(userId: string | undefined, lessonId: string, body: string) {
    const artifact = getArtifactForLesson(lessonId);
    if (!artifact) return;

    const submissions = await this.listSubmissions(userId);
    const existing = submissions.find((item) => item.lessonId === lessonId);
    const next: ArtifactSubmission = {
      id: existing?.id ?? `sub-${lessonId}`,
      lessonId,
      artifactId: artifact.id,
      title: artifact.title,
      body,
      status: "submitted",
      scores: existing?.scores ?? [],
      reviewerNote: undefined,
      updatedAt: new Date().toISOString(),
    };

    if (supabaseConfigured && userId) {
      await supabase.from("artifact_submissions").upsert({
        id: crypto.randomUUID(),
        user_id: userId,
        body,
        status: "submitted",
      });
    }

    const saved = existing ? submissions.map((item) => (item.id === next.id ? next : item)) : [...submissions, next];
    writeLocal("proof", userId, "submissions", saved, eventName);
  },

  async score(userId: string | undefined, submissionId: string, accept: boolean, reviewerNote?: string) {
    const submissions = await this.listSubmissions(userId);
    const submission = submissions.find((item) => item.id === submissionId);
    if (!submission) return;

    const rubric = getRubricForArtifact(submission.artifactId);
    const scores =
      rubric?.criteria.map((criterion, index) => ({
        criterionId: criterion.id,
        label: criterion.label,
        score: accept ? criterion.maxScore : Math.max(1, criterion.maxScore - index - 1),
        maxScore: criterion.maxScore,
        feedback: accept ? "Meets the quality bar." : "Needs a clearer evidence-to-decision link.",
      })) ?? [];

    const next: ArtifactSubmission = {
      ...submission,
      status: accept ? "accepted" : "revision_requested",
      scores,
      reviewerNote:
        reviewerNote ??
        (accept
          ? "Accepted into SkillProof portfolio."
          : "Revise and resubmit with more explicit evidence and decision implication."),
      updatedAt: new Date().toISOString(),
    };
    writeLocal(
      "proof",
      userId,
      "submissions",
      submissions.map((item) => (item.id === submissionId ? next : item)),
      eventName,
    );

    if (accept) {
      const portfolio = await this.listPortfolio(userId);
      const proofItem: PortfolioProofItem = {
        id: `proof-${submission.id}`,
        submissionId: submission.id,
        title: submission.title,
        summary: submission.body.slice(0, 220),
        createdAt: new Date().toISOString(),
      };
      writeLocal(
        "proof",
        userId,
        "portfolio",
        portfolio.some((item) => item.submissionId === submission.id)
          ? portfolio.map((item) => (item.submissionId === submission.id ? proofItem : item))
          : [...portfolio, proofItem],
        eventName,
      );
    }
  },

  async certificateEligibility(userId: string | undefined) {
    const accepted = (await this.listSubmissions(userId)).filter((submission) => submission.status === "accepted");
    const rule = proofRules.fme;
    const eligible = accepted.length >= rule.requiredAcceptedArtifacts;
    return {
      eligible,
      acceptedArtifacts: accepted.length,
      requiredArtifacts: rule.requiredAcceptedArtifacts,
      reason: eligible
        ? "Proof threshold met."
        : `Complete and pass ${rule.requiredAcceptedArtifacts} artifact reviews for certificate eligibility.`,
    };
  },
};
