import { GraduationCap } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Link } from "react-router-dom";

interface Course {
  id: string;
  name: string;
}

export const initialCourses: Course[] = [
  { id: "1", name: "TI-Bahasa Inggris untuk TIK 1" },
  { id: "2", name: "TI-Teknologi Multimedia-TI 1" },
  { id: "3", name: "TI-Matematika Diskrit-TI 1" },
  { id: "4", name: "TI-Bahasa Indonesia-TI 1" },
  { id: "5", name: "TI-Organisasi & Arsitektur Komputer" },
  { id: "6", name: "TI-Sistem Operasi-TI 1" },
  { id: "7", name: "TI-Pengantar Teknologi Informasi & Komunikasi" },
  { id: "8", name: "TI-Algoritma & Pemrograman-TI 1" },
  { id: "10", name: "TI-Etika Profesi & Hukum Siber" },
];

export function CourseList() {

  return (
    <div className="space-y-6" id="daftarMataKuliah">
      <h1 className="text-xl font-semibold">
        Daftar Mata Kuliah
      </h1>
      <Command shouldFilter={true} className="border-2">
        <div>
          <CommandInput
            placeholder="Cari Mata Kuliah..."
            className="h-10 text-base"
          />
        </div>

        <CommandList className="max-h-[400px] overflow-y-auto">
          <CommandEmpty>Mata kuliah tidak ditemukan.</CommandEmpty>

          <CommandGroup heading="Daftar Mata Kuliah">
            {initialCourses.map((course) => (
              <Link key={course.id} to={`/my-course/${course.id}`}>
                <CommandItem
                  key={course.id}
                  value={course.name}
                  className="cursor-pointer py-3 px-6 data-[selected=true]:bg-primary/10"
                >
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-5 w-5 text-primary opacity-80 shrink-0" />
                    <p className="font-medium text-sm leading-snug">{course.name}</p>
                  </div>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}