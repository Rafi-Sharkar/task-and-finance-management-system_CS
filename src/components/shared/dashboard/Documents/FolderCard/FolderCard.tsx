/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";

// interface FolderProps {
//   folderName: {
//     name: string;
//   };
// }

// const FolderCard: React.FC<FolderProps> = ({ folderName }) => {
//   return (
//     <div className="group flex cursor-pointer flex-col items-center">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="100"
//         height="100"
//         viewBox="0 0 100 100"
//         fill="none"
//         className="transition-transform group-hover:scale-105"
//       >
//         <path
//           d="M93.1406 16.7031H47.1562C45.2812 16.7031 43.4844 15.9375 42.1875 14.5781L36.3125 8.42189C35.6711 7.75006 34.9 7.21534 34.0459 6.85009C33.1919 6.48483 32.2726 6.29664 31.3438 6.29689H6.85938C5.95933 6.29484 5.06771 6.47034 4.23559 6.81335C3.40346 7.15636 2.64717 7.66014 2.01001 8.29585C1.37285 8.93155 0.867347 9.6867 0.52244 10.518C0.177533 11.3494 -2.34577e-06 12.2406 0 13.1406L0 78.5781C0 80.3974 0.722682 82.1421 2.00906 83.4285C3.29545 84.7148 5.04016 85.4375 6.85938 85.4375H93.1406C94.0414 85.4375 94.9334 85.2601 95.7656 84.9154C96.5978 84.5707 97.354 84.0654 97.9909 83.4285C98.6279 82.7915 99.1331 82.0353 99.4779 81.2031C99.8226 80.3709 100 79.4789 100 78.5781V23.5625C100 21.7433 99.2773 19.9986 97.9909 18.7122C96.7046 17.4258 94.9598 16.7031 93.1406 16.7031Z"
//           fill="#56B2E3"
//         />
//         <path
//           d="M89.4687 23.5469H10.5312C7.67187 23.5469 5.34375 25.875 5.34375 28.7344V81.0469C5.34375 83.9219 7.67187 86.2344 10.5312 86.2344H89.4687C92.3281 86.2344 94.6563 83.9062 94.6563 81.0469V28.75C94.6583 28.0675 94.5256 27.3912 94.2659 26.76C94.0061 26.1288 93.6243 25.5551 93.1424 25.0718C92.6605 24.5884 92.0879 24.2049 91.4575 23.9432C90.8271 23.6816 90.1513 23.5469 89.4687 23.5469Z"
//           fill="white"
//         />
//         <path
//           d="M93.1406 31.9062H6.85938C3.0625 31.9062 0 34.9687 0 38.7656V86.8594C0 88.6786 0.722682 90.4233 2.00906 91.7097C3.29545 92.9961 5.04016 93.7187 6.85938 93.7187H93.1406C94.9598 93.7187 96.7046 92.9961 97.9909 91.7097C99.2773 90.4233 100 88.6786 100 86.8594V38.7656C100 34.9687 96.9375 31.9062 93.1406 31.9062Z"
//           fill="#98CFEF"
//         />
//       </svg>
//       <p className="mt-1.5 text-center text-sm font-medium text-gray-700">
//         {folderName?.name}
//       </p>
//     </div>
//   );
// };

// export default FolderCard;

"use client";
import React from "react";
import { Edit, Trash2 } from "lucide-react";
import folderImg from "@/assets/dashboard/Group.svg";
import Image from "next/image";

interface FolderProps {
  folder: {
    id: string | number;
    name: string;
  };
  onEdit: (folder: any) => void;
  onDelete: (id: string | number) => void;
  onOpen: (folder: any) => void;
}

const FolderCard: React.FC<FolderProps> = ({
  folder,
  onEdit,
  onDelete,
  onOpen,
}) => {
  return (
    <div className="group relative flex cursor-pointer flex-col  rounded-xl  transition-colors">
      <div className="absolute -top-1 right-1.5 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(folder);
          }}
          className="text-blue-600 bg-white p-1 rounded-sm shadow-md cursor-pointer"
        >
          <Edit size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(folder.id);
          }}
          className="text-red-600 bg-white p-1 rounded-sm shadow-md cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div
        onClick={() => onOpen(folder)}
        className="transition-transform group-hover:scale-105"
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M93.1406 16.7031H47.1562C45.2812 16.7031 43.4844 15.9375 42.1875 14.5781L36.3125 8.42189C35.6711 7.75006 34.9 7.21534 34.0459 6.85009C33.1919 6.48483 32.2726 6.29664 31.3438 6.29689H6.85938C5.95933 6.29484 5.06771 6.47034 4.23559 6.81335C3.40346 7.15636 2.64717 7.66014 2.01001 8.29585C1.37285 8.93155 0.867347 9.6867 0.52244 10.518C0.177533 11.3494 -2.34577e-06 12.2406 0 13.1406L0 78.5781C0 80.3974 0.722682 82.1421 2.00906 83.4285C3.29545 84.7148 5.04016 85.4375 6.85938 85.4375H93.1406C94.0414 85.4375 94.9334 85.2601 95.7656 84.9154C96.5978 84.5707 97.354 84.0654 97.9909 83.4285C98.6279 82.7915 99.1331 82.0353 99.4779 81.2031C99.8226 80.3709 100 79.4789 100 78.5781V23.5625C100 21.7433 99.2773 19.9986 97.9909 18.7122C96.7046 17.4258 94.9598 16.7031 93.1406 16.7031Z"
            fill="#56B2E3"
          />
          <path
            d="M89.4687 23.5469H10.5312C7.67187 23.5469 5.34375 25.875 5.34375 28.7344V81.0469C5.34375 83.9219 7.67187 86.2344 10.5312 86.2344H89.4687C92.3281 86.2344 94.6563 83.9062 94.6563 81.0469V28.75C94.6583 28.0675 94.5256 27.3912 94.2659 26.76C94.0061 26.1288 93.6243 25.5551 93.1424 25.0718C92.6605 24.5884 92.0879 24.2049 91.4575 23.9432C90.8271 23.6816 90.1513 23.5469 89.4687 23.5469Z"
            fill="white"
          />
          <path
            d="M93.1406 31.9062H6.85938C3.0625 31.9062 0 34.9687 0 38.7656V86.8594C0 88.6786 0.722682 90.4233 2.00906 91.7097C3.29545 92.9961 5.04016 93.7187 6.85938 93.7187H93.1406C94.9598 93.7187 96.7046 92.9961 97.9909 91.7097C99.2773 90.4233 100 88.6786 100 86.8594V38.7656C100 34.9687 96.9375 31.9062 93.1406 31.9062Z"
            fill="#98CFEF"
          />
        </svg> */}
        <Image
          src={folderImg}
          alt="folder"
          width={100}
          height={100}
          className="h-20 w-full"
        />
      </div>

      <p className="mt-1.5 truncate px-2 text-sm text-center font-medium text-gray-700">
        {folder?.name}
      </p>
    </div>
  );
};

export default FolderCard;