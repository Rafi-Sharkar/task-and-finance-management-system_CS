/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetInvoiceByIdQuery } from "@/redux/features/finance/invoice/invoice.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react"; // Import icons
import { handleDownload } from "@/utils/downloadFile"; // Import the utility created above

export default function InvoiceDetailsModal({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const { data, isLoading } = useGetInvoiceByIdQuery(id);
  const invoice = data?.invoice;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Invoice Details - {invoice?.id?.slice(0, 8)}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <div className="grid gap-6 py-4">
            {/* Header Info */}
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <div>
                <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Invoice Type
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {invoice.invoiceType}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Status
                </p>
                <p className="mt-1 inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-medium text-blue-700">
                  {invoice.invoiceStatus}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                Description
              </p>
              <p className="mt-1 text-gray-700">{invoice.description}</p>
            </div>

            {/* Attached Documents Section */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="mb-3 text-sm font-semibold text-gray-900">
                Attached Documents
              </p>

              {invoice.transaction?.document?.files?.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {invoice.transaction.document.files.map(
                    (file: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-blue-50 p-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Attachment {index + 1}
                            </p>
                            <p className="text-xs text-gray-400">
                              Invoice File Document
                            </p>
                          </div>
                        </div>

                        {/* Download Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                          onClick={() =>
                            handleDownload(
                              file.url,
                              `invoice-attachment-${index + 1}.jpg`,
                            )
                          }
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No transaction attachments linked to this invoice.
                </p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
