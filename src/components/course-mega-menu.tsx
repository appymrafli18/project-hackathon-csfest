import * as React from "react"
import { GraduationCap, Search, BookOpen, ChevronDown } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"

interface Course {
  id: string;
  name: string;
}

function CourseLink({
  className,
  course,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { course: Course }) {
  return (
    <Link
      to={`/my-course/${course.id}`}
      className={cn(
        "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
        className
      )}
      {...props}
    >
      <div className="text-sm font-medium flex items-center gap-2">
        <GraduationCap className="h-4 w-4 text-primary" />
        {course.name.replace(/^TI-/, "").substring(0, 30)}
      </div>
    </Link>
  );
}

export function CourseMegaMenu({ initialCourses }: { initialCourses: Course[] }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);

  const filteredCourses = initialCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleCourses = showAll ? filteredCourses : filteredCourses.slice(0, 6);

  const isMobile = useIsMobile()

  /* -------------------- MOBILE DROPDOWN -------------------- */
  if (isMobile) {
    return (
      <div className="relative">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex justify-between items-center gap-1 hover:text-gray-300 transition cursor-pointer lg"
        >
          Courses 
          <ChevronDown className="h-5 w-5" />
        </button>

        {mobileOpen && (
          <div className="text-black mt-2 rounded-md border p-4 shadow-lg z-50 bg-white w-full">
            <h4 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Mata Kuliah
            </h4>

            <Separator className="mb-3" />

            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari mata kuliah..."
                className="pl-9 h-9 text-sm"
                value={searchTerm}
                onChange={(e) => {
                  setShowAll(false); // reset saat user mengetik
                  setSearchTerm(e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-y-1 max-h-60 overflow-y-auto">
              {visibleCourses.length > 0 ? (
                visibleCourses.map((course) => (
                  <CourseLink key={course.id} course={course} />
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground pt-2">
                  Tidak ada mata kuliah.
                </p>
              )}
            </div>

            <Separator className="my-3" />

            {/* Lihat Semua / Tampilkan Lebih Sedikit */}
            {filteredCourses.length > 6 && (
              <div
                onClick={() => setShowAll(!showAll)}
                className="cursor-pointer block text-center text-sm font-medium text-primary hover:text-primary/80"
              >
                {showAll
                  ? "Tampilkan Lebih Sedikit"
                  : `Lihat Semua (${filteredCourses.length})`}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  /* -------------------- DESKTOP HOVERCARD -------------------- */
  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <span className="flex items-center gap-1 hover:text-gray-300 transition cursor-pointer">
          Courses
        </span>
      </HoverCardTrigger>

      <HoverCardContent className="w-[450px] p-4 z-50">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Mata Kuliah Favorit & Terbaru
            </h4>
          </div>
          <Separator />

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari mata kuliah..."
              className="pl-9 h-9 text-sm"
              value={searchTerm}
              onChange={(e) => {
                setShowAll(false);
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 max-h-64 overflow-y-auto">
            {visibleCourses.length > 0 ? (
              visibleCourses.map((course) => (
                <CourseLink key={course.id} course={course} />
              ))
            ) : (
              <p className="col-span-2 text-center text-sm text-muted-foreground pt-2">
                Tidak ada mata kuliah.
              </p>
            )}
          </div>

          <Separator />

          {filteredCourses.length > 6 && (
            <div
              onClick={() => setShowAll(!showAll)}
              className="text-center cursor-pointer text-sm font-medium text-primary hover:text-primary/80"
            >
              {showAll
                ? "Tampilkan Lebih Sedikit"
                : `Lihat Semua (${filteredCourses.length} total)`}
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
