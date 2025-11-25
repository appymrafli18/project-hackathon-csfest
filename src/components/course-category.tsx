import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { majors } from "@/data/majors"

export default function CourseCategory() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pilih Jurusan</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {majors.map((major) => (
          <Card
            key={major.id}
            className={`${major.color} text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between h-60`}
          >
            <CardContent className="flex flex-col items-center text-center space-y-4 p-0">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20">
                {major.icon}
              </div>
              <h2 className="font-bold text-lg">{major.name}</h2>

              <Link to={`/enroll-course/${major.id}`}>
                <Button className="bg-white text-black hover:text-white cursor-pointer rounded-xl font-semibold px-4 py-2">
                  Pilih Jurusan
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
