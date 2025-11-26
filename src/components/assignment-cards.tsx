import { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

// Dummy Tugas
const tasks = [
  {
    id: 1,
    title: "Tugas Pemrograman Web",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolorem eos molestiae, iusto qui ullam doloremque vero expedita cumque consectetur error culpa molestias fugit itaque blanditiis, voluptas praesentium. Laborum, velit.",
    deadline: "2025-11-20T23:59:59",
    mataKuliah: "Pemrograman Web",
  },
  {
    id: 2,
    title: "Laporan Jaringan Komputer",
    description:
      "Tuliskan ringkasan tentang model OSI dan TCP/IP serta contoh implementasinya di dunia nyata.",
    deadline: "2025-11-25T17:00:00",
    mataKuliah: "Jaringan Komputer",
  },
  {
    id: 3,
    title: "Proyek Basis Data",
    description:
      "Rancang ERD dan buat schema database untuk sistem manajemen perpustakaan.",
    deadline: "2025-11-26T09:30:00",
    mataKuliah: "Basis Data",
  },
  {
    id: 4,
    title: "Analisis Algoritma",
    description:
      "Bandingkan time complexity antara merge sort, quick sort, dan heap sort.",
    deadline: "2025-11-21T20:00:00",
    mataKuliah: "Analisis Algoritma",
  },
  {
    id: 5,
    title: "Desain UI/UX",
    description:
      "Buat wireframe dan prototype low-fidelity untuk aplikasi manajemen tugas.",
    deadline: "2025-11-22T23:59:00",
    mataKuliah: "Desain UI/UX",
  },
]

// smarter countdown formatter — hides 0d or 0h
function getCountdown(deadline: string) {
  const diff = new Date(deadline).getTime() - Date.now()

  if (diff <= 0) return "Deadline passed"

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)

  let parts: string[] = []

  if (days > 0) parts.push(`${days}d`)
  if (hours > 0 || days > 0) parts.push(`${hours}h`)
  parts.push(`${minutes}m`)

  return parts.join(" ")
}

export default function AssignmentCards() {
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  )

  const [countdowns, setCountdowns] = useState(
    sortedTasks.map((t) => getCountdown(t.deadline))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(sortedTasks.map((t) => getCountdown(t.deadline)))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const itemsToShow = sortedTasks.slice(0, 1)

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Reminder Tugas</h1>
      {itemsToShow.map((task, i) => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle className="flex justify-between">
              {task.title}
              <p>{task.mataKuliah}</p>
            </CardTitle>
            <CardDescription className="flex items-center">
              <Clock className="w-4 h-4 mr-3" />
              Deadline: {countdowns[i]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-sm">
                {task.description}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto w-fit">Lihat lebih detail</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
