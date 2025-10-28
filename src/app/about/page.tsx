import { AboutPageClient } from "@/components/pages/about/AboutPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

export default function AboutPage() {
  return (
    <div className="h-auto    flex flex-col items-center justify-center">
      <AboutPageClient />
    </div>
  );
}
