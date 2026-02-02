import { formatDateTime } from "@/utils/formatDateTime";
import { Eye, FileText, Share2, Trash2 } from "lucide-react";
import React from "react";

interface DocumentType {
  id: string;
  name: string;
  files: Array<{
    extension: string;
    sizeKB: number;
  }>;
  statusByClient: "SIGNED" | "VIEWED" | "PENDING" | null;
  updatedAt: string | Date | null;
  uploader?: {
    fullName?: string;
  };
}

interface DocumentTableProps {
  documents: DocumentType[];
  onShare?: (doc: DocumentType) => void;
  onDelete?: (docId: string) => void;
  onView?: (docId: string) => void;
}

const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full overflow-auto rounded-lg border border-gray-200 bg-white">
    <table className="w-full border-collapse text-left">{children}</table>
  </div>
);

const Badge = ({ status }: { status: DocumentType["statusByClient"] }) => {
  const styles = {
    SIGNED: "bg-green-100 text-green-700",
    VIEWED: "bg-blue-100 text-blue-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    null: "text-gray-400",
  };

  if (!status) return <span className="text-gray-400">-</span>;

  const statusText = status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || styles.null}`}
    >
      {statusText}
    </span>
  );
};

const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  onShare,
  onDelete,
  onView,
}) => {
  return (
    <Table>
      <thead className="border-b border-gray-200 bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
            Name
          </th>
          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
            Type
          </th>
          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
            Status
          </th>
          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
            Date
          </th>
          <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {documents.map((doc) => (
          <tr key={doc.id} className="transition-colors hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="rounded bg-blue-50 p-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {doc.files?.[0]?.sizeKB} KB
                  </p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {doc.files?.[0]?.extension?.toUpperCase() || "Unknown"}
            </td>
            <td className="px-6 py-4">
              <Badge status={doc.statusByClient} />
            </td>
            <td className="px-6 py-4 text-sm text-nowrap text-gray-600">
              {formatDateTime(doc.updatedAt)}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={onShare && (() => onShare(doc))}
                  className={`cursor-pointer rounded-full p-2 text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-600 ${!onShare && "hidden"}`}
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  onClick={onView && (() => onView(doc.id))}
                  className={`cursor-pointer rounded-full p-2 text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-600 ${!onView && "hidden"}`}
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={onDelete && (() => onDelete(doc.id))}
                  className={`cursor-pointer rounded-full p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-600 ${!onDelete && "hidden"}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DocumentTable;
