import Image from "next/image";
import { cn } from "@/lib/utils";
import { COMPLIANCE_CERTIFICATES } from "@/lib/compliance-certificates";

interface ComplianceCertificatesProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "w-12 h-12 sm:w-14 sm:h-14",
  md: "w-14 h-14 sm:w-16 sm:h-16",
  lg: "w-16 h-16 sm:w-20 sm:h-20",
} as const;

/** Sierra-style horizontal row of compliance badge logos. */
export function ComplianceCertificates({
  className,
  size = "md",
}: ComplianceCertificatesProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-5 sm:gap-6 lg:gap-8",
        className
      )}
    >
      {COMPLIANCE_CERTIFICATES.map((cert) => (
        <div
          key={cert.id}
          className={cn("relative aspect-square shrink-0", SIZE_CLASSES[size])}
        >
          <Image
            src={cert.src}
            alt={cert.alt}
            fill
            sizes="(max-width: 640px) 56px, 64px"
            className="block h-auto w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
