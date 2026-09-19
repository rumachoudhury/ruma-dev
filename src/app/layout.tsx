import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name}, full-stack developer`,
  description: profile.role,
  openGraph: {
    title: `${profile.name}, full-stack developer`,
    description: profile.role,
    type: "website",
  },
};

/**
 * Runs before the page paints so the saved theme is applied immediately (no flash)
 * and the "js" class lets the CSS hide reveal-on-scroll elements only when JavaScript is running.
 */
const initScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t)d.setAttribute('data-theme',t)}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap"
        />
      </head>
      <body>
        <a className="skip" href="#projects">
          Skip to projects
        </a>
        <div className="bg" aria-hidden="true" />
        <ScrollProgress />
        <Header />
        {children}
      </body>
    </html>
  );
}
