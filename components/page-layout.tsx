import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  showCosmicBackground?: boolean;
}

export function PageLayout({ 
  children, 
  className = "", 
  showCosmicBackground = true 
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-soft pt-24 font-sans text-slate-900 ${className}`}>
      {showCosmicBackground && <div className="cosmic-iris-global" />}
      <main className="relative z-10 pb-16 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
