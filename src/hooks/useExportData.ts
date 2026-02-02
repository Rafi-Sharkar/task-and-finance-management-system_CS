// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useCallback } from "react";

// interface ExportConfig {
//     fileName?: string;
// }

// const useExportData = (config?: ExportConfig) => {
//     const exportToCSV = useCallback((data: any[], customFileName?: string) => {
//         if (!data || data.length === 0) {
//             console.warn("No data available to export");
//             return;
//         }

//         const headers = ["Name", "Extension", "Size (KB)", "Uploaded By", "Date", "Status"];

//         const rows = data.map((doc) => [
//             doc.name,
//             doc.files?.[0]?.extension || "N/A",
//             doc.files?.[0]?.sizeKB || 0,
//             doc.uploader?.fullName || doc.uploader?.username || "System",
//             new Date(doc.createdAt).toLocaleDateString(),
//             doc.status,
//         ]);

//         const csvContent = [
//             headers.join(","),
//             ...rows.map((row) => row.join(","))
//         ].join("\n");

//         const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");

//         const fileName = customFileName || config?.fileName || "exported_documents";

//         link.setAttribute("href", url);
//         link.setAttribute("download", `${fileName}.csv`);
//         link.style.visibility = "hidden";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }, [config]);

//     return { exportToCSV };
// };

// export default useExportData;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback } from "react";

interface ExportConfig {
    fileName?: string;
}

const useExportData = (config?: ExportConfig) => {
    const exportToCSV = useCallback((data: any[], customFileName?: string) => {
        if (!data || data.length === 0) {
            console.warn("No data available to export");
            return;
        }

        const headers = Object.keys(data[0]);

        const rows = data.map((item) => {
            return headers.map((header) => {
                const value = item[header] ?? "";

                const stringValue = typeof value === "object"
                    ? JSON.stringify(value).replace(/"/g, '""')
                    : String(value).replace(/"/g, '""');

                return `"${stringValue}"`;
            }).join(",");
        });

        const csvContent = [
            headers.join(","),
            ...rows
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        const fileName = customFileName || config?.fileName || "exported_data";

        link.setAttribute("href", url);
        link.setAttribute("download", `${fileName}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [config]);

    return { exportToCSV };
};

export default useExportData;