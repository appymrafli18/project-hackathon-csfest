import { Input } from "@/components/ui/input";
import MainLayout from "@/layouts/MainLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate, useParams } from "react-router-dom";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

export default function ProdiPage() {
  const semesterData = [
    {
      semester: 1,
      tahun: [
        {
          kelas: "TI 1C",
          courses: [
            { id: 1, kode: "MAT1", nama: "Matematika Dasar", kelas: "TI 1A" },
            { id: 2, kode: "ALGO1", nama: "Pengantar Algoritma", kelas: "TI 1A" },
          ],
        },
        {
          kelas: "TI 1B",
          courses: [
            { id: 3, kode: "ENG1", nama: "Bahasa Inggris Dasar", kelas: "TI 1A" },
            { id: 4, kode: "PANC1", nama: "Pancasila", kelas: "TI 1A" },
          ],
        },
      ],
    },

    {
      semester: 2,
      tahun: [
        {
          kelas: "TI 1C",
          courses: [
            { id: 1, kode: "BASDAT", nama: "Basis Data", kelas: "TI 1A" },
            { id: 2, kode: "PW1", nama: "Pemrograman Web 1", kelas: "TI 1A" },
          ],
        },
        {
          kelas: "TI 1B",
          courses: [
            { id: 3, kode: "JARKOM1", nama: "Jaringan Komputer", kelas: "TI 1A" },
            { id: 4, kode: "KWR2", nama: "Kewarganegaraan", kelas: "TI 1A" },
          ],
        },
      ],
    },

    {
      semester: 3,
      tahun: [
        {
          kelas: "TI 1C",
          courses: [
            { id: 1, kode: "ALGO2", nama: "Algoritma & Struktur Data", kelas: "TI 2A" },
            { id: 2, kode: "OOP1", nama: "Pemrograman Berorientasi Objek", kelas: "TI 2A" },
          ],
        },
        {
          kelas: "TI 1B",
          courses: [
            { id: 3, kode: "STAT1", nama: "Statistika", kelas: "TI 2A" },
            { id: 4, kode: "ENG2", nama: "Bahasa Inggris 2", kelas: "TI 2A" },
          ],
        },
      ],
    },

    {
      semester: 4,
      tahun: [
        {
          kelas: "TI 1C",
          courses: [
            { id: 1, kode: "SE1", nama: "Rekayasa Perangkat Lunak", kelas: "TI 2A" },
            { id: 2, kode: "OS1", nama: "Sistem Operasi", kelas: "TI 2A" },
          ],
        },
        {
          kelas: "TI 1B",
          courses: [
            { id: 3, kode: "ML1", nama: "Pengantar Machine Learning", kelas: "TI 2A" },
            { id: 4, kode: "JARKOM2", nama: "Jaringan Komputer Lanjut", kelas: "TI 2A" },
          ],
        },
      ],
    },

    {
      semester: 5,
      tahun: [
        {
          kelas: "TI 1C",
          courses: [
            { id: 1, kode: "PI1", nama: "Pemrograman Internet", kelas: "TI 3A" },
            { id: 2, kode: "CLOUD1", nama: "Cloud Computing", kelas: "TI 3A" },
          ],
        },
        {
          kelas: "TI 1B",
          courses: [
            { id: 3, kode: "RPL1", nama: "Analisis Sistem", kelas: "TI 3A" },
            { id: 4, kode: "UIUX1", nama: "UI/UX Design", kelas: "TI 3A" },
          ],
        },
      ],
    },

    {
      semester: 6,
      tahun: [
        {
          kelas: "TI 1C",
          courses: [
            { id: 1, kode: "AI1", nama: "Artificial Intelligence", kelas: "TI 3A" },
            { id: 2, kode: "PBD1", nama: "Pemrograman Basis Data", kelas: "TI 3A" },
          ],
        },
        {
          kelas: "TI 1B",
          courses: [
            { id: 3, kode: "ETIKA", nama: "Etika Profesi", kelas: "TI 3A" },
            { id: 4, kode: "MOBILE1", nama: "Pemrograman Mobile", kelas: "TI 3A" },
          ],
        },
      ],
    },

    {
      semester: 7,
      tahun: [
        {
          kelas: "TI 1B",
          courses: [
            { id: 1, kode: "KP", nama: "Kerja Praktek", kelas: "TI 4A" },
            { id: 2, kode: "RISET1", nama: "Metodologi Penelitian", kelas: "TI 4A" },
          ],
        },
      ],
    },

    {
      semester: 8,
      tahun: [
        {
          kelas: "TI 1B",
          courses: [
            { id: 1, kode: "TA", nama: "Tugas Akhir", kelas: "TI 4A" },
            { id: 2, kode: "SEM1", nama: "Seminar Tugas Akhir", kelas: "TI 4A" },
          ],
        },
      ],
    },
  ];

  const { jurusanId, prodiId } = useParams();
  const navigate = useNavigate();

  const handleSelectCourse = (semester: number, tahun: string, courseId: number) => {
    navigate(`/enroll-course/${jurusanId}/${prodiId}/${semester}/${courseId}`);
  };
  return (
    <MainLayout>
      <DynamicBreadcrumb />
      <div className="w-full flex justify-center">
        <Input
          placeholder="Cari kursus..."
          className="max-w-2xl h-12 rounded-xl"
        />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* --- LEVEL 1 : SEMESTER --- */}
        <Accordion type="multiple" className="w-full space-y-3">
          {semesterData.map((sem) => (
            <AccordionItem
              key={sem.semester}
              value={`semester-${sem.semester}`}
              className="rounded-lg border px-3"
            >
              <AccordionTrigger className="font-semibold text-left text-lg">
                Semester {sem.semester}
              </AccordionTrigger>

              <AccordionContent>
                {/* --- LEVEL 2 : TAHUN AJARAN --- */}
                <Accordion type="multiple" className="pl-4 space-y-2">
                  {sem.tahun.map((th) => (
                    <AccordionItem
                      key={th.kelas}
                      value={`tahun-${sem.semester}-${th.kelas}`}
                      className="rounded-md border px-2"
                    >
                      <AccordionTrigger className="font-medium">
                        {th.kelas}
                      </AccordionTrigger>

                      <AccordionContent>
                        {/* --- LEVEL 3 : LIST COURSES --- */}
                        {th.courses.length === 0 ? (
                          <p className="text-sm text-muted-foreground italic pl-3 pb-3">
                            Tidak ada mata kuliah.
                          </p>
                        ) : (
                          <ul className="space-y-2 pl-3 pb-3">
                            {th.courses.map((course) => (
                              <li
                                key={course.id}
                                onClick={() =>
                                  handleSelectCourse(
                                    sem.semester,
                                    th.kelas,
                                    course.id
                                  )
                                }
                                className="p-3 border rounded-md bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition"
                              >
                                <p className="font-medium">{course.nama}</p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </MainLayout>
  );
}
