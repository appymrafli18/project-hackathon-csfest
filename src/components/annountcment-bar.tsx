import { X } from "lucide-react";

export default function AnnouncementBar({ title, message, onClick }: {
  title: string;
  message: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="w-full flex items-center bg-gray-100 rounded-sm overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Left Label */}
      <div className="font-semibold px-6 py-3">
        {title}
      </div>

      {/* Message */}
      <div className="flex-1 px-4 text-gray-800">
        {message}
      </div>

      {/* Arrow Icon */}
      <div className="px-4">
        <X size={20} />
      </div>
    </div>
  );
}
