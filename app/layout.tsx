import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { FloatingAssistant } from "@/components/floating-assistant";
import { PWARegister } from "@/components/pwa-register";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexa-ai.example"),
  title: {
    default: "NEXA AI | AI Real Estate Intelligence Platform",
    template: "%s | NEXA AI",
  },
  description:
    "NEXA AI is a futuristic AI-powered real estate intelligence platform for land, plots, homes, apartments, districts, builders, and investments.",
  manifest: "/manifest.webmanifest",
  applicationName: "NEXA AI",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NEXA AI",
  },
  icons: {
    icon: "/icons/nexa-icon.svg",
    apple: "/icons/nexa-icon.svg",
  },
  keywords: [
    "AI real estate",
    "real estate intelligence platform",
    "land investment analytics",
    "property comparison engine",
    "India real estate map",
    "AI property copilot",
    "real estate intelligence",
  ],
  openGraph: {
    title: "NEXA AI",
    description: "Stop Searching. Start Knowing.",
    type: "website",
    images: [
      {
        url: "/assets/nexa-villa-hero.png",
        width: 1823,
        height: 863,
        alt: "Futuristic luxury villa with AI property analysis overlays",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXA AI",
    description: "AI-powered intelligence for land, plots, flats, villas and real estate investments.",
    images: ["/assets/nexa-villa-hero.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#030406",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <FloatingAssistant />
        <PWARegister />
      </body>
    </html>
  );
}
