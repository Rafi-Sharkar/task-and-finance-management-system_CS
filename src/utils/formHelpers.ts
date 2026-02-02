/* eslint-disable @typescript-eslint/no-explicit-any */

export const formatDateForInput = (dateStr: string): string => {
  if (!dateStr) return "";
  const dateObj = new Date(dateStr);
  if (!isNaN(dateObj.getTime())) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return "";
};

export const getUniqueOptions = (data: any[], key: string) => {
  if (!data || !Array.isArray(data)) return [];

  const uniqueValues = Array.from(new Set(data.map((item) => item[key])));
  return uniqueValues.map((val) => ({
    value: String(val),
    label: String(val),
  }));
};

export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    Low: "bg-[#17B26A]",
    Medium: "bg-[#F79009]",
    High: "bg-[#F04438]",
  };
  return colors[priority] || "bg-gray-400";
};
