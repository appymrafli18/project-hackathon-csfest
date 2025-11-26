import AnnouncementBar from "@/components/announcment-bar"
import CampusAnnouncements from "@/components/campus-announcements"
import CourseCategory from "@/components/course-category"
import { CourseList } from "@/components/course-list"
import EventsComponent from "@/components/event-component"
import TodayShedule from "@/components/today-shedule"
import TaskCard from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { announcements } from "@/data/announcment"
import MainLayout from "@/layouts/MainLayout"
import { validateAttendance as runValidateAttendance } from "@/lib/validateAttendance"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { assignments } from "@/data/assignment"

const NewHomePage = () => {
  interface AttendanceStatus {
    valid: boolean;
    message: string;
  }

  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

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

    setDialogMessage(result.message);
    setDialogOpen(true);

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
              <h1 className="text-xl font-semibold">Tugas Deadline Terdekat</h1>
              <TaskCard task={assignments[0]} />
            </div>

            <TodayShedule />

            <div className="space-y-4">
              <h1 className="text-xl font-semibold">Tugas yang belum selesai</h1>
              <div>
                {assignments.slice(1, 4).map((task, i) => (
                  <TaskCard key={i} task={task} />
                ))}
              </div>
              <Link to={"/tasks"}>
                <Button className="mt-4 bg-teal-800 text-white hover:bg-teal-900 px-6">
                  Lihat Semua Tugas
                </Button>
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

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {attendanceStatus?.valid ? "Presensi Valid" : "Presensi Tidak Valid"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {dialogMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction className="bg-teal-800 hover:bg-teal-700">Tutup</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  )
}

export default NewHomePage
