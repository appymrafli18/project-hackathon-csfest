// src/components/CourseMegaMenu.tsx
"use client"

import * as React from "react"
import { GraduationCap, Search, BookOpen } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface Course {
  id: string;
  name: string;
}

const CourseLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { course: Course }
>(({ className, course, ...props }, ref) => {
  return (
    <Link
        ref={ref}
        to={`/my-course/${course.id}`}
        className={cn(
        "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
        className
      )}
      {...props}
    >
      <div className="text-sm font-medium flex items-center gap-2">
        <GraduationCap className="h-4 w-4 text-primary" />
        {course.name.replace(/^TI-/, '').substring(0, 30)}
      </div>
    </Link>
  )
})
CourseLink.displayName = "CourseLink"

export function CourseMegaMenu({ initialCourses }: { initialCourses: Course[] }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredCourses = initialCourses
    .filter(course => 
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 6);
    
  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <span
          className="flex items-center gap-1 hover:text-gray-300 transition cursor-pointer"
        >
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
            <p className="text-sm text-muted-foreground">
              Akses cepat ke mata kuliah yang sedang berjalan.
            </p>
          </div>
          <Separator />
          
          {/* Input Pencarian Cepat di Mega Menu */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari mata kuliah..."
              className="pl-9 h-9 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                    <CourseLink key={course.id} course={course} />
                ))
            ) : (
                <p className="col-span-2 text-center text-sm text-muted-foreground pt-2">
                    Tidak ada mata kuliah yang cocok.
                </p>
            )}
          </div>
          
          <Separator />
          
          {/* Aksi "Lihat Semua" */}
          <Link 
            to="/#daftarMataKuliah"
            className="text-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Lihat Semua Mata Kuliah ({initialCourses.length} total)
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}