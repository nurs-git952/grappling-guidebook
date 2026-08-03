import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./profile.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") === "https" ? "https" : "http";
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title: "ЗАХВАТ — школа борьбы онлайн",
    description: "Техника борьбы, видеоразборы приёмов и система теневой тренировки.",
    openGraph: {
      title: "ЗАХВАТ — школа борьбы онлайн",
      description: "Техника борьбы, видеоразборы приёмов и система теневой тренировки.",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: "ЗАХВАТ — школа борьбы онлайн" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "ЗАХВАТ — школа борьбы онлайн",
      description: "Техника борьбы, видеоразборы приёмов и система теневой тренировки.",
      images: [imageUrl],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
