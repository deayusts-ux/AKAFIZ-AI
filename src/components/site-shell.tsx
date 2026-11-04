"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CommandMenu } from "@/components/command-menu";
import { MobileDock } from "@/components/mobile-dock";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      {footer}
      <MobileDock />
      <CommandMenu />
    </>
  );
}
