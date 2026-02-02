/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  FileText,
  Download,
  Loader2,
  Maximize2,
} from "lucide-react";
import profileImage from "@/assets/fallback-image/user-avatar.jpg";
import Image from "next/image";
import DynamicModal from "../../../DynamicModal/DynamicModal";
import ViewDocumentSkeleton from "../ViewDocumentSkeleton/ViewDocumentSkeleton";

interface ViewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  isLoading: boolean;
}

const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({
  isOpen,
  onClose,
  data,
  isLoading,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (isLoading) return <ViewDocumentSkeleton />;

  const handleDownload = async (url: string, fileName: string) => {
    try {
      setIsDownloading(true);
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderPreview = (file: any) => {
    const ext = file?.extension?.toLowerCase();
    const fileUrl = file.url;

    const ActionButtons = () => (
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {/* Download Icon Button */}
        <button
          onClick={() => handleDownload(fileUrl, `${data.name}.${ext}`)}
          disabled={isDownloading}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:bg-white active:scale-95 disabled:opacity-50"
          title="Download File"
        >
          {isDownloading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Download className="h-5 w-5" />
          )}
        </button>

        {/* Preview Button (Opens in new tab) */}
        {(ext === "pdf" ||
          ["png", "jpg", "jpeg", "gif", "doc", "docx", "xls", "xlsx"].includes(
            ext,
          )) && (
          <a
            href={
              ext === "pdf" || ["png", "jpg", "jpeg", "gif"].includes(ext)
                ? fileUrl
                : `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=false`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/90 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:bg-slate-900 active:scale-95"
            title="Open Full View"
          >
            <Maximize2 className="h-5 w-5" />
          </a>
        )}
      </div>
    );

    return (
      <div className="relative flex min-h-100 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-slate-100/50 shadow-inner sm:min-h-137.5">
        <ActionButtons />

        {/* 1. Image Preview */}
        {["png", "jpg", "jpeg", "gif"].includes(ext) && (
          <div className="relative flex h-full w-full items-center justify-center p-6">
            <Image
              src={fileUrl || profileImage}
              alt={data.name}
              width={800}
              height={600}
              className="max-h-87.5 max-w-87.5 rounded-lg object-contain drop-shadow-2xl sm:max-h-125"
            />
          </div>
        )}

        {/* 2. PDF Preview */}
        {ext === "pdf" && (
          <iframe
            src={`${fileUrl}#view=FitH`}
            className="h-100 w-full border-none sm:h-137.5"
            title="PDF Preview"
          />
        )}

        {/* 3. Office Docs Preview (DOC, DOCX, XLS, XLSX, PPT, PPTX) */}
        {["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext) && (
          <div className="h-full w-full">
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
              className="h-100 w-full border-none sm:h-137.5"
              title="Office Document Preview"
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold tracking-tighter text-slate-500 uppercase shadow-sm backdrop-blur-sm">
              Live Document Preview
            </div>
          </div>
        )}

        {/* 4. Fallback for non-viewable files */}
        {![
          "pdf",
          "png",
          "jpg",
          "jpeg",
          "gif",
          "doc",
          "docx",
          "xls",
          "xlsx",
          "ppt",
          "pptx",
        ].includes(ext) && (
          <div className="animate-in fade-in zoom-in flex flex-col items-center gap-4 p-10 duration-300">
            <div className="flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-white text-blue-600 shadow-2xl">
              <FileText className="h-12 w-12" />
            </div>
            <div className="space-y-1 text-center">
              <h3 className="text-xl font-black tracking-tight text-slate-800 uppercase">
                {ext?.toUpperCase()} File
              </h3>
              <p className="text-sm font-medium text-slate-500">
                {file?.sizeKB} KB • Use download icon to view
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <DynamicModal isOpen={isOpen} onClose={onClose} title="Document Details">
      {!data ? (
        <div className="py-20 text-center text-slate-400 italic">
          No information found
        </div>
      ) : (
        <div className="space-y-6 pb-2">
          {/* Main Preview Container */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl transition-all hover:border-gray-300">
            {data.files?.length > 0 ? (
              renderPreview(data.files[0])
            ) : (
              <div className="p-10 text-center text-slate-400">
                No file content available
              </div>
            )}
          </div>

          {/* Document Info Header */}
          <div className="flex flex-col gap-4 px-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                File Name
              </span>
              <h2 className="max-w-32 cursor-help truncate">
                {data.name}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {data.files?.[0]?.extension?.toUpperCase()}
              </div>
              <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                {data.files?.[0]?.sizeKB} KB
              </div>
            </div>
          </div>
        </div>
      )}
    </DynamicModal>
  );
};

export default ViewDocumentModal;
