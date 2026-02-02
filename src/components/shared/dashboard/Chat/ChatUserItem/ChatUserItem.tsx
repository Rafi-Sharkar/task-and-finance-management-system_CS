import placeholderImg from '@/assets/placeholder.png';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  lastMessage: string;
  avatarUrl?: string;
  status: string;
  username?: string;
  email?: string;
}

interface ChatUserItemProps {
  user: User;
  isActive: boolean;
}

export const ChatUserItem = ({ user, isActive }: ChatUserItemProps) => {
  console.log("Is Active from user", isActive);
  console.log("user+++++++++++", user);
  return (
    <div
      className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all ${isActive ? 'bg-white shadow-sm border-r-4 border-black' : 'hover:bg-gray-100'
        }`}
    >
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden border">
          <Image src={user?.avatarUrl || placeholderImg} alt={"username"} width={40} height={40} />
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      </div>
      <div className="flex-1 overflow-hidden">
        <h4 className="font-bold text-sm text-gray-800">{user?.username || user?.name || user?.email || "User Name"}</h4>
        <p className="text-xs text-gray-500 truncate">{user?.lastMessage}</p>
      </div>
    </div>
  )
}