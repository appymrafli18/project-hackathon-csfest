"use client"

import { FileText, FileSpreadsheet, File as FileIcon, FileArchive, FileCode } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Link, useParams } from "react-router-dom"

interface MaterialFile {
  title: string
  type: "pdf" | "ppt" | "docx" | "xlsx" | "zip" | "assignment" | "other"
}

interface WeeklyMeeting {
  weekRange: string
  files: MaterialFile[]
}

const meetings: WeeklyMeeting[] = [
  {
    weekRange: "25 August - 31 August",
    files: [
      { title: "Tugas 1", type: "assignment" },
      { title: "Meeting 1 - Introducing personal information", type: "pdf" },
    ],
  },
  {
    weekRange: "1 September - 7 September",
    files: [
      { title: "Dream Job and Self-Branding", type: "pdf" },
      { title: "Making self-branding video", type: "ppt" },
    ],
  },
  {
    weekRange: "8 September - 14 September",
    files: [
      { title: "Meeting 3 Text Types", type: "pdf" },
      { title: "Giving advice", type: "docx" },
      { title: "Comparative and Superlative", type: "pdf" },
    ],
  },
]

const iconMap = {
  pdf: <FileText className="w-5 h-5 text-red-500" />,
  ppt: <FileArchive className="w-5 h-5 text-orange-500" />,
  docx: <FileIcon className="w-5 h-5 text-blue-500" />,
  xlsx: <FileSpreadsheet className="w-5 h-5 text-green-500" />,
  zip: <FileArchive className="w-5 h-5 text-yellow-500" />,
  assignment: <FileText className="w-5 h-5 text-purple-500" />,
  other: <FileCode className="w-5 h-5 text-gray-500" />,
}

export default function WeeklyMeetings() {
  const { courseId } = useParams(); 
  return (
    <div className="flex flex-col gap-6 w-full">
      {meetings.map((week, idx) => (
        <div key={idx} className="w-full">
          {/* Header Minggu */}
          <h2 className="text-xl font-semibold text-emerald-700 border-b pb-2">
            {week.weekRange} (Minggu ke-{idx + 1})
          </h2>

          {/* List Files */}
          <Card className="mt-3 border">
            <CardContent className="p-4 flex flex-col gap-4">
              {week.files.map((file, i) => (
                <Link
                  to={file.type === "assignment" ? `/my-course/${courseId}/assignment/1` : "#"}
                  key={i}
                  className="flex items-center gap-3 border-b pb-3 last:border-none"
                >
                  <div
                    key={i}
                    className="flex items-center gap-3 border-b pb-3 last:border-none"
                  >
                    {/* icon */}
                    <div>{iconMap[file.type]}</div>

                    {/* file name */}
                    <p className="text-base text-blue-700 font-medium">
                      {file.title}
                    </p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

