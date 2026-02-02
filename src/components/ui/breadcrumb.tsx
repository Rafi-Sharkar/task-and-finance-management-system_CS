// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ChevronRight, Folder } from "lucide-react";
// import React from "react";

// const Breadcrumb: React.FC<{
//   path: any[];
//   onNavigate: (folderId: number | null) => void;
// }> = ({ path, onNavigate }) => {
//   return (
//     <div>
//       <div className="flex flex-wrap items-center text-sm text-gray-600 gap-3 sm:gap-4">
//         <Folder className="mr-2 h-4 w-4 text-blue-600" />
//         <button
//           onClick={() => onNavigate(null)}
//           className="text-gray-900 transition-colors hover:text-blue-600 cursor-pointer"
//         >
//           Documents
//         </button>
//         <ChevronRight className="mx-2 h-4 w-4" />
//         <button
//           onClick={() => onNavigate(null)}
//           className="text-gray-900 transition-colors hover:text-blue-600 cursor-pointer"
//         >
//           My Documents
//         </button>
//         {path.map((folder, index) => (
//           <React.Fragment key={folder.id}>
//             <ChevronRight className="mx-2 h-4 w-4" />
//             <button
//               onClick={() => onNavigate(folder.id)}
//               className={`transition-colors cursor-pointer ${
//                 index === path.length - 1
//                   ? "font-medium text-gray-900"
//                   : "text-gray-600 hover:text-blue-600"
//               }`}
//             >
//               {folder.name}
//             </button>
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Breadcrumb;

import { ChevronRight, Folder } from "lucide-react";
import React from "react";

interface BreadcrumbProps {
  path: { id: string; name: string }[];
  onNavigate: (folderId: string | null) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb">
      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-1 sm:gap-2">
        <Folder className="mr-1 h-4 w-4 text-blue-600" />
        
        {/* Root Link */}
        <button
          onClick={() => onNavigate(null)}
          className="text-gray-600 transition-colors hover:text-blue-600 cursor-pointer"
        >
          My Documents
        </button>

        {/* Dynamic Path */}
        {path.map((folder, index) => {
          const isLast = index === path.length - 1;
          return (
            <React.Fragment key={folder.id}>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <button
                onClick={() => !isLast && onNavigate(folder.id)}
                disabled={isLast}
                className={`transition-colors ${
                  isLast
                    ? "font-semibold text-gray-900 cursor-default"
                    : "text-gray-600 hover:text-blue-600 cursor-pointer"
                }`}
              >
                {folder.name}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;