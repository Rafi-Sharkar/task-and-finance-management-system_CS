/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import SignatureCanvas from "react-signature-canvas";
import { PDFDocument } from "pdf-lib";
import { Edit2, Trash2, CheckCircle, FileText, Loader2 } from "lucide-react";
import { useUploadSignedDocumentMutation } from "@/redux/features/admin/documents/documents.api";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState/EmptyState";

interface SignProps {
  fileUrl?: string | null;
  docId?: string | null;
  fileId?: string | null;
  mode?: "sign" | "view" | string | null;
}

export default function SignExistingPdf({ fileUrl, docId, fileId, mode }: SignProps) {
  const sigRef = useRef<SignatureCanvas>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [pdfBytes, setPdfBytes] = useState<ArrayBuffer | null>(null);
  const [localPdfUrl, setLocalPdfUrl] = useState<string | null>(null);
  const [sigData, setSigData] = useState<string | null>(null);
  const [sigScreenPos, setSigScreenPos] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pdfAspectRatio, setPdfAspectRatio] = useState(1.414);
  const [fetchError, setFetchError] = useState(false); // PDF লোড এরর হ্যান্ডলিং

  const [uploadSigned, { isLoading: isUploading, isError: isUploadError }] = useUploadSignedDocumentMutation();

  useEffect(() => {
    const loadPdfFromUrl = async () => {
      if (!fileUrl) return;
      try {
        setFetchError(false);
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error("Failed to fetch PDF");

        const arrayBuffer = await response.arrayBuffer();
        setPdfBytes(arrayBuffer);

        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pages = pdfDoc.getPages();
        setPageCount(pages.length);
        const { width, height } = pages[0].getSize();
        setPdfAspectRatio(height / width);

        setLocalPdfUrl(fileUrl);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setFetchError(true);
        toast.error("Failed to load PDF file.");
      }
    };
    loadPdfFromUrl();
  }, [fileUrl]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
    };
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, [localPdfUrl]);

  const handleMove = useCallback(
    (e: any) => {
      if (!dragging || !containerRef.current || mode !== "sign") return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      let newX = clientX - rect.left - 40;
      let newY = clientY - rect.top - 20;

      newX = Math.max(0, Math.min(newX, rect.width - rect.width * 0.2));
      newY = Math.max(0, Math.min(newY, rect.height - (rect.width * 0.2) / 2.5));
      setSigScreenPos({ x: newX, y: newY });
    },
    [dragging, mode]
  );

  const signAndUpload = async () => {
    if (!pdfBytes || !sigData || !containerRef.current || !docId || !fileId || !fileUrl) {
      toast.error("Missing signature or document info");
      return;
    }

    toast.loading("Signing document...");

    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      const visualWidth = containerRef.current.clientWidth;
      const pageVisualHeight = visualWidth * pdfAspectRatio;
      const pageIndex = Math.floor(sigScreenPos.y / pageVisualHeight);
      const targetPage = pages[pageIndex] || pages[0];

      const { width: pdfWidth, height: pdfHeight } = targetPage.getSize();
      const scale = pdfWidth / visualWidth;
      const relativeYInPage = sigScreenPos.y % pageVisualHeight;
      const sigWidthPdf = visualWidth * 0.2 * scale;
      const sigHeightPdf = sigWidthPdf / 2.5;
      const finalX = sigScreenPos.x * scale;
      const finalY = pdfHeight - relativeYInPage * scale - sigHeightPdf;

      const sigImg = await pdfDoc.embedPng(sigData);
      targetPage.drawImage(sigImg, {
        x: finalX,
        y: finalY,
        width: sigWidthPdf,
        height: sigHeightPdf,
      });

      const signedPdfBytes = await pdfDoc.save();
      const blob = new Blob([signedPdfBytes as any], { type: "application/pdf" });
      const signedFile = new File([blob], "signed_document.pdf", { type: "application/pdf" });

      const res = await uploadSigned({
        documentId: docId,
        fileId: fileId,
        oldFileUrl: fileUrl,
        file: signedFile,
      }).unwrap();

      if (!res.success) {
        toast.dismiss();
        toast.error(res.message || "Failed to upload signed document.");
      }

      toast.dismiss();
      toast.success("Document signed and uploaded successfully!");
      window.history.back();

    } catch (err: any) {
      console.error("Upload Error:", err);
      toast.dismiss();
      toast.error(err?.data?.message || "Failed to upload signed document.");
    }
  };

  // Error State Handling
  if (fetchError || isUploadError) {
    return (
      <div className="flex h-[calc(100vh-150px)] w-full items-center justify-center bg-slate-50 p-6">
        <EmptyState
          title="Document Error"
          description="We couldn't load or process the document. Please ensure the file exists or try again later."
          className="max-w-md rounded-xl border bg-white shadow-sm"
        />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-150px)] w-full overflow-hidden bg-slate-100 font-sans text-slate-800 rounded-xl border border-slate-200">
      {mode === "sign" && (
        <aside className="hidden md:flex w-80 flex-col bg-white border-r border-slate-200 p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold uppercase tracking-tight text-slate-700">
            <Edit2 size={20} className="text-blue-600" /> Signature Desk
          </h2>

          <div className="space-y-6">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-[10px] text-blue-600 font-bold uppercase mb-1">Active Document</p>
              <p className="text-xs text-slate-600 font-medium truncate italic">{docId}</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Draw Your Signature</label>
              <div className="overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50 shadow-inner">
                <SignatureCanvas
                  ref={sigRef}
                  onEnd={() => setSigData(sigRef.current?.toDataURL() || null)}
                  canvasProps={{ className: "w-full h-40 cursor-crosshair" }}
                />
              </div>
              <button
                onClick={() => {
                  sigRef.current?.clear();
                  setSigData(null);
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
              >
                <Trash2 size={16} /> Clear Canvas
              </button>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <button
              disabled={!sigData || !pdfBytes || isUploading}
              onClick={signAndUpload}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg transition-all hover:bg-blue-700 disabled:bg-slate-300 disabled:shadow-none active:scale-[0.98]"
            >
              {isUploading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <CheckCircle size={18} /> Confirm & Submit
                </>
              )}
            </button>
          </div>
        </aside>
      )}

      <main
        className="relative flex flex-1 justify-center overflow-y-auto p-4 md:p-8 bg-[#F1F5F9]"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseUp={() => setDragging(false)}
        onTouchEnd={() => setDragging(false)}
      >
        {!localPdfUrl ? (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="animate-spin mb-4 text-blue-600" size={40} />
            <p className="font-medium">Loading document, please wait...</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            className={`relative bg-white shadow-2xl border border-slate-300 origin-top transition-all ${mode === "view" ? "max-w-full" : "max-w-212.5"}`}
            style={{
              width: "100%",
              height: pageCount > 0 ? `${pageCount * (containerWidth * pdfAspectRatio)}px` : "100%",
            }}
          >
            <iframe
              src={`${localPdfUrl}#toolbar=0&navpanes=0`}
              className="h-full w-full border-none pointer-events-none"
              title="PDF Preview"
            />

            {sigData && mode === "sign" && (
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onTouchStart={() => setDragging(true)}
                className={`absolute z-30 cursor-grab border-2 border-blue-500 bg-blue-50/40 backdrop-blur-[1px] group transition-transform ${dragging ? "scale-110 shadow-2xl" : "shadow-md hover:scale-105"}`}
                style={{
                  left: sigScreenPos.x,
                  top: sigScreenPos.y,
                  width: "20%",
                  aspectRatio: "2.5/1",
                  touchAction: "none",
                }}
              >
                <img src={sigData} alt="signature" className="pointer-events-none h-full w-full object-contain p-1" />
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <Edit2 size={10} />
                </div>
              </div>
            )}

            {mode === "view" && (
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 flex items-center gap-2 shadow-sm pointer-events-none">
                <FileText size={16} className="text-slate-500" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Read Only</span>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}