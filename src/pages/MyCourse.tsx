import { CourseList } from "@/components/course-list"
import WeeklyMeetings from "@/components/weekly-meetings"
import MainLayout from "@/layouts/MainLayout"

const MyCourse = () => {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-2">
          <WeeklyMeetings />
        </div>
        <div className="col-span-1 md:col-span-1">
          <CourseList />
        </div>
      </div>
    </MainLayout>
  )
}

export default MyCourse