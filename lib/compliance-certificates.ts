export interface ComplianceCertificate {
  id: string;
  src: string;
  alt: string;
}

/** Sierra.ai trust section badges — same order and assets. */
export const COMPLIANCE_CERTIFICATES: ComplianceCertificate[] = [
  {
    id: "soc2",
    src: "/images/compliance/soc2.png",
    alt: "AICPA Service Organization Control Reports SOC 2 logo, formerly SAS 70 Reports.",
  },
  {
    id: "iso-27001",
    src: "/images/compliance/iso-27001.png",
    alt: "ISO 27001 Certified Information Security badge with a person icon.",
  },
  {
    id: "iso-42001",
    src: "/images/compliance/iso-42001.png",
    alt: "ISO 42001 Artificial Intelligence Certified logo, featuring a stylized human silhouette.",
  },
  {
    id: "hipaa",
    src: "/images/compliance/hipaa.svg",
    alt: "White Caduceus medical symbol above the word HIPAA on a dark purple circle.",
  },
  {
    id: "gdpr",
    src: "/images/compliance/gdpr.svg",
    alt: "GDPR logo with EU stars.",
  },
  {
    id: "eu-ai-act",
    src: "/images/compliance/eu-ai-act.svg",
    alt: 'Dark purple button with "EU AI Act" in white text.',
  },
  {
    id: "star",
    src: "/images/compliance/star.png",
    alt: "STAR Level One: Self-Assessment, Security Trust Assurance & Risk badge.",
  },
  {
    id: "fedramp",
    src: "/images/compliance/fedramp.png",
    alt: "FedRAMP logo.",
  },
  {
    id: "pci-dss",
    src: "/images/compliance/pci-dss.png",
    alt: "PCI DSS logo with checkmark on purple background.",
  },
];
