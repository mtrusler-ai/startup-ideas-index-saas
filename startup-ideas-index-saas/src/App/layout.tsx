import "@/styles/globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import type { ReactNode } from "react";

export default function RootLayout({ children }:{children: ReactNode}){
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="sticky top-0 z-20 backdrop-blur bg-black/40 border-b border-cyan-500/20">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 grid place-items-center font-bold">SII</div>
                <div>
                  <div className="font-semibold">Startup Ideas Index</div>
                  <div className="text-xs text-cyan-300/80">Neon UI • Research • Founder Fit • Social Signals • Trends</div>
                </div>
              </Link>
              <div className="ml-auto flex items-center gap-3">
                <Link href="/admin" className="btn text-sm">Admin</Link>
                <SignedOut><SignInButton mode="modal"><button className="btn text-sm">Sign in</button></SignInButton></SignedOut>
                <SignedIn><UserButton /></SignedIn>
              </div>
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
