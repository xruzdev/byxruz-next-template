import { WorkPageClient } from "@/components/pages/work/WorkPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Work page",
};

export default function WorkPage() {
  return (
     <div className="h-auto    flex flex-col items-center justify-center">
          <WorkPageClient />
        </div>
  );
}
