import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-7 gap-4 border-b border-gray-100 px-6 py-4"
        >
          {Array.from({ length: 7 }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
