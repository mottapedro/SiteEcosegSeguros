export type LegalReferenceStatus =
  | "DRAFT"
  | "IN_REVIEW"
  | "VALIDATED"
  | "SUSPENDED"
  | "OUTDATED";

export interface PresentationReference {
  id: string;
  title: string;
  sourceLabel: string;
  sourceUrl?: string;
  consultedAt?: string;
  status: LegalReferenceStatus;
  reviewedBy?: string;
  note: string;
}

export interface PresentationSection {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  talkingPoints: string[];
  referenceIds: string[];
}

export interface PresentationContent {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  audience: string;
  version: string;
  status: "DRAFT" | "IN_REVIEW" | "VALIDATED";
  reviewedAt?: string;
  reviewedBy?: string;
  disclaimer: string;
  sections: PresentationSection[];
  references: PresentationReference[];
}

export function getPublishableReferences(
  presentation: PresentationContent
): PresentationReference[] {
  return presentation.references.filter(
    (reference) => reference.status === "VALIDATED"
  );
}

export function isPresentationPublishable(
  presentation: PresentationContent
): boolean {
  if (presentation.status !== "VALIDATED") {
    return false;
  }

  const referencedIds = new Set(
    presentation.sections.flatMap((section) => section.referenceIds)
  );

  return [...referencedIds].every((referenceId) => {
    const reference = presentation.references.find(
      (item) => item.id === referenceId
    );

    return Boolean(
      reference?.status === "VALIDATED" &&
        reference.sourceUrl &&
        reference.consultedAt &&
        reference.reviewedBy
    );
  });
}
