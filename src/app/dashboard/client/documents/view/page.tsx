"use client";

import { useSearchParams } from "next/navigation";
import SignExistingPdf from "../_components/SignExistingPdf/SignExistingPdf";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function DocumentViewPage() {
  const searchParams = useSearchParams();

  const docId = searchParams.get("docId");
  const fileId = searchParams.get("fileId");
  const fileUrl = searchParams.get("fileUrl");
  const mode = searchParams.get("mode");

  if (!fileUrl) return <p>Loading or invalid file...</p>;

  const onBack = () => {
    window.history.back();
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="size-10 border border-[#D5D7DA] hover:bg-gray-100 cursor-pointer"
          onClick={onBack}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <h1 className="text-xl font-bold">
          {mode === "sign" ? "Sign Document" : "View Document"}
        </h1>
      </div>

      <SignExistingPdf
        fileUrl={fileUrl}
        docId={docId}
        fileId={fileId}
        mode={mode}
      />
    </div>
  );
}