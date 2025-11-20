"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

type DayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday"

interface ScheduleItem {
  mataKuliah: string
  jam: string
  dosen: string
  lokasi: string
}

type ScheduleMap = Record<DayKey, ScheduleItem[]>

const schedule: ScheduleMap = {
  monday: [
    { mataKuliah: "Matematika Diskrit", jam: "07.30 - 10.50", dosen: "Dwi", lokasi: "Perpus2" },
    { mataKuliah: "Bahasa Indonesia", jam: "10.50 - 15.00", dosen: "Dinda", lokasi: "Perpus2" },
  ],
  tuesday: [
    { mataKuliah: "Algoritma & Pemrograman", jam: "07.30 - 10.50", dosen: "Iklima", lokasi: "PUT310" },
    { mataKuliah: "Bahasa Inggris untuk TIK", jam: "10.50 - 15.00", dosen: "Denil", lokasi: "GSG205" },
  ],
  wednesday: [
    { mataKuliah: "Organisasi & Arsitektur Komputer", jam: "07.30 - 10.50", dosen: "Fajar", lokasi: "PUT311" },
    { mataKuliah: "Pendidikan Agama", jam: "10.50 - 15.00", dosen: "Melisa", lokasi: "PUT311" },
  ],
  thursday: [
    { mataKuliah: "Pengantar Teknologi Informasi & Komunikasi", jam: "07.30 - 10.50", dosen: "Bambang", lokasi: "GSG204" },
    { mataKuliah: "Pancasila", jam: "15.15 - 18.55", dosen: "Kusnar", lokasi: "GSG204" },
  ],
  friday: [
    { mataKuliah: "Teknologi Multimedia", jam: "07.30 - 10.50", dosen: "Mera", lokasi: "GSG204" },
    { mataKuliah: "Sistem Operasi", jam: "13.20 - 16.55", dosen: "Hata", lokasi: "GSG204" },
  ],
}

const dayOrder: DayKey[] = ["monday", "tuesday", "wednesday", "thursday", "friday"]

const getDateForDay = (targetDay: DayKey): string => {
  const today = new Date()
  const currentDayIndex = today.getDay()

  // Map DayKey → JS day index
  const dayIndexMap: Record<DayKey, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
  }

  const targetIndex = dayIndexMap[targetDay]

  // Hitung selisih menuju hari target (wrap ke minggu depan bila perlu)
  let diff = targetIndex - currentDayIndex
  if (diff < 0) diff += 7

  const targetDate = new Date()
  targetDate.setDate(today.getDate() + diff)

  return targetDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function JadwalKuliah() {
  const today = new Date()

  const getTodayKey = (): DayKey => {
    const map = [null, "monday", "tuesday", "wednesday", "thursday", "friday"] as const
    return map[today.getDay()] || "monday"
  }

  const todayKey = getTodayKey()

  // Right rotate array so that "today" is first
  const rotatedDays = (() => {
    const idx = dayOrder.indexOf(todayKey)
    return [...dayOrder.slice(idx), ...dayOrder.slice(0, idx)]
  })()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Jadwal Mata Kuliah</h1>

      {rotatedDays.map((dayKey) => {
        const isToday = dayKey === todayKey
        return (
          <div key={dayKey} className="flex flex-col gap-3">
            {/* Heading */}
            {isToday && (
              <h2 className="text-lg font-semibold">Hari Ini - {getDateForDay(dayKey)}</h2>
            )}
            {!isToday && (
              <h2 className="text-lg font-semibold">{getDateForDay(dayKey)}</h2>
            )}
            {schedule[dayKey].length === 0 && (
              <p className="text-sm text-muted-foreground">Tidak ada jadwal.</p>
            )}

            {/* Card Jadwal */}
            <div className="grid grid-cols-2 gap-4">
              {schedule[dayKey].map((item, i) => (
                <Card key={i} className="rounded-xl shadow-sm">
                  <CardContent className="flex flex-col gap-3">
                    <CardHeader className="p-0">
                      <CardTitle
                        className="text-lg font-bold"
                      >
                        <h3 className="font-semibold">{item.mataKuliah}</h3>
                      </CardTitle>
                    </CardHeader>

                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4" /> {item.jam}
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4" /> {item.dosen}
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4" /> {item.lokasi}
                        </div>
                      </div>

                      <Button className="w-fit mt-2 self-end">Lihat Materi</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}


