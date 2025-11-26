import { CourseList, initialCourses } from "@/components/course-list"
import WeeklyMeetings from "@/components/weekly-meetings"
import MainLayout from "@/layouts/MainLayout"
import { useParams } from "react-router-dom"

const MyCourse = () => {
  const { courseId } = useParams()
  const course = initialCourses.find((e) => e.id == courseId)

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 space-y-8">
          <h1 className="text-3xl font-semibold">{course?.name}</h1>
          <WeeklyMeetings />
        </div>
        <div className="hidden lg:block col-span-1 md:col-span-1">
          <CourseList />
        </div>
      </div>
    </MainLayout>
  )
}

export default MyCourse