/* eslint-disable @typescript-eslint/no-unused-vars */
import placeholderImg from "@/assets/placeholder.png";
import Image from "next/image";

interface ChatMessageProps {
  text: string;
  isSender: boolean;
  time?: string;
  sender?: {
    id: string;
    avatarUrl?: string | null;
    fullName: string;
  };
  isFirstInBlock?: boolean;
  isLastInBlock?: boolean;
}

export const ChatMessage = ({
  text,
  isSender,
  time,
  sender,
  isFirstInBlock = true,
  isLastInBlock = true,
}: ChatMessageProps) => {
  const baseClasses = "max-w-[70%] p-3 text-sm break-words";

  // Bubble border radius
  const bubbleClasses = isSender
    ? `bg-blue-600 text-white shadow-md rounded-2xl ${(isLastInBlock) ? "rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl rounded-br-none" : ""
    }`
    : `bg-gray-100 text-gray-800 shadow-sm rounded-2xl ${(isLastInBlock) ? "rounded-tr-2xl rounded-br-2xl rounded-tl-2xl rounded-bl-none" : ""
    }`;

  return (
    <div>
      <div className={`flex items-end gap-2 mb-1 ${isSender ? "justify-end" : "justify-start"}`}>
        <div className={`${baseClasses} ${bubbleClasses}`}>
          {text}
          {/* {isLastInBlock && time && ( */}
          <div className={`mt-1 text-[10px] ${isSender ? "text-right text-gray-200" : "text-left text-gray-500"}`}>
            {time}
          </div>
          {/* )} */}
        </div>
      </div>
      <div className={`flex items-end gap-2 mb-1 ${isSender ? "justify-end" : "justify-start"}`}>
        {!isSender && isLastInBlock && sender && (
          <Image
            src={sender.avatarUrl || placeholderImg}
            alt={sender.fullName || "Avatar"}
            width={28}
            height={28}
            className="w-8 h-8 rounded-full shrink-0 object-fill"
          />
        )}
      </div>
      <div className={`flex items-end gap-2 mb-1 ${isSender ? "justify-end" : "justify-start"}`}>
        {isSender && isLastInBlock && sender && (
          <Image
            src={sender.avatarUrl || placeholderImg}
            alt={sender.fullName || "Avatar"}
            width={28}
            height={28}
            className="w-8 h-8 rounded-full shrink-0 object-fill"
          />
        )}
      </div >
    </div>
  );
};
