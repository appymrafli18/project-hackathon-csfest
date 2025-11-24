import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

interface ProdiCardProps {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  icon: ReactNode;
}

export default function ProdiCard({
  id,
  title,
  description,
  accentColor,
  icon
}: ProdiCardProps) {
  const { jurusanId } = useParams();
  return (
    <Card
      className="w-full md:w-72 rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      style={{ borderTopWidth: "8px", borderTopColor: accentColor }}
    >
      <CardContent className="flex flex-col items-center gap-4 py-6 h-full">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}20` }} // 20 = low opacity
        >
          <div className="text-4xl" style={{ color: accentColor }}>
            {icon}
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center">{title}</h2>

        <p className="text-center text-gray-600 px-4 text-sm leading-relaxed">
          {description}
        </p>

        <Link to={`/enroll-course/${jurusanId}/${id}`} className="mt-auto">
          <button
            className="px-5 py-2 rounded-lg text-white font-medium cursor-pointer"
            style={{ backgroundColor: accentColor }}
          >
            Pilih Program Studi
          </button>
        </Link>
      </CardContent>
    </Card>
  );
}
