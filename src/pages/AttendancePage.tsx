import { useMemo, useState } from "react"
import MainLayout from "@/layouts/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { attendanceData, type AttendanceStatus } from "@/data/attendance"

function statusLabel(s?: AttendanceStatus) {
  if (!s) return "Belum"
  if (s === "hadir") return "Hadir"
  if (s === "sakit") return "Sakit"
  if (s === "izin") return "Izin"
  return "Alpha"
}

function statusColor(s?: AttendanceStatus) {
  if (!s) return "bg-gray-100 text-gray-800"
  switch (s) {
    case "hadir":
      return "bg-green-100 text-green-800"
    case "sakit":
      return "bg-blue-100 text-blue-800"
    case "izin":
      return "bg-yellow-100 text-yellow-800"
    case "alpha":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function formatDate(date?: string) {
  if (!date) return "-"
  const d = new Date(date)
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
}

// ---------- COMPONENT ----------
export default function AttendancePage() {
  const [semesterFilter, setSemesterFilter] = useState<number | "all">("all")
  const [search, setSearch] = useState("")
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  // generate list of semesters available from data
  const semesters = useMemo(() => {
    const s = Array.from(new Set(attendanceData.map((c) => c.semester))).sort((a, b) => a - b)
    return s
  }, [])

  // filtered courses
  const filteredCourses = useMemo(() => {
    return attendanceData.filter((c) => {
      if (semesterFilter !== "all" && c.semester !== semesterFilter) return false
      if (search.trim() === "") return true
      const q = search.toLowerCase()
      return (
        c.nama.toLowerCase().includes(q) ||
        c.kode.toLowerCase().includes(q) ||
        c.kelas.toLowerCase().includes(q)
      )
    })
  }, [semesterFilter, search])

  const selectedCourse = useMemo(
    () => attendanceData.find((c) => c.id === selectedCourseId) ?? filteredCourses[0] ?? null,
    [selectedCourseId, filteredCourses]
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-2xl font-bold">Presensi Mahasiswa</h1>
            <p className="text-sm text-muted-foreground">Lihat riwayat kehadiran per mata kuliah dan per minggu.</p>
          </div>

          <div className="flex items-center gap-3 w-ful">
            <SelectWrapper
              semesters={semesters}
              value={semesterFilter}
              onChange={(v) => {
                setSelectedCourseId(null)
                setSemesterFilter(v)
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Sidebar: Courses */}
          <aside>
            <Card className="mb-3 gap-0">
              <CardHeader>
                <CardTitle className="text-sm">Mata Kuliah</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Search size={16} />
                  <Input
                    placeholder="Cari matakuliah..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2 max-h-[56vh] overflow-y-auto pr-2">
                  {filteredCourses.length === 0 && <p className="text-sm text-muted-foreground">Tidak ada matakuliah.</p>}

                  {filteredCourses.map((c) => {
                    const isSelected = selectedCourse?.id === c.id
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCourseId(c.id)}
                        className={`w-full text-left p-3 rounded-md flex items-center justify-between gap-5 hover:bg-muted ${isSelected ? "bg-muted" : ""}`}
                      >
                        <div>
                          <div className="font-medium line-clamp-1">{c.nama}</div>
                          <div className="text-xs text-muted-foreground">{c.kode} • {c.kelas}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">Sem {c.semester}</div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Legend</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm bg-green-600" /> Hadir</div>
                <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm bg-blue-600" /> Sakit</div>
                <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm bg-yellow-500" /> Izin</div>
                <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm bg-red-600" /> Alpha</div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content: Selected course attendance */}
          <section>
            {!selectedCourse ? (
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Pilih matakuliah untuk melihat presensi.</p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{selectedCourse.nama}</h2>
                    <p className="text-sm text-muted-foreground">{selectedCourse.kode} • {selectedCourse.kelas} — {selectedCourse.tahun}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800">{`Sem ${selectedCourse.semester}`}</Badge>
                  </div>
                </div>

                {/* Weeks grid */}
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-sm">Rekap Presensi per Minggu</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {/* Show 16 weeks: if data missing -> show empty */}
                      {Array.from({ length: 16 }).map((_, idx) => {
                        const w = selectedCourse.weeks.find((x) => x.week === idx + 1)
                        const status = w?.status
                        const lbl = statusLabel(status)
                        const color = statusColor(status)
                        return (
                          <div key={idx} className={`p-3 rounded-md border ${status ? "" : "border-dashed"} bg-white`}>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="text-xs text-muted-foreground">Minggu {idx + 1}</div>
                              <div className={`text-xs px-2 py-0.5 rounded-full ${color}`}>{lbl}</div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {w?.date ? formatDate(w.date) : "Belum"}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Summary */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Total Minggu</div>
                      <div className="text-xl font-semibold">{Array.from({ length: 16 }).length}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Total Hadir</div>
                      <div className="text-xl font-semibold">
                        {selectedCourse.weeks.filter((w) => w.status === "hadir").length}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">Total Alpha</div>
                      <div className="text-xl font-semibold">
                        {selectedCourse.weeks.filter((w) => w.status === "alpha").length}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  )
}

function SelectWrapper({ semesters, value, onChange }: { semesters: number[]; value: number | "all"; onChange: (v: number | "all") => void }) {
  return (
    <Select onValueChange={(v) => onChange(v === "all" ? "all" : Number(v))} defaultValue={value === "all" ? "all" : String(value)}>
      <SelectTrigger className="w-full sm:w-48">
        <SelectValue>{value === "all" ? "Semua Semester" : `Semester ${value}`}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Semua Semester</SelectItem>
        {semesters.map((s) => (
          <SelectItem key={s} value={String(s)}>{`Semester ${s}`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
