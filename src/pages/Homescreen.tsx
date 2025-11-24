import AnnouncementBar from "@/components/announcment-bar"
import { AppSidebar } from "@/components/app-sidebar"
import AssignmentCards from "@/components/assignment-cards"
import CourseCategory from "@/components/course-category"
import { JadwalKuliah } from "@/components/jadwal-kuliah"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

const Homescreen = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="p-4">
          <AnnouncementBar
            actionLabel="ANNOUNCEMENTS"
            message="Ada pergantian jadwal mata kuliah teknologi multimedia pada tanggal 25 September 2023 menjadi pukul 13.20 - 16.55."
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="rounded-xl col-span-1 border bg-muted/50">
            <div className="p-5">
              <AssignmentCards />
            </div>
          </div>
          <div className="bg-muted/50 h-fit rounded-xl col-span-3 p-5 border">
            <JadwalKuliah />
          </div>
          <CourseCategory />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Homescreen