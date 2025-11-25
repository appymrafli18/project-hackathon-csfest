import AnnouncementBar from "@/components/announcment-bar"
import CampusAnnouncements from "@/components/campus-announcements"
import CourseCategory from "@/components/course-category"
import { CourseList } from "@/components/course-list"
import EventsComponent from "@/components/event-component"
import TodayShedule from "@/components/today-shedule"
import TaskCard, { type TaskItem } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { announcements } from "@/data/announcment"
import MainLayout from "@/layouts/MainLayout"
import { validateAttendance as runValidateAttendance } from "@/lib/validateAttendance"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const NewHomePage = () => {
  const tasks: TaskItem[] = [
    {
      title: "Laporan Praktikum Sistem Operasi",
      matkul: "Sistem Operasi",
      date: "Besok, 23 Nov 2025",
    },
    {
      title: "Quiz Basis Data - Chapter 5",
      matkul: "Basis Data",
      date: "24 Nov 2025",
    },
    {
      title: "Project Website E-Commerce",
      matkul: "Pemrograman Web",
      date: "28 Nov 2025",
    },
  ];

  interface AttendanceStatus {
    valid: boolean;
    message: string;
  }

  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAttendanceStatus();
  }, []);

  function fetchAttendanceStatus() {
    const data = localStorage.getItem("attendanceStatus");

    if (data) {
      const status: AttendanceStatus = JSON.parse(data);

      setAttendanceStatus(status);
    }
  }

  async function handleValidateAttendance() {
    setLoading(true);
    const result = await runValidateAttendance();

    localStorage.setItem("attendanceStatus", JSON.stringify(result));
    setAttendanceStatus(result);

    setLoading(false);
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-8 col-span-1 lg:col-span-2">
            <AnnouncementBar
              message={attendanceStatus?.message || "Anda belum melakukan presensi hari ini."}
              type={attendanceStatus?.valid ? "success" : "warning"}
              actionLabel={!attendanceStatus?.valid ? "Validasi absensi" : undefined}
              onAction={!attendanceStatus?.valid ? handleValidateAttendance : undefined}
              loading={loading}
            />
            <AnnouncementBar
              message="Ada pergantian jadwal mata kuliah teknologi multimedia pada tanggal 25 September 2023 menjadi pukul 13.20 - 16.55."
              type="info"
            />
            <div className="space-y-4">
              <h1 className="text-xl font-semibold">
                Tugas Deadline Terdekat
              </h1>
              <TaskCard
                task={tasks[0]}
              />
            </div>
            <TodayShedule />
            <div className="space-y-4">
              <h1 className="text-xl font-semibold">
                Tugas yang belum selesai
              </h1>
              <div>
                {tasks.slice(1).map((task, i) => (
                  <TaskCard key={i} task={task} />
                ))}
              </div>
              <Link to={"/tasks"}>
                <Button className="mt-4 bg-teal-800 text-white hover:bg-teal-900 px-6">Lihat Semua Tugas</Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="hidden lg:block">
              <CourseList />
            </div>
            <CampusAnnouncements announcements={announcements} />
          </div>
        </div>
        <CourseCategory />
        <EventsComponent />
      </div>
    </MainLayout >
  )
}

export default NewHomePage