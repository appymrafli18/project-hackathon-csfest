import { Link } from "react-router-dom"

type Announcement = {
  id: string
  title: string
  date: string
}

type Props = {
  announcements: Announcement[]
}

export default function CampusAnnouncements({ announcements }: Props) {
  const months = [
    "JAN", "FEB", "MAR", "APR", "MEI", "JUN",
    "JUL", "AGU", "SEP", "OKT", "NOV", "DES"
  ]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return {
      day: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear(),
    }
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 border">
      <h2 className="text-2xl font-semibold mb-4 pb-2 border-b">Pengumuman</h2>

      <div className="flex flex-col gap-5">
        {announcements.map((item) => {
          const d = formatDate(item.date)
          return (
            <Link
              key={item.id}
              to={`/campus-announcment/${item.id}`}
              className="flex items-start gap-4 group"
            >
              {/* Date Card */}
              <div className="bg-gray-800 text-white rounded-lg flex flex-col items-center py-2 px-5 shadow-sm">
                <span className="text-2xl font-bold leading-none">{d.day}</span>
                <span className="text-xs opacity-80">{d.month}</span>
                <span className="text-xs opacity-80">{d.year}</span>
              </div>
              
              {/* Title */}
              <div className="pt-1">
                <p className="text-teal-600 font-medium group-hover:underline">
                  {item.title}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
