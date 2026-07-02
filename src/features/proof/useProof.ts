import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../app/providers";
import { proofRepository } from "../../lib/repositories/proofRepository";
import type { ArtifactSubmission, PortfolioProofItem } from "./proofStore";

export function useProof() {
  const { user } = useAuth();
  const userId = user?.id;
  const [submissions, setSubmissions] = useState<ArtifactSubmission[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioProofItem[]>([]);
  const [certificate, setCertificate] = useState({
    eligible: false,
    acceptedArtifacts: 0,
    requiredArtifacts: 2,
    reason: "Complete and pass 2 artifact reviews for certificate eligibility.",
  });

  const refresh = useCallback(async () => {
    const [nextSubmissions, nextPortfolio, nextCertificate] = await Promise.all([
      proofRepository.listSubmissions(userId),
      proofRepository.listPortfolio(userId),
      proofRepository.certificateEligibility(userId),
    ]);
    setSubmissions(nextSubmissions);
    setPortfolioItems(nextPortfolio);
    setCertificate(nextCertificate);
  }, [userId]);

  useEffect(() => {
    void refresh();
    window.addEventListener("opened-proof", refresh);
    return () => window.removeEventListener("opened-proof", refresh);
  }, [refresh]);

  return {
    submissions,
    portfolioItems,
    certificate,
    submitArtifact: useCallback(
      async (lessonId: string, body: string) => {
        await proofRepository.submit(userId, lessonId, body);
        await refresh();
      },
      [refresh, userId],
    ),
    scoreSubmission: useCallback(
      async (submissionId: string, accept: boolean, reviewerNote?: string) => {
        await proofRepository.score(userId, submissionId, accept, reviewerNote);
        await refresh();
      },
      [refresh, userId],
    ),
  };
}
