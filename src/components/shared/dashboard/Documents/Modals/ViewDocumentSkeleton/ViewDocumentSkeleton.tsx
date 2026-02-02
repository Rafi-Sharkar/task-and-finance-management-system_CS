import React from "react";

const ViewDocumentSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex h-48 w-full justify-center rounded-xl bg-gray-200" />

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200" />
          <div className="h-5 w-32 rounded bg-gray-300" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200" />
          <div className="h-5 w-32 rounded bg-gray-300" />
        </div>
      </div>

      <hr className="border-gray-100" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-gray-100 p-3"
          >
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-2 w-16 rounded bg-gray-200" />
              <div className="h-3 w-24 rounded bg-gray-300" />
            </div>
          </div>
        ))}
      </div>

      <div className="h-12 w-full rounded-xl bg-gray-200" />
    </div>
  );
};

export default ViewDocumentSkeleton;
