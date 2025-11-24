import { useState } from "react";
import { Check, Clock, Megaphone, OctagonAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnnouncementBar({
  message,
  actionLabel,
  type,
  onAction,
  loading,
}: {
  message: string;
  actionLabel?: string;
  type: "info" | "warning" | "success" | "error";
  onAction?: () => void;
  loading?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={`w-full border border-l-4 rounded-xl p-4 flex items-center justify-between gap-4
      ${type === "info" ? "border-l-blue-500 bg-blue-50" : ""}
      ${type === "error" ? "border-l-red-500 bg-red-50" : ""}
      ${type === "warning" ? "border-l-[#F59E0B] bg-yellow-50" : ""}
      ${type === "success" ? "border-l-green-500 bg-green-50" : "" }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {type === "info" && <Megaphone size={40} color="#3B82F6" />}
        {type === "warning" && <Clock size={40} color="#F59E0B" />}
        {type === "error" && <OctagonAlert size={40} color="#EF4444" />}
        {type === "success" && <Check size={40} color="#10B981" />}

        <p className="text-sm font-medium">{message}</p>
      </div>

      {/* Action or Close Button */}
      {actionLabel ? (
        <Button
          onClick={onAction}
          disabled={loading}
          className="bg-teal-800 hover:bg-teal-900 text-white rounded-lg px-4 py-2"
        >
          {actionLabel}
        </Button>
      ) : (
        <button
          onClick={() => setIsVisible(false)}
          className="cursor-pointer p-1 hover:bg-gray-200 rounded-full transition"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
