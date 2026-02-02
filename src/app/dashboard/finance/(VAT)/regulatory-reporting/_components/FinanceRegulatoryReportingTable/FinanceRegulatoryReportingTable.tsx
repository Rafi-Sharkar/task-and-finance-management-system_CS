"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import { Button } from "@/components/ui/button";
import { TColumn } from "@/types/custom-table.types";
import { Calendar, CloudUpload, Download, ListFilter, MoreVertical, Upload, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";

import {
  IRegulatoryReporting
} from "./data/financeRegulatoryReportingTable.data";

import { useGetVatReturnsQuery, useUpdateVatRegulatoryReportMutation } from "@/redux/features/finance/vatReturn/vatReturn.api";
import { useRef, useState } from "react";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useExportData from "@/hooks/useExportData";

const PERIODS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
  "Q1", "Q2", "Q3", "Q4"
];

function FinanceRegulatoryReportingTable() {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<IRegulatoryReporting | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ jurisdiction?: string; file?: string }>({});
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [updateReport, { isLoading: isUpdating }] = useUpdateVatRegulatoryReportMutation();
  const [jurisdiction, setJurisdiction] = useState<string>("");

  const handleOpenUpload = (row: IRegulatoryReporting) => {
    setSelectedReport(row);
    setJurisdiction(row.jurisdictions || "");
    setIsUploadOpen(true);
  };

  const handleModalChange = (open: boolean) => {
    setIsUploadOpen(open);
    if (!open) {
      setFile(null);
      setJurisdiction("");
      setErrors({});
    }
  };

  const handleDownloadPDF = (row: IRegulatoryReporting) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("VAT Regulatory Report", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Field", "Details"]],
      body: [
        ["Report Type", row.periodType || "—"],
        ["Period", row.period || "—"],
        ["Jurisdiction", row.jurisdictions || "—"],
        ["VAT Basis", row.inVat || "—"],
        ["Status", row.vatStatus || "—"],
        ["Created Date", row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—"],
      ],
      theme: "striped",
      headStyles: { fillColor: [23, 92, 211] }, // Matches your blue theme
    });

    doc.save(`Report_${row.period}_${row.jurisdictions || "Unknown"}.pdf`);
    toast.success("PDF downloaded successfully");
  };

  const handleSubmit = async () => {
    const newErrors: { jurisdiction?: string; file?: string } = {};
    if (!jurisdiction) newErrors.jurisdiction = "Please select a jurisdiction.";
    if (!file) newErrors.file = "Please upload a report file.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const reportId = selectedReport?.id;
    if (!reportId) {
      console.error("No report selected");
      return;
    }

    const formData = new FormData();
    formData.append("files", file!);
    formData.append("jurisdictions", jurisdiction);

    try {
      await updateReport({
        id: reportId,
        data: formData
      }).unwrap();
      toast.success("Report uploaded successfully!")
      handleModalChange(false);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };


  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data, isLoading } = useGetVatReturnsQuery({
    vatStatus: statusFilter,
    search: selectedPeriod || undefined,
    page,
    limit
  });

  const vatReturns = data?.data || [];
  const meta = data?.metadata;
  // console.log(vatReturns, "vat")

  const { exportToCSV } = useExportData({
    fileName: "Regulatory Reporting",
  });

  const handleExport = () => {
    const dataToExport = vatReturns || [];
    if (dataToExport.length > 0) {
      exportToCSV(dataToExport);
    }
  };

  // console.log("updated data ", data);

  const tableConfig: TColumn<IRegulatoryReporting>[] = [
    {
      header: "Report Type",
      accessor: "periodType",
    },
    {
      header: "Period",
      accessor: "period",
    },
    {
      header: "Jurisdiction",
      cell: (row) => (
        <span className={row.jurisdictions ? "text-inherit" : "text-gray-400"}>
          {row.jurisdictions ?? "—"}
        </span>
      ),
    },
    {
      header: "VAT Basis",
      accessor: "inVat",
    },
    {
      header: "Generated Date",
      accessor: "createdAt",
    },
    {
      header: "Status",
      cell: (row) => {
        const status = row.vatStatus;
        const colors =
          status === "SUBMITTED"
            ? { bg: "#EEF4FF", text: "#3538CD" }
            : status === "PAID"
              ? { bg: "#D1FADF", text: "#039855" }
              : { bg: "#F2F4F7", text: "#344054" };

        return (
          <StatusBadge
            status={status}
            bgColor={colors.bg}
            textColor={colors.text}
          />
        );
      },
    },
    {
      header: "Action",
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4 text-[#667085]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 bg-white">
            <DropdownMenuItem
              className="cursor-pointer gap-2 text-[#344054]"
              onClick={() => handleDownloadPDF(row)}
            >
              <Download size={16} />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer gap-2 text-[#344054]"
              onClick={() => handleOpenUpload(row)}
            >
              <Upload size={16} />
              <span>Upload</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-45 justify-between border-[#D5D7DA] bg-white h-11">
                {selectedPeriod || "All Periods"}
                <Calendar size={16} className="text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-60 overflow-y-auto bg-white">
              <DropdownMenuItem onClick={() => setSelectedPeriod("")} className="text-blue-600 font-medium">
                All Periods
              </DropdownMenuItem>
              {PERIODS.map((p) => (
                <DropdownMenuItem key={p} onClick={() => setSelectedPeriod(p)}>
                  {p}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filter Shortcut */}
          {(selectedPeriod || statusFilter) && (
            <Button
              variant="ghost"
              onClick={() => { setSelectedPeriod(""); setStatusFilter(undefined); }}
              className="h-8 px-2 text-xs text-gray-500 hover:text-red-500 gap-1"
            >
              <X size={14} /> Clear
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Export Button */}
          <Button
            onClick={() => handleExport()}
            variant="outline"
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <Download size={18} /> Export
          </Button>

          {/* Filter Popover */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
              >
                <ListFilter size={18} /> {statusFilter ? statusFilter : "Filter"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white">
              <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>PENDING</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("PAID")}>PAID</DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => setStatusFilter("SUBMITTED")}>SUBMITTED</DropdownMenuItem> */}
              {statusFilter && (
                <>
                  <div className="my-1 border-t border-gray-100" />
                  <DropdownMenuItem
                    onClick={() => setStatusFilter(undefined)}
                    className="text-red-600 focus:text-red-600"
                  >
                    Clear Filter
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-md bg-white">
          <p className="text-gray-500">Loading VAT returns...</p>
        </div>
      ) : vatReturns.length > 0 ? (
        <>
          <CustomTable columns={tableConfig} data={vatReturns} />
          {meta && (
            <div className="">
              <CustomPagination meta={meta} />
            </div>
          )}
        </>
      ) : (
        <div className="flex py-6 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 bg-white">
          <p className="text-lg font-medium text-gray-900">No VAT data found</p>
          <p className="text-sm text-gray-500">Try adjusting your filters or search criteria.</p>
        </div>
      )}

      <Dialog open={isUploadOpen} onOpenChange={handleModalChange}>
        <DialogContent className="sm:max-w-125 p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#101828]">Upload Report</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#344054]">Jurisdiction / Region</label>
              <Select value={jurisdiction} onValueChange={(val) => { setJurisdiction(val); setErrors(prev => ({ ...prev, jurisdiction: "" })); }}>
                <SelectTrigger className={`h-11 w-full border-[#D5D7DA] ${errors.jurisdiction ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select Jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="European Union">European Union</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
              {errors.jurisdiction && <p className="text-xs text-red-500 mt-1">{errors.jurisdiction}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#344054]">Upload File</label>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] || null;
                  setFile(selectedFile);
                  if (selectedFile) setErrors(prev => ({ ...prev, file: "" }));
                }}
              />
              {!file ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-[#F9FAFB] p-10 transition-colors hover:bg-gray-50 cursor-pointer ${errors.file ? "border-red-500" : "border-[#EAECF0]"}`}
                >
                  <div className="rounded-full bg-white p-3 shadow-sm">
                    <CloudUpload className="h-8 w-8 text-[#475467]" />
                  </div>
                  <p className="mt-3 text-sm text-[#475467]">
                    Drag and drop or <span className="font-semibold text-[#2E90FA] hover:underline">browse</span>
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-[#EAECF0] bg-white p-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-[#EEF4FF] p-2 rounded-lg text-[#3538CD]"><Upload size={20} /></div>
                    <div className="truncate">
                      <p className="text-sm font-medium text-[#344054] truncate">{file.name}</p>
                      <p className="text-xs text-[#667085]">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button onClick={() => setFile(null)} className="text-[#667085] hover:text-red-500 p-1"><X size={20} /></button>
                </div>
              )}
              {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file}</p>}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isUpdating}
              className="w-full h-12 bg-[#175CD3] hover:bg-[#154fa3] text-white font-semibold text-base rounded-lg"
            >
              {isUpdating ? "Uploading..." : "Submit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FinanceRegulatoryReportingTable;
